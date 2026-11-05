import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminCommunicationBroadcastsCampaignsPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/SuperadminCommunicationBroadcastsCampaignsPageSuspenseSkeleton';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('communication_broadcasts_campaigns suspense isolation', () => {
  it('exposes a stable localized busy status without an external feature import', () => {
    render(<SuperadminCommunicationBroadcastsCampaignsPageSuspenseSkeleton />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.getAttribute('aria-label')).toBe('ui.route_loading');
  });
});
