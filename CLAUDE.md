# Regole per l'AI: sito ELPIS (Next.js)

Letto a ogni sessione. Sono istruzioni, non suggerimenti: se una regola ti impedisce di fare ciò che ti è stato chiesto, fermati e spiega quale regola è in conflitto. Per le regole generali del team valgono anche quelle del `CLAUDE.md` condiviso; quando c'è conflitto con questo file, vale questo (stack diverso: vedi sotto).

## Principio guida: tutto vive nel repository

- Il repository GitHub è l'unica fonte di verità. Nessuno scarica, carica o sincronizza file a mano. Non lavorare su copie allegate: leggi i file dal repository.
- Parti da `main` aggiornato; ogni modifica passa da un branch e da una pull request. Commit piccoli e frequenti.
- Documentazione in Markdown nel repository, aggiornata nello stesso commit del cambiamento. I segreti non stanno mai nel repository: solo i nomi in `.env.example`, i valori su Vercel.

## Progetto

Sito vetrina per piccole e medie imprese (ristoranti, studi medici, artigiani): due pagine, modulo contatti che invia una email. Chi legge non è un tecnico: testi in parole semplici, senza gergo.

- **Stack:** Next.js (App Router) + React + TypeScript strict, pubblicato su Vercel. Il team usa di norma React + Vite + Express + Docker + Caddy: qui la scelta è diversa perché il sito non ha database né area riservata. Se servono database o login, fermati e chiedi.
- **Lingua:** testi, documentazione e messaggi in italiano; nomi di variabili, funzioni e file in inglese (i file di questo progetto hanno alcuni nomi italiani già esistenti: non rinominarli senza motivo).
- **Nuova libreria:** serve una motivazione scritta nella pull request. Oggi le dipendenze sono solo next, react, react-dom, nodemailer.
- **Verifica prima di dichiarare:** non scrivere «fatto» o «testato» senza aver eseguito `npm run typecheck`, `npm test` e `npm run build` e visto l'esito. **Non inventare** versioni, API o comandi: leggi la documentazione ufficiale.

## Dove si modifica cosa

| Cosa | Dove |
| --- | --- |
| Frasi del sito | `lib/content.ts` (non scrivere testi dentro i componenti) |
| Titoli per i motori di ricerca | `lib/site.ts` |
| Colori e stile | `app/globals.css` (colori solo come variabili in `:root`) |
| Regole del modulo contatti | `lib/contact.ts` e `lib/contact-handler.ts`, con i test in `lib/contact.test.ts` |
| Sicurezza (intestazioni) | `next.config.ts` |

## Regole di codice

- Componenti server per impostazione predefinita; `"use client"` solo dove serve interattività (oggi: intestazione, schede, modulo).
- Nessuno stile inline (`style=`) e nessuno script inline: lo stile sta in `globals.css`.
- Accessibilità: elementi toccabili di almeno 44×44 px, ordine dei titoli corretto, tastiera funzionante (schede con frecce, Home, Fine), contrasto adeguato anche in modalità scura, funzionamento del modulo anche senza JavaScript.
- Mobile first: prova a 390 px di larghezza, nessuno scorrimento orizzontale.
- Il modulo: i dati dell'utente non vanno mai nei log; gli errori mostrati all'utente sono generici; ogni campo si controlla lato server (non fidarti del browser).
- Ogni punto da completare si marca `TODO-CLIENTE`; `npm run prepubblicazione` deve passare prima di pubblicare per davvero.

## Flusso

1. Leggi questo file, `LEGGIMI.md` e il codice che stai per toccare.
2. Branch dedicato, mai lavoro diretto su `main`.
3. Modifica in piccolo, con il test quando cambia la logica del modulo.
4. Esegui `npm run typecheck`, `npm test`, `npm run build`.
5. Se cambia la grafica, controlla a 390 px e a 1280 px, in chiaro e in scuro.
6. Apri una pull request che dice cosa è cambiato e cosa **non** hai potuto provare. Merge e pubblicazione li decide una persona.
