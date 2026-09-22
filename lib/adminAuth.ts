import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Minimal password-gated admin session for the single-admin /admin/gallery
 * portal. No user accounts, no Supabase Auth — just one shared password
 * (ADMIN_PASSWORD) and a signed, httpOnly session cookie so the browser can
 * never forge or read a valid session.
 *
 * The cookie value is `<expiry>.<hmac(expiry)>`. Anyone can see the expiry,
 * but only someone holding ADMIN_SESSION_SECRET can produce a signature that
 * matches it, so the cookie can't be tampered with or replayed after expiry.
 */

const COOKIE_NAME = "sssf_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET environment variable.");
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

function timingSafeStringsEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_TTL_SECONDS * 1000;
  return `${expires}.${sign(String(expires))}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const dotIndex = token.indexOf(".");
  if (dotIndex === -1) return false;
  const expiresRaw = token.slice(0, dotIndex);
  const signature = token.slice(dotIndex + 1);
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  return timingSafeStringsEqual(signature, sign(expiresRaw));
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("Missing ADMIN_PASSWORD environment variable.");
  }
  return timingSafeStringsEqual(password, expected);
}

/** Read-only check for use inside API route handlers (returns a boolean instead of redirecting). */
export function hasValidAdminSession(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}

/** Call at the top of a protected server component/page — redirects to /admin/login when there's no valid session. */
export function requireAdminSession(): void {
  if (!hasValidAdminSession()) {
    redirect("/admin/login");
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE_SECONDS = SESSION_TTL_SECONDS;
