import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler, clientIp } from "./contact-handler.ts";
import { buildConfirmation, validate, type Mail } from "./contact.ts";
import { variabiliMancanti } from "./mailer.ts";

const URL_API = "http://localhost/api/contatti";
const valido = { nome: "Maria", cognome: "Rossi", email: "maria@esempio.it", messaggio: "Vorrei un sito per il mio studio.", sito: "" };

function setup({ fail = false, failConferma = false, t = { v: 1_000_000 } } = {}) {
  const sent: Mail[] = [];
  const logs: unknown[] = [];
  const handler = createContactHandler({
    sendMail: async (m) => {
      if (fail) throw Object.assign(new Error("smtp giu'"), { code: "ECONNECTION" });
      if (failConferma && m.to === valido.email) throw Object.assign(new Error("casella inesistente"), { code: "EENVELOPE" });
      sent.push(m);
    },
    to: "destinatario@esempio.invalid",
    from: "sito@esempio.invalid",
    now: () => t.v,
    log: (o) => logs.push(o),
  });
  return { handler, sent, logs, t };
}

const JSON_H = { "Content-Type": "application/json" };
const post = (handler: (r: Request) => Promise<Response>, body: unknown, headers: Record<string, string> = JSON_H) =>
  handler(new Request(URL_API, { method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body) }));

test("richiesta valida: invia la mail al team e la conferma a chi ha scritto, poi risponde ok", async () => {
  const { handler, sent } = setup();
  const r = await post(handler, valido);
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true });
  assert.equal(sent.length, 2);
  const m = sent[0]!; // prima la richiesta al team
  assert.equal(m.to, "destinatario@esempio.invalid");
  assert.equal(typeof m.replyTo === "object" && m.replyTo.address, "maria@esempio.it");
  assert.match(m.subject, /Maria Rossi/);
  assert.match(m.text, /Vorrei un sito/);
  const c = sent[1]!; // poi la conferma, all'indirizzo scritto nel modulo
  assert.equal(c.to, "maria@esempio.it");
  assert.equal(c.from, "sito@esempio.invalid");
  assert.equal(c.replyTo, "destinatario@esempio.invalid"); // chi risponde scrive al team
  assert.match(c.text, /^Ciao Maria,/);
});

test("la conferma ha oggetto fisso, non ripete il messaggio e porta l'intestazione di risposta automatica", () => {
  const c = buildConfirmation({
    value: { nome: "Maria", cognome: "Rossi", email: "maria@esempio.it", messaggio: "TESTO RISERVATO DI CHI SCRIVE" },
    from: "sito@esempio.invalid",
    replyTo: "team@esempio.invalid",
  });
  assert.equal(c.subject, "Abbiamo ricevuto la tua richiesta | MALTEN");
  assert.ok(!/TESTO RISERVATO/.test(c.text) && !/TESTO RISERVATO/.test(c.subject));
  assert.match(c.text, /Se non hai scritto tu/);
  assert.equal(c.headers?.["Auto-Submitted"], "auto-replied");
});

test("la conferma non può iniettare intestazioni attraverso il nome", async () => {
  const { handler, sent } = setup();
  await post(handler, { ...valido, nome: "Maria\r\nBcc: x@y.it" });
  const c = sent[1]!;
  assert.ok(!/[\r\n]/.test(c.subject) && !/[\r\n]/.test(c.to) && !/Bcc:\s*x@y\.it\s*$/m.test(c.text.split("\n")[0]!));
  assert.equal(c.to, "maria@esempio.it");
});

test("se la conferma non parte la richiesta resta valida: risposta ok e motivo solo nei log", async () => {
  const { handler, sent, logs } = setup({ failConferma: true });
  const r = await post(handler, valido);
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true });
  assert.equal(sent.length, 1); // la richiesta al team è arrivata
  assert.ok(logs.some((l) => (l as { evento?: string; causa?: string }).evento === "errore_conferma" && (l as { causa?: string }).causa === "EENVELOPE"));
  assert.ok(!/maria|rossi|esempio\.it/i.test(JSON.stringify(logs)));
});

test("se la richiesta al team non parte, non si manda nessuna conferma", async () => {
  const { handler, sent } = setup({ fail: true });
  assert.equal((await post(handler, valido)).status, 502);
  assert.equal(sent.length, 0);
});

test("campo trappola compilato: risponde ok ma non invia", async () => {
  const { handler, sent } = setup();
  const r = await post(handler, { ...valido, sito: "http://spam.example" });
  assert.equal(r.status, 200);
  assert.equal(sent.length, 0);
});

test("campi non validi: 400 e nessuna mail", async () => {
  const { handler, sent } = setup();
  let n = 0; // un indirizzo diverso per ogni prova, per non scattare il limite di richieste
  for (const parte of [{ nome: "" }, { cognome: " " }, { email: "non-una-mail" }, { email: "a@b" }, { messaggio: "corto" }, { messaggio: "x".repeat(2001) }, { nome: "x".repeat(61) }]) {
    const r = await post(handler, { ...valido, ...parte }, { ...JSON_H, "X-Forwarded-For": `10.0.0.${++n}` });
    assert.equal(r.status, 400, JSON.stringify(parte).slice(0, 60));
  }
  assert.equal(sent.length, 0);
});

