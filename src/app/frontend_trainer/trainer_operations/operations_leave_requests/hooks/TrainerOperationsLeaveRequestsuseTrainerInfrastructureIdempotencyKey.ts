// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Owns stable per-action idempotency keys so Trainer mutation retries reuse the original key.

// DATA FLOW: Feature action identifier → useTrainerInfrastructureIdempotencyKey → stable idempotency key → mutating API request.
import { useCallback, useRef } from 'react';

/**
 * @description Owns stable per-action idempotency keys so Trainer mutation retries reuse the original key.
 * @dependencies Feature action identifier → useTrainerInfrastructureIdempotencyKey → stable idempotency key → mutating API request.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerInfrastructureIdempotencyKey state and data flow for the infrastructure feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerInfrastructureIdempotencyKey() {
  const keyMapRef = useRef<Record<string, string>>({});
  const payloadFingerprintMapRef = useRef<Record<string, string>>({});

  const begin = useCallback((actionId: string): string => {
    const existing = keyMapRef.current[actionId];
    if (existing) return existing;
    const next = crypto.randomUUID();
    keyMapRef.current[actionId] = next;
    return next;
  }, []);

  const current = useCallback((actionId: string): string | null => keyMapRef.current[actionId] ?? null, []);
  const clear = useCallback((actionId: string) => {
    const next = { ...keyMapRef.current };
    delete next[actionId];
    keyMapRef.current = next;
  }, []);

  const syncPayload = useCallback((actionId: string, fingerprint: string) => {
    const previousFingerprint = payloadFingerprintMapRef.current[actionId];
    if (previousFingerprint !== undefined && previousFingerprint !== fingerprint) clear(actionId);
    payloadFingerprintMapRef.current[actionId] = fingerprint;
  }, [clear]);

  return { begin, current, clear, syncPayload };
}
