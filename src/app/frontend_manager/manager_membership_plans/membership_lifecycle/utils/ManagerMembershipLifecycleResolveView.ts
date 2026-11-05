// RESPONSIBILITY: Validates and resolves Plans view identifiers.
import type { ManagerMembershipLifecycleViewId } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle.types';
import { MANAGER_MEMBERSHIP_LIFECYCLE_DEFAULT_VIEW, MANAGER_MEMBERSHIP_LIFECYCLE_VIEW_IDS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle_view.constants';

export function resolveManagerMembershipLifecycleView(value: string | null | undefined): ManagerMembershipLifecycleViewId {
  return MANAGER_MEMBERSHIP_LIFECYCLE_VIEW_IDS.includes(value as ManagerMembershipLifecycleViewId) ? value as ManagerMembershipLifecycleViewId : MANAGER_MEMBERSHIP_LIFECYCLE_DEFAULT_VIEW;
}
