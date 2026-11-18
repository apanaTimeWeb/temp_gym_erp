export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Verhoeff tables
const VERHOEFF_D: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const VERHOEFF_P: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

const VERHOEFF_INV: number[] = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

/**
 * Validates a number string using the Verhoeff checksum algorithm.
 */
export function validateVerhoeff(numStr: string): boolean {
  if (!numStr || !/^\d+$/.test(numStr)) return false;
  let c = 0;
  const digits = numStr.split('').map(Number).reverse();
  for (let i = 0; i < digits.length; i++) {
    c = VERHOEFF_D[c][VERHOEFF_P[i % 8][digits[i]]];
  }
  return c === 0;
}

/**
 * Computes the Verhoeff checksum digit for a number string.
 */
export function generateVerhoeffChecksum(numStr: string): number {
  let c = 0;
  const digits = numStr.split('').map(Number).reverse();
  for (let i = 0; i < digits.length; i++) {
    c = VERHOEFF_D[c][VERHOEFF_P[(i + 1) % 8][digits[i]]];
  }
  return VERHOEFF_INV[c];
}

/**
 * Validates Aadhaar Number:
 * - Optional: if empty or undefined, considered valid.
 * - If present: 12 digits, must not start with 0 or 1, must satisfy Verhoeff checksum.
 * Note: Never console.log Aadhaar numbers.
 */
export function validateAadhaar(aadhaar?: string | null): ValidationResult {
  if (!aadhaar) return { isValid: true };
  const clean = aadhaar.replace(/\s+/g, '');
  if (!clean) return { isValid: true };

  if (!/^\d{12}$/.test(clean)) {
    return { isValid: false, error: 'Aadhaar must be exactly 12 digits' };
  }

  if (clean.startsWith('0') || clean.startsWith('1')) {
    return { isValid: false, error: 'Aadhaar number cannot start with 0 or 1' };
  }

  if (!validateVerhoeff(clean)) {
    return { isValid: false, error: 'Invalid Aadhaar checksum (Verhoeff validation failed)' };
  }

  return { isValid: true };
}

/**
 * Auto-formats Aadhaar as `XXXX XXXX XXXX`.
 */
export function formatAadhaar(val?: string | null): string {
  if (!val) return '';
  const digits = val.replace(/\D/g, '').slice(0, 12);
  const chunks: string[] = [];
  for (let i = 0; i < digits.length; i += 4) {
    chunks.push(digits.slice(i, i + 4));
  }
  return chunks.join(' ');
}
