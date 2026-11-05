// RESPONSIBILITY: Guards the required eight-state mock catalog for inquiries_pipeline.
import { describe, expect, it } from 'vitest';
import { MANAGERINQUIRIESMANAGEMENT_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/mocks/scenarios/ManagerInquiriesPipelineMockScenarios';

describe('ManagerInquiriesPipeline mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERINQUIRIESMANAGEMENT_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
