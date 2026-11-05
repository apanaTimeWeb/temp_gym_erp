// RESPONSIBILITY: Renders the frontend_manager route boundary (MANAGERLayout) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Toaster } from 'sonner';

import { ManagerConfirmProvider } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { ManagerInfrastructureQueryProvider } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureQueryProvider';
import { ManagerInfrastructureDataDensityProvider } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureDataDensityProvider';

import { ManagerMocksMswBrowserBootstrap } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswBrowserBootstrap';

import ManagerNavigationLayout from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationLayout';
import ManagerNavigationRouteProgress from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationRouteProgress';
import type { ManagerRoleLayoutProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationLayoutPropsTypes';
export const metadata = {
  title: 'GymSmart MANAGER | Gym Management System',
  description: 'Complete gym management platform — members, attendance, finance, HR, and more.',
};

/** @description Composes the Manager shell, approved providers, and the zero-business route progress indicator. */
export default function MANAGERLayout({ children }: ManagerRoleLayoutProps) {
  return (
    <>
      <ManagerNavigationRouteProgress />
      <ManagerMocksMswBrowserBootstrap>
        <ManagerInfrastructureQueryProvider>
          <ManagerConfirmProvider>
            <ManagerInfrastructureDataDensityProvider>
              <ManagerNavigationLayout>{children}</ManagerNavigationLayout>
            </ManagerInfrastructureDataDensityProvider>
          </ManagerConfirmProvider>
        </ManagerInfrastructureQueryProvider>
      </ManagerMocksMswBrowserBootstrap>
      <Toaster />
    </>
  );
}
