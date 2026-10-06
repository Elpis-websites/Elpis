# ELPIS: sito, modulo contatti e messa online

Data: 6 ottobre 2026 (aggiornato dopo la riscrittura commerciale della home).

**Nomi dei file:** la home si chiama `Elpis.html` (con la E maiuscola) e la pagina contatti `contatti.html`; stanno nella stessa cartella e i link tra le due usano questi nomi, quindi si possono aprire anche direttamente dal disco. Su un server Linux le maiuscole contano: nel repository il nome deve restare identico (`Elpis.html`). File: `Elpis.html` (home), `contatti.html` (pagina contatti), il piccolo servizio di invio email in `server/contatti/` e questo manuale (da salvare nel repository come `docs/ELPIS-MANUALE.md`). Esiste anche la stessa cosa come progetto Next.js per Vercel: sezione 10.

## 1. In breve

Il sito ha due pagine statiche e un piccolo servizio che invia le richieste dei clienti per email.

**Home (`Elpis.html`)**, scritta per le piccole e medie imprese, con linguaggio semplice e lo slogan «Qui ci pensiamo noi» che ritorna nei punti chiave, in questo ordine:

1. Prima schermata: slogan del marchio, una frase sul servizio e un riquadro «Per chi lavoriamo» (ristoranti, studi medici, artigiani, negozi e attività locali; piccole e medie imprese).
2. **Perché oggi ti serve un sito:** quattro motivi (ti trovano, ti presenti come vuoi tu, sei presente a ogni ora, non dipendi da social e portali).
3. **A cosa serve un sito:** tre livelli, dal sito che dà informazioni (sistema informativo) al sito che lavora per te (sistema informatico): informare, interagire, lavorare per te, ciascuno con esempi.
4. **Cosa facciamo per te:** il logo animato. Cinque argomenti (Il nome, Il sito, Sempre online, Sicurezza, Su Google): scegliendone uno si illuminano due facce del logo e compare una spiegazione semplice con tre punti e uno slogan. Su smartphone e tablet (sotto i 980 px di larghezza, o con schermo tattile) sul logo compaiono anche cinque cerchi numerati da 1 a 5: toccandoli si cambia argomento senza risalire all'elenco dei pulsanti, che resta com'era. Il logo è più grande su telefono (fino a 260 px) per rendere comodo il tocco. La scheda «Sicurezza» spiega in modo semplice il certificato SSL/TLS, il lucchetto, https e i rinnovi automatici, con le durate in calo (200 giorni oggi, 100 da marzo 2027, 47 da marzo 2029).
5. **Come lavoriamo:** tre passi.
6. Invito a scriverci.
7. **Piè di pagina** (uguale in entrambe le pagine): logo, frase che dice cosa facciamo e lo slogan «Qui ci pensiamo noi.»; la colonna «Esplora» con i link alle quattro sezioni della home; la colonna «Contatti» con una riga di spiegazione e il pulsante «Contattaci»; in fondo «© 2026 ELPIS» e «Torna su». Il commento `TODO-CLIENTE` sopra il piè di pagina ricorda i dati legali ancora da inserire (ragione sociale, partita IVA, sede, informativa privacy: sezione 8.6). Nessun dato legale è stato inventato.

**Contattaci (`contatti.html`):** nome, cognome, email, messaggio e «Invia la richiesta». Il pulsante nel menu e il titolo della pagina dicono «Contattaci». Aperta dal disco (doppio clic) la pagina si vede e si naviga, ma l'invio del modulo non funziona: richiede il servizio descritto nella sezione 2, quindi va provato sul sito pubblicato o su un server di prova.

Ripetizioni tolte in questo giro: l'elenco di attività nel testo iniziale e nella sezione «Per chi» (ora una sola volta, nel riquadro); le sei card dei servizi, che ripetevano i quattro motivi, i tre livelli e le schede (ora una sola sezione interattiva); «Ti trovano su Google», presente in tre punti (ora solo nella scheda «Su Google»); «Tu pensi al tuo lavoro» ripetuto tre volte; «sempre online/sempre aperto» in due sezioni; «ti rispondiamo noi, di persona» e «ogni progetto è diverso» sia in home sia nei contatti; il titolo «Parliamo del tuo sito» ripetuto in home e nei contatti (la pagina contatti ora si intitola «Contattaci»); lo slogan del marchio ripetuto nel piè di pagina (ora «Qui ci pensiamo noi.»).

Cosa è stato tolto rispetto alle versioni precedenti: la sezione «Prima del lancio» (checklist), il glossario, la scelta del tipo di hosting e ogni riferimento a piani o prezzi (si parla con il cliente). Il menu a tendina compare ora sotto i 900 px di larghezza, perché la barra con cinque voci non entrava tra 761 e 900 px.

Logo: su desktop (sopra i 760 px) l'altezza è 68 px, cioè 2,25 volte quella originale di 30 px (+50% e poi di nuovo +50%). L'intestazione è alta 88 px. Su telefono resta 30 px. Per cambiare la misura basta il valore `.top .logo { height: 68px; }` (e l'altezza dell'intestazione subito prima) in `<style>`; poi rieseguire `scripts/csp.py`.

Perché serve un servizio e non basta la pagina: una pagina statica non può spedire email da sola. Il modulo invia i dati allo stesso sito (`/api/contatti`); lì un servizio Node molto piccolo controlla i dati e li spedisce via SMTP.

Misure in Chromium (390 px, CPU rallentata 4 volte, da localhost):

| Misura | Home | Contatti |
| --- | --- | --- |
| Peso | 40.949 byte (11.230 con gzip) | 29.428 byte (8.556 con gzip) |
| FCP / LCP di laboratorio | circa 100-300 ms | circa 170-280 ms |
| Spostamento del layout (CLS, soglia «buona» 0,1) | 0,000 | 0,000 |
| Richieste a server di terzi | 0 | 0 |
| Scroll orizzontale a 320, 360, 390, 768, 1280, 1920 px | nessuno | nessuno |

I tempi variano molto da una prova all'altra (tre misure di fila, in un ambiente condiviso): sono solo un ordine di grandezza. Da ricontrollare con Lighthouse sul sito pubblicato. Senza JavaScript la home resta leggibile: le cinque schede compaiono una sotto l'altra (il logo animato e i pulsanti no).

**Da confermare con voi (testi scritti da me, non forniti da voi):** i livelli 2 e 3 della sezione «A cosa serve» (prenotazioni, ordini, email automatiche, collegamenti con gli strumenti del cliente) presentano come offerta ciò che un team frontend e backend può fare; vanno tenuti solo se corrispondono ai servizi che davvero vendete. Lo stesso vale per la scheda «Su Google» (ottimizzazione per i motori di ricerca), per «Se qualcosa non va, ci pensiamo noi», per il controllo continuo e le copie di sicurezza provate. Le durate dei certificati (200, 100, 47 giorni) vengono da una fonte secondaria (sezione Fonti): verificarle sul sito del CA/Browser Forum prima di lasciarle in pagina. Nei testi non ci sono numeri, statistiche o promesse di tempi.

## 2. Il modulo contatti

### 2.1 Come funziona

