import { describe, expect, it } from 'vitest';
import { formatPublicLandingCurrency } from '@/app/frontend_public/public_landing/landing_experience/utils/PublicLandingFormattingUtils';

describe('formatPublicLandingCurrency', () => {
  it('formats two-decimal minor units for INR using the active locale', () => {
    const formatted = formatPublicLandingCurrency(150000, 'INR', 'en-IN');
    expect(formatted).toContain('1,500');
    expect(formatted).toContain('₹');
    expect(formatted).toContain('.00');
  });

  it('does not divide zero-decimal currencies by one hundred', () => {
    const formatted = formatPublicLandingCurrency(1500, 'JPY', 'en-US');
    expect(formatted).toContain('1,500');
    expect(formatted).toContain('¥');
    expect(formatted).not.toContain('.00');
  });

  it('supports three-decimal currencies without a hand-maintained currency table', () => {
    const formatted = formatPublicLandingCurrency(12345, 'KWD', 'en-US');
    expect(formatted).toContain('12.345');
    expect(formatted).toContain('KWD');
  });
});
