import { describe, expect, it } from 'vitest';

import { displayValue } from '@/lib/display_value';




describe('canonical displayValue contract', () => {
  it('renders an explicit absent-value marker', () => {
    expect(displayValue(null)).toBe('—');
    expect(displayValue(undefined)).toBe('—');
    expect(displayValue('')).toBe('—');
  });
  it('preserves meaningful primitive values', () => {
    expect(displayValue(0)).not.toBe('—');
    expect(displayValue(false)).not.toBe('—');
    expect(displayValue('Plan')).toBe('Plan');
  });
});
