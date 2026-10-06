// Elenca i punti ancora da completare (marcati TODO-CLIENTE) e termina con errore se ce n'è almeno uno.
// Uso: npm run prepubblicazione
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const radice = new URL("..", import.meta.url).pathname;
const saltare = new Set(["node_modules", ".next", ".git", ".vercel", "scripts"]);
const trovati = [];

function visita(dir) {
  for (const nome of readdirSync(dir)) {
    if (saltare.has(nome)) continue;
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) visita(p);
    else if (/\.(tsx?|css|md|json|example|svg)$/.test(nome) || nome === ".env.example") {
      readFileSync(p, "utf8").split("\n").forEach((riga, i) => {
        if (riga.includes("TODO-CLIENTE")) trovati.push(`${relative(radice, p)}:${i + 1}: ${riga.trim()}`);
      });
    }
  }
}
visita(radice);

if (trovati.length) {
  console.log(`Da completare prima della pubblicazione (${trovati.length}):\n`);
  console.log(trovati.join("\n"));
  process.exit(1);
}
console.log("Nessun punto da completare.");