1. Chi compila il modulo preme «Invia la richiesta». Con JavaScript attivo i dati partono in JSON verso `/api/contatti` e la pagina mostra l'esito senza ricaricarsi. Senza JavaScript il modulo parte come invio normale e il servizio risponde con una pagina di conferma semplice.
2. Il servizio controlla i dati (nome e cognome fino a 60 caratteri, email valida fino a 120, messaggio da 10 a 2000), scarta i nuovi invii in eccesso e spedisce l'email a `CONTACT_TO`. La risposta `Reply-To` è l'email del cliente, quindi basta «Rispondi».
3. In caso di errore il cliente vede un messaggio generico; i dettagli restano nei log del server, senza dati personali.

### 2.2 Protezioni

- Campo trappola nascosto (`sito`): se compilato, la richiesta viene scartata in silenzio.
- Massimo 5 invii l'ora per indirizzo IP (letto da `X-Forwarded-For`, quindi il servizio deve stare dietro Caddy e non essere raggiungibile da fuori).
- Corpo della richiesta limitato a 10 KB; pulizia dei campi usati nell'intestazione dell'email contro le iniezioni.
- Nessun dato personale nei log; nessun servizio di terzi.
- CSP con `connect-src 'self'` e `form-action 'self'`.

### 2.3 Variabili da impostare sul server

Si scrivono in `deploy/.env` (file **non** committato, nel `.gitignore`). Nel repository va solo `deploy/.env.example` con i nomi e valori finti.

| Variabile | Significato |
| --- | --- |
| `CONTACT_TO` | **Email che riceve le richieste: ancora da decidere.** Meglio un indirizzo condiviso (es. `info@` o `contatti@` del dominio) che quello di una persona |
| `MAIL_FROM` | Mittente, per esempio `ELPIS <sito@esempio.it>`. Deve essere un indirizzo del dominio autorizzato dal provider |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Dati del provider di posta o di invio (quelli del dominio, di un provider SMTP, ecc.) |
| `SMTP_SECURE` | `true` per la porta 465; altrimenti omettere (587 con STARTTLS) |
| `PORT` | Facoltativa, 3000 |

Se manca una variabile obbligatoria il servizio non parte e lo dice nei log, così non si pubblica un modulo che non spedisce.

Per la consegna delle email (che non finiscano nello spam) il dominio deve avere SPF, DKIM e DMARC configurati presso il provider che spedisce. Non toccare i record di posta già esistenti.

### 2.4 Prima installazione del servizio

Il servizio usa un solo pacchetto, `nodemailer`. Il file `package.json` non lo elenca ancora, perché da questa sessione il registro npm non era raggiungibile. Da una macchina con rete:

```sh
cd server/contatti
npm install nodemailer
git add package.json package-lock.json && git commit -m "Aggiunge nodemailer"
```

Il `Dockerfile` usa `npm ci` e quindi richiede `package-lock.json` nel repository. Test del servizio (non richiedono nodemailer): `node --test` in `server/contatti/`.

### 2.5 Informativa privacy

La pagina dice «Usiamo nome, email e messaggio solo per risponderti», senza link. Raccogliere dati personali richiede in genere un'informativa vera (titolare, finalità, durata, diritti). Va scritta con un consulente; poi si aggiunge il link nel punto marcato `TODO-CLIENTE` in `contatti.html` e nel piè di pagina.

## 3. Cosa avevo ottimizzato nella prima versione

Questa tabella descrive il lavoro di base sulla pagina originale. Le righe su glossario, schede del percorso e checklist riguardano parti che nella versione attuale **non esistono più** (vedi sezione 1); le altre (HTML corretto, dati per i motori di ricerca, nessuna risorsa di terzi, menu su telefono, accessibilità, CSP rigido) restano valide.

