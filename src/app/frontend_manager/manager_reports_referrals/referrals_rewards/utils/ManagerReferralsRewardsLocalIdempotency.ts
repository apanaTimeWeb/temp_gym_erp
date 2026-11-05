// RESPONSIBILITY: Creates one RFC-compatible idempotency key for a single user intent and exposes its transport header.
/** Creates a new idempotency key exactly once for a confirmed user action. */
export function ManagerInfrastructureIdempotency(): string {
  if (typeof crypto === 'undefined' || typeof crypto.randomUUID !== 'function') {
    throw new Error('Idempotency-key generation is unavailable in this runtime.');
  }
  return crypto.randomUUID();
}

/** Builds the optional transport header for a previously-created user-intent key. */
export function managerIdempotencyHeaders(idempotencyKey: string): Record<string, string> {
  return { 'Idempotency-Key': idempotencyKey };
}
