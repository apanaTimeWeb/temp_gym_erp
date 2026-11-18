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
