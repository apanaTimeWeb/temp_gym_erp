import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SuperadminSupportTicketsDetailModal from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_modals/SuperadminSupportTicketsManagementDetailModal';
import { useSuperadminSupportTicketsManagementDetail } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementDetail';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementDetail');
describe('SuperadminSupportTicketsDetailModal', () => {
  it('shows retry feedback when ticket detail fails to load', () => {
    const refetch = vi.fn(); vi.mocked(useSuperadminSupportTicketsManagementDetail).mockReturnValue({ isPending: false, isError: true, data: undefined, refetch } as never);
    render(<SuperadminSupportTicketsDetailModal ticketId="ticket-1" onClose={vi.fn()} onReply={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'actions.retry' })); expect(refetch).toHaveBeenCalledTimes(1);
  });
  it('does not render when no ticket is selected', () => {
    vi.mocked(useSuperadminSupportTicketsManagementDetail).mockReturnValue({ isPending: false, isError: false, data: undefined, refetch: vi.fn() } as never);
    render(<SuperadminSupportTicketsDetailModal ticketId={null} onClose={vi.fn()} onReply={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
