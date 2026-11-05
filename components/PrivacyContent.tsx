import Link from "next/link";
import { PRIVACY, conservazioneLimite } from "@/lib/content";
import { CONSERVAZIONE_MESI, TITOLARE } from "@/lib/site";

// Testo dell'informativa privacy, mostrato nella finestra di PrivacyDialog. Le frasi stanno in lib/content.ts,
// i dati dell'azienda in lib/site.ts: un dato ancora vuoto non compare (nessun segnaposto visibile).
export function PrivacyContent() {
  const email = TITOLARE.email.trim();
  const datiTitolare = [TITOLARE.ragioneSociale, TITOLARE.sede, email].map((v) => v.trim()).filter((v) => v !== "");
  const d = PRIVACY.diritti;
  return (
    <>
      <p className="pv-lead">{PRIVACY.lead}</p>
      <p className="pv-agg">{PRIVACY.updated}</p>
      <section aria-labelledby="pv-titolare">
        <h3 id="pv-titolare">{PRIVACY.titolare.title}</h3>
        <p>{PRIVACY.titolare.intro}</p>
        {datiTitolare.length > 0 && (
          <ul>
            {datiTitolare.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        )}
      </section>
      <section aria-labelledby="pv-dati">
        <h3 id="pv-dati">{PRIVACY.dati.title}</h3>
        <ul>
          {PRIVACY.dati.items.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
        <p>{PRIVACY.dati.outro}</p>
      </section>
      <section aria-labelledby="pv-perche">
        <h3 id="pv-perche">{PRIVACY.perche.title}</h3>
        {PRIVACY.perche.paragraphs.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </section>
      <section aria-labelledby="pv-chi">
        <h3 id="pv-chi">{PRIVACY.chi.title}</h3>
        {PRIVACY.chi.paragraphs.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </section>
      <section aria-labelledby="pv-conservazione">
        <h3 id="pv-conservazione">{PRIVACY.conservazione.title}</h3>
        <p>
          {PRIVACY.conservazione.base}
          {CONSERVAZIONE_MESI !== null && ` ${conservazioneLimite(CONSERVAZIONE_MESI)}`}
        </p>
      </section>
      <section aria-labelledby="pv-diritti">
        <h3 id="pv-diritti">{d.title}</h3>
        <p>{d.intro}</p>
        <ul>
          {d.items.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
        <p>
          {d.contactBase}{" "}
          {email !== "" ? (
            <>
              {d.contactEmail} <a href={`mailto:${email}`}>{email}</a>.
            </>
          ) : (
            <>
              {d.contactForm} <Link href="/contatti">{d.contactFormLink}</Link>.
            </>
          )}
        </p>
        <p>
          {d.reclamo}{" "}
          <a href={d.garanteHref} rel="noopener noreferrer">
            {d.garanteLabel}
          </a>
          .
        </p>
      </section>
      <section aria-labelledby="pv-cookie">
        <h3 id="pv-cookie">{PRIVACY.cookie.title}</h3>
        {PRIVACY.cookie.paragraphs.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </section>
    </>
  );
}
