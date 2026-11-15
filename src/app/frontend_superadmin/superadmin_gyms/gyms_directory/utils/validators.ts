/**
 * Shared validation logic for tenant management
 */

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

export interface ValidationResult {
  isValid: boolean;
  error?: string;
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

/**
 * Validates Indian Phone Number:
 * - Must be a 10-digit number starting with 6-9 (optionally prefixed with +91 or 91).
 */
export function validateIndianPhone(phone?: string | null): ValidationResult {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  const clean = phone.replace(/[\s\-()]/g, '');
  let digits = clean;
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }

  if (!/^[6-9]\d{9}$/.test(digits)) {
    return {
      isValid: false,
      error: 'Phone must be a valid 10-digit Indian number starting with 6, 7, 8, or 9',
    };
  }

  return { isValid: true };
}

export type PasswordStrength = 'Weak' | 'Fair' | 'Good' | 'Strong';

export interface PasswordValidationResult {
  isValid: boolean;
  score: number; // 0 to 4
  strength: PasswordStrength;
  error?: string;
}

/**
 * Validates Temporary Password:
 * - Min 10 chars.
 * - Requires uppercase, lowercase, number, symbol.
 */
export function validatePassword(password?: string | null): PasswordValidationResult {
  if (!password || password.length < 10) {
    return {
      isValid: false,
      score: 1,
      strength: 'Weak',
      error: 'Password must be at least 10 characters long',
    };
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  let criteria = 0;
  if (hasUpper) criteria++;
  if (hasLower) criteria++;
  if (hasNumber) criteria++;
  if (hasSymbol) criteria++;

  if (criteria < 4) {
    const missing: string[] = [];
    if (!hasUpper) missing.push('uppercase letter');
    if (!hasLower) missing.push('lowercase letter');
    if (!hasNumber) missing.push('number');
    if (!hasSymbol) missing.push('symbol/special character');

    return {
      isValid: false,
      score: criteria <= 2 ? 1 : 2,
      strength: criteria <= 2 ? 'Weak' : 'Fair',
      error: `Password missing: ${missing.join(', ')}`,
    };
  }

  // All 4 criteria met
  const isLong = password.length >= 14;
  return {
    isValid: true,
    score: isLong ? 4 : 3,
    strength: isLong ? 'Strong' : 'Good',
  };
}

/**
 * Generates a strong random temporary password that satisfies all requirements.
 */
export function generateStrongPassword(): string {
  const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowers = 'abcdefghijkmnpqrstuvwxyz';
  const numbers = '23456789';
  const symbols = '!@#$%^&*()_+~';

  const all = uppers + lowers + numbers + symbols;

  // Ensure at least one of each
  const parts = [
    uppers[Math.floor(Math.random() * uppers.length)],
    lowers[Math.floor(Math.random() * lowers.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  // Fill up to 14 chars
  for (let i = parts.length; i < 14; i++) {
    parts.push(all[Math.floor(Math.random() * all.length)]);
  }

  // Shuffle
  for (let i = parts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [parts[i], parts[j]] = [parts[j], parts[i]];
  }

  return parts.join('');
}

/**
 * Validates Gym Name: 3 to 80 characters.
 */
export function validateGymName(name?: string | null): ValidationResult {
  if (!name || name.trim().length < 3) {
    return { isValid: false, error: 'Gym name must be at least 3 characters' };
  }
  if (name.trim().length > 80) {
    return { isValid: false, error: 'Gym name must not exceed 80 characters' };
  }
  return { isValid: true };
}

/**
 * Validates standard email address format.
 */
export function validateEmail(email?: string | null): ValidationResult {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email address is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  return { isValid: true };
}
