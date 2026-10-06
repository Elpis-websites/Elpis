import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CONTATTI, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: CONTATTI.title },
  description: CONTATTI.description,
  alternates: { canonical: "/contatti" },
  openGraph: { title: CONTATTI.title, description: CONTATTI.description, url: "/contatti" },
};

export default function Contatti() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE_URL}/contatti`,
          name: "Contattaci",
          inLanguage: "it",
          isPartOf: { "@type": "WebSite", url: `${SITE_URL}/`, name: SITE_NAME },
        }}
      />
      <SiteHeader pagina="contatti" />
      <main id="contenuto" tabIndex={-1}>
        <div className="wrap">
          <div className="page-head">
            <h1>Contattaci</h1>
            <p className="lead">Due righe su di te e su cosa ti serve. Al resto, compresa la proposta su misura, pensiamo noi.</p>
          </div>
          <section className="contact" aria-labelledby="h-modulo">
            <div className="form-card">
              <h2 id="h-modulo">La tua richiesta</h2>
              <ContactForm />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
