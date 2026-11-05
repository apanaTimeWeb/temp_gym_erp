import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminSystemOpsOverviewPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/components/SuperadminSystemOpsOverviewPageSuspenseSkeleton';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('system_ops_overview suspense isolation', () => {
  it('exposes a stable localized busy status without an external feature import', () => {
    render(<SuperadminSystemOpsOverviewPageSuspenseSkeleton />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.getAttribute('aria-label')).toBe('ui.route_loading');
  });
});
