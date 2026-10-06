// Descrizione minima delle parti di nodemailer che usiamo (evita una dipendenza in più solo per i tipi).
declare module "nodemailer" {
  export interface MailOptions {
    from: string;
    to: string;
    replyTo?: { name: string; address: string };
    subject: string;
    text: string;
  }
  export interface TransportOptions {
    host: string;
    port: number;
    secure: boolean;
    auth: { user: string; pass: string };
  }
  export interface Transporter {
    sendMail(mail: MailOptions): Promise<unknown>;
  }
  export function createTransport(options: TransportOptions): Transporter;
  const nodemailer: { createTransport: typeof createTransport };
  export default nodemailer;
}
