// RESPONSIBILITY: Renders the SuperadminPlatformConfigurationIntegrationsBasic.test UI for the integrations feature. Business/data orchestration is delegated to module-owned hooks.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminPlatformConfigurationIntegrationsMain from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/integrations_management_main/SuperadminPlatformConfigurationIntegrationsManagementMain';
import { useSuperadminPlatformConfigurationIntegrationsManagementPage } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementPage';
import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/mocks/fixtures/SuperadminPlatformConfigurationIntegrationsManagementMockFixtures';



vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementPage', () => ({ useSuperadminPlatformConfigurationIntegrationsManagementPage: vi.fn() }));
const mockedUsePage = vi.mocked(useSuperadminPlatformConfigurationIntegrationsManagementPage);
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
const customRender = (ui: React.ReactElement) => render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
describe('Superadmin Integrations & Developer Access', () => {
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
        const { unmount } = customRender(<SuperadminPlatformConfigurationIntegrationsMain />);
        expect(document.querySelector('[aria-busy="true"]')).not.toBeNull();
        unmount();
        mockedUsePage.mockReturnValue({
            data: SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE,
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        customRender(<SuperadminPlatformConfigurationIntegrationsMain />);
        expect(screen.getByText('Integrations & Developer Access')).toBeInTheDocument();
        expect(screen.getAllByText('Razorpay')).toHaveLength(2);
        expect(screen.getAllByText('—').length).toBeGreaterThan(0);
        expect(screen.getByTestId('superadmin_platform_configuration_integrations-key-revocation-contract-note')).toBeInTheDocument();
    });
    it('surfaces a retryable error state', () => {
        const refetch = vi.fn();
        mockedUsePage.mockReturnValue({
            data: null,
            isPending: false,
            isError: true,
            refetch,
        });
        customRender(<SuperadminPlatformConfigurationIntegrationsMain />);
        expect(screen.getByRole('alert')).toHaveTextContent('Integrations data could not be loaded.');
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        expect(refetch).toHaveBeenCalledTimes(1);
    });
    it('renders dedicated empty states when connection data is empty', () => {
        mockedUsePage.mockReturnValue({
            data: { ...SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE, integrations: [], webhooks: [], keys: [] },
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        customRender(<SuperadminPlatformConfigurationIntegrationsMain />);
        expect(screen.getByText('Connections')).toBeInTheDocument();
        expect(screen.getByText('Webhook deliveries')).toBeInTheDocument();
        expect(screen.getByText('Developer access')).toBeInTheDocument();
    });
});
