import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentProps, ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const hostApi = vi.hoisted(() => ({
  getUser: vi.fn(() => ({ name: 'Asha Trainer', email: 'asha@example.test', role: 'trainer' })),
  logout: vi.fn(),
}));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/link', () => ({ default: ({ href, children, ...props }: { href: string; children: ReactNode } & Omit<ComponentProps<'a'>, 'href' | 'children'>) => <a {...props} href={href}>{children}</a> }));
vi.mock('@/lib/api', () => hostApi);
vi.mock('@/components/ThemeToggle', () => ({ ThemeToggle: () => <button type="button">Theme</button> }));
vi.mock('@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationTooltip', () => ({ default: ({ children }: { children: React.ReactNode }) => <>{children}</> }));

import TrainerNavigationHeader from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationHeader';
import { TRAINER_NOTIFICATIONS_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_notifications/config/trainer_account_notifications.url_config';
import { TRAINER_PROFILE_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';

beforeEach(() => vi.clearAllMocks());

describe('TrainerNavigationHeader', () => {
  it('exposes accessible shell navigation controls and invokes the typed sidebar callback', () => {
    const onToggleSidebar = vi.fn();
    render(<TrainerNavigationHeader title="Dashboard" subtitle="Your overview" isSidebarCollapsed={false} isMobileSidebarOpen={false} isMobileViewport={false} onToggleSidebar={onToggleSidebar} />);

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'TEXT_OPEN_NOTIFICATIONS' })).toHaveAttribute('href', TRAINER_NOTIFICATIONS_PAGE_LIST);
    const toggle = screen.getByRole('button', { name: 'TEXT_TOGGLE_NAVIGATION_SIDEBAR' });
    expect(toggle).toHaveAttribute('aria-controls', 'trainer-sidebar');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(toggle);
    expect(onToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it('reports mobile drawer state through aria-expanded', () => {
    render(<TrainerNavigationHeader title="Profile" isSidebarCollapsed={false} isMobileSidebarOpen={true} isMobileViewport={true} onToggleSidebar={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'TEXT_TOGGLE_NAVIGATION_SIDEBAR' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens the profile menu, supports arrow-key movement, and restores focus on Escape', async () => {
    render(<TrainerNavigationHeader title="Dashboard" isSidebarCollapsed={false} isMobileSidebarOpen={false} isMobileViewport={false} onToggleSidebar={vi.fn()} />);
    const trigger = screen.getByRole('button', { name: 'TEXT_OPEN_PROFILE_MENU' });
    fireEvent.click(trigger);

    const menu = screen.getByRole('menu', { name: 'TEXT_PROFILE_MENU' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: 'TEXT_MY_PROFILE' })).toHaveAttribute('href', TRAINER_PROFILE_PAGE_LIST);

    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'TEXT_MY_PROFILE' })).toHaveFocus());
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'TEXT_LOG_OUT' })).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });

  it('closes the profile menu when Tab is pressed and invokes host logout from the menu action', () => {
    render(<TrainerNavigationHeader title="Dashboard" isSidebarCollapsed={false} isMobileSidebarOpen={false} isMobileViewport={false} onToggleSidebar={vi.fn()} />);
    const trigger = screen.getByRole('button', { name: 'TEXT_OPEN_PROFILE_MENU' });
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole('menu', { name: 'TEXT_PROFILE_MENU' }), { key: 'Tab' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('menuitem', { name: 'TEXT_LOG_OUT' }));
    expect(hostApi.logout).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
