import { fireEvent, render, screen } from '@testing-library/react';
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';

import ManagerNavigationSidebar from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationSidebar';
import { MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationConfig';

const mockPathname = vi.hoisted(() => ({ value: '/frontend_manager/manager_dashboard/dashboard_overview' }));
const translations: Record<string, string> = {
  NAV_DOMAIN_DASHBOARD: 'Dashboard', NAV_BUSINESS_SETTINGS: 'Business Settings', NAV_PROFILE_SECURITY: 'Profile & Security', NAV_DOMAIN_INQUIRIES_CRM: 'Inquiries & CRM', NAV_DOMAIN_MEMBERS: 'Members',
  NAV_DOMAIN_ATTENDANCE: 'Attendance', NAV_DOMAIN_MEMBERSHIP_PLANS: 'Membership Plans', NAV_DOMAIN_SALES_BILLING: 'Sales & Billing',
  NAV_DOMAIN_FINANCE_EXPENSES: 'Finance & Expenses', NAV_DOMAIN_MAINTENANCE: 'Maintenance', NAV_DOMAIN_GRIEVANCES: 'Grievances',
  NAV_DOMAIN_STAFF_HR: 'Staff & HR', NAV_DOMAIN_SCHEDULE_PT: 'Schedule & Personal Training', NAV_DOMAIN_WORKOUT_DIET_LIBRARY: 'Workout & Diet Library',
  NAV_DOMAIN_COMMUNICATIONS: 'Communications', NAV_DOMAIN_REPORTS_REFERRALS: 'Reports & Referrals',
  NAV_FINANCE_SUMMARY: 'Financial Summary', NAV_EXPENSE_REGISTER: 'Expense Register & Reports', NAV_TRAINER_SCHEDULE: 'Trainer Schedule',
  NAV_PT_ASSIGNMENTS: 'Personal Training', NAV_WORKOUT_PLANS: 'Workout Plans', NAV_ASSIGNED_WORKOUTS: 'Assigned Plans',
  NAV_COMMUNICATIONS_COMPOSE: 'Compose',
  NAV_COMMUNICATIONS_HISTORY: 'History', NAV_COMMUNICATIONS_AUTOMATIONS: 'Automations', NAV_CHURN_RECOVERY: 'Churn Recovery',
  NAV_STAFF_DIRECTORY: 'Staff Directory', NAV_STAFF_ATTENDANCE: 'Staff Attendance', NAV_REFERRALS_REWARDS: 'Referrals & Rewards', NAV_DIET_LIBRARY: 'Diet Library', NAV_EXERCISE_LIBRARY: 'Exercise Library', NAV_REPORTS_OVERVIEW: 'Business Reports',
  NAV_PAYROLL_LEDGER: 'Payroll & Ledger',
  NAV_DOMAIN_HELP_SUPPORT: 'Help & Support',
};
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => translations[key] ?? key }));
vi.mock('next/navigation', () => ({ usePathname: () => mockPathname.value }));
vi.mock('next/link', () => ({ default: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a> }));
vi.mock('next/image', () => ({ default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} /> }));
vi.mock('@/lib/api', () => ({ getUser: () => ({ name: 'Manager', role: 'Manager' }) }));
vi.mock('@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureMounted', () => ({ useManagerInfrastructureMounted: () => true }));

describe('ManagerNavigationSidebar uses the approved 15-domain structure', () => {
  it('defines 15 top-level domain rows and exposes 28 leaf destinations with seven expandable domains', () => {
    expect(MANAGER_NAV_GROUPS).toHaveLength(15);
    expect(MANAGER_NAV_GROUPS.flatMap((group) => group.items)).toHaveLength(28);
    expect(MANAGER_NAV_GROUPS.filter((group) => group.collapsible)).toHaveLength(7);
    expect(new Set(MANAGER_NAV_GROUPS.flatMap((group) => group.items.map((item) => item.href))).size).toBe(28);
    expect(MANAGER_NAV_GROUPS.map((group) => group.groupKey)).toEqual([
      'NAV_DOMAIN_DASHBOARD', 'NAV_DOMAIN_INQUIRIES_CRM', 'NAV_DOMAIN_MEMBERS', 'NAV_DOMAIN_ATTENDANCE',
      'NAV_DOMAIN_MEMBERSHIP_PLANS', 'NAV_DOMAIN_SALES_BILLING', 'NAV_DOMAIN_FINANCE_EXPENSES',
      'NAV_DOMAIN_MAINTENANCE', 'NAV_DOMAIN_GRIEVANCES', 'NAV_DOMAIN_STAFF_HR', 'NAV_DOMAIN_SCHEDULE_PT',
      'NAV_DOMAIN_WORKOUT_DIET_LIBRARY', 'NAV_DOMAIN_COMMUNICATIONS', 'NAV_DOMAIN_REPORTS_REFERRALS',
      'NAV_DOMAIN_HELP_SUPPORT',
    ]);
  });

  it('renders expandable domain groups with accessible state and auto-expands the active feature', () => {
    mockPathname.value = '/frontend_manager/manager_finance_expenses/finance_payments_and_summary';
    render(<ManagerNavigationSidebar isCollapsed={false} setIsCollapsed={vi.fn()} />);
    const financeGroup = screen.getByRole('button', { name: 'Finance & Expenses navigation submenu' });
    expect(financeGroup).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Financial Summary' })).toHaveAttribute('aria-current', 'page');
    fireEvent.click(financeGroup);
    expect(financeGroup).toHaveAttribute('aria-expanded', 'false');
  });

  it('filters sibling destinations by translated child labels', () => {
    mockPathname.value = '/frontend_manager/manager_dashboard/dashboard_overview';
    render(<ManagerNavigationSidebar isCollapsed={false} setIsCollapsed={vi.fn()} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'COPY_SEARCH_MANAGER_NAVIGATION' }), { target: { value: 'Personal Training' } });
    expect(screen.getByRole('link', { name: 'Personal Training' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Trainer Schedule' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Schedule & Personal Training navigation submenu' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('matches translated domain group labels and keeps every destination in the matching group', () => {
    mockPathname.value = '/frontend_manager/manager_dashboard/dashboard_overview';
    render(<ManagerNavigationSidebar isCollapsed={false} setIsCollapsed={vi.fn()} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'COPY_SEARCH_MANAGER_NAVIGATION' }), { target: { value: 'Communications' } });
    expect(screen.getByRole('link', { name: 'Communications' })).toHaveAttribute('href', '/frontend_manager/manager_communications');
    expect(screen.getByRole('link', { name: 'Compose' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'History' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Automations' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Churn Recovery' })).toBeInTheDocument();
  });

  it('matches domainHref values and keeps every destination in the matching group', () => {
    mockPathname.value = '/frontend_manager/manager_dashboard/dashboard_overview';
    render(<ManagerNavigationSidebar isCollapsed={false} setIsCollapsed={vi.fn()} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'COPY_SEARCH_MANAGER_NAVIGATION' }), { target: { value: 'manager_communications' } });
    expect(screen.getByRole('link', { name: 'Communications' })).toHaveAttribute('href', '/frontend_manager/manager_communications');
    expect(screen.getByRole('link', { name: 'Compose' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Churn Recovery' })).toBeInTheDocument();
  });
});
