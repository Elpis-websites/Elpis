import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { HOME, SITE_IS_PLACEHOLDER, SITE_NAME, SITE_URL } from "@/lib/site";
import { Sprite } from "@/components/Sprite";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME.title, // titolo di riserva (ad esempio per la pagina 404); ogni pagina imposta il proprio
  applicationName: SITE_NAME,
  // Finché il dominio reale non è impostato (SITE_URL) il sito non va indicizzato.
  robots: SITE_IS_PLACEHOLDER ? { index: false, follow: false } : undefined,
  openGraph: { type: "website", locale: "it_IT", siteName: SITE_NAME },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F6F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0F2328" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" data-scroll-behavior="smooth">
      <body>
        <a className="skip" href="#contenuto">
          Vai al contenuto
        </a>
        <Sprite />
        {children}
      </body>
    </html>
  );
}
