import "server-only";
import { createClient } from "@supabase/supabase-js";

export class MissingSupabaseConfigurationError extends Error {
  constructor(missingVariables: string[]) {
    super(`Missing required Supabase environment variables: ${missingVariables.join(", ")}.`);
    this.name = "MissingSupabaseConfigurationError";
  }
}

/**
 * Admin client — uses the SERVICE ROLE key and must only ever be imported
 * from server-side code (API routes / route handlers). It bypasses Row
 * Level Security, which is what lets our API routes write donation rows
 * and allocate receipt numbers even though the `donations` table has no
 * public policies.
 */
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const missingVariables = [
    !supabaseUrl && "NEXT_PUBLIC_SUPABASE_URL",
    !serviceRoleKey && "SUPABASE_SERVICE_ROLE_KEY",
  ].filter((name): name is string => Boolean(name));

  if (missingVariables.length > 0 || !supabaseUrl || !serviceRoleKey) {
    throw new MissingSupabaseConfigurationError(missingVariables);
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
