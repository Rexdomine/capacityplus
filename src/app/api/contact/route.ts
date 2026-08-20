import { isIP } from "node:net";

import {
  BODY_LIMIT_BYTES,
  type ContactRateLimiter,
  createInMemoryRateLimiter,
  sendContactEmails,
  type ValidContactRequest,
  validateContactRequest,
} from "@/lib/contact-server";

const MIN_COMPLETION_MS = 3_000;
const instanceRateLimiter = createInMemoryRateLimiter({
  maxRequests: 5,
  windowMs: 10 * 60_000,
  maxEntries: 1_000,
});

type ContactSender = (
  contact: ValidContactRequest,
  receivedAt: string,
) => Promise<void>;

type HandlerDependencies = {
  now: () => number;
  rateLimiter: ContactRateLimiter;
};

const defaultDependencies: HandlerDependencies = {
  now: Date.now,
  rateLimiter: instanceRateLimiter,
};

function response(status: number, ok = false) {
  return Response.json(
    ok ? { ok: true } : { ok: false, error: "Unable to process this enquiry." },
    { status, headers: { "cache-control": "no-store" } },
  );
}

async function readBoundedBody(request: Request) {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > BODY_LIMIT_BYTES) {
    return { tooLarge: true as const };
  }
  if (!request.body) return { text: "" };

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > BODY_LIMIT_BYTES) {
      await reader.cancel();
      return { tooLarge: true as const };
    }
    text += decoder.decode(value, { stream: true });
  }
  return { text: text + decoder.decode() };
}

function hasUnsafeHeaderCharacter(value: string, forbidden: string) {
  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return code <= 32 || code === 127 || forbidden.includes(character);
  });
}

function normalizedHost(value: string | null) {
  if (
    !value ||
    value.length > 253 ||
    hasUnsafeHeaderCharacter(value, ",%@/\\?#")
  ) {
    return null;
  }
  try {
    const parsed = new URL(`https://${value}`);
    return parsed.host.toLowerCase();
  } catch {
    return null;
  }
}

function publicOrigin(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedHost !== null || forwardedProto !== null) {
    const host = normalizedHost(forwardedHost);
    if (!host || (forwardedProto !== "http" && forwardedProto !== "https")) {
      return null;
    }
    return new URL(`${forwardedProto}://${host}`).origin;
  }

  const requestUrl = new URL(request.url);
  const hostHeader = request.headers.get("host");
  if (hostHeader === null) return requestUrl.origin;
  const host = normalizedHost(hostHeader);
  return host ? new URL(`${requestUrl.protocol}//${host}`).origin : null;
}

function isMatchingOrigin(request: Request, expectedOrigin: string) {
  const supplied = request.headers.get("origin");
  if (!supplied) return true;
  if (hasUnsafeHeaderCharacter(supplied, ",")) return false;
  try {
    const parsed = new URL(supplied);
    return supplied === parsed.origin && parsed.origin === expectedOrigin;
  } catch {
    return false;
  }
}

/** Relies on Vercel-normalized x-real-ip; missing headers share the conservative "unknown" limiter bucket. */
function clientIp(request: Request) {
  const value = request.headers.get("x-real-ip");
  if (value === null) return "unknown";
  if (
    value.length > 45 ||
    hasUnsafeHeaderCharacter(value, ",") ||
    isIP(value) === 0
  ) {
    return null;
  }
  return value.toLowerCase();
}

/** Handles the HTTP boundary with injectable time, limiter and sender for tests. */
export async function handleContactRequest(
  request: Request,
  sender: ContactSender,
  dependencies: HandlerDependencies = defaultDependencies,
): Promise<Response> {
  const contentType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim();
  if (contentType !== "application/json") return response(415);

  const expectedOrigin = publicOrigin(request);
  if (!expectedOrigin || !isMatchingOrigin(request, expectedOrigin)) {
    return response(400);
  }

  const body = await readBoundedBody(request);
  if ("tooLarge" in body) return response(413);

  let payload: unknown;
  try {
    payload = JSON.parse(body.text);
  } catch {
    return response(400);
  }
  const validated = validateContactRequest(payload);
  if (!validated.ok) return response(400);

  const now = dependencies.now();
  if (now - validated.value.startedAt < MIN_COMPLETION_MS) {
    return response(400);
  }

  const ip = clientIp(request);
  if (!ip) return response(400);
  if (!dependencies.rateLimiter.allow(ip, now)) return response(429);

  try {
    await sender(validated.value, new Date(now).toISOString());
    return response(200, true);
  } catch {
    return response(503);
  }
}

export async function POST(request: Request) {
  return handleContactRequest(request, (contact, receivedAt) =>
    sendContactEmails(contact, {
      apiKey: process.env.BREVO_API_KEY,
      receivedAt,
    }),
  );
}
