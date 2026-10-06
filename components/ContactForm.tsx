"use client";

import { useState, type FormEvent } from "react";

type Stato = { tipo: "fermo" | "invio" | "ok" | "errore"; testo: string };

// Modulo contatti. Senza JavaScript funziona comunque: il modulo viene inviato in modo classico a /api/contatti,
// che risponde con una pagina semplice. Con JavaScript l'invio avviene senza ricaricare la pagina.
export function ContactForm() {
  const [stato, setStato] = useState<Stato>({ tipo: "fermo", testo: "" });

  async function invia(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const dati = Object.fromEntries(new FormData(form));
    setStato({ tipo: "invio", testo: "Invio in corso…" });
    try {
      const r = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(dati),
      });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (r.ok && j.ok === true) {
        form.reset();
        setStato({ tipo: "ok", testo: "Richiesta inviata. Grazie, ti contatteremo noi." });
      } else {
        setStato({ tipo: "errore", testo: j.error || "Non siamo riusciti a inviare la richiesta. Riprova tra poco." });
      }
    } catch {
      setStato({ tipo: "errore", testo: "Non riusciamo a collegarci al servizio. Controlla la connessione e riprova." });
    }
  }

  const invio = stato.tipo === "invio";
  return (
    <form id="modulo" action="/api/contatti" method="post" onSubmit={invia}>
      <p className="hint">Tutti i campi sono obbligatori.</p>
      <div className="row2">
        <div className="f">
          <label htmlFor="nome">Nome</label>
          <input id="nome" name="nome" type="text" autoComplete="given-name" required maxLength={60} />
        </div>
        <div className="f">
          <label htmlFor="cognome">Cognome</label>
          <input id="cognome" name="cognome" type="text" autoComplete="family-name" required maxLength={60} />
        </div>
      </div>
      <div className="f">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={120} />
      </div>
      <div className="f">
        <label htmlFor="messaggio">Scrivi qui la tua richiesta</label>
        <textarea id="messaggio" name="messaggio" required minLength={10} maxLength={2000} rows={6} aria-describedby="h-msg" />
        <p className="hint" id="h-msg">
          Racconta in poche righe di cosa hai bisogno.
        </p>
      </div>
      <div className="hp" aria-hidden="true">
        <label>
          Non compilare questo campo
          <input type="text" name="sito" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="send">
        <button type="submit" id="invia" disabled={invio}>
          Invia la richiesta
        </button>
        <p className={stato.tipo === "ok" ? "esito ok" : stato.tipo === "errore" ? "esito err" : "esito"} id="esito" role="status">
          {stato.testo}
        </p>
      </div>
      {/* TODO-CLIENTE: aggiungere qui il link all'informativa privacy quando esiste la pagina */}
      <p className="privacy">Usiamo nome, email e messaggio solo per risponderti.</p>
    </form>
  );
}
