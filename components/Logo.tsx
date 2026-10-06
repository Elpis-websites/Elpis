import { LOGO_VIEWBOX } from "@/lib/brand";

// Il logo disegnato una sola volta in <Sprite /> e riusato qui.
export function Logo() {
  return (
    <svg className="logo" role="img" aria-label="ELPIS" viewBox={LOGO_VIEWBOX}>
      <use href="#logo" />
    </svg>
  );
}