| Problema nell'originale | Intervento | Effetto |
| --- | --- | --- |
| `<title>` dentro il `<body>`, nessun `lang`, involucro di anteprima (corpo a 14 px, margini di sicurezza sull'elemento radice) | Documento ricostruito: `lang="it"`, `<title>` nel `<head>`, nessun resto dell'involucro | HTML valido; lettori di schermo e traduttori riconoscono la lingua |
| Nessuna descrizione, canonical, Open Graph, icona, dati strutturati | Aggiunti descrizione, canonical, Open Graph, `theme-color` chiaro e scuro, icona SVG incorporata, JSON-LD `Organization` e `WebSite` | Anteprime e risultati di ricerca coerenti; nessuna richiesta in più per l'icona |
| Glossario, cinque passi e checklist generati dallo script | Scritti nell'HTML; lo script legge il contenuto e aggiunge solo ricerca, filtri, schede e avanzamento | Indicizzabile; senza script i contenuti restano leggibili (verificato) |
| Google Fonts: CSS esterno che blocca il disegno della pagina, due famiglie, cinque pesi, connessioni a due server di terzi | Font di sistema, nessun file da scaricare | Nessuna richiesta a terzi (le regole del repository li vietano senza approvazione) |
| Su telefono quattro link su cinque nascosti | Menu a tendina con `<details>`, più «Contatti» sempre visibile | Tutta la navigazione raggiungibile, anche senza script |
| Logo duplicato (stessi percorsi due volte) | Un solo `<symbol>` riusato in intestazione e piè di pagina | Circa 4 KB in meno |
| Schede del percorso: un solo pannello con `aria-controls` su tutte le schede | Cinque pannelli, ciascuno collegato alla sua scheda; aggiunti i tasti Home e Fine | Schema WAI-ARIA corretto per le schede |
| Intera scheda del punteggio come area `aria-live`: un lettore di schermo rileggeva tutto a ogni spunta | Un solo messaggio di stato più una barra con `role="progressbar"` | Annunci brevi e utili |
| Indicatore di focus invisibile nella sezione Contatti (stesso colore dello sfondo) | Contorno chiaro in quella sezione; anche su passo selezionato | Navigazione da tastiera visibile |
| Aree toccabili sotto i 44 px (link 36 px, filtri 37 px, «Azzera» 28 px, logo 30 px) | Tutte portate ad almeno 44 px di altezza | Regola 7 di `CLAUDE.md` |
| Bordo dei pulsanti dei passi sul fondo azzurro a contrasto 2,95:1 | Colore del bordo scurito: 3,16:1 su azzurro, 3,56:1 su sfondo chiaro | Sopra la soglia di 3:1 per i componenti |
| Blocchi di codice con scorrimento orizzontale non raggiungibile da tastiera | Il testo va a capo | Nessuno scorrimento, nessuno scroll orizzontale |
| Indirizzo email dimostrativo e nota di sviluppo visibili al pubblico | Sostituiti dal modulo contatti (sezione 2); le note sono commenti `TODO-CLIENTE` | Nessun testo di servizio in pagina |
| Attributi `style` e comportamenti in pagina | Eliminati gli attributi `style`; un solo blocco `<style>` e un solo `<script>` | Possibile un CSP rigido, senza `unsafe-inline` |
| Utilità inutilizzate: interruttore `data-theme`, `viewport-fit=cover` con margini di sicurezza | Rimossi (il tema scuro segue comunque le impostazioni del dispositivo) | Meno codice da mantenere |
| Salto al contenuto e punti di riferimento | Aggiunti «Vai al contenuto», `aria-labelledby` sulle sezioni, un solo `h1` | Navigazione da tastiera e da lettore di schermo |
| Glossario: «200 giorni dal 15 marzo 2026, poi 100 e infine 47» senza date | Scritte le date: 200 giorni dal 15 marzo 2026, 100 dal 15 marzo 2027, 47 dal 15 marzo 2029 | Informazione precisa (fonte in fondo) |

**Non toccato di proposito.** Testi (salvo la riga sulle durate dei certificati), palette, tema scuro, struttura delle sezioni e comportamento delle interazioni. Il codice non è minificato: il repository deve restare modificabile da chiunque e la compressione Gzip/Zstd del server dà già il risparmio.

**Una prova scartata.** Ho incorporato Poppins nel file (tre pesi, sottoinsieme latino, 39 KB). La misura ha dato CLS 0,19, oltre il limite di 0,1: il testo cambia carattere dopo il primo disegno e sposta il contenuto. Ho tolto i font. Se il marchio richiede Poppins, vedi la sezione 6.

## 4. Cosa ottimizzerei ancora

| Voce | Perché | Perché non l'ho fatto qui |
| --- | --- | --- |
| Dati reali di contatto in aggiunta al modulo: telefono (`tel:+39…`), sede con link a Google e Apple Maps, orari | Chi cerca un'azienda cerca un numero e un indirizzo | Non presenti nel file originale; non li invento |
| Dati legali: ragione sociale, partita IVA, informativa privacy | Di norma un sito aziendale li espone; da verificare con un consulente | Servono i dati reali |
| Immagine di anteprima 1200×630 per `og:image` e icona PNG per i vecchi browser | Anteprime nei messaggi e nei social | Richiedono file immagine oltre la sola pagina |
| Poppins ospitato sul proprio server con precaricamento e metriche del carattere di riserva | Mantiene l'identità grafica senza spostare il layout | Va misurato sul sito pubblicato (sezione 6) |
| Test con Lighthouse, axe e dispositivi reali | Confermano le misure di laboratorio | Strumenti non disponibili in questa sessione |
| Analisi del traffico rispettosa della privacy | Capire cosa funziona | Richiede approvazione (regola 10) e informativa |

## 5. Da sostituire prima di pubblicare

Ogni punto è marcato `TODO-CLIENTE` (5 nella home, 6 nei contatti). I testi commerciali vanno anche riletti dal titolare (sezione 1, «Da confermare con voi»). Gli indirizzi e gli esempi del sito sono ancora quelli segnaposto (`elpis.example` nelle pagine, `esempio.it` negli esempi di questo manuale): per ora restano così.

| Dove | Valore attuale | Cosa mettere |
| --- | --- | --- |
| `canonical`, `og:url`, JSON-LD (entrambe le pagine) | `https://elpis.example/` | Indirizzo reale della pagina, con `https://`. Il dominio comunicato è `elpis-web.it`: da inserire al momento della messa online |
| Piè di pagina (entrambe) | nessun dato legale | Ragione sociale, partita IVA, sede, link all'informativa |
| `contatti.html`, sotto il modulo | frase senza link | Link all'informativa privacy |
| JSON-LD | nessun `contactPoint` | Telefono ed email pubblici, se si vogliono mostrare |
| **Server**, non nelle pagine | `CONTACT_TO` non impostata | **Email di destinazione delle richieste (da decidere)** e dati SMTP |

Quando non resta alcun `TODO-CLIENTE`, cancellare anche il commento introduttivo nell'intestazione di ogni pagina, che contiene la parola.

Nella versione Next.js (sezione 10) l'indirizzo reale non si scrive nelle pagine: si imposta la variabile `SITE_URL` su Vercel. Gli altri punti sono marcati allo stesso modo, e `npm run prepubblicazione` li elenca.

## 6. Messa online

Questa sezione vale per la versione statica (due file HTML, Caddy, Docker). Per la versione Next.js su Vercel vedere la sezione 10: non servono né Caddy né Docker.

### 6.1 Scelta

Due pagine statiche e un servizio: Caddy in Docker su un piccolo server (VPS) serve le pagine, ottiene e rinnova da solo il certificato HTTPS, imposta le intestazioni di sicurezza e passa `/api/contatti` al servizio. Gli hosting statici da soli non bastano per il modulo, a meno di usare un servizio di invio di terzi (richiede approvazione, regola 10).

Principio del repository: il codice vive su GitHub e il server riceve le modifiche con `git pull`. Nessuno carica file a mano. L'unica cosa che non sta nel repository sono i segreti (`deploy/.env`).

```text
sito-elpis/
├─ CLAUDE.md                 regole per l'AI (dal pacchetto)
├─ Elpis.html                home
├─ contatti.html             pagina contatti
├─ server/contatti/          servizio di invio email
│  ├─ server.mjs
│  ├─ server.test.mjs
│  ├─ package.json
│  ├─ package-lock.json      da generare (2.4)
│  └─ Dockerfile
├─ deploy/
│  ├─ Caddyfile
│  ├─ docker-compose.yml
│  └─ .env.example           solo nomi; il vero .env non va nel repository
├─ scripts/
│  ├─ csp.py                 calcola il CSP dagli hash
│  └─ check-launch.sh        blocca la pubblicazione se restano segnaposto
├─ docs/ELPIS-MANUALE.md     questo manuale
└─ .github/workflows/deploy.yml
```

La cartella `build/` usata in questa sessione (generatore delle pagine, prove automatiche) non fa parte della consegna: la fonte di verità sono i due file HTML, da modificare direttamente.

### 6.2 Flusso

1. Si modifica una pagina in un branch (anche da Codespaces o da Claude Code sul web) e si apre una pull request.
2. Un controllo automatico verifica le pagine e i test del servizio (6.5).
3. Una persona approva e fa il merge su `main`.
4. Una seconda approvazione, sull'ambiente «production» di GitHub, autorizza la pubblicazione: l'AI prepara, non pubblica (regola 10).
5. Il server esegue `git pull`, ricalcola il CSP, ricostruisce il servizio e ricarica Caddy.
6. Si eseguono i controlli del punto 6.6, compreso un invio di prova del modulo.

### 6.3 Dominio, DNS e HTTPS

| Record | Nome | Valore | Note |
| --- | --- | --- | --- |
| A | `@` | IPv4 del server | Obbligatorio |
| AAAA | `@` | IPv6 del server | Solo se il server risponde davvero su IPv6 |
| CNAME | `www` | il dominio senza www | In alternativa un secondo record A |
| TXT | `@` | codice di Search Console | Solo dopo la pubblicazione |
| MX, TXT (SPF, DKIM, DMARC) | `@` | **non toccare** | La posta del dominio resta com'è; per le email del modulo vedi 2.3 |

Ordine:

1. Il giorno prima, abbassare il TTL dei record esistenti a 300 secondi.
2. Aprire le porte 80 e 443 e avviare Caddy col dominio nel `Caddyfile`; il volume dei dati di Caddy deve essere persistente.
3. Puntare A e AAAA al server. Caddy ottiene il certificato al primo accesso valido e lo rinnova da solo.
4. Un solo indirizzo canonico (qui senza www); l'altro reindirizza.
5. Verificare con `dig`, `curl` e controllando che `http://` porti su `https://`.
6. Dopo qualche giorno stabile, riportare il TTL a 3600 secondi o più.

La propagazione richiede di solito minuti, a volte fino a 48 ore. Le operazioni su dominio e server le esegue una persona.

### 6.4 Configurazione del server

`deploy/docker-compose.yml`:

```yaml
services:
  caddy:
    image: caddy:2
    restart: unless-stopped
    depends_on: [contatti]
    ports: ["80:80", "443:443", "443:443/udp"]
    volumes:
      - ../Elpis.html:/srv/elpis/Elpis.html:ro
      - ../contatti.html:/srv/elpis/contatti.html:ro
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - ./csp.caddy:/etc/caddy/csp.caddy:ro
      - caddy_data:/data
      - caddy_config:/config
  contatti:
    build: ../server/contatti
    restart: unless-stopped
    env_file: .env
    expose: ["3000"]        # visibile solo agli altri servizi, non pubblicato all'esterno
volumes:
  caddy_data:
  caddy_config:
```

`deploy/.env.example` (copiare in `deploy/.env` sul server e compilare):

```text
CONTACT_TO=
MAIL_FROM=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

`deploy/Caddyfile` (sostituire `esempio.it` con il dominio reale):

```caddyfile
www.esempio.it {
	redir https://esempio.it{uri} permanent
}

esempio.it {
	root * /srv/elpis
	encode zstd gzip

	header {
		X-Content-Type-Options "nosniff"
		Referrer-Policy "strict-origin-when-cross-origin"
		Permissions-Policy "camera=(), microphone=(), geolocation=()"
		# HSTS a gradi: partire da 300, poi 86400, poi 604800, infine 31536000
		Strict-Transport-Security "max-age=300"
		Cache-Control "no-cache"
	}
	import csp.caddy

	handle /api/contatti {
		reverse_proxy contatti:3000
	}
	@home path / /Elpis.html
	handle @home {
		rewrite * /Elpis.html
		file_server
	}
	@contatti path /contatti /contatti.html
	handle @contatti {
		rewrite * /contatti.html
		file_server
	}
	handle /robots.txt {
		respond "User-agent: *\nAllow: /\nSitemap: https://esempio.it/sitemap.xml\n" 200
	}
	handle /sitemap.xml {
		header Content-Type application/xml
		respond `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://esempio.it/</loc></url><url><loc>https://esempio.it/contatti.html</loc></url></urlset>` 200
	}
	handle {
		respond "Pagina non trovata" 404
	}
}
```

Gli indirizzi canonici nelle pagine devono corrispondere a quelli della sitemap: la pagina contatti dichiara `/contatti.html`, quindi la sitemap usa lo stesso indirizzo (`/contatti` risponde comunque). La risposta del servizio al modulo senza JavaScript e la risposta JSON passano da Caddy così come sono.

`scripts/csp.py` (identico a quello usato nei test; ora accetta più pagine e aggiunge `connect-src 'self'` e `form-action 'self'` per il modulo):

```python
#!/usr/bin/env python3
"""Uso: python3 scripts/csp.py Elpis.html contatti.html > deploy/csp.caddy"""
import sys, re, hashlib, base64
h = lambda t: "'sha256-" + base64.b64encode(hashlib.sha256(t.encode("utf8")).digest()).decode() + "'"
styles, scripts = [], []
for path in sys.argv[1:]:
    src = open(path, encoding="utf8").read()
    styles += re.findall(r"<style>(.*?)</style>", src, re.S)
    scripts += re.findall(r"<script>(.*?)</script>", src, re.S)
if not styles or not scripts: sys.exit("nessun blocco <style> o <script> trovato")
uniq = lambda xs: " ".join(dict.fromkeys(map(h, xs)))
policy = ("default-src 'none'; script-src %s; style-src %s; img-src data:; connect-src 'self'; form-action 'self'; "
          "base-uri 'none'; frame-ancestors 'none'; upgrade-insecure-requests") % (uniq(scripts), uniq(styles))
print('header Content-Security-Policy "%s"' % policy)
```

Il CSP usa gli hash di `<style>` e `<script>`: cambiando anche una virgola in uno dei blocchi l'hash cambia e il browser lo blocca. Lo script va rieseguito a ogni modifica (il flusso lo fa a ogni pubblicazione). Il blocco `application/ld+json` non è eseguibile e non ne ha bisogno.

`scripts/check-launch.sh`:

```sh
#!/bin/sh
if grep -n "TODO-CLIENTE" Elpis.html contatti.html; then
  echo "Ci sono segnaposto da sostituire: pubblicazione bloccata." >&2
  exit 1
fi
```

`.github/workflows/deploy.yml`:

```yaml
name: Pubblica
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production        # richiede l'approvazione di una persona
    steps:
      - uses: actions/checkout@v4
      - run: sh scripts/check-launch.sh
      - run: python3 scripts/csp.py Elpis.html contatti.html
      - run: cd server/contatti && npm ci && node --test
      - name: Aggiorna il server
        run: |
          install -m 600 /dev/null key
          printf '%s\n' "${{ secrets.SSH_KEY }}" > key
          ssh -i key -o StrictHostKeyChecking=accept-new ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} \
            'cd /srv/sito-elpis && git pull --ff-only && python3 scripts/csp.py Elpis.html contatti.html > deploy/csp.caddy && docker compose -f deploy/docker-compose.yml up -d --build && docker compose -f deploy/docker-compose.yml exec caddy caddy reload --config /etc/caddy/Caddyfile'
