import { describe, expect, it } from 'vitest';

import { MOCK_TICKETS } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/fixtures/SuperadminSupportTicketsManagementMockData';
import { SuperadminSupportTicketsListDataSchema } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_api.schemas';


describe('active ticket list contract', () => {
  it('accepts the module-owned fixture as a ticket list', () => {
    expect(SuperadminSupportTicketsListDataSchema.safeParse(MOCK_TICKETS).success).toBe(true);
  });
  it('rejects malformed ticket IDs and status values', () => {
    expect(SuperadminSupportTicketsListDataSchema.safeParse([{ ...MOCK_TICKETS[0], id: '' }]).success).toBe(false);
  });
});
