// Testi del sito, in italiano e in parole semplici. Si modificano qui: le pagine li leggono da questo file.

export interface Step {
  name: string; // etichetta del pulsante
  sub: string; // riga sotto l'etichetta
  title: string;
  text: string;
  checks: readonly string[];
  motto: string;
  faces: readonly number[]; // parti del logo che si illuminano (indici in GEM_FACES)
}

export interface Why { title: string; text: string }
export interface Level { tag: string; title: string; text: string; example: string }
export interface WayStep { title: string; text: string }
export interface NavItem { label: string; href: string }

export const STEPS: readonly Step[] = [
  {
    "name": "Il nome",
    "sub": "Il tuo indirizzo",
    "title": "Il nome del tuo sito",
    "text": "Il tuo indirizzo web, per esempio malten.example, si chiama dominio. Si registra per un periodo e va rinnovato: se scade, sito ed email smettono di funzionare.",
    "checks": [
      "Lo registriamo o lo trasferiamo da un altro fornitore",
      "Rinnovo automatico e avviso prima della scadenza",
      "Le email con il tuo nome arrivano a destinazione e non finiscono nello spam"
    ],
    "motto": "Il nome non scade: ci pensiamo noi.",
    "faces": [
      0,
      1
    ]
  },
  {
    "name": "Il sito",
    "sub": "Pagine e contatti",
    "title": "Il sito della tua attività",
    "text": "Pagine chiare con servizi, orari, contatti e mappa, che si leggono bene su telefono, tablet e computer.",
    "checks": [
      "Testi e foto della tua attività, raccontati con le tue parole",
      "Modulo di contatto e mappa per farti trovare e scrivere",
      "Perfetto su ogni schermo, dallo smartphone al computer"
    ],
    "motto": "Tu racconti, noi costruiamo.",
    "faces": [
      2,
      3
    ]
  },
  {
    "name": "Sempre online",
    "sub": "Il server",
    "title": "Il sito è sempre acceso",
    "text": "Il sito sta su un computer sempre acceso, chiamato server (hosting). Quando un visitatore arriva, riceve la pagina che cerca.",
    "checks": [
      "Server veloce e aggiornato",
      "Copie di sicurezza (backup) e prova di ripristino",
      "Controllo continuo, modifiche ai testi e aggiornamenti quando servono"
    ],
    "motto": "Se qualcosa non va, ci pensiamo noi.",
    "faces": [
      4,
      9
    ]
  },
  {
    "name": "Sicurezza",
    "sub": "Lucchetto e rinnovi",
    "title": "Il lucchetto di sicurezza",
    "text": "Il certificato SSL/TLS è un documento digitale che prova che il sito è davvero il tuo e protegge i dati di chi lo visita: per questo compare il lucchetto e l'indirizzo comincia con https. Ha una scadenza, e le scadenze si accorciano: oggi al massimo 200 giorni, 100 da marzo 2027 e 47 da marzo 2029. Rinnovarlo a mano non è più realistico.",
    "checks": [
      "Certificato giusto, installato senza errori nel browser",
      "Rinnovo automatico: si aggiorna da solo prima della scadenza",
      "Chi apre l'indirizzo senza lucchetto viene portato alla versione sicura"
    ],
    "motto": "Il rinnovo? Ci pensiamo noi.",
    "faces": [
      5,
      6
    ]
  },
  {
    "name": "Su Google",
    "sub": "Ti trovano",
    "title": "Chi ti cerca ti trova",
    "text": "Prepariamo il sito perché i motori di ricerca lo leggano e lo mostrino a chi cerca la tua attività.",
    "checks": [
      "Titoli e descrizioni scritti per le ricerche",
      "Pagine che si aprono in fretta anche da telefono",
      "Indirizzo ufficiale unico, senza doppioni"
    ],
    "motto": "Tu fai il tuo mestiere, a Google pensiamo noi.",
    "faces": [
      7,
      8
    ]
  }
];

export const WHO: readonly string[] = [
  "Ristoranti e locali",
  "Studi medici",
  "Artigiani",
  "Negozi e attività locali"
];

export const WHY: readonly Why[] = [
  {
    "title": "Chi ti cerca ti trova",
    "text": "Con orari, indirizzo e mappa a portata di telefono: i clienti non devono chiamare per sapere se sei aperto."
  },
  {
    "title": "Ti presenti come vuoi tu",
    "text": "Racconti la tua attività con le tue parole e le tue foto: dà fiducia a chi non ti conosce ancora."
  },
  {
    "title": "Sei presente a ogni ora",
    "text": "Anche di notte e nei giorni di chiusura il sito informa, e tu rispondi quando puoi."
  },
  {
    "title": "Non dipendi da altri",
    "text": "Social e portali possono cambiare regole o chiudere la tua pagina. Il sito è tuo e resta tuo."
  }
];

export const LEVELS: readonly Level[] = [
  {
    "tag": "Livello 1 · Informare",
    "title": "Il sito che presenta la tua attività",
    "text": "Chi sei, cosa fai, dove sei e come contattarti. È il punto di partenza di ogni attività.",
    "example": "Per esempio: orari, menu o servizi, mappa, foto."
  },
  {
    "tag": "Livello 2 · Interagire",
    "title": "Il sito con cui i clienti ti scrivono",
    "text": "I clienti non si limitano a leggere: ti contattano, chiedono, prenotano. Meno telefonate e meno messaggi sparsi.",
    "example": "Per esempio: richieste di contatto, preventivi, prenotazioni di visite o tavoli."
  },
  {
    "tag": "Livello 3 · Lavorare per te",
    "title": "Il sito che fa il lavoro ripetitivo",
    "text": "Il sito si collega a ciò che usi ogni giorno e svolge da solo i passaggi che oggi fai a mano. È la parte informatica vera e propria.",
    "example": "Per esempio: gestione di prenotazioni e ordini, email automatiche, collegamento con i tuoi strumenti."
  }
];

