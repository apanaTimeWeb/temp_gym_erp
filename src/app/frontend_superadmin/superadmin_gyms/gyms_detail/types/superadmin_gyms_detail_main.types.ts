/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsGymDetailMainTypes owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_gyms/gyms_detail/constants/superadmin_gyms_detail.constants
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import type { SUPERADMIN_GYM_DETAIL_MAIN_TABS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/constants/superadmin_gyms_detail.constants';

// RESPONSIBILITY: Defines the client-only route prop and tab identifiers for the Superadmin Gym Detail view.
export interface SuperadminGymsGymDetailViewProps {
  gymId: string;
}

export type SuperadminGymsGymDetailViewTab = typeof SUPERADMIN_GYM_DETAIL_MAIN_TABS[number]['id'];
