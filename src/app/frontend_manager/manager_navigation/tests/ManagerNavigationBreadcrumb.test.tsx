import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ManagerNavigationBreadcrumb from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationBreadcrumb';
import type { ManagerNavigationBreadcrumbTestLinkProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationLayoutPropsTypes';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/manager/members',
}));

vi.mock('next/link', () => ({
  default: ({ href, children }: ManagerNavigationBreadcrumbTestLinkProps) => <a className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" href={href} data-testid="manager_navigation-managerbreadcrumb-test-interactive">{children}</a>,
}));

vi.mock('lucide-react', () => ({
  ChevronRight: () => <span aria-hidden="true" />,
}));

vi.mock('@/app/frontend_manager/manager_navigation/constants/ManagerNavigationConfig', () => ({
  MANAGER_NAV_GROUPS: [
    { groupKey: 'NAV_GROUP_OVERVIEW', items: [{ href: '/manager/dashboard', labelKey: 'NAV_DASHBOARD' }] },
    { groupKey: 'NAV_GROUP_OPERATIONS', items: [{ href: '/manager/members', labelKey: 'NAV_MEMBER_MANAGEMENT' }] },
  ],
}));

describe('ManagerNavigationBreadcrumb', () => {
  it('renders the dashboard root and active route label', () => {
    render(<ManagerNavigationBreadcrumb />);
    expect(screen.getByTestId('manager-components-breadcrumb')).toBeInTheDocument();
    expect(screen.getByTestId('manager-components-breadcrumb-dashboard-link')).toHaveTextContent('NAV_DASHBOARD');
    expect(screen.getByText('NAV_MEMBER_MANAGEMENT')).toHaveAttribute('aria-current', 'page');
  });
});
