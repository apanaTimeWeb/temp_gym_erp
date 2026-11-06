import { fireEvent, render, screen } from '@testing-library/react';
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import TrainerNavigationSidebar from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationSidebar';
import { TRAINER_NAVIGATION_GROUPS } from '@/app/frontend_trainer/trainer_navigation/config/TrainerNavigationConstants';

const mockPathname = vi.hoisted(() => ({ value: '/frontend_trainer/trainer_dashboard/dashboard_overview' }));
const translations: Record<string, string> = {
  TEXT_DEFAULT_TRAINER_NAME: 'Asha Trainer',
  TEXT_DEFAULT_PERSONAL_TRAINER: 'Personal Trainer',
  TEXT_CLOSE_NAVIGATION_SIDEBAR: 'Close sidebar',
  TEXT_TRAINER_NAVIGATION: 'Trainer navigation',
  TEXT_GYMSMART_TRAINER: 'GymSmart Trainer',
  TEXT_GYMSMART: 'GymSmart',
  TEXT_TRAINER_APP: 'Trainer App',
  TEXT_SEARCH_MENU: 'Search menu',
  TEXT_NO_MATCHES_FOUND: 'No matches found',
  TEXT_NAV_OVERVIEW: 'Overview',
  TEXT_NAV_MEMBERS: 'Members',
  TEXT_NAV_COACHING: 'Coaching',
  TEXT_NAV_OPERATIONS: 'Operations',
  TEXT_NAV_EARNINGS_DOMAIN: 'Earnings',
  TEXT_NAV_ACCOUNT: 'Account',
  TEXT_NAV_DASHBOARD: 'Dashboard',
  TEXT_NAV_MY_MEMBERS: 'My Members',
  TEXT_NAV_WORKOUT_EXERCISES: 'Workout Plans',
  TEXT_NAV_DIET_LIBRARY: 'Diet Library',
  TEXT_NAV_SESSIONS: 'Sessions',
  TEXT_NAV_PROGRESS_TRACKING: 'Progress Tracking',
  TEXT_NAV_ATTENDANCE: 'Attendance',
  TEXT_NAV_SCHEDULE_LEAVES: 'Schedule & Leaves',
  TEXT_NAV_EARNINGS: 'Earnings',
  TEXT_NAV_NOTIFICATIONS: 'Notifications',
  TEXT_NAV_MY_PROFILE: 'My Profile',
};

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => translations[key] ?? key,
}));
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname.value,
}));
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));
vi.mock('@/lib/api', () => ({
  getUser: () => ({ name: 'Asha Trainer', role: 'Personal Trainer' }),
}));

describe('TrainerNavigationSidebar', () => {
  beforeEach(() => {
    mockPathname.value = '/frontend_trainer/trainer_dashboard/dashboard_overview';
  });

  it('renders all navigation groups opened by default', () => {
    render(
      <TrainerNavigationSidebar
        isCollapsed={false}
        setIsCollapsed={vi.fn()}
        isMobileOpen={false}
        setIsMobileOpen={vi.fn()}
      />
    );

    // All 6 group accordion buttons should have aria-expanded="true"
    const overviewButton = screen.getByRole('button', { name: /Overview/i });
    const membersButton = screen.getByRole('button', { name: /Members/i });
    const coachingButton = screen.getByRole('button', { name: /Coaching/i });
    const operationsButton = screen.getByRole('button', { name: /Operations/i });
    const earningsButton = screen.getByRole('button', { name: /Earnings/i });
    const accountButton = screen.getByRole('button', { name: /Account/i });

    expect(overviewButton).toHaveAttribute('aria-expanded', 'true');
    expect(membersButton).toHaveAttribute('aria-expanded', 'true');
    expect(coachingButton).toHaveAttribute('aria-expanded', 'true');
    expect(operationsButton).toHaveAttribute('aria-expanded', 'true');
    expect(earningsButton).toHaveAttribute('aria-expanded', 'true');
    expect(accountButton).toHaveAttribute('aria-expanded', 'true');

    // All 11 navigation links must be visible
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'My Members' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Workout Plans' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Diet Library' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sessions' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Progress Tracking' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Attendance' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Schedule & Leaves' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Earnings' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Notifications' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'My Profile' })).toBeInTheDocument();
  });

  it('toggles group accordion closed and open on click', () => {
    render(
      <TrainerNavigationSidebar
        isCollapsed={false}
        setIsCollapsed={vi.fn()}
        isMobileOpen={false}
        setIsMobileOpen={vi.fn()}
      />
    );

    const coachingButton = screen.getByRole('button', { name: /Coaching/i });
    expect(coachingButton).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    fireEvent.click(coachingButton);
    expect(coachingButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand again
    fireEvent.click(coachingButton);
    expect(coachingButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('expands sidebar when collapsed and expand search button is clicked', () => {
    const setIsCollapsed = vi.fn();
    render(
      <TrainerNavigationSidebar
        isCollapsed={true}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={false}
        setIsMobileOpen={vi.fn()}
      />
    );

    const expandSearchBtn = screen.getByTestId('trainer_navigation-sidebar-expand_search');
    fireEvent.click(expandSearchBtn);
    expect(setIsCollapsed).toHaveBeenCalledWith(false);
  });

  it('filters navigation items via search input', () => {
    render(
      <TrainerNavigationSidebar
        isCollapsed={false}
        setIsCollapsed={vi.fn()}
        isMobileOpen={false}
        setIsMobileOpen={vi.fn()}
      />
    );

    const searchInput = screen.getByTestId('trainer_navigation-sidebar-search');
    fireEvent.change(searchInput, { target: { value: 'Diet' } });

    expect(screen.getByRole('link', { name: 'Diet Library' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Dashboard' })).not.toBeInTheDocument();
  });
});

