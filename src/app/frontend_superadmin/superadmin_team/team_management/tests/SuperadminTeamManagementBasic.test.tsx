import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminTeamMain from '@/app/frontend_superadmin/superadmin_team/team_management/components/team_management_main/SuperadminTeamManagementMain';
import { useSuperadminTeamManagementPage } from '@/app/frontend_superadmin/superadmin_team/team_management/hooks/useSuperadminTeamManagementPage';
import { SUPERADMIN_TEAM_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_team/team_management/mocks/fixtures/SuperadminTeamManagementMockFixtures';
import { resetSuperadminTeamMockState } from '@/app/frontend_superadmin/superadmin_team/team_management/mocks/handlers/SuperadminTeamManagementMockHandlers';

const createTestQueryClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } });


vi.mock('@/app/frontend_superadmin/superadmin_team/team_management/hooks/useSuperadminTeamManagementPage', () => ({ useSuperadminTeamManagementPage: vi.fn() }));
const mockedUsePage = vi.mocked(useSuperadminTeamManagementPage);
beforeEach(() => {
  resetSuperadminTeamMockState();
});

describe('Superadmin Platform Team', () => {
    beforeEach(() => {
        mockedUsePage.mockReset();
    });
    it('renders loading and real fixture-backed success states', () => {
        mockedUsePage.mockReturnValue({
            data: null,
            isPending: true,
            isError: false,
            refetch: vi.fn(),
        });
        const queryClient = createTestQueryClient();
        const { unmount } = render(<QueryClientProvider client={queryClient}><SuperadminTeamMain /></QueryClientProvider>);
        expect(document.querySelector('[aria-busy="true"]')).not.toBeNull();
        unmount();
        mockedUsePage.mockReturnValue({
            data: SUPERADMIN_TEAM_MOCK_FIXTURE,
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<QueryClientProvider client={createTestQueryClient()}><SuperadminTeamMain /></QueryClientProvider>);
        expect(screen.getByText('Platform Team')).toBeInTheDocument();
        expect(screen.getAllByText('Aarav Mehta')[0]).toBeInTheDocument();
        expect(screen.getAllByText('—')[0]).toBeInTheDocument();
    });
    it('surfaces a retryable error state', () => {
        const refetch = vi.fn();
        mockedUsePage.mockReturnValue({
            data: null,
            isPending: false,
            isError: true,
            refetch,
        });
        render(<QueryClientProvider client={createTestQueryClient()}><SuperadminTeamMain /></QueryClientProvider>);
        expect(screen.getByRole('alert')).toHaveTextContent('Platform team data could not be loaded.');
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        expect(refetch).toHaveBeenCalledTimes(1);
    });
    it('renders dedicated empty states when lists contain no records', () => {
        mockedUsePage.mockReturnValue({
            data: { ...SUPERADMIN_TEAM_MOCK_FIXTURE, users: [], roles: [], alerts: [] },
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<QueryClientProvider client={createTestQueryClient()}><SuperadminTeamMain /></QueryClientProvider>);
        expect(screen.getByText('Team members')).toBeInTheDocument();
        expect(screen.getByText('Role groups')).toBeInTheDocument();
        expect(screen.getByText('Alert preferences')).toBeInTheDocument();
    });
});
