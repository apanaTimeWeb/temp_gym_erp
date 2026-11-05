import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminSupportTicketsMain from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_main/SuperadminSupportTicketsManagementMain';

import type { ReactNode } from 'react';

const mockViewModel = vi.hoisted(() => ({ useSuperadminSupportTicketsManagementMainViewModel: vi.fn() }));

vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementMainViewModel', () => ({
  useSuperadminSupportTicketsManagementMainViewModel: mockViewModel.useSuperadminSupportTicketsManagementMainViewModel,
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/components/ui/Pagination', () => ({ default: () => null }));
vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_header/SuperadminSupportTicketsManagementHeader', () => ({ default: () => null }));
vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_reply_modal/SuperadminSupportTicketsManagementReplyModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_modals/SuperadminSupportTicketsManagementDetailModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_table/SuperadminSupportTicketsManagementTable', () => ({ default: () => null }));
vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/SuperadminSupportTicketsManagementErrorBoundary', () => ({ SuperadminSupportTicketsManagementErrorBoundary: ({ children }: { children: ReactNode }) => children }));

describe('SuperadminSupportTicketsMain error recovery', () => {
  it('exposes a retry action when the ticket list fails to load', () => {
    mockViewModel.useSuperadminSupportTicketsManagementMainViewModel.mockReturnValue({
      isPending: false, isError: true, t: (key: string) => key, refetch: vi.fn(),
    });
    render(<SuperadminSupportTicketsMain />);
    expect(screen.getByRole('alert')).toBeVisible();
    expect(screen.getByRole('button', { name: 'ui.try_again_bb14de8' })).toBeVisible();
  });
});