```

Segreti (`SSH_KEY`, `SSH_USER`, `SSH_HOST`) solo in GitHub Secrets; sul server serve una chiave di sola lettura per il `git pull`. I dati SMTP stanno solo nel `deploy/.env` del server. **Non verificati in questa sessione:** il `Caddyfile`, il file Compose, il workflow e la costruzione dell'immagine Docker sono scritti per un caso standard ma non li ho eseguiti. Il primo avvio va fatto su un server di prova.

### 6.5 Controlli prima del merge

- `sh scripts/check-launch.sh` (in fase di sviluppo segnala i segnaposto; è atteso che fallisca finché non sono sostituiti).
- `python3 scripts/csp.py Elpis.html contatti.html` termina senza errori.
- `cd server/contatti && node --test`: 10 test.
- Lighthouse in modalità mobile: Prestazioni, Accessibilità e SEO almeno 90 (obiettivo di `CLAUDE.md`).
- Controllo visivo a 360, 390 e 768 px, anche in tema scuro e con le interazioni di menu e modulo.
- Nessun errore in console (un CSP troppo rigido o un hash non aggiornato compare lì).

### 6.6 Controlli dopo la pubblicazione

| Controllo | Comando o strumento | Esito atteso |
| --- | --- | --- |
| Record DNS | `dig +short esempio.it A` | IP del server |
| Redirect | `curl -sI http://esempio.it` | `301` verso `https://esempio.it/` |
| Intestazioni | `curl -sI https://esempio.it` | `HTTP/2 200`, CSP, HSTS, `nosniff`, Referrer-Policy |
| Pagina contatti | `curl -sI https://esempio.it/contatti` | `200` |
| Certificato | `openssl s_client -brief -connect esempio.it:443` | TLS 1.3, `Verification: OK` |
| Versione www | `curl -sI https://www.esempio.it` | `301` verso il dominio senza www |
| 404 | `curl -sI https://esempio.it/xyz` | `404` |
| Servizio non esposto | `curl -m 5 http://IP-del-server:3000` | nessuna risposta |
| **Invio di prova** | Compilare il modulo sul sito pubblicato | Email arrivata a `CONTACT_TO`, con «Rispondi» diretto al mittente, non finita nello spam |
| Console del browser | Strumenti per sviluppatori | Nessun errore o avviso del CSP |
| Prestazioni | Lighthouse mobile e PageSpeed Insights | Punteggi come al punto 6.5 |
| Indicizzazione | Search Console: verifica con record TXT, invio della sitemap | Pagine indicizzate |

