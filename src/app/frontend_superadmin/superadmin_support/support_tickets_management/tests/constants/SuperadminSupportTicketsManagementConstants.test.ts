import { describe, expect, it } from 'vitest';
import { PriorityColors, StatusColors, SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES, SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/constants/superadmin_support_tickets_management.constants';

describe('ticket status and priority token mappings', () => {
  it('maps every supported status to its semantic text token', () => {
    expect(StatusColors[SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.OPEN]).toBe('text-warning');
    expect(StatusColors[SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.IN_PROGRESS]).toBe('text-primary');
    expect(StatusColors[SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.WAITING]).toBe('text-warning');
    expect(StatusColors[SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.RESOLVED]).toBe('text-success');
    expect(StatusColors[SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.CLOSED]).toBe('text-secondary');
  });
  it('maps each priority to the documented semantic token family', () => {
    expect(Object.keys(PriorityColors).sort()).toEqual(Object.values(SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES).sort());
    expect(PriorityColors.CRITICAL).toContain('text-danger');
    expect(PriorityColors.URGENT).toContain('text-warning');
    expect(PriorityColors.LOW).toContain('text-success');
  });
});
