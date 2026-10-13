import { GEM_FACES, GEM_VIEWBOX } from "@/lib/brand";

// Gemma decorativa nella prima schermata: le stesse facce del logo, con la prima coppia illuminata come nella prima scheda.
export function HeroGem() {
  return (
    <svg className="hero-gem" viewBox={GEM_VIEWBOX} aria-hidden="true" focusable="false">
      {GEM_FACES.map((f, k) => {
        const classe = [f.alt ? "alt" : "", k < 2 ? "on" : ""].filter(Boolean).join(" ");
        return <path key={k} className={classe || undefined} d={f.d} />;
      })}
    </svg>
  );
}
