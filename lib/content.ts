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
    "text": "Il tuo indirizzo web, per esempio elpis.example, si chiama dominio. Si registra per un periodo e va rinnovato: se scade, sito ed email smettono di funzionare.",
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
    "title": "Qui ci pensiamo noi",
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
