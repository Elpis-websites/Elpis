import type { MetadataRoute } from "next";
import { SITE_IS_PLACEHOLDER, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Senza dominio reale (SITE_URL) il sito non si fa indicizzare.
  if (SITE_IS_PLACEHOLDER) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
