// RESPONSIBILITY: Creates one standards-compliant idempotency key for a single confirmed Admin user intent.
// DATA FLOW: Feature confirmation → createAdminIdempotencyKey → feature API request header.

/**
 * createAdminIdempotencyKey provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies.
 * @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature.
 */
export function createAdminIdempotencyKey(): string {
  return globalThis.crypto.randomUUID();
}
