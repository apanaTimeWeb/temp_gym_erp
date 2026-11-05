import { MANAGER_INQUIRIES_PIPELINE_API } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/config/manager_inquiries_pipeline.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_inquiries API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_INQUIRIES_PIPELINE_API.BASE).toBe("/api/v1/manager/inquiries"); });
  it('matches the feature API contract for CONVERT', () => { expect(MANAGER_INQUIRIES_PIPELINE_API.CONVERT('sample-id')).toBe("/api/v1/manager/inquiries/sample-id/convert"); });
  it('matches the feature API contract for GET_ONE', () => { expect(MANAGER_INQUIRIES_PIPELINE_API.GET_ONE('sample-id')).toBe("/api/v1/manager/inquiries/sample-id"); });
  it('matches the feature API contract for PLANS', () => { expect(MANAGER_INQUIRIES_PIPELINE_API.PLANS).toBe("/api/v1/manager/inquiries/plans"); });
  it('matches the feature API contract for PLANS_SNAPSHOT', () => { expect(MANAGER_INQUIRIES_PIPELINE_API.PLANS_SNAPSHOT).toBe("/api/v1/manager/inquiries/plans-snapshot"); });
  it('matches the feature API contract for STATS', () => { expect(MANAGER_INQUIRIES_PIPELINE_API.STATS).toBe("/api/v1/manager/inquiries/stats"); });
});
