"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { PRIVACY } from "@/lib/content";

// Finestra dell'informativa privacy: elemento <dialog> nativo (focus bloccato dentro, Esc per chiudere), sfondo sfocato,
// animazione in entrata e in uscita (stile in app/globals.css, classe «pv»). Si apre da ogni link <a href="#informativa" data-informativa>.
// Senza JavaScript la finestra non si apre: il CSS la mostra in fondo alla pagina e i link vanno lì.
export function PrivacyDialog({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const pv = ref.current;
    if (!pv || typeof pv.showModal !== "function") return;
    const dialog: HTMLDialogElement = pv;
    let closing = false;
    let timer: number | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    function finish() {
      closing = false;
      dialog.classList.remove("is-closing");
      if (dialog.open) dialog.close();
      if (location.hash === "#informativa") history.replaceState(null, "", location.pathname + location.search);
    }
    function openPv() {
      if (dialog.open) return;
      closing = false;
      dialog.classList.remove("is-closing");
      dialog.showModal();
      const body = dialog.querySelector<HTMLElement>(".pv-body");
      if (body) body.scrollTop = 0;
    }
    function closePv() {
      if (!dialog.open || closing) return;
      if (reduce.matches) {
        finish();
        return;
      }
      closing = true;
      dialog.classList.add("is-closing");
      timer = window.setTimeout(finish, 450);
    }
    function onAnimationEnd(e: AnimationEvent) {
      if (!closing || e.target !== dialog || e.animationName !== "pv-out") return;
      window.clearTimeout(timer);
      finish();
    }
    function onDocumentClick(e: MouseEvent) {
      if (e.target instanceof Element && e.target.closest("a[data-informativa]")) {
        e.preventDefault();
        openPv();
      }
    }
    function onDialogClick(e: MouseEvent) {
      // sfondo (il clic cade sul <dialog> stesso), pulsante X e link interni
      if (e.target === dialog || (e.target instanceof Element && e.target.closest(".pv-close, a"))) closePv();
    }
    function onCancel(e: Event) {
      e.preventDefault(); // Esc: si chiude con l'animazione
      closePv();
    }

    document.addEventListener("click", onDocumentClick);
    dialog.addEventListener("click", onDialogClick);
    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("animationend", onAnimationEnd);
    if (location.hash === "#informativa") openPv();
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onDocumentClick);
      dialog.removeEventListener("click", onDialogClick);
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("animationend", onAnimationEnd);
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog ref={ref} className="pv" id="informativa" aria-labelledby="pv-titolo">
      <div className="pv-head">
        <h2 id="pv-titolo">{PRIVACY.title}</h2>
        <button type="button" className="pv-close" aria-label={PRIVACY.close}>
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        </button>
      </div>
      <div className="pv-body">{children}</div>
    </dialog>
  );
}
