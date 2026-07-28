import type { NextConfig } from "next";

export const permanentRedirects = [
  {
    source: "/services/digital-gp-pharmacy-integration",
    destination: "/how-it-works",
    permanent: true,
  },
  {
    source: "/services/life-leadership-coaching",
    destination: "/",
    permanent: true,
  },
  {
    source: "/services/social-media-visibility",
    destination: "/",
    permanent: true,
  },
] as const;

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

export const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
] as const;

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [...permanentRedirects];
  },
  async headers() {
    return [{ source: "/:path*", headers: [...securityHeaders] }];
  },
};

export default nextConfig;
