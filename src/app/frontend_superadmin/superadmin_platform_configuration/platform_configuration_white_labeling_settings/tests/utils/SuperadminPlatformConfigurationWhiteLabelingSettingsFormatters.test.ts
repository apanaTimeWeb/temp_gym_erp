import { describe, expect, it } from 'vitest';
import { formatWhiteLabelingDate } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/utils/SuperadminPlatformConfigurationWhiteLabelingSettingsFormatters';

describe('formatWhiteLabelingDate', () => {
  it('returns a safe empty marker for invalid values', () => {
    expect(formatWhiteLabelingDate('not-a-date', 'en')).toBe('—');
    expect(formatWhiteLabelingDate(null, 'hi')).toBe('—');
  });
  it('formats valid dates using the active supported locale', () => {
    expect(formatWhiteLabelingDate('2025-01-02T00:00:00.000Z', 'en')).toBe('Jan 2, 2025');
    expect(formatWhiteLabelingDate('2025-01-02T00:00:00.000Z', 'hi')).toContain('2025');
  });
});