HSTS: dopo ogni gradino del `max-age` attendere qualche giorno senza problemi prima del successivo; `includeSubDomains` solo se tutti i sottodomini sono in HTTPS.

### 6.7 Manutenzione

- **Modifiche ai testi:** branch, pull request, controlli, merge, approvazione. Mai modificare file sul server.
- **Cambiare l'email di destinazione:** modificare `CONTACT_TO` in `deploy/.env` sul server e riavviare il servizio (`docker compose -f deploy/docker-compose.yml up -d contatti`). Non serve toccare il sito.
- **Tornare indietro:** `git revert` del commit e nuova pubblicazione.
- **Backup:** il repository è la copia di tutto; sul server restano solo `deploy/.env` (da conservare in un gestore di password) e il volume dei certificati di Caddy (si rigenera).
- **Richieste dei clienti:** non vengono salvate dal servizio; esistono solo nella casella `CONTACT_TO`. Se la casella o il provider smettono di funzionare, il cliente vede un errore e la richiesta non arriva: controllare periodicamente con un invio di prova.
- **Certificato:** si rinnova da solo; controllare il rinnovo. Con le durate in calo (200 giorni dal 15 marzo 2026, 100 dal 15 marzo 2027, 47 dal 15 marzo 2029) il rinnovo manuale non è praticabile.
- **Dominio:** rinnovo automatico attivo presso il registrar e promemoria di scadenza.
- **Disponibilità:** un controllo esterno che avvisi se il sito non risponde.
- **Aggiornamenti:** `docker compose pull` periodico per Caddy; aggiornare `nodemailer` e l'immagine Node con una pull request.

## 7. Font: come rimettere Poppins

La pagina usa i font di sistema perché con Poppins incorporato il CLS misurato è 0,19. Per mantenere l'identità grafica senza spostamenti:

1. Scaricare i file `Poppins-Regular`, `Medium` e `Bold` (licenza SIL OFL 1.1) e convertirli in `woff2`.
2. Metterli nella cartella `fonts/` del repository e servirli dallo stesso dominio.
3. Dichiarare `@font-face` con `font-display: optional` e precaricare i file con `<link rel="preload" as="font" type="font/woff2" crossorigin>`.
4. Aggiungere un carattere di riserva con `size-adjust`, `ascent-override`, `descent-override` e `line-gap-override` calcolati sui valori di Poppins.
5. Aggiungere `font-src 'self'` alla policy in `scripts/csp.py` e rieseguirlo.
6. Misurare il CLS sul sito pubblicato (Lighthouse e PageSpeed Insights) prima di tenerli.

Questa modifica aggiunge file al repository (non più una sola pagina) e va approvata.

## 8. Aspetti legali e fiscali: dall'inizio agli obblighi per soglia

**Avvertenza.** Non sono un commercialista né un avvocato: questa sezione è una mappa per arrivare preparati dal commercialista e dal notaio, non una consulenza. Le cifre principali le ho riscontrate su fonti pubblicate (elenco in fondo), quasi tutte secondarie: non ho potuto consultare direttamente Agenzia delle Entrate, INPS e Camere di commercio. Le regole fiscali cambiano quasi ogni anno con la legge di bilancio, quindi ogni voce va riconfermata prima di agire. Le voci scritte da conoscenza generale, senza una fonte letta in questa sessione, sono segnate «da confermare». Situazione al 6 ottobre 2026.

### 8.1 Serve la partita IVA anche se non c'è fatturato?

- **Il criterio è l'abitualità, non l'importo.** L'obbligo scatta quando si esercita un'attività in modo abituale, continuativo e organizzato, rivolta al mercato; non quando si supera una cifra di ricavi. Non avere ancora fatturato non basta, da solo, per esserne esenti: se offrite servizi ai clienti in modo regolare, serve.
- **I 5.000 euro l'anno** sono il limite delle prestazioni *occasionali*: oltre quella cifra scatta l'iscrizione alla Gestione Separata INPS, non l'obbligo di partita IVA. Un'attività che vuole acquisire clienti con continuità non può reggersi su prestazioni occasionali.
- **Finché state solo preparando** (accordo tra soci, marchio, sito, statuto) e non offrite né incassate, non c'è ancora un'attività da dichiarare. La partita IVA si apre quando l'attività comincia, entro 30 giorni dall'inizio; per ditte e autonomi l'apertura online è gratuita (modello AA9/12). Per una società la partita IVA viene attribuita con la costituzione e l'iscrizione al Registro Imprese (da confermare).
- Aprire la partita IVA non costa nulla in sé; costano i contributi, il commercialista e gli adempimenti che ne seguono (8.8).

### 8.2 In quattro: quale forma giuridica?

La scelta spetta a voi con il commercialista. Le opzioni, con i punti da pesare:

| Opzione | Cosa comporta | Da considerare |
| --- | --- | --- |
| **Quattro partite IVA individuali** che collaborano | Ognuno fattura per sé; costo vicino a zero; regime forfettario (imposta 5% per i primi 5 anni se si hanno i requisiti, poi 15%) | Nessuna entità comune: contratti, fatture, marchio e codice restano in capo ai singoli; nessuna responsabilità limitata; limite di 85.000 euro per ciascuno. Adatto a una fase di prova, meno a vendere come ELPIS |
| **Società di persone** (SNC, SAS) | Nessun capitale minimo; atto davanti al notaio | Nella SNC i soci rispondono con il patrimonio personale; niente forfettario (da confermare) |
| **SRL** | Responsabilità limitata; capitale minimo 10.000 euro; costituzione davanti al notaio, 1.500-3.000 euro più IVA (fonte secondaria) | Contabilità ordinaria; IRES 24% e IRAP 3,9%; commercialista 2.500-3.000 euro l'anno (fonte secondaria). Di norma almeno il 25% dei conferimenti in denaro va versato alla costituzione (da confermare con il notaio) |
| **SRL semplificata o a capitale ridotto** | Capitale da 1 a 9.999,99 euro, versato in denaro; statuto standard senza onorari notarili, circa 300 euro in totale (fonte secondaria) | Soci persone fisiche; niente crowdfunding né titoli di debito; per cambiare lo statuto serve trasformarla in SRL. Con capitale sotto 10.000 euro valgono obblighi più rigidi di accantonamento a riserva legale |
| **Startup innovativa** | Non è una forma ma uno **status** di società di capitali, con iscrizione a una sezione speciale del Registro Imprese per autodichiarazione | Requisiti, tutti insieme: società non quotata costituita da meno di 5 anni, valore della produzione sotto 5 milioni, nessuna distribuzione di utili, oggetto sociale ad alto valore tecnologico e almeno uno tra spese di R&S pari ad almeno il 15%, un terzo di personale altamente qualificato, brevetti o software registrato. Una web agency che vende servizi alle PMI spesso non rientra: va verificato prima. Vantaggi: esonero dal bollo per 5 anni, detrazioni per chi investe, accesso al Fondo di garanzia. Esiste una procedura di costituzione online senza notaio (fonte del 2017: verificare che sia ancora attiva) |

