// Collega il modulo contatti al server di posta (SMTP) usando le variabili d'ambiente.
// Solo lato server. Il collegamento si crea al primo invio e si riusa finché l'istanza resta attiva.
import { createContactHandler, type LogEntry } from "./contact-handler.ts";
import type { Mail } from "./contact.ts";

const NECESSARIE = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_FROM", "CONTACT_TO"] as const;

export function variabiliMancanti(env: Record<string, string | undefined>): string[] {
  return NECESSARIE.filter((k) => !env[k]?.trim());
}

const log = (o: LogEntry): void => console.log(JSON.stringify({ t: new Date().toISOString(), ...o })); // mai dati personali

let handler: ((request: Request) => Promise<Response>) | undefined;

export function contactHandler(): (request: Request) => Promise<Response> {
  if (handler) return handler;
  const env = process.env;
  const mancanti = variabiliMancanti(env);
  let sendMail: (mail: Mail) => Promise<void>;
  if (mancanti.length) {
    // Il sito resta in piedi: chi scrive riceve un errore generico e nei log compaiono i nomi (non i valori) delle variabili mancanti.
    sendMail = () => {
      log({ evento: "configurazione_mancante", codice: 502, causa: mancanti.join(",") });
      return Promise.reject(Object.assign(new Error("configurazione"), { code: "CONFIG" }));
    };
  } else {
    let transporter: Promise<{ sendMail: (m: Mail) => Promise<unknown> }> | undefined;
    sendMail = async (mail) => {
      transporter ??= import("nodemailer").then(({ default: nodemailer }) => {
        const port = Number(env.SMTP_PORT);
        return nodemailer.createTransport({
          host: env.SMTP_HOST!,
          port,
          secure: env.SMTP_SECURE ? env.SMTP_SECURE === "true" : port === 465,
          auth: { user: env.SMTP_USER!, pass: env.SMTP_PASS! },
        });
      });
      await (await transporter).sendMail(mail);
    };
  }
  handler = createContactHandler({ sendMail, to: env.CONTACT_TO ?? "", from: env.MAIL_FROM ?? "", log });
  return handler;
}
