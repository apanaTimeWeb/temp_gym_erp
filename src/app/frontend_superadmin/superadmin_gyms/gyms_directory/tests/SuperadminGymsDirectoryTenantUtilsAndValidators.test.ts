import { describe, it, expect } from 'vitest';
import { getMrr, getDaysLeft, formatIstDate, formatCurrency, maskEmail } from '../utils/tenant';
import {
  validateVerhoeff,
  generateVerhoeffChecksum,
  validateAadhaar,
  formatAadhaar,
  validateIndianPhone,
  validatePassword,
  generateStrongPassword,
} from '../utils/validators';
import { PLANS_MASTER } from '../constants/plans';
import type { Tenant } from '../types/tenant';

describe('Tenant MRR Calculation (getMrr)', () => {
  const baseTenant: Tenant = {
    id: 't-1',
    code: 'TEST1',
    gymName: 'Test Gym',
    ownerName: 'Test Owner',
    ownerEmail: 'owner@test.com',
    phone: '+91 98765 43210',
    planId: 'pro',
    accessStatus: 'ACTIVE',
    subscriptionState: 'ACTIVE',
    planActivatedAt: '2026-01-01T00:00:00Z',
    planExpiresAt: '2026-12-31T00:00:00Z',
    lastStatusChangedAt: '2026-01-01T00:00:00Z',
    lastStatusChangedBy: 'Admin',
    memberCount: 150,
    createdAt: '2026-01-01T00:00:00Z',
  };

  it('calculates correct plan price when tenant is ACTIVE with ACTIVE subscription', () => {
    expect(getMrr(baseTenant, PLANS_MASTER)).toBe(4999); // Pro plan price

    const starterGym = { ...baseTenant, planId: 'starter' };
    expect(getMrr(starterGym, PLANS_MASTER)).toBe(999);

    const basicGym = { ...baseTenant, planId: 'basic' };
    expect(getMrr(basicGym, PLANS_MASTER)).toBe(2499);

    const growthGym = { ...baseTenant, planId: 'growth' };
    expect(getMrr(growthGym, PLANS_MASTER)).toBe(8999);

    const enterpriseGym = { ...baseTenant, planId: 'enterprise' };
    expect(getMrr(enterpriseGym, PLANS_MASTER)).toBe(14999);
  });

  it('returns 0 when subscriptionState is TRIAL', () => {
    const trialGym = { ...baseTenant, subscriptionState: 'TRIAL' as const };
    expect(getMrr(trialGym, PLANS_MASTER)).toBe(0);
  });

  it('returns 0 when subscriptionState is EXPIRED', () => {
    const expiredGym = { ...baseTenant, subscriptionState: 'EXPIRED' as const };
    expect(getMrr(expiredGym, PLANS_MASTER)).toBe(0);
  });

  it('returns 0 when subscriptionState is CANCELLED', () => {
    const cancelledGym = { ...baseTenant, subscriptionState: 'CANCELLED' as const };
    expect(getMrr(cancelledGym, PLANS_MASTER)).toBe(0);
  });

  it('returns 0 when accessStatus is INACTIVE regardless of subscriptionState', () => {
    const inactiveGym = {
      ...baseTenant,
      accessStatus: 'INACTIVE' as const,
      subscriptionState: 'ACTIVE' as const,
    };
    expect(getMrr(inactiveGym, PLANS_MASTER)).toBe(0);
  });

  it('handles null or undefined input safely without throwing', () => {
    expect(getMrr(null, PLANS_MASTER)).toBe(0);
    expect(getMrr(undefined, PLANS_MASTER)).toBe(0);
  });
});

