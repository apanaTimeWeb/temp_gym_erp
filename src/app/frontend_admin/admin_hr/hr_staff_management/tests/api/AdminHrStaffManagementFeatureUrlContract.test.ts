import { describe, expect, it } from 'vitest';
import { ADMIN_HR_ROUTES, ADMIN_HR_API } from '@/app/frontend_admin/admin_hr/hr_staff_management/config/admin_hr_staff_management.url_config';

describe('hr_staff_management route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_HR_ROUTES.root).toBe('/frontend_admin/admin_hr/hr_staff_management'));
});