Punti che toccano proprio voi quattro:

- **Regime forfettario e SRL.** Chi è in forfettario e controlla una SRL con attività collegata può esserne escluso. Con quattro soci al 25% nessuno ha il controllo, ma chi ha già una partita IVA personale deve farlo verificare prima di entrare nella società.
- **Accordo tra i soci**, da scrivere *prima* di costituire: quote (uguali o no), chi amministra e con quali poteri, compensi, impegno richiesto, cosa succede se uno esce o non lavora più nel progetto (clausole di uscita e di maturazione graduale delle quote), decisioni in caso di parità 2 contro 2, divieto di concorrenza, cessione alla società di codice, grafica, marchio e dominio creati dai singoli.
- **Ruoli e INPS.** Un socio amministratore compensato di norma versa alla Gestione Separata INPS (26,07% nel 2026 per chi non ha altra previdenza, 24% con altra previdenza; fonte INPS tramite Assolombarda). Un socio che lavora nella SRL in modo abituale e prevalente può invece rientrare nella Gestione Commercianti (minimale fisso annuo di circa 4.600 euro citato da fonte secondaria): è una zona dove la classificazione dipende dai fatti, da chiarire con il commercialista prima di iniziare (da confermare).

### 8.3 I passi, dall'inizio, in ordine

