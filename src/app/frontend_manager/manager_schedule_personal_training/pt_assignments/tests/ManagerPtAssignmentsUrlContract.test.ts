import { MANAGER_PT_ASSIGNMENTS_API } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/config/manager_pt_assignments.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_pt API URL contract', () => {
  it('matches the feature API contract for ASSIGNMENTS', () => { expect(MANAGER_PT_ASSIGNMENTS_API.ASSIGNMENTS).toBe("/api/v1/manager/pt/assignments"); });
  it('matches the feature API contract for COMPLETE_SESSION', () => { expect(MANAGER_PT_ASSIGNMENTS_API.COMPLETE_SESSION('sample-id')).toBe("/api/v1/manager/pt/assignments/sample-id/complete-session"); });
  it('matches the feature API contract for KPIS', () => { expect(MANAGER_PT_ASSIGNMENTS_API.KPIS).toBe("/api/v1/manager/pt/kpis"); });
  it('matches the feature API contract for PACKAGES', () => { expect(MANAGER_PT_ASSIGNMENTS_API.PACKAGES).toBe("/api/v1/manager/pt/packages"); });
  it('matches the feature API contract for WORKLOAD', () => { expect(MANAGER_PT_ASSIGNMENTS_API.WORKLOAD).toBe("/api/v1/manager/pt/workload"); });
});
