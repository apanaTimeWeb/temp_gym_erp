import { describe, expect, it } from 'vitest';
import { getSuperadminSupportTicketsSlaRemainingMs } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/utils/SuperadminSupportTicketsManagementSlaUtils';

describe('getSuperadminSupportTicketsSlaRemainingMs', () => {
  it('returns a remaining duration for a valid deadline', () => expect(getSuperadminSupportTicketsSlaRemainingMs('2026-10-15T12:00:00Z', Date.parse('2026-10-15T11:00:00Z'))).toBe(3600000));
  it('returns null for missing or invalid deadlines', () => { expect(getSuperadminSupportTicketsSlaRemainingMs(null)).toBeNull(); expect(getSuperadminSupportTicketsSlaRemainingMs('not-a-date')).toBeNull(); });
});
