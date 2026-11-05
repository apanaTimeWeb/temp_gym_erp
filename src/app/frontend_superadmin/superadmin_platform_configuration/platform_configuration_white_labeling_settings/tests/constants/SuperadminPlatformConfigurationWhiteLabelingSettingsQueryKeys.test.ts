import { describe, expect, it } from 'vitest';

import { SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/api/superadmin_platform_configuration_white_labeling_settings.query_keys';
import { normalizeWhiteLabelSearch } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';


describe('white-label search identity', () => {
  it('normalizes surrounding and repeated whitespace and casing', () => {
    expect(normalizeWhiteLabelSearch('  GYM   Example  ')).toBe('gym example');
  });
  it('produces the same query key for equivalent search values', () => {
    expect(SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_QUERY_KEYS.domains({ search: ' GYM ', status: 'all' }))
      .toEqual(SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_QUERY_KEYS.domains({ search: 'gym', status: 'all' }));
  });
});
