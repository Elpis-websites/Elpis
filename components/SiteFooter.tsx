import Link from "next/link";
import { FOOT, NAV_ITEMS } from "@/lib/content";
import { Logo } from "./Logo";

const ANNO = 2026;

export function SiteFooter() {
  return (
    <footer>
      {/* TODO-CLIENTE: ragione sociale, partita IVA, sede legale e link all'informativa privacy (da verificare con un consulente) */}
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Logo />
          <p>{FOOT.tag}</p>
          <p className="foot-motto">{FOOT.motto}</p>
        </div>
        <nav className="foot-nav" aria-label="Sezioni della pagina iniziale">
          <p className="foot-h">Esplora</p>
          <ul>
            {NAV_ITEMS.map((v) => (
              <li key={v.href}>
                <Link href={v.href}>{v.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="foot-contact">
          <p className="foot-h">Contatti</p>
          <p>{FOOT.contact}</p>
          <Link className="btn alba" href="/contatti">
            Contattaci
          </Link>
        </div>
      </div>
      <div className="wrap foot-bar">
        <p>© {ANNO} ELPIS</p>
        <a href="#contenuto">Torna su</a>
      </div>
    </footer>
  );
}
