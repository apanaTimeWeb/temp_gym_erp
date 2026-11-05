// RESPONSIBILITY: Renders the use Superadmin Profile Page.test component and its associated UI logic.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act } from '@testing-library/react';
import { beforeEach, expect, describe, it } from 'vitest';

import { useSuperadminAccountProfileOverviewPage } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewPage';
import { resetSuperadminAccountProfileMockState } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/mocks/handlers/SuperadminAccountProfileOverviewMockHandlers';



const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
    },
});
const wrapper = ({ children }: {
    children: React.ReactNode;
}) => (<QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>);
beforeEach(() => {
  resetSuperadminAccountProfileMockState();
});

describe('useSuperadminAccountProfileOverviewPage hook', () => {
    it('owns only personal profile and export operations', () => {
      const { result } = renderHook(() => useSuperadminAccountProfileOverviewPage(), { wrapper });
      expect(result.current.personalState).toBe('idle');
      expect(result.current).not.toHaveProperty('updatePassword');
      expect(result.current).not.toHaveProperty('toggleTwoFactor');
    });
});
