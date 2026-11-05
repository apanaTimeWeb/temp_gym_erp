'use client';
import { useSuperadminGymsDetailGhostLoginWorkflow } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/hooks/useSuperadminGymsDetailGhostLoginWorkflow';

/** Detail-page adapter; all Ghost Login side effects are owned by the shared Gym workflow. */
export function useSuperadminGymsDetailActions() {
  const { startGhostLogin, isStartingGhostLogin } = useSuperadminGymsDetailGhostLoginWorkflow();
  return { startGhostLogin, isStartingGhostLogin };
}
