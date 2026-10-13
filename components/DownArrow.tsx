/** Freccia verso il basso tra un passo e il successivo di «Come lavoriamo» (al posto dei numeri). Decorativa:
 *  filo e punta triangolare (come le facce del logo), nel colore del logo. */
export function DownArrow() {
  return (
    <svg className="down" viewBox="0 0 24 56" aria-hidden="true" focusable="false">
      <path d="M12 4v32" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M3 34h18l-9 18z" fill="currentColor" />
    </svg>
  );
}
