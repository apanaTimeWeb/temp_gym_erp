import type { ComponentProps, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const routeState = vi.hoisted(() => ({ pathname: '/frontend_trainer/trainer_account/account_personal_profile' }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => ({
  TEXT_BREADCRUMBS: 'Breadcrumb', TEXT_NAV_DASHBOARD: 'Dashboard', TEXT_DASHBOARD_TITLE: 'Dashboard', TEXT_PROFILE_TITLE: 'My Profile',
  TEXT_DEFAULT_SHELL_TITLE: 'Trainer workspace',
}[key] ?? key) }));
vi.mock('next/navigation', () => ({ usePathname: () => routeState.pathname }));
vi.mock('next/link', () => ({ default: ({ href, children, ...props }: { href: string; children: ReactNode } & Omit<ComponentProps<'a'>, 'href' | 'children'>) => <a href={href} {...props}>{children}</a> }));

import TrainerNavigationBreadcrumbs from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationBreadcrumbs';

beforeEach(() => { routeState.pathname = '/frontend_trainer/trainer_account/account_personal_profile'; });

describe('TrainerNavigationBreadcrumbs', () => {
  it('renders a localized parent link and the current page', () => {
    render(<TrainerNavigationBreadcrumbs />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/frontend_trainer/trainer_dashboard/dashboard_overview');
    expect(screen.getByText('My Profile').closest('li')).toHaveAttribute('aria-current', 'page');
  });

  it('does not repeat Dashboard as a parent when Dashboard is the current page', () => {
    routeState.pathname = '/frontend_trainer/trainer_dashboard/dashboard_overview';
    render(<TrainerNavigationBreadcrumbs />);
    expect(screen.queryByRole('link', { name: 'Dashboard' })).not.toBeInTheDocument();
    expect(screen.getByText('Dashboard').closest('li')).toHaveAttribute('aria-current', 'page');
  });
});
