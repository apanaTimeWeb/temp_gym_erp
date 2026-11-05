import { describe, expect, it } from 'vitest';
import { formatSuperadminGymsNumber } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormatNumber';

describe('formatSuperadminGymsNumber', () => {
  it('preserves zero and formats integer metrics for the active locale', () => {
    expect(formatSuperadminGymsNumber(0, 'en-IN')).toBe('0');
    expect(formatSuperadminGymsNumber(123456, 'en-IN')).toBe('1,23,456');
    expect(formatSuperadminGymsNumber(123456, 'en-US')).toBe('123,456');
  });
  it('renders absent or invalid values explicitly', () => {
    expect(formatSuperadminGymsNumber(null, 'en-IN')).toBe('—');
    expect(formatSuperadminGymsNumber(undefined, 'en-IN')).toBe('—');
    expect(formatSuperadminGymsNumber(Number.NaN, 'en-IN')).toBe('—');
  });
});
