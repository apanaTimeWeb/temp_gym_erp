import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SuperadminSupportTicketsTable from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_table/SuperadminSupportTicketsManagementTable';
import { MOCK_TICKETS } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/fixtures/SuperadminSupportTicketsManagementMockData';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string, values?: Record<string, unknown>) => values ? `${key} ${Object.values(values).join(' ')}` : key }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock('@/components/ui/CopyButton', () => ({ default: () => null }));
vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_empty_state/SuperadminSupportTicketsManagementEmptyState', () => ({ default: () => <tr><td>No tickets</td></tr> }));

describe('SuperadminSupportTicketsTable interaction closure', () => {
  it('opens ticket inspection from row activation without opening reply', () => {
    const onInspect = vi.fn(); const onReply = vi.fn();
    render(<SuperadminSupportTicketsTable tickets={[MOCK_TICKETS[0]!]} onInspect={onInspect} onReply={onReply} />);
    const row = screen.getByTestId(`superadmin_support_tickets-table-${MOCK_TICKETS[0]!.id}-open`);
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(onInspect).toHaveBeenCalledWith(MOCK_TICKETS[0]!.id);
    expect(onReply).not.toHaveBeenCalled();
  });
  it('keeps the reply button action separate from row inspection', () => {
    const onInspect = vi.fn(); const onReply = vi.fn();
    render(<SuperadminSupportTicketsTable tickets={[MOCK_TICKETS[0]!]} onInspect={onInspect} onReply={onReply} />);
    fireEvent.click(screen.getByRole('button', { name: `ui.a11y_reply_ticket ${MOCK_TICKETS[0]!.id}` }));
    expect(onReply).toHaveBeenCalledWith(MOCK_TICKETS[0]!.id);
    expect(onInspect).not.toHaveBeenCalled();
  });
});
