import { MANAGER_GRIEVANCE_RESOLUTION_API } from '@/app/frontend_manager/manager_grievances/grievance_resolution/config/manager_grievance_resolution.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_grievance API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_GRIEVANCE_RESOLUTION_API.BASE).toBe("/manager/grievance"); });
  it('matches the feature API contract for RESOLVE', () => { expect(MANAGER_GRIEVANCE_RESOLUTION_API.RESOLVE('sample-id')).toBe("/manager/grievance/sample-id/resolve"); });
});
