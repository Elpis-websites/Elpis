"use client";

import { useEffect } from "react";

/**
 * «Come lavoriamo»: la prima volta che testo e frecce entrano nello schermo (o vengono superati con un salto, ad esempio
 * da un'ancora) aggiunge la classe «in»; la dissolvenza lenta è nel CSS. Poi restano visibili: risalendo la pagina
 * l'animazione non si ripete. Non disegna nulla.
 */
export function WayReveal() {
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll<HTMLElement>(".way li, .way .down"));
    let ticking = false;
    const check = () => {
      ticking = false;
      const limit = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add("in");
          return false;
        }
        return true;
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(check);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}
