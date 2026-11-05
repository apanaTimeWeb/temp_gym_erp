import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi, beforeEach, describe, it } from 'vitest';

import SuperadminAccountProfileMain from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/components/profile_overview_main/SuperadminAccountProfileOverviewMain';
import { useSuperadminAccountProfileOverviewPage } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewPage';
import { resetSuperadminAccountProfileMockState } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/mocks/handlers/SuperadminAccountProfileOverviewMockHandlers';

import type { Mock } from 'vitest';

// RESPONSIBILITY: Renders the Profile Main.test component and its associated UI logic.


vi.mock('@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewPage');
vi.mock('@/app/frontend_superadmin/superadmin_account/account_profile_overview/components/profile_overview_avatar_card/SuperadminAccountProfileOverviewAvatarCard', () => ({ default: () => <div data-testid="superadmin_account_profile-superadmin-profile-main-profile-profile-main-control"/> }));
vi.mock('@/app/frontend_superadmin/superadmin_account/account_profile_overview/components/profile_overview_personal_form/SuperadminAccountProfileOverviewPersonalForm', () => ({ default: () => <div data-testid="superadmin_account_profile-superadmin-profile-main-profile-main-control-2"/> }));
beforeEach(() => {
  resetSuperadminAccountProfileMockState();
});

describe('SuperadminAccountProfileMain', () => {
    const mockUseProfilePage = useSuperadminAccountProfileOverviewPage as Mock;
    beforeEach(() => {
        mockUseProfilePage.mockReturnValue({
            activeTab: 'personal',
            setActiveTab: vi.fn(),
            profile: {
                id: '1',
                name: 'Admin',
                email: 'admin@test.com',
                phone: '1234567890',
                role: 'SUPERADMIN',
                twoFactorEnabled: false,
                lastLoginAt: '2024-01-01T00:00:00Z',
                createdAt: '2024-01-01T00:00:00Z',
            },
            profileLoading: false,
            personalState: 'idle',
            updatePersonalMutation: { mutate: vi.fn() },
            passwordState: 'idle',
            updatePasswordMutation: { mutate: vi.fn() },
            twoFAState: 'idle',
            toggle2FAMutation: { mutate: vi.fn() },
        });
    });
    it('renders loading state when profile is loading', () => {
        mockUseProfilePage.mockReturnValue({ profileLoading: true });
        render(<SuperadminAccountProfileMain />);
        expect(screen.getByTestId('superadmin_account_profile-loading-state')).toBeInTheDocument();
    });

    it('renders a recoverable error state when profile loading failed', () => {
        const refetchProfile = vi.fn();
        mockUseProfilePage.mockReturnValue({ profile: null, profileLoading: false, profileError: true, refetchProfile });
        render(<SuperadminAccountProfileMain />);
        expect(screen.getByTestId('superadmin_account_profile-error-state')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('superadmin_account_profile-retry'));
        expect(refetchProfile).toHaveBeenCalledTimes(1);
    });
    it('renders personal form by default', () => {
        render(<SuperadminAccountProfileMain />);
        expect(screen.getByTestId('superadmin_account_profile-superadmin-profile-main-profile-profile-main-control')).toBeInTheDocument();
        expect(screen.getByTestId('superadmin_account_profile-superadmin-profile-main-profile-main-control-2')).toBeInTheDocument();
        expect(screen.queryByTestId('superadmin_account_profile-superadmin-profile-main-profile-main-control-3')).not.toBeInTheDocument();
    });
    it('provides a real sibling route for independent security workflow', () => {
        render(<SuperadminAccountProfileMain />);
        expect(screen.getByText('Security').closest('a')).toHaveAttribute('href', '/frontend_superadmin/superadmin_account/account_security');
    });
});