export const WAY: readonly WayStep[] = [
  {
    "title": "Ci racconti la tua attività",
    "text": "Ci scrivi e ci spieghi di cosa hai bisogno."
  },
  {
    "title": "Ti proponiamo cosa fare",
    "text": "Ti diciamo cosa serve davvero, con parole semplici."
  },
  {
    "title": "Ci pensiamo noi",
    "text": "Realizziamo il sito e, se vuoi, lo seguiamo anche dopo la pubblicazione."
  }
];

export const NAV_ITEMS: readonly NavItem[] = [
  {
    "label": "Perché un sito",
    "href": "/#perche"
  },
  {
    "label": "A cosa serve",
    "href": "/#utilita"
  },
  {
    "label": "Cosa facciamo",
    "href": "/#servizi"
  },
  {
    "label": "Come lavoriamo",
    "href": "/#come-lavoriamo"
  }
];

export const FOOT = {
  tag: "Siti web per piccole e medie imprese.",
  motto: "Qui ci pensiamo noi.",
  contact: "Basta un modulo: nome, email e due righe sulla tua attività.",
} as const;

// Informativa privacy (testo unico con il sito statico: si modifica in build/gen2.py, dizionario PRIVACY). La finestra è in components/PrivacyDialog.tsx.
export const PRIVACY = {
  "title": "Informativa privacy",
  "lead": "Qui spieghiamo, in parole semplici, cosa succede ai dati che ci scrivi nel modulo di contatto.",
  "updated": "Ultimo aggiornamento: novembre 2026.",
  "close": "Chiudi l'informativa privacy",
  "formNote": "Usiamo nome, email e messaggio solo per risponderti.",
  "linkLabel": "Leggi l'informativa privacy",
  "footLabel": "Informativa privacy",
  "titolare": {
    "title": "Chi è il titolare",
    "intro": "Il titolare del trattamento, cioè chi decide come usare i tuoi dati, è MALTEN."
  },
  "dati": {
    "title": "Quali dati raccogliamo",
    "items": [
      "il tuo nome e cognome",
      "il tuo indirizzo email",
      "il messaggio che scrivi"
    ],
    "outro": "Il sito non chiede altro."
  },
  "perche": {
    "title": "Perché li usiamo",
    "paragraphs": [
      "Li usiamo per leggere la tua richiesta, risponderti e mandarti un'email automatica che conferma che l'abbiamo ricevuta. La base giuridica è la tua stessa richiesta: ci scrivi per essere contattato (articolo 6, paragrafo 1, lettera b, del GDPR).",
      "Non li usiamo per newsletter o pubblicità e non prendiamo decisioni automatiche su di te. Se un giorno volessimo usarli per altro, ti chiederemmo prima il permesso.",
      "Dare i dati è una tua scelta, ma senza nome ed email non possiamo risponderti."
    ]
  },
  "chi": {
    "title": "Chi li riceve",
    "paragraphs": [
      "Li leggono le persone di MALTEN che gestiscono le richieste. Per far funzionare il servizio ci appoggiamo a fornitori che trattano i dati solo per nostro conto: chi ospita il sito e chi gestisce la posta elettronica. Chi ospita il sito può registrare dati tecnici di collegamento, come l'indirizzo IP, per far funzionare e proteggere il servizio.",
      "Non vendiamo i dati e non li cediamo ad altri. Alcuni fornitori possono avere server fuori dall'Unione europea: in quel caso i dati escono dall'Unione solo con le garanzie previste dalla legge."
    ]
  },
  "conservazione": {
    "title": "Per quanto tempo li teniamo",
    "base": "Teniamo i tuoi dati per il tempo necessario a rispondere alla tua richiesta e a gestire gli eventuali contatti successivi."
  },
  "diritti": {
    "title": "I tuoi diritti",
    "intro": "Nei casi previsti dalla legge puoi chiederci di:",
    "items": [
      "sapere se trattiamo i tuoi dati e averne una copia",
      "correggerli se sono sbagliati",
      "cancellarli",
      "limitarne l'uso o opporti al trattamento"
    ],
    "contactBase": "Per esercitare i tuoi diritti scrivici",
    "contactEmail": "a",
    "contactForm": "dal modulo della pagina",
    "contactFormLink": "Contatti",
    "reclamo": "Se pensi che i tuoi dati non siano trattati correttamente puoi presentare reclamo al Garante per la protezione dei dati personali:",
    "garanteLabel": "garanteprivacy.it",
    "garanteHref": "https://www.garanteprivacy.it"
  },
  "cookie": {
    "title": "Cookie",
    "paragraphs": [
      "Questo sito non usa cookie e non usa strumenti per analizzare le visite né servizi di altri (per esempio mappe, video o caratteri scaricati da internet). Per questo non ti mostriamo nessun avviso sui cookie. Se in futuro ne aggiungeremo, lo scriveremo qui e ti chiederemo il consenso quando serve."
    ]
  }
} as const;

export function conservazioneLimite(mesi: number): string {
  return `In ogni caso non oltre ${mesi} mesi dall'ultimo contatto, salvo obblighi di legge.`;
}
