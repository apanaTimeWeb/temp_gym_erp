// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for profile_overview; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_profile/profile_overview/utils/AdminProfileOverviewIntentIdempotency.ts)

import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_profile/profile_overview/utils/AdminProfileOverviewIdempotencyIntentStore';

/** Reuses a key only for a byte-identical payload; changed values are a new user intent. @description Implements getAdminProfileIntentIdempotencyKey for the owning feature’s explicitly typed data. @param keys - Input used by this utility as declared by the signature. @param signatures - Input used by this utility as declared by the signature. @param intentId - Input used by this utility as declared by the signature. @param payload - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function getAdminProfileIntentIdempotencyKey<TPayload extends object>(
  keys: Map<string, string>,
  signatures: Map<string, string>,
  intentId: string,
  payload: TPayload,
): string {
  const signature = JSON.stringify(payload);
  const previousSignature = signatures.get(intentId);
  if (previousSignature !== undefined && previousSignature !== signature) clearAdminIdempotencyKey(keys, intentId);
  signatures.set(intentId, signature);
  return getAdminIdempotencyKey(keys, intentId);
}

/** @description Implements clearAdminProfileIntentIdempotencyKey for the owning feature’s explicitly typed data. @param keys - Input used by this utility as declared by the signature. @param signatures - Input used by this utility as declared by the signature. @param intentId - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function clearAdminProfileIntentIdempotencyKey(
  keys: Map<string, string>,
  signatures: Map<string, string>,
  intentId: string,
): void {
  clearAdminIdempotencyKey(keys, intentId);
  signatures.delete(intentId);
}
