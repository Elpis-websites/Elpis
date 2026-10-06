import type { NextConfig } from "next";

// Intestazioni di sicurezza. La CSP completa (con hash o nonce) non è praticabile qui perché Next inserisce
// script propri nella pagina: si impostano solo le regole che non lo ostacolano.
const sicurezza = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  {
    key: "Content-Security-Policy",
    value: "base-uri 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none'",
  },
];

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: sicurezza }];
  },
};

export default config;