describe('Days Left Calculation (getDaysLeft)', () => {
  const refDate = new Date('2026-11-15T00:00:00.000Z');

  it('returns correct days left for future expiry date', () => {
    const futureDate = '2026-11-25T00:00:00.000Z'; // 10 days
    const res = getDaysLeft(futureDate, refDate);
    expect(res.daysLeft).toBe(10);
    expect(res.isExpired).toBe(false);
    expect(res.isExpiringSoon).toBe(false);
    expect(res.label).toBe('10 days left');
  });

  it('flags isExpiringSoon when days left <= 7', () => {
    const soon7 = '2026-11-22T00:00:00.000Z'; // 7 days
    const res7 = getDaysLeft(soon7, refDate);
    expect(res7.daysLeft).toBe(7);
    expect(res7.isExpiringSoon).toBe(true);
    expect(res7.isExpired).toBe(false);

    const soon3 = '2026-11-18T00:00:00.000Z'; // 3 days
    const res3 = getDaysLeft(soon3, refDate);
    expect(res3.daysLeft).toBe(3);
    expect(res3.isExpiringSoon).toBe(true);
    expect(res3.isExpired).toBe(false);
    expect(res3.label).toBe('3 days left');
  });

  it('flags isExpired when date is in the past', () => {
    const pastDate = '2026-11-10T00:00:00.000Z';
    const res = getDaysLeft(pastDate, refDate);
    expect(res.isExpired).toBe(true);
    expect(res.isExpiringSoon).toBe(true);
    expect(res.label).toBe('Expired');
  });

  it('handles empty or missing date string gracefully', () => {
    const res = getDaysLeft('', refDate);
    expect(res.isExpired).toBe(true);
    expect(res.label).toBe('Expired');
  });
});

describe('Verhoeff Checksum & Aadhaar Validation', () => {
  it('computes and validates Verhoeff checksum correctly', () => {
    // Generate valid numbers
    const baseNumber = '23456789012';
    const checksum = generateVerhoeffChecksum(baseNumber);
    const fullNumber = baseNumber + String(checksum);

    expect(validateVerhoeff(fullNumber)).toBe(true);

    // Single digit error must fail
    const singleDigitError = fullNumber.slice(0, 5) + '9' + fullNumber.slice(6);
    if (singleDigitError !== fullNumber) {
      expect(validateVerhoeff(singleDigitError)).toBe(false);
    }

    // Transposition of adjacent digits must fail
    const transposed =
      fullNumber[1] + fullNumber[0] + fullNumber.slice(2);
    expect(validateVerhoeff(transposed)).toBe(false);
  });

  it('validates Aadhaar: optional if empty', () => {
    expect(validateAadhaar('').isValid).toBe(true);
    expect(validateAadhaar(null).isValid).toBe(true);
    expect(validateAadhaar(undefined).isValid).toBe(true);
    expect(validateAadhaar('   ').isValid).toBe(true);
  });

  it('rejects Aadhaar starting with 0 or 1', () => {
    const startsZero = '012345678901';
    expect(validateAadhaar(startsZero).isValid).toBe(false);
    expect(validateAadhaar(startsZero).error).toContain('cannot start with 0 or 1');

    const startsOne = '123456789012';
    expect(validateAadhaar(startsOne).isValid).toBe(false);
    expect(validateAadhaar(startsOne).error).toContain('cannot start with 0 or 1');
  });

  it('rejects Aadhaar with incorrect length', () => {
    expect(validateAadhaar('2345678901').isValid).toBe(false);
    expect(validateAadhaar('2345678901234').isValid).toBe(false);
  });

  it('accepts valid 12-digit Aadhaar with valid Verhoeff checksum', () => {
    const num11 = '29876543210';
    const check = generateVerhoeffChecksum(num11);
    const validAadhaar = num11 + String(check);

    const res = validateAadhaar(validAadhaar);
    expect(res.isValid).toBe(true);
  });

  it('formats Aadhaar with spaces XXXX XXXX XXXX', () => {
    expect(formatAadhaar('234567890123')).toBe('2345 6789 0123');
    expect(formatAadhaar('234567')).toBe('2345 67');
    expect(formatAadhaar('')).toBe('');
  });
});

