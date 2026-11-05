vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => ({ 'ui.your_message_5fbe072': 'Your Message', 'ui.send_reply_ea329ca': 'Send Reply' }[key] ?? key), useLocale: () => 'en-IN' }));
// RESPONSIBILITY: Renders the SuperadminSupportTicketsReplyModal.test overlay UI and delegates submission or mutation behavior to module-owned hooks/callbacks.
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminSupportTicketsReplyModal from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_reply_modal/SuperadminSupportTicketsManagementReplyModal';
import { useSuperadminSupportTicketsManagementTicketReply } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementTicketReply';
import { resetSuperadminSupportTicketsMockState } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/handlers/SuperadminSupportTicketsManagementMockHandlers';



vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementTicketReply', () => ({ useSuperadminSupportTicketsManagementTicketReply: vi.fn() }));
vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementUnsavedChangesGuard', () => ({ useSuperadminSupportTicketsManagementUnsavedChangesGuard: vi.fn() }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockedUseReply = vi.mocked(useSuperadminSupportTicketsManagementTicketReply);
const mockedToast = vi.mocked(toast);

beforeEach(() => {
  resetSuperadminSupportTicketsMockState();
});

describe('SuperadminSupportTicketsReplyModal', () => {
  beforeEach(() => vi.clearAllMocks());

  it('submits the reply through the feature mutation and closes only after success', async () => {
    const sendReply = vi.fn().mockResolvedValue({ success: true, message: 'Reply sent', data: { id: 'TKT-001' } });
    mockedUseReply.mockReturnValue({ sendReply, isSending: false, error: null, abandonReplyIntent: vi.fn() });
    const onClose = vi.fn();
    render(<SuperadminSupportTicketsReplyModal isOpen onClose={onClose} ticketId="TKT-001" />);

    fireEvent.change(screen.getByLabelText('Your Message'), { target: { value: 'We have deployed the requested fix.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Reply' }));

    await waitFor(() => expect(sendReply).toHaveBeenCalledWith({ id: 'TKT-001', values: { replyText: 'We have deployed the requested fix.' } }));
    expect(mockedToast.success).toHaveBeenCalledWith('Reply sent', { id: 'superadmin-ticket-reply-TKT-001' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps the modal open and reports the failure when the send operation rejects', async () => {
    const sendReply = vi.fn().mockRejectedValue(new Error('Ticket reply failed'));
    mockedUseReply.mockReturnValue({ sendReply, isSending: false, error: null, abandonReplyIntent: vi.fn() });
    const onClose = vi.fn();
    render(<SuperadminSupportTicketsReplyModal isOpen onClose={onClose} ticketId="TKT-001" />);

    fireEvent.change(screen.getByLabelText('Your Message'), { target: { value: 'Retry this response.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Reply' }));

    await waitFor(() => expect(mockedToast.error).toHaveBeenCalledWith('ui.action_failed_retry', { id: 'superadmin-ticket-reply-error-TKT-001' }));
    expect(onClose).not.toHaveBeenCalled();
  });
});
