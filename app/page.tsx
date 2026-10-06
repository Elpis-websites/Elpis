import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ServicesTabs } from "@/components/ServicesTabs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LEVELS, WAY, WHO, WHY } from "@/lib/content";
import { HOME, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: HOME.title },
  description: HOME.description,
  alternates: { canonical: "/" },
  openGraph: { title: HOME.title, description: HOME.description, url: "/" },
};

export default function Home() {
  const url = `${SITE_URL}/`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": `${url}#org`, name: SITE_NAME, url, description: HOME.description },
            { "@type": "WebSite", "@id": `${url}#sito`, url, name: SITE_NAME, inLanguage: "it", publisher: { "@id": `${url}#org` } },
          ],
        }}
      />
      <SiteHeader pagina="home" />
      <main id="contenuto" tabIndex={-1}>
        <div className="wrap hero">
          <div>
            <h1>La speranza ha una forma precisa.</h1>
            <p className="lead">Realizziamo e curiamo il sito della tua attività, dal nome all&apos;ultimo aggiornamento. Qui ci pensiamo noi.</p>
            <div className="actions">
              <Link className="btn primary" href="/contatti">
                Contattaci
              </Link>
              <Link className="btn ghost" href="/#perche">
                Perché un sito
              </Link>
            </div>
          </div>
          <aside className="hero-card" aria-labelledby="h-chi">
            <p className="card-title" id="h-chi">
              Per chi lavoriamo
            </p>
            <ul className="who">
              {WHO.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <p className="note">
              Piccole e medie imprese che sanno fare bene il proprio mestiere e non vogliono occuparsi di informatica. Non servono competenze tecniche.
            </p>
          </aside>
        </div>

        <section id="perche" aria-labelledby="h-perche">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-perche">Perché oggi ti serve un sito</h2>
              <p className="lead">
                Molte persone cercano online prima di chiamare o di venire da te. Il sito è il tuo biglietto da visita, sempre aperto.
              </p>
            </div>
            <ul className="offer two">
              {WHY.map((w) => (
                <li key={w.title}>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="utilita" aria-labelledby="h-utilita">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-utilita">A cosa serve un sito</h2>
              <p className="lead">
                Dal sito che dà informazioni al sito che lavora per te. Si parte da ciò che serve alla tua attività: puoi fermarti al primo livello o salire quando ti serve.
              </p>
            </div>
            <ul className="offer">
              {LEVELS.map((l) => (
                <li key={l.tag}>
                  <span className="tag">{l.tag}</span>
                  <h3>{l.title}</h3>
                  <p>{l.text}</p>
                  <p className="eg">{l.example}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="servizi" aria-labelledby="h-servizi">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-servizi">Cosa facciamo per te</h2>
              <p className="lead">
                Cinque cose che di solito stanno in posti diversi. Scegline una e guarda cosa si illumina: le seguiamo tutte noi.
              </p>
            </div>
            <ServicesTabs />
          </div>
        </section>

        <section id="come-lavoriamo" aria-labelledby="h-way">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-way">Come lavoriamo</h2>
              <p className="lead">Ogni attività è diversa: la proposta si costruisce insieme a te.</p>
            </div>
            <ol className="way">
              {WAY.map((w, i) => (
                <li key={w.title}>
                  <span className="n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contatti" aria-labelledby="h-contatti">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-contatti">Parliamo del tuo sito.</h2>
              <p className="lead">Raccontaci la tua attività: ti rispondiamo noi, di persona.</p>
            </div>
            <div className="cta-row">
              <Link className="btn alba" href="/contatti">
                Contattaci
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
