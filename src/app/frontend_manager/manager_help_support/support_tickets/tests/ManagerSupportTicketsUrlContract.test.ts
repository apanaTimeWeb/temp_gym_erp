import { describe, expect, it } from 'vitest';
import { MANAGER_SUPPORT_TICKETS_ROUTES } from '@/app/frontend_manager/manager_help_support/support_tickets/config/manager_support_tickets.url_config';

describe('ManagerSupportTicketsUrlContract', () => {
  it('exposes authoritative route and endpoint constants', () => {
    expect(MANAGER_SUPPORT_TICKETS_ROUTES.PATHS.LEAF).toBe('/frontend_manager/manager_help_support/support_tickets');
    expect(MANAGER_SUPPORT_TICKETS_ROUTES.API.TICKETS).toBe('/api/v1/manager/support-tickets');
    expect(MANAGER_SUPPORT_TICKETS_ROUTES.API.REPLY('123')).toBe('/api/v1/manager/support-tickets/123/reply');
  });
});

