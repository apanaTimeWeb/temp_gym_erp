// RESPONSIBILITY: Stores feature-owned mutable mock state and processed idempotency keys used by PublicLanding MSW handlers and tests.
import type { PublicLandingMockBookingRecord } from '@/app/frontend_public/public_landing/landing_booking/types/PublicLandingBookingTypes';

const initialBookings: PublicLandingMockBookingRecord[] = [];
const processedPublicLandingMutationKeys = new Map<string, string>();

export const landingMockState = { bookings: [...initialBookings] };

let landingMockSequence = 1;

/** Resets all module mock records and idempotency history so tests remain independent. */
export function resetPublicLandingMockState(): void {
  landingMockState.bookings.splice(0, landingMockState.bookings.length, ...initialBookings);
  processedPublicLandingMutationKeys.clear();
  landingMockSequence = 1;
}

/** Returns whether a user-intent idempotency key has already been accepted by the mock service. */
export function hasPublicLandingMutationKey(key: string): boolean { return processedPublicLandingMutationKeys.has(key); }
/** A reused key must represent the exact same normalized payload in the local mock. */
export function isPublicLandingMutationConflict(key: string, fingerprint: string): boolean {
  const earlier = processedPublicLandingMutationKeys.get(key);
  return earlier !== undefined && earlier !== fingerprint;
}
/** Records an accepted user-intent idempotency key so retries cannot create duplicates. */
export function rememberPublicLandingMutationKey(key: string, fingerprint: string): void { processedPublicLandingMutationKeys.set(key, fingerprint); }
/** Creates a deterministic mock identifier for a submitted PublicLanding record. */
export function nextPublicLandingMockId(prefix: 'booking'): string { const id = `${prefix}-${landingMockSequence}`; landingMockSequence += 1; return id; }
