const FALLBACK_SITE_URL = "https://capacityplus.vercel.app";

/**
 * Canonical origin used by generated metadata routes. The production domain is
 * not yet confirmed, so deployments can set NEXT_PUBLIC_SITE_URL; local and
 * review builds safely fall back to the current stable HTTPS deployment.
 */
export function normalizeSiteUrl(value: string | undefined): string {
  const candidate = value?.trim() || FALLBACK_SITE_URL;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return FALLBACK_SITE_URL;
    }
    url.pathname = url.pathname.replace(/\/+$/, "");
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
