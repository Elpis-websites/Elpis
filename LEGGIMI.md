# ELPIS: sito (Next.js per Vercel)

Sito di ELPIS in due pagine (home e contatti) con modulo che invia una email. È la versione Next.js del sito statico (`Elpis.html` e `contatti.html`): stessi testi, stessa grafica, stesso comportamento.

Tutto vive in questo repository: codice, testi, stile, regole per l'AI (`CLAUDE.md`) e istruzioni (questo file). Nessuno deve scaricare o caricare file a mano: si modifica su GitHub (o in Codespaces), Vercel pubblica da solo.

## Cosa contiene

| Percorso | A cosa serve |
| --- | --- |
| `lib/content.ts` | **Tutti i testi** del sito (motivi, livelli, cinque argomenti, passi, footer). Per cambiare una frase si modifica solo questo file. |
| `lib/site.ts` | Titoli e descrizioni per i motori di ricerca, indirizzo del sito (`SITE_URL`). |
| `app/globals.css` | Colori (variabili in `:root`, anche per la modalità scura) e stile di tutta la pagina. |
| `app/page.tsx`, `app/contatti/page.tsx` | Le due pagine. `app/not-found.tsx` è la pagina 404. |
| `components/` | Intestazione, footer, schede con il logo che si illumina, modulo contatti. |
| `lib/contact.ts`, `lib/contact-handler.ts` | Controllo dei dati del modulo, limite di richieste, creazione dell'email. Non dipendono da Next. |
| `lib/mailer.ts`, `app/api/contatti/route.ts` | Invio con nodemailer e collegamento all'indirizzo `/api/contatti`. |
| `lib/brand.ts` | Disegno del logo. Non si modifica a mano. |
| `next.config.ts` | Intestazioni di sicurezza. |
| `docs/ELPIS-MANUALE.md` | Manuale completo: testi e scelte, aspetti legali e fiscali per voi quattro, versione statica con Caddy e Docker, controlli fatti e non fatti (sezione 10: questa versione). |
| `scripts/controllo-todo.mjs` | Elenca i punti ancora da completare (`TODO-CLIENTE`). |

## Provare sul proprio computer (o in Codespaces)

Serve Node.js 22.

```bash
npm install
cp .env.example .env.local   # poi compilare i valori SMTP (vedi sotto)
npm run dev                  # http://localhost:3000
```

Controlli prima di ogni pull request:

```bash
npm run typecheck   # tipi TypeScript
npm test            # 14 prove su modulo, limiti e invio (non serve avviare nulla)
npm run build       # costruisce il sito come farà Vercel
```

La prima volta `npm install` crea `package-lock.json`: **va aggiunto al repository** (blocca le versioni, così Vercel e voi usate le stesse).

## Pubblicare su Vercel

1. Mettere questa cartella in un repository GitHub (se il progetto è già nel repository del team, basta indicare questa cartella come "Root Directory" al passo 3).
2. Su vercel.com: **Add New… → Project**, scegliere il repository (la prima volta Vercel chiede di collegare GitHub).
3. Vercel riconosce Next.js da solo: lasciare comando di build e cartella di output come proposti.
4. Prima di premere **Deploy**, inserire le variabili d'ambiente (sotto) in **Environment Variables**.
5. **Deploy.** Da quel momento ogni modifica a `main` va in produzione e ogni branch o pull request ottiene un indirizzo di anteprima.
6. Dominio: in **Settings → Domains** aggiungere il dominio e creare i record DNS che Vercel indica. Poi impostare `SITE_URL` e fare un nuovo deploy.

### Variabili d'ambiente

Si impostano su Vercel (**Settings → Environment Variables**), mai nel repository. Dopo ogni modifica serve un nuovo deploy perché abbiano effetto. Il file `.env.example` elenca solo i nomi.

| Variabile | Significato |
| --- | --- |
| `SITE_URL` | Indirizzo reale del sito, senza barra finale (es. `https://www.esempio.it`). Finché manca, il sito usa `https://elpis.example` e si dichiara non indicizzabile (`noindex` e `robots.txt` che blocca tutto): è voluto, evita che un'anteprima finisca su Google con l'indirizzo sbagliato. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Accesso al server di posta da cui parte l'email. |
| `SMTP_SECURE` | `true` solo per la porta 465; se manca si decide dalla porta. |
| `MAIL_FROM` | Mittente dell'email. Deve essere un indirizzo che il server di posta permette di usare, altrimenti l'email viene rifiutata o finisce nello spam. |
| `CONTACT_TO` | Chi riceve le richieste. **Indirizzo ancora da decidere.** |

Se una variabile manca, il sito funziona ma il modulo risponde "Non siamo riusciti a inviare la richiesta" e nei log di Vercel compare l'elenco dei nomi mancanti (mai i valori).

## Differenze rispetto alla versione statica

- Indirizzi: `/` e `/contatti` al posto di `Elpis.html` e `contatti.html`.
- Non servono Caddy, Docker Compose, il server Node separato né il workflow di GitHub Actions con approvazione: Vercel costruisce e pubblica. La sezione "Messa online" del manuale (Caddy e Docker) vale solo per la versione statica.
- **L'approvazione prima della produzione** con Vercel non esiste più come passaggio a parte: ciò che entra in `main` va online. Per mantenere il controllo, in GitHub (**Settings → Branches**) proteggere `main` e richiedere una pull request approvata da un altro membro del team.
- Il limite di 5 richieste all'ora per indirizzo è tenuto in memoria. Su Vercel il codice gira in istanze separate che si spengono e si riaccendono, quindi il limite è **indicativo**, non rigoroso. Per un limite vero usare la protezione "rate limiting" di Vercel (Firewall); **da verificare** se è disponibile nel piano scelto.
- La politica di sicurezza dei contenuti (CSP) è parziale: la versione statica ne aveva una completa con firme (hash) degli script, qui non è praticabile perché Next inserisce script propri. Restano le altre intestazioni (`next.config.ts`).
- Il carattere è quello di sistema (nessun file da scaricare). Per usarne uno proprio si usa `next/font`.

## Prima della pubblicazione

```bash
npm run prepubblicazione
```

Elenca ogni punto marcato `TODO-CLIENTE` e termina con errore finché ne resta uno. Oggi sono: dominio reale (`SITE_URL`), destinatario delle richieste (`CONTACT_TO`), ragione sociale, partita IVA e sede nel footer, link all'informativa privacy accanto al modulo. Cosa serve sul piano legale e fiscale è nel manuale (sezione 8).

## Cose da sapere

- **Vercel e uso commerciale.** Per quanto ricordo, il piano gratuito (Hobby) è riservato a uso personale e non commerciale; un sito aziendale richiede un piano a pagamento. **Da verificare** sulle condizioni e sui prezzi attuali di Vercel prima di pubblicare.
- **Cosa è stato provato e cosa no.** Le prove (14 sulla logica del modulo, controllo dei tipi sulla logica e sull'API, e una prova nel browser che ha reso le pagine con React e controllato schede, numeri sul logo, menu, modulo, versione senza JavaScript e 404) sono state fatte **senza Next installato**. Non sono mai stati eseguiti `npm install`, `npm run build`, il controllo dei tipi sui componenti con i tipi reali di React e di Next, il deploy su Vercel e l'invio reale di un'email. Il primo `npm run typecheck` e `npm run build` potrebbero quindi segnalare piccoli errori da correggere; la logica del modulo è invece già coperta dai test.
- Le versioni in `package.json` (Next 15.5, React 19, nodemailer 7) sono state scritte a memoria e non controllate sul registro dei pacchetti.
