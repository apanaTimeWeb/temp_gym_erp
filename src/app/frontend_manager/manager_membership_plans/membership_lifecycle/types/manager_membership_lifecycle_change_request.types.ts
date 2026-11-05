import type { MANAGER_MEMBERSHIP_LIFECYCLE_PENDING_REQUEST_STATUS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle.constants';
// RESPONSIBILITY: Types for Manager plan-change requests submitted to the backend.
export interface ManagerMembershipLifecycleChangeRequestPayload {
  planId: string;
  note: string;
}

export interface ManagerMembershipLifecycleChangeRequestResponse {
  requestId: string;
  status: typeof MANAGER_MEMBERSHIP_LIFECYCLE_PENDING_REQUEST_STATUS;
}
