import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import messages from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/locales/admin_communication_notices_and_announcements_en.json';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/feedback/AdminCommunicationNoticesAndAnnouncementsConfirmProvider';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsConfirm';
function Consumer() { const { confirm } = useAdminNavigationLayoutConfirm(); return <button type="button" onClick={() => void confirm({ title: 'Review announcement', message: 'Confirm intent', type: 'warning' })}>Open dialog</button>; }
describe('announcement confirmation identity', () => {
  it('resolves the local context and opens an accessible dialog', async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(<NextIntlClientProvider locale="en" messages={messages}><QueryClientProvider client={client}><AdminNavigationLayoutConfirmProvider><Consumer /></AdminNavigationLayoutConfirmProvider></QueryClientProvider></NextIntlClientProvider>);
    screen.getByRole('button', { name: 'Open dialog' }).click();
    expect(await screen.findByRole('dialog', { name: 'Review announcement' })).toHaveAttribute('aria-modal', 'true');
  });
});
