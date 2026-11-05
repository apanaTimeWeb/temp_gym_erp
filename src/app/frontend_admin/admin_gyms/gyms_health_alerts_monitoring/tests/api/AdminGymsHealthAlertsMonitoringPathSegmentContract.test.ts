import { describe, expect, it } from 'vitest';
import { ADMIN_GYM_HEALTH_ALERTS_DISMISS_URL } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/config/admin_gyms_health_alerts_monitoring.url_config';

describe('AdminGymsHealthAlertsMonitoring URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_GYM_HEALTH_ALERTS_DISMISS_URL('valid-1')).toBe("/admin/gym-health-alerts/valid-1/dismiss");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_GYM_HEALTH_ALERTS_DISMISS_URL('a/b?x#y')).toBe("/admin/gym-health-alerts/a%2Fb%3Fx%23y/dismiss");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_GYM_HEALTH_ALERTS_DISMISS_URL(id)).toThrow(TypeError);
  });
});
