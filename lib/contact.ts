// Controllo dei dati del modulo contatti. Funzioni pure, senza dipendenze: si provano con `npm test`.

export const LIMITS = { nome: 60, cognome: 60, email: 120, messaggio: 2000, messaggioMin: 10 } as const;

export type Campo = "nome" | "cognome" | "email" | "messaggio";

export interface Richiesta {
  nome: string;
  cognome: string;
  email: string;
  messaggio: string;
}

export type Esito = { ok: true; value: Richiesta } | { ok: false; campi: Campo[] };

export interface Mail {
  from: string;
  to: string;
  replyTo: { name: string; address: string };
  subject: string;
  text: string;
}

// Toglie i caratteri di controllo (compresi gli a capo): impedisce di aggiungere intestazioni alla mail.
export const clean = (s: unknown): string => String(s ?? "").replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

const EMAIL = /^[^\s@<>()",;:\\]+@[^\s@<>()",;:\\]+\.[^\s@<>()",;:\\]{2,}$/;

export function validate(input: unknown): Esito {
  const src = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const v: Richiesta = {
    nome: clean(src.nome),
    cognome: clean(src.cognome),
    email: clean(src.email),
    // nel messaggio si conservano gli a capo
    messaggio: String(src.messaggio ?? "")
      .replace(/\r\n?/g, "\n")
      .replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, " ")
      .trim(),
  };
  const campi: Campo[] = [];
  if (!v.nome || v.nome.length > LIMITS.nome) campi.push("nome");
  if (!v.cognome || v.cognome.length > LIMITS.cognome) campi.push("cognome");
  if (!EMAIL.test(v.email) || v.email.length > LIMITS.email) campi.push("email");
  if (v.messaggio.length < LIMITS.messaggioMin || v.messaggio.length > LIMITS.messaggio) campi.push("messaggio");
  return campi.length ? { ok: false, campi } : { ok: true, value: v };
}

export function buildMail(p: { value: Richiesta; to: string; from: string; receivedAt: string }): Mail {
  const { value, to, from, receivedAt } = p;
  return {
    from,
    to,
    replyTo: { name: `${value.nome} ${value.cognome}`.replace(/["<>]/g, ""), address: value.email },
    subject: `Nuova richiesta dal sito ELPIS: ${value.nome} ${value.cognome}`,
    text: `Nome: ${value.nome}\nCognome: ${value.cognome}\nEmail: ${value.email}\nRicevuta: ${receivedAt}\n\nMessaggio:\n${value.messaggio}\n`,
  };
}
