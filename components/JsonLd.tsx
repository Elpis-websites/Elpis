// Dati strutturati per i motori di ricerca. Si sostituisce "<" per non poter chiudere il tag per errore.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
