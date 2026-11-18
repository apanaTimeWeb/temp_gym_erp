import type { ValidationResult } from './SuperadminGymsDirectoryVerhoeffValidators';

export * from './SuperadminGymsDirectoryVerhoeffValidators';
export * from './SuperadminGymsDirectoryPasswordValidators';

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
