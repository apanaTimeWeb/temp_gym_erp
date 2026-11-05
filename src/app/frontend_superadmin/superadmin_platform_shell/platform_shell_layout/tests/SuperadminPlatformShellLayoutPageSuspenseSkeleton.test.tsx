import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/components/SuperadminPlatformShellLayoutPageSuspenseSkeleton';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('platform_shell_layout suspense isolation', () => {
  it('exposes a stable localized busy status without an external feature import', () => {
    render(<SuperadminPlatformShellLayoutPageSuspenseSkeleton />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status).toHaveAccessibleName();
  });
});
