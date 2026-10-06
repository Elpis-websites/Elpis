"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { NAV_ITEMS } from "@/lib/content";
import { Logo } from "./Logo";

export type Pagina = "home" | "contatti" | "altro";

// Intestazione con menu: su schermi larghi i link sono in fila, su quelli stretti stanno in un menu a tendina.
export function SiteHeader({ pagina }: { pagina: Pagina }) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const m = menu.current;
    if (!m) return;
    const fuori = (e: MouseEvent) => {
      if (m.open && e.target instanceof Node && !m.contains(e.target)) m.open = false;
    };
    const tasto = (e: KeyboardEvent) => {
      if (e.key === "Escape" && m.open) {
        m.open = false;
        m.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("click", fuori);
    document.addEventListener("keydown", tasto);
    return () => {
      document.removeEventListener("click", fuori);
      document.removeEventListener("keydown", tasto);
    };
  }, []);

  const corrente = pagina === "contatti" ? "page" : undefined;
  const voci = NAV_ITEMS.map((v) => (
    <li key={v.href}>
      <Link href={v.href}>{v.label}</Link>
    </li>
  ));

  return (
    <header className="top">
      <div className="wrap">
        <Link href="/" className="brand" aria-label={pagina === "home" ? "ELPIS, inizio pagina" : "ELPIS, torna alla pagina iniziale"}>
          <Logo />
        </Link>
        <nav aria-label="Principale">
          <ul className="nav-d">
            {voci}
            <li>
              <Link className="cta" href="/contatti" aria-current={corrente}>
                Contattaci
              </Link>
            </li>
          </ul>
          <div className="nav-m">
            <details
              className="menu"
              ref={menu}
              onClick={(e) => {
                if (e.target instanceof Element && e.target.closest("a") && menu.current) menu.current.open = false;
              }}
            >
              <summary>Menu</summary>
              <ul>{voci}</ul>
            </details>
            <Link className="cta" href="/contatti" aria-current={corrente}>
              Contattaci
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
