import { LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/brand";

// Disegni riusati nella pagina: logo e spunta.
export function Sprite() {
  return (
    <svg className="sprite" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <symbol id="logo" viewBox={LOGO_VIEWBOX}>
          {LOGO_PATHS.map((p) => (
            <path key={p.transform} transform={p.transform} d={p.d} />
          ))}
        </symbol>
        <symbol id="i-check" viewBox="0 0 20 20">
          <path d="M4 10.5l4 4 8-9" />
        </symbol>
      </defs>
    </svg>
  );
}
