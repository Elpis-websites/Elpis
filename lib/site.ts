// Dati del sito usati da metadati, mappa del sito e dati strutturati.

// TODO-CLIENTE: dominio reale. Si imposta con la variabile SITE_URL (su Vercel: Environment Variables), senza toccare il codice.
// Finché manca si usa il segnaposto e il sito chiede ai motori di ricerca di non indicizzarlo.
export const PLACEHOLDER_URL = "https://malten.example";
export const SITE_URL: string = (process.env.SITE_URL ?? "").trim().replace(/\/+$/, "") || PLACEHOLDER_URL;
export const SITE_IS_PLACEHOLDER: boolean = SITE_URL === PLACEHOLDER_URL;

export const SITE_NAME = "MALTEN";

export const HOME = {
  title: "MALTEN | Siti web per piccole e medie imprese",
  description:
    "MALTEN realizza e cura il sito di ristoranti, studi medici, artigiani e piccole e medie imprese: ti trovano su Google, ti scrivono e prenotano online, tu pensi al tuo lavoro.",
} as const;

export const CONTATTI = {
  title: "Contattaci | MALTEN",
  description: "Scrivi a MALTEN: racconta la tua attività e ti rispondiamo noi.",
} as const;