1. **Accordo tra i soci** (8.2) e scelta della forma giuridica con il commercialista.
2. **Nome e marchio:** verificare che «ELPIS» non sia già registrato per servizi simili (banca dati UIBM e EUIPO) e decidere se depositare il marchio. Il dominio (`elpis-web.it`) va intestato alla società appena costituita, oppure a un socio con un documento che lo ceda alla società.
3. **Strumenti di identità digitale:** firma digitale e SPID per chi firma; PEC per la società (obbligatoria per le società).
4. **Costituzione:** atto costitutivo e statuto (dal notaio, o con la procedura online dove prevista); versamento del capitale su un conto dedicato.
5. **Iscrizione al Registro Imprese** (pratica telematica ComUnica) con il codice ATECO dell'attività. Per lo sviluppo di siti e applicazioni la fonte consultata indica 62.01.00, per la consulenza informatica 62.02.00; per l'hosting e i servizi collegati se ne valuta un altro (famiglia 63.1). La classificazione ATECO è stata aggiornata dal 2025: il commercialista indica il codice in vigore.
6. **Partita IVA** (attribuita con l'iscrizione, per le società) e **fatturazione elettronica** tramite il Sistema di Interscambio: serve un programma o un intermediario. La fattura elettronica è obbligatoria anche per chi è in forfettario.
7. **INPS e INAIL:** iscrizione dei soci che lavorano e, se ci saranno dipendenti, apertura delle posizioni (8.2, 8.5).
8. **Titolare effettivo:** comunicazione al Registro Imprese per le società di capitali, entro 30 giorni dalla costituzione e da ogni modifica, con conferma annuale e diritto di 30 euro (fonte secondaria, di data incerta). Il registro ha avuto sospensioni e modifiche per ricorsi: farsi dire dalla Camera di commercio o dal commercialista se è operativo e come.
9. **Conto corrente aziendale, contabilità e libri obbligatori** (libro giornale, libro degli inventari, verbali delle decisioni dei soci; da confermare quali libri servono per la forma scelta).
10. **Privacy (GDPR):** per i dati che raccogliete voi (modulo contatti, clienti, fornitori) siete titolari del trattamento: serve l'informativa sul sito (punto del `TODO-CLIENTE` nei contatti) e un registro dei trattamenti. Per i dati dei clienti che gestite per loro conto (sito, hosting, backup) siete di norma responsabili del trattamento: serve un contratto di nomina con ogni cliente, con misure di sicurezza, assistenza per i diritti degli interessati e consenso scritto per i fornitori che subentrano, come l'hosting (fonte: iubenda).
11. **Dati obbligatori nel sito** (8.6): sono i dati che oggi mancano nel piè di pagina.
12. **Contratti con i clienti:** preventivo e accettazione scritta, cosa è incluso, tempi, proprietà e licenze del sito e del codice, manutenzione, limiti di responsabilità, pagamenti (acconti), nomina a responsabile del trattamento. Tutti i clienti tipo sono imprese: le regole sui consumatori contano meno, ma non per i siti di vendita ai consumatori che realizzate per loro (8.5, accessibilità).
13. **Assicurazione:** per attività non ordinistiche come questa la polizza di responsabilità professionale non è obbligatoria; vale la pena valutarla, insieme a una polizza informatica (cyber).
14. **Sicurezza sul lavoro:** si applica pienamente appena avete lavoratori (dipendenti, collaboratori, tirocinanti); vedi 8.5. Anche prima, chiedete al commercialista o a un consulente come vanno trattati i soci che lavorano al videoterminale (da confermare).

### 8.4 Obblighi che tornano ogni anno (per una SRL)

Tutti da confermare con il commercialista per la vostra situazione:

- **Bilancio:** approvazione dai soci entro 120 giorni dalla chiusura dell'esercizio (180 nei casi previsti dallo statuto) e deposito al Registro Imprese entro 30 giorni dall'approvazione.
- **Diritto annuale** alla Camera di commercio.
- **Dichiarazioni:** redditi, IRAP, IVA; versamenti con modello F24 (imposte, contributi INPS dei soci).
- **Titolare effettivo:** conferma annuale (8.3, punto 8).
- **Se siete startup innovativa:** aggiornamento annuale dei dati e dei requisiti nella sezione speciale.
- **Sito e privacy:** riconfermare dati societari, informativa e contratti di nomina quando cambia qualcosa (sede, soci, fornitori).

### 8.5 Soglie: cosa cambia quando crescete

| Quando | Cosa scatta | Stato della verifica |
| --- | --- | --- |
| Qualsiasi importo, attività abituale | Partita IVA | Fonte secondaria |
| Più di 5.000 euro l'anno di prestazioni occasionali | Iscrizione alla Gestione Separata INPS (non la partita IVA) | Fonte secondaria |
| Forfettario: ricavi oltre 85.000 euro (solo ditte e autonomi) | Si può restare nell'anno; l'anno dopo si esce. Oltre 100.000 euro l'uscita è immediata e l'IVA si applica dall'operazione che supera la soglia | Fonte secondaria (2026 invariato rispetto al 2025). Il forfettario non è per le società di capitali |
| Ricavi oltre circa 500.000 euro (servizi) | Fine della contabilità semplificata e della liquidazione IVA trimestrale facoltativa nelle ditte e società di persone. Le SRL hanno già la contabilità ordinaria | Da confermare |
| SRL: 4 milioni di attivo, 4 milioni di ricavi o 20 dipendenti (basta superarne una) per due esercizi di fila | Nomina obbligatoria dell'organo di controllo o del revisore, entro 30 giorni dall'assemblea che approva il bilancio; l'obbligo cessa dopo tre esercizi sotto soglia | Fonte secondaria |
| Startup innovativa: 5 anni di vita o 5 milioni di valore della produzione | Perdita dello status e delle agevolazioni | Fonte secondaria |
| Primo dipendente | Iscrizione INPS e INAIL, buste paga e libro unico del lavoro, contratto collettivo, valutazione dei rischi, formazione e sorveglianza sanitaria (D.Lgs. 81/2008), consulente del lavoro | Da confermare; norme generali |
| 15 dipendenti | Obblighi di assunzione di persone con disabilità e altre tutele | Da confermare |
| Media di 50 dipendenti | Canale interno per le segnalazioni (whistleblowing, D.Lgs. 24/2023), salvo casi anticipati (modello 231, settori sensibili) | Da confermare sulla fonte ANAC |
| Meno di 10 persone e meno di 2 milioni di fatturato o bilancio (microimpresa) | Per i *servizi* esenzione dall'European Accessibility Act, in vigore dal 28 giugno 2025. I vostri clienti che vendono online ai consumatori devono invece rendere accessibile il sito: un motivo per offrirlo come servizio | Fonte secondaria; il sito di ELPIS informa e non vende ai consumatori |
| Beni strumentali in proprietà (fabbricati, impianti, macchinari, attrezzature) | Polizza contro i danni catastrofali, obbligatoria per le imprese con sede in Italia; scadenza per le micro e piccole imprese prorogata al 31 marzo 2026, già passata. Computer d'ufficio e veicoli sono esclusi. Senza polizza si perdono contributi e aiuti pubblici | Fonte del dicembre 2025: verificare eventuali novità |

### 8.6 Cosa deve comparire sul sito

Per una società di capitali l'articolo 2250 del Codice civile richiede, anche sul sito: ragione sociale, sede legale, ufficio del Registro Imprese e numero REA, codice fiscale e partita IVA, capitale sociale (versato e esistente), stato di liquidazione se in corso, indicazione del socio unico se c'è, PEC. Il D.Lgs. 70/2003 richiede indirizzo e recapiti, e il numero di iscrizione al Registro Imprese per chi vende online. La mancanza è sanzionata con una somma da 206 a 2.065 euro (fonte secondaria). Questi dati vanno nel piè di pagina di entrambe le pagine, al posto del segnaposto `TODO-CLIENTE`.

Il sito oggi non usa cookie né strumenti di analisi o servizi di terzi: per questo non serve un avviso sui cookie. Verificarlo ogni volta che se ne aggiunge uno. Il modulo contatti raccoglie dati personali: serve l'informativa.

### 8.7 Domande da portare al commercialista e al notaio

1. Con quattro soci e nessun fatturato, SRL, SRL semplificata o altro? Cosa cambia nei costi del primo anno?
2. Possiamo qualificarci come startup innovativa? Cosa dovremmo documentare?
3. Se qualcuno di noi ha già una partita IVA in forfettario, cosa succede entrando nella società?
4. Come ci inquadra l'INPS (Gestione Separata o Commercianti) e con quale costo minimo?
5. Compensi ai soci che lavorano: amministratore o dipendente, e con quali oneri?
6. Quale codice ATECO (versione in vigore) per sviluppo, hosting e manutenzione?
7. Cosa dobbiamo mettere per iscritto tra noi prima di costituire (quote, uscita, proprietà del codice e del marchio)?
8. Titolare effettivo, polizza catastrofale e altre comunicazioni: sono dovute per noi, e entro quando?
9. Quali libri e adempimenti ricorrenti, con quali scadenze e quanto costa la gestione?
10. Quando conviene passare dal forfettario (se lo usiamo all'inizio) alla società, per non pagare due volte l'avvio?

### 8.8 Costi indicativi

Cifre da fonti secondarie: ordini di grandezza, non preventivi.

| Voce | Ordine di grandezza |
| --- | --- |
| Notaio per una SRL | 1.500-3.000 euro più IVA |
| SRL semplificata (statuto standard) | circa 300 euro in tutto |
| Iscrizione alla Camera di commercio | 150-200 euro |
| Commercialista, contabilità ordinaria | 2.500-3.000 euro l'anno |
| Imposte della SRL | IRES 24% e IRAP 3,9% (variabile per regione) |
| Gestione Separata INPS | 26,07% (24% con altra previdenza), massimale di reddito 122.295 euro, minimale 18.808 euro (2026) |
| Gestione Commercianti | minimale fisso di circa 4.600 euro l'anno (da confermare) |
| Forfettario | imposta sostitutiva 5% (nuove attività, primi 5 anni) o 15% |

## 9. Cosa ho verificato e cosa no

**Verificato (Chromium headless, in locale, con un server di prova che calcola il CSP):**

- Home: 81 controlli automatici superati (menu su telefono con apertura, chiusura con Esc e dopo la scelta di una voce, ancore, titoli, le cinque schede con le facce del logo che si illuminano come previsto, frecce, Home e Fine, testo su certificati e rinnovi, pagina senza script, nessuna parola di prezzo o di piano, logo a 68 px su desktop e 30 px su telefono, nessuna area toccabile sotto i 44 px; cerchi numerati sul logo: 5, tutti da almeno 44 px, non sovrapposti, dentro il logo, ognuno porta all'argomento giusto e illumina le facce giuste, la pagina non scorre al tocco; nascosti su desktop con il mouse).
- Contatti: 45 controlli superati (validazione dei campi, invio con esito positivo e con errore, blocco del doppio invio, campo trappola, invio senza JavaScript, tema scuro, logo a 68 px).
- Servizio di invio: 10 test automatici superati (validazione, limite di frequenza, campo trappola, pulizia delle intestazioni, risposte JSON e HTML, nessun dato personale nei log) con un invio simulato al posto dell'SMTP.
- Nessun errore né avviso in console con il CSP rigido; nessuno scroll orizzontale da 320 a 1920 px.
- Coerenza dell'HTML: id univoci, ancore e riferimenti ARIA esistenti, un solo `h1` per pagina, nessun attributo `style`, nessuna risorsa esterna.
- Contrasti calcolati su tutte le coppie di colori in tema chiaro e scuro.

**Non verificato:**

- **Invio reale tramite un server SMTP:** il collegamento con `nodemailer` non è stato provato (pacchetto non installabile da qui e nessun server di posta disponibile). È il primo controllo da fare, con l'invio di prova del punto 6.6.
- Costruzione dell'immagine Docker, `Caddyfile`, Compose e workflow: scritti, non eseguiti.
- Lighthouse, axe e il validatore HTML del W3C (non raggiungibili da questa sessione).
- Safari, Firefox e dispositivi reali. Il menu usa `details`, `:has()` e `@media (scripting: none)`, supportati dai browser recenti.
- Consegna delle email (SPF, DKIM, DMARC) e conformità dell'informativa privacy: dipendono dal dominio e da un consulente.

## 10. Versione Next.js per Vercel

Esiste anche una versione dello stesso sito come progetto Next.js (cartella `elpis-next`, con le sue istruzioni in `LEGGIMI.md` e le regole per l'AI in `CLAUDE.md`). Ha gli stessi testi, la stessa grafica e lo stesso comportamento; cambiano il modo di costruirla e di pubblicarla.

| | Versione statica | Versione Next.js |
| --- | --- | --- |
| Indirizzi | `Elpis.html`, `contatti.html` | `/`, `/contatti` |
| Dove stanno i testi | nel generatore `build/gen2.py` (da cui nascono i due file) | `lib/content.ts` e `lib/site.ts`, da modificare a mano |
| Invio del modulo | servizio Node separato dietro Caddy | funzione `/api/contatti` dentro il progetto, su Vercel |
| Pubblicazione | VPS, Docker Compose, Caddy, GitHub Actions con approvazione | Vercel: ogni modifica a `main` va in produzione |
| Controllo prima di pubblicare | approvazione dell'ambiente di produzione su GitHub | pull request approvata (protezione del ramo `main` su GitHub) |
| CSP | completa, con firme degli script | parziale (Next inserisce script propri) |
| Limite di richieste | in memoria, un solo processo: rigoroso | in memoria, più istanze: indicativo; per un limite vero usare il Firewall di Vercel (da verificare nel piano) |

Differenze di comportamento da conoscere:

- Finché `SITE_URL` non è impostata, il sito si dichiara non indicizzabile (`noindex` e `robots.txt` che blocca tutto), così un'anteprima su un indirizzo provvisorio non finisce su Google con l'indirizzo sbagliato.
- Le schede del logo arrivano già con la prima scheda illuminata, senza aspettare lo script (nella versione statica si illumina un istante dopo il caricamento).
- Il piano gratuito di Vercel, per quanto ricordo, è riservato all'uso non commerciale: verificare le condizioni attuali prima di pubblicare un sito aziendale.

**Cosa ho verificato (senza Next installato, perché il registro dei pacchetti non è raggiungibile da questa sessione):**

- 14 test automatici sulla logica del modulo (controllo dei campi, campo trappola, pulizia delle intestazioni, limite di 5 richieste all'ora, corpo troppo grande anche in streaming, invio classico senza JavaScript, risposte e intestazioni, nessun dato personale nei log, variabili d'ambiente mancanti).
- Controllo dei tipi TypeScript in modalità strict (con `noUncheckedIndexedAccess`) su logica e funzione `/api/contatti`: nessun errore. Sui componenti è stato possibile solo un controllo approssimato (senza i tipi reali di React), che non ha mostrato errori sui nomi e sulle proprietà.
- Rendering con React delle pagine, con un sostituto del collegamento di Next: il testo è identico carattere per carattere a quello dei due file statici e la struttura HTML coincide, salvo differenze volute (prima scheda già illuminata, `tabindex`).
- 48 controlli in Chromium con idratazione di React: nessun errore né avviso in console; le cinque schede con le facce giuste, frecce, Home e Fine; i cinque numeri sul logo (visibili su telefono, nascosti su desktop, almeno 44 px); menu a tendina (apertura, chiusura con scelta, Esc, clic fuori); invio del modulo con esito positivo, con errore del server e senza rete; campo trappola; limite di richieste; invio senza JavaScript; pagina 404; nessuno scorrimento orizzontale.

**Non verificato:** `npm install`, `npm run build` e `npm run typecheck` con i tipi reali di Next e React; il deploy su Vercel; il controllo dei titoli e dei metadati prodotti da Next (`metadataBase`, `robots.ts`, `sitemap.ts`, icona); le intestazioni di `next.config.ts`; l'invio reale di un'email. Le versioni (Next 15.5, React 19, nodemailer 7) sono scritte a memoria. Il primo `npm run build` sul computer di uno di voi è il controllo che manca.

## Fonti

Pagine aperte e lette il 3 ottobre 2026 (nessuna fonte nuova per le modifiche del 6 ottobre: sono modifiche al codice, verificate con le prove locali sopra).

- [Caddy: HTTPS automatico](https://caddyserver.com/docs/automatic-https): rinnovi, requisiti DNS e porte, dati persistenti.
- [web.dev: Core Web Vitals](https://web.dev/articles/vitals): soglie di LCP, INP e CLS al 75° percentile.
- [SSL Insights: validità dei certificati (SC-081)](https://sslinsights.com/200-day-ssl-certificate-validity/): 200 giorni dal 15 marzo 2026, 100 dal 15 marzo 2027, 47 dal 15 marzo 2029. Fonte secondaria; la delibera è del CA/Browser Forum.

Fonti della sezione 8, pagine lette il 6 ottobre 2026 (tutte secondarie, salvo dove indicato):

- [Partitaiva.it: quando è obbligatoria la partita IVA](https://www.partitaiva.it/quando-aprire-partita-iva/): abitualità, limite dei 5.000 euro, apertura entro 30 giorni.
- [Money.it: regime forfettario 2026](https://www.money.it/regime-forfettario-2026-come-funziona-requisiti-limiti) e [Informazione Fiscale: forfettario](https://www.informazionefiscale.it/regime-forfettario/2026-per-dipendenti-e-pensionati-torna-il-vecchio-limite): soglie 85.000 e 100.000 euro, aliquote 5% e 15%, esclusioni. Le due fonti non coincidono sul tetto dei redditi da lavoro dipendente (30.000 o 35.000 euro): non l'ho riportato.
- [Partitaiva.it: costi di una SRL nel 2026](https://www.partitaiva.it/costi-srl-costituzione-gestione-imposte-commercialista) e [differenza tra SRL e SRLS](https://www.partitaiva.it/?p=39434): capitale, costi, imposte.
- [PMI.it: startup innovativa 2026](https://www.pmi.it/finanza/investimenti-pmi/391638/startup-requisiti-obbligatori.html) e [Informazione Fiscale: costituzione senza notaio](https://www.informazionefiscale.it/start-up-innovative-imprese-srl-costituzione-senza-notaio) (articolo del 2017).
- [Informazione Fiscale: organo di controllo nella SRL](https://www.informazionefiscale.it/revisore-srl-2023-obbligo-nomina): soglie di 4 milioni e 20 dipendenti.
- [INPS: aliquote Gestione Separata 2026](https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.02.gestione-separata-le-aliquote-contributive-per-il-2026.html) (la pagina non mostrava i numeri) e [Assolombarda: valori annui 2026](https://www.assolombarda.it/servizi/lavoro-e-previdenza/informazioni/gestione-separata-inps-valori-annui-2026): 26,07% e 24%, massimale e minimale.
- [Fiscozen: codici ATECO per sviluppatori web](https://www.fiscozen.it/guide/codice-ateco-web-developer/): 62.01.00 e 62.02.00, minimale Commercianti.
- [PMI.it: obblighi del sito aziendale](https://www.pmi.it/?p=65859): dati dell'articolo 2250 del Codice civile, D.Lgs. 70/2003, sanzioni.
- [Diritto.it: Accessibility Act](https://www.diritto.it/accessibility-act-guida-giuridico-operativa/): data di applicazione ed esenzione delle microimprese.
- [Partitaiva.it: polizze catastrofali](https://www.partitaiva.it/polizze-catastrofali/): ambito e scadenze (articolo del 12 dicembre 2025).
- [Finanza e Fisco: registro dei titolari effettivi](https://www.finanzaefisco.com/registro-dei-titolari-effettivi-al-via/): chi comunica e termini; la data di aggiornamento della pagina è incerta.
- [Iubenda: responsabilità dell'agenzia web nel GDPR](https://www.iubenda.com/it/help/25234-responsabilita-agenzia-gdpr/): contratto di nomina e obblighi.
