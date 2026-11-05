import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PRIVACY, conservazioneLimite } from "@/lib/content";
import { CONSERVAZIONE_MESI, PRIVACY_PAGE, TITOLARE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: PRIVACY_PAGE.title },
  description: PRIVACY_PAGE.description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: PRIVACY_PAGE.title, description: PRIVACY_PAGE.description, url: "/privacy" },
};

// Pagina «Informativa privacy». I testi stanno in lib/content.ts, i dati dell'azienda in lib/site.ts:
// un dato ancora vuoto non compare (nessun segnaposto visibile).
export default function Privacy() {
  const datiTitolare = [TITOLARE.ragioneSociale, TITOLARE.sede, TITOLARE.email].filter((v) => v.trim() !== "");
  const d = PRIVACY.diritti;
  return (
    <>
      <SiteHeader pagina="altro" />
      <main id="contenuto" tabIndex={-1}>
        <div className="wrap">
          <div className="page-head">
            <h1>{PRIVACY.title}</h1>
            <p className="lead">{PRIVACY.lead}</p>
            <p className="agg">{PRIVACY.updated}</p>
          </div>
          <div className="legal">
            <section aria-labelledby="p-titolare">
              <h2 id="p-titolare">{PRIVACY.titolare.title}</h2>
              <p>{PRIVACY.titolare.intro}</p>
              {datiTitolare.length > 0 && (
                <ul>
                  {datiTitolare.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              )}
            </section>
            <section aria-labelledby="p-dati">
              <h2 id="p-dati">{PRIVACY.dati.title}</h2>
              <ul>
                {PRIVACY.dati.items.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
              <p>{PRIVACY.dati.outro}</p>
            </section>
            <section aria-labelledby="p-perche">
              <h2 id="p-perche">{PRIVACY.perche.title}</h2>
              {PRIVACY.perche.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </section>
            <section aria-labelledby="p-chi">
              <h2 id="p-chi">{PRIVACY.chi.title}</h2>
              {PRIVACY.chi.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </section>
            <section aria-labelledby="p-conservazione">
              <h2 id="p-conservazione">{PRIVACY.conservazione.title}</h2>
              <p>
                {PRIVACY.conservazione.base}
                {CONSERVAZIONE_MESI !== null && ` ${conservazioneLimite(CONSERVAZIONE_MESI)}`}
              </p>
            </section>
            <section aria-labelledby="p-diritti">
              <h2 id="p-diritti">{d.title}</h2>
              <p>{d.intro}</p>
              <ul>
                {d.items.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
              <p>
                {d.contactBase}{" "}
                {TITOLARE.email.trim() !== "" ? (
                  <>
                    {d.contactEmail} <a href={`mailto:${TITOLARE.email.trim()}`}>{TITOLARE.email.trim()}</a>.
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
            <section aria-labelledby="p-cookie">
              <h2 id="p-cookie">{PRIVACY.cookie.title}</h2>
              {PRIVACY.cookie.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
