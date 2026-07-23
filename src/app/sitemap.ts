import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

const publicRoutes = [
  "",
  "/how-it-works",
  "/for-gp-practices",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route, index) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