test("a capo nei campi singoli non possono iniettare intestazioni", () => {
  const r = validate({ ...valido, nome: "Maria\r\nBcc: x@y.it", email: "m@esempio.it" });
  assert.equal(r.ok, true);
  if (r.ok) assert.ok(!/[\r\n]/.test(r.value.nome));
  assert.equal(validate({ ...valido, email: "m@esempio.it\r\nBcc: x@y.it" }).ok, false);
});

test("errore dell'invio: 502 senza dettagli interni", async () => {
  const { handler, logs } = setup({ fail: true });
  const r = await post(handler, valido);
  const j = (await r.json()) as { ok: boolean; error: string };
  assert.equal(r.status, 502);
  assert.equal(j.ok, false);
  assert.ok(!/smtp|ECONN/i.test(j.error));
  assert.ok(logs.some((l) => (l as { causa?: string }).causa === "ECONNECTION")); // il motivo tecnico finisce solo nei log
});

test("limite di 5 richieste all'ora per indirizzo, poi si libera", async () => {
  const { handler, t } = setup();
  for (let i = 0; i < 5; i++) assert.equal((await post(handler, valido)).status, 200);
  assert.equal((await post(handler, valido)).status, 429);
  t.v += 61 * 60 * 1000;
  assert.equal((await post(handler, valido)).status, 200);
});

test("indirizzi diversi hanno limiti separati", async () => {
  const { handler } = setup();
  for (let i = 0; i < 6; i++) await post(handler, valido, { ...JSON_H, "X-Forwarded-For": "1.1.1.1" });
  assert.equal((await post(handler, valido, { ...JSON_H, "X-Forwarded-For": "2.2.2.2" })).status, 200);
});

test("corpo troppo grande: 413 (anche senza Content-Length)", async () => {
  const { handler, sent } = setup();
  const grande = JSON.stringify({ ...valido, messaggio: "x".repeat(20000) });
  assert.equal((await post(handler, grande)).status, 413);
  // corpo in streaming, senza lunghezza dichiarata
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(new TextEncoder().encode(grande));
      c.close();
    },
  });
  const r = await handler(new Request(URL_API, { method: "POST", headers: JSON_H, body: stream, duplex: "half" } as RequestInit));
  assert.equal(r.status, 413);
  assert.equal(sent.length, 0);
});

test("invio classico senza JavaScript: risponde con una pagina", async () => {
  const { handler, sent } = setup();
  const form = { "Content-Type": "application/x-www-form-urlencoded" };
  const r = await post(handler, new URLSearchParams(valido).toString(), form);
  assert.equal(r.status, 200);
  assert.match(r.headers.get("content-type") ?? "", /text\/html/);
  assert.match(await r.text(), /Richiesta inviata/);
  assert.equal(sent.length, 2); // richiesta al team + conferma
  const r2 = await post(handler, new URLSearchParams({ ...valido, email: "no" }).toString(), form);
  assert.equal(r2.status, 400);
  assert.match(await r2.text(), /Richiesta non inviata/);
});

test("metodi e formati sbagliati", async () => {
  const { handler } = setup();
  const get = await handler(new Request(URL_API));
  assert.equal(get.status, 405);
  assert.equal(get.headers.get("allow"), "POST");
  assert.equal((await post(handler, "ciao", { "Content-Type": "text/plain" })).status, 415);
  assert.equal((await post(handler, "{non json", JSON_H)).status, 400);
  assert.equal((await post(handler, "[1,2]", JSON_H)).status, 400);
  assert.equal((await post(handler, "null", JSON_H)).status, 400);
});

test("le risposte hanno intestazioni di sicurezza e non vanno in cache", async () => {
  const { handler } = setup();
  const r = await post(handler, valido);
  assert.equal(r.headers.get("cache-control"), "no-store");
  assert.equal(r.headers.get("x-content-type-options"), "nosniff");
  assert.match(r.headers.get("content-security-policy") ?? "", /default-src 'none'/);
});

test("i log non contengono dati personali", async () => {
  const { handler, logs } = setup();
  await post(handler, valido);
  assert.ok(!/maria|rossi|esempio\.it|sito per il mio/i.test(JSON.stringify(logs)));
});

test("indirizzo del client: primo di X-Forwarded-For, poi X-Real-IP", () => {
  assert.equal(clientIp(new Request(URL_API, { headers: { "x-forwarded-for": "9.9.9.9, 10.0.0.1" } })), "9.9.9.9");
  assert.equal(clientIp(new Request(URL_API, { headers: { "x-real-ip": "8.8.8.8" } })), "8.8.8.8");
  assert.equal(clientIp(new Request(URL_API)), "sconosciuto");
});

test("variabili d'ambiente mancanti vengono elencate per nome", () => {
  assert.deepEqual(variabiliMancanti({}), ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_FROM", "CONTACT_TO"]);
  const tutte = { SMTP_HOST: "h", SMTP_PORT: "587", SMTP_USER: "u", SMTP_PASS: "p", MAIL_FROM: "f@x.it", CONTACT_TO: "t@x.it" };
  assert.deepEqual(variabiliMancanti(tutte), []);
  assert.deepEqual(variabiliMancanti({ ...tutte, SMTP_PASS: "  " }), ["SMTP_PASS"]);
});
