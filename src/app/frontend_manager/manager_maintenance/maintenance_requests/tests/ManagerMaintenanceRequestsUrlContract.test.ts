import { MANAGER_MAINTENANCE_REQUESTS_API } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/config/manager_maintenance_requests.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_maintenance API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_MAINTENANCE_REQUESTS_API.BASE).toBe("/manager/maintenance"); });
  it('matches the feature API contract for RESOLVE', () => { expect(MANAGER_MAINTENANCE_REQUESTS_API.RESOLVE('sample-id')).toBe("/manager/maintenance/sample-id/resolve"); });
});
