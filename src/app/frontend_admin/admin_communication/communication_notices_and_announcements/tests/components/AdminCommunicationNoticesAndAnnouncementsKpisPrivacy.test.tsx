import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminCommunicationNoticesAndAnnouncementsKPIs from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/kpis/AdminCommunicationNoticesAndAnnouncementsKPIs';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en' }));
vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsLogic', () => ({ useAdminAnnouncementsLogic: () => ({kpis: null, kpisStatus: 'error', kpisError: new Error('PRIVATE_DB_SECRET_123'), retryKpis: vi.fn()}) }));
vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/AdminCommunicationNoticesAndAnnouncementsTableSkeleton', () => ({ default: () => null }));
describe('Announcements KPI error privacy', () => {
  it('provides localized retry guidance without exposing backend details', () => {
    render(<AdminCommunicationNoticesAndAnnouncementsKPIs />);
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toContain('announcements.admin_announcements_kpis.loadError');
    expect(alert.textContent).not.toContain('PRIVATE_DB_SECRET_123');
    expect(screen.getByRole('button', { name: 'announcements.admin_announcements_kpis.retry' })).toBeEnabled();
  });
});
