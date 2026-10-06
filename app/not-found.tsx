import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NonTrovata() {
  return (
    <>
      <SiteHeader pagina="altro" />
      <main id="contenuto" tabIndex={-1}>
        <div className="wrap">
          <div className="page-head">
            <h1>Pagina non trovata</h1>
            <p className="lead">L&apos;indirizzo che hai aperto non esiste o è stato spostato.</p>
            <div className="actions">
              <Link className="btn primary" href="/">
                Torna alla pagina iniziale
              </Link>
              <Link className="btn ghost" href="/contatti">
                Contattaci
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