describe('Indian Phone Validation (validateIndianPhone)', () => {
  it('validates 10-digit numbers starting with 6, 7, 8, 9', () => {
    expect(validateIndianPhone('9876543210').isValid).toBe(true);
    expect(validateIndianPhone('8123456789').isValid).toBe(true);
    expect(validateIndianPhone('7000000000').isValid).toBe(true);
    expect(validateIndianPhone('6366123456').isValid).toBe(true);
  });

  it('accepts numbers with +91 or 91 country code prefix', () => {
    expect(validateIndianPhone('+91 98765 43210').isValid).toBe(true);
    expect(validateIndianPhone('+919876543210').isValid).toBe(true);
    expect(validateIndianPhone('919876543210').isValid).toBe(true);
  });

  it('rejects numbers starting with invalid digits (0 to 5)', () => {
    expect(validateIndianPhone('5876543210').isValid).toBe(false);
    expect(validateIndianPhone('0876543210').isValid).toBe(false);
    expect(validateIndianPhone('1876543210').isValid).toBe(false);
  });

  it('rejects numbers with too few or too many digits', () => {
    expect(validateIndianPhone('987654321').isValid).toBe(false);
    expect(validateIndianPhone('987654321000').isValid).toBe(false);
  });

  it('rejects empty or whitespace input', () => {
    expect(validateIndianPhone('').isValid).toBe(false);
    expect(validateIndianPhone(null).isValid).toBe(false);
  });
});

describe('Password Validator & Generator (validatePassword & generateStrongPassword)', () => {
  it('rejects passwords shorter than 10 characters', () => {
    const res = validatePassword('Aa1!short');
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('at least 10 characters');
  });

  it('rejects passwords missing one or more required character classes', () => {
    // Missing symbol
    const noSymbol = validatePassword('Password1234');
    expect(noSymbol.isValid).toBe(false);
    expect(noSymbol.error).toContain('symbol/special character');

    // Missing uppercase
    const noUpper = validatePassword('password1234!');
    expect(noUpper.isValid).toBe(false);
    expect(noUpper.error).toContain('uppercase letter');

    // Missing number
    const noNumber = validatePassword('Password!@#$');
    expect(noNumber.isValid).toBe(false);
    expect(noNumber.error).toContain('number');
  });

  it('validates and assigns appropriate score and strength to valid passwords', () => {
    const goodPassword = validatePassword('GymPass123!');
    expect(goodPassword.isValid).toBe(true);
    expect(goodPassword.strength).toBe('Good');

    const strongPassword = validatePassword('ExtremelyStrongGymAdmin2026!@#');
    expect(strongPassword.isValid).toBe(true);
    expect(strongPassword.strength).toBe('Strong');
    expect(strongPassword.score).toBe(4);
  });

  it('generateStrongPassword produces valid passwords meeting all criteria', () => {
    for (let i = 0; i < 10; i++) {
      const generated = generateStrongPassword();
      expect(generated.length).toBeGreaterThanOrEqual(10);
      const val = validatePassword(generated);
      expect(val.isValid).toBe(true);
    }
  });
});

describe('Formatting Utilities (formatIstDate, formatCurrency, maskEmail)', () => {
  it('formats dates in IST (Asia/Kolkata)', () => {
    const formatted = formatIstDate('2026-11-15T00:00:00.000Z');
    expect(formatted).toContain('2026');
    expect(formatted).toContain('Nov');
  });

  it('formats currency with Indian Rupee symbol', () => {
    const formatted = formatCurrency(4999);
    expect(formatted).toContain('4,999');
  });

  it('masks emails properly', () => {
    expect(maskEmail('vikram.singhania@ironparadise.in')).toBe('vi****@ironparadise.in');
    expect(maskEmail('ab@test.com')).toBe('ab****@test.com');
  });
});
