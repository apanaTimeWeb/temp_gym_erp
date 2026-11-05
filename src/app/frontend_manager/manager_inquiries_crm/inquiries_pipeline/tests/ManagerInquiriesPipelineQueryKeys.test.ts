import { describe, expect, it } from 'vitest';

import { ManagerInquiriesPipelineQueryKeys } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/api/manager_inquiries_pipeline.query_keys';

describe('manager_inquiries query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerInquiriesPipelineQueryKeys.all).toEqual(['manager_inquiries']);
  });
});
