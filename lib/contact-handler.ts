// Gestione della richiesta del modulo contatti, scritta con le API web standard (Request/Response):
// non dipende da Next, quindi si prova con `npm test` senza avviare nulla.
import { buildMail, clean, validate, type Mail } from "./contact.ts";

const MAX_BODY = 10 * 1024; // byte
const RATE = { max: 5, windowMs: 60 * 60 * 1000 }; // 5 richieste per indirizzo all'ora

export interface LogEntry {
  evento: string;
  codice: number;
  causa?: string;
}

export interface Deps {
  sendMail: (mail: Mail) => Promise<void>;
  to: string;
  from: string;
  now?: () => number;
  log?: (entry: LogEntry) => void; // mai dati personali
}

class TroppoGrande extends Error {}

// Legge il corpo fermandosi appena supera il limite, senza caricarlo tutto in memoria.
async function readBody(request: Request, max: number): Promise<string> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > max) throw new TroppoGrande();
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel().catch(() => {});
      throw new TroppoGrande();
    }
    chunks.push(value);
  }
  const all = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    all.set(c, offset);
    offset += c.byteLength;
  }
  return new TextDecoder().decode(all);
}

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const pagina = (titolo: string, testo: string): string => `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(titolo)} | ELPIS</title></head>
<body><h1>${escapeHtml(titolo)}</h1><p>${escapeHtml(testo)}</p><p><a href="/contatti">Torna ai contatti</a> · <a href="/">Pagina iniziale</a></p></body></html>
`;

export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  const first = xff?.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip")?.trim() || "sconosciuto";
}

export function createContactHandler(deps: Deps): (request: Request) => Promise<Response> {
  const now = deps.now ?? (() => Date.now());
  const log = deps.log ?? (() => {});
  const hits = new Map<string, number[]>(); // indirizzo -> orari delle richieste recenti

  function limited(ip: string): boolean {
    const t = now();
    const recent = (hits.get(ip) ?? []).filter((x) => t - x < RATE.windowMs);
    recent.push(t);
    hits.set(ip, recent);
    if (hits.size > 5000) for (const [k, arr] of hits) if (!arr.some((x) => t - x < RATE.windowMs)) hits.delete(k);
    return recent.length > RATE.max;
  }

  const headers = (type: string, extra: Record<string, string> = {}): Record<string, string> => ({
    "Content-Type": type,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    ...extra,
  });

  return async function handle(request: Request): Promise<Response> {
    const json = (status: number, body: unknown, extra?: Record<string, string>) =>
      new Response(JSON.stringify(body), { status, headers: headers("application/json; charset=utf-8", extra) });

    if (request.method !== "POST") return json(405, { ok: false, error: "Metodo non consentito." }, { Allow: "POST" });

    const ctype = (request.headers.get("content-type") ?? "").split(";")[0]!.trim().toLowerCase();
    const isJson = ctype === "application/json";
    const isForm = ctype === "application/x-www-form-urlencoded";
    const wantsJson = isJson || (request.headers.get("accept") ?? "").includes("application/json");
    const reply = (status: number, ok: boolean, error = ""): Response => {
      if (wantsJson) return json(status, ok ? { ok: true } : { ok: false, error });
      return new Response(
        ok ? pagina("Richiesta inviata", "Grazie, ti contatteremo noi.") : pagina("Richiesta non inviata", error),
        { status, headers: headers("text/html; charset=utf-8") },
      );
    };
    if (!isJson && !isForm) return reply(415, false, "Formato della richiesta non supportato.");

    const ip = clientIp(request);
    if (limited(ip)) {
      log({ evento: "limite", codice: 429 });
      return reply(429, false, "Troppe richieste. Riprova tra un po'.");
    }

    let data: Record<string, unknown>;
    try {
      const raw = await readBody(request, MAX_BODY);
      const parsed: unknown = isJson ? JSON.parse(raw) : Object.fromEntries(new URLSearchParams(raw));
      if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("forma");
      data = parsed as Record<string, unknown>;
    } catch (err) {
      if (err instanceof TroppoGrande) return reply(413, false, "Messaggio troppo lungo.");
      return reply(400, false, "Richiesta non valida.");
    }

    // Campo trappola per i programmi automatici: le persone non lo vedono e non lo compilano.
    if (clean(data.sito)) {
      log({ evento: "trappola", codice: 200 });
      return reply(200, true);
    }

    const check = validate(data);
    if (!check.ok) {
      log({ evento: "non_valida", codice: 400 });
      return reply(400, false, "Controlla i campi: nome, cognome, email e messaggio sono obbligatori.");
    }

    try {
      await deps.sendMail(buildMail({ value: check.value, to: deps.to, from: deps.from, receivedAt: new Date(now()).toISOString() }));
    } catch (err) {
      const e = err as { code?: unknown; name?: unknown } | null;
      log({ evento: "errore_invio", codice: 502, causa: String(e?.code ?? e?.name ?? "errore") });
      return reply(502, false, "Non siamo riusciti a inviare la richiesta. Riprova tra poco.");
    }
    log({ evento: "inviata", codice: 200 });
    return reply(200, true);
  };
}
