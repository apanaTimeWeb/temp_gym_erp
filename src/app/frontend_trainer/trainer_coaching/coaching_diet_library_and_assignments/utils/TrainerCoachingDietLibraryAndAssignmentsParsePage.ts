// RESPONSIBILITY: Normalizes the Trainer Library page query parameter before it enters query and pagination state.

/**
 * Parses a URL page value as a safe positive integer.
 * Missing, malformed, non-positive, fractional, and unsafe values resolve to page 1.
 */
export function TrainerLibraryParsePage(value: string | null): number {
  if (value === null || !/^\d+$/.test(value)) return 1;

  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
