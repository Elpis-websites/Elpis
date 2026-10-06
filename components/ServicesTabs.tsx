"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { GEM_FACES, GEM_VIEWBOX } from "@/lib/brand";
import { STEPS } from "@/lib/content";
import { Check } from "./Check";

// "Cosa facciamo": cinque argomenti. Scegliendone uno si illuminano le parti del logo e compare il testo.
// Si sceglie con i pulsanti a sinistra (frecce, Home e Fine incluse) o, su telefono, con i numeri sul logo.
export function ServicesTabs() {
  const [attivo, setAttivo] = useState(0);
  const tab = useRef<(HTMLButtonElement | null)[]>([]);
  const ultimo = STEPS.length - 1;
  const accese = STEPS[attivo]?.faces ?? [];

  function tastiera(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let n: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") n = i === ultimo ? 0 : i + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = i === 0 ? ultimo : i - 1;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = ultimo;
    if (n === null) return;
    e.preventDefault();
    setAttivo(n);
    tab.current[n]?.focus();
  }

  return (
    <div className="flow">
      <div className="steps" role="tablist" aria-label="Cosa facciamo">
        {STEPS.map((s, i) => (
          <button
            key={s.name}
            type="button"
            className="step"
            role="tab"
            id={`tab-${i}`}
            aria-controls={`panel-${i}`}
            aria-selected={i === attivo}
            tabIndex={i === attivo ? 0 : -1}
            ref={(el) => {
              tab.current[i] = el;
            }}
            onClick={() => setAttivo(i)}
            onKeyDown={(e) => tastiera(e, i)}
          >
            <span className="n" aria-hidden="true">
              {i + 1}
            </span>
            <span>
              {s.name}
              <small>{s.sub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="stage">
        <div className="gem-col">
          <div className="gem-wrap">
            <svg className="gem" viewBox={GEM_VIEWBOX} aria-hidden="true" focusable="false">
              {GEM_FACES.map((f, k) => {
                const classe = [f.alt ? "alt" : "", accese.includes(k) ? "on" : ""].filter(Boolean).join(" ");
                return <path key={k} className={classe || undefined} d={f.d} />;
              })}
            </svg>
            <div className="pins" role="group" aria-label="Scegli l'argomento dal logo">
              {STEPS.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  className="pin"
                  data-i={i}
                  aria-label={`Vai a: ${s.name} (${i + 1} di ${STEPS.length})`}
                  aria-current={i === attivo ? "true" : undefined}
                  onClick={() => setAttivo(i)}
                >
                  <span>{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="pin-hint">Tocca un numero sul logo per cambiare argomento.</p>
        </div>
        <div className="panels">
          {STEPS.map((s, i) => (
            <div key={s.name} className="tabpanel" role="tabpanel" id={`panel-${i}`} aria-labelledby={`tab-${i}`} tabIndex={0} hidden={i !== attivo}>
              <h3>{s.title}</h3>
              <p className="txt">{s.text}</p>
              <ul className="checks">
                {s.checks.map((c) => (
                  <li key={c}>
                    <Check />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p className="motto">{s.motto}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
