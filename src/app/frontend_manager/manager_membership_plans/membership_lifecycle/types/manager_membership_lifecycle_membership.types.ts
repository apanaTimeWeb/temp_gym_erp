// RESPONSIBILITY: API types and form shapes for Manager plan membership lifecycle actions.

export interface ManagerMembershipLifecycleMemberOption {
  id: string;
  name: string;
  phone: string;
  status: string;
  planName: string;
  planId: string;
  expiryDate: string;
}

export interface ManagerMembershipLifecycleRenewalCandidate extends ManagerMembershipLifecycleMemberOption {}

export interface ManagerMembershipLifecycleMembershipOverview {
  memberOptions: ManagerMembershipLifecycleMemberOption[];
  renewalCandidates: ManagerMembershipLifecycleRenewalCandidate[];
}

export interface ManagerMembershipLifecycleActivatePayload {
  memberId: string;
  planId: string;
  startDate: string;
}

export interface ManagerMembershipLifecycleRenewPayload {
  memberId: string;
  planId: string;
  newExpiryDate: string;
}

export interface ManagerMembershipLifecycleFreezePayload {
  memberId: string;
  freezeFrom: string;
  freezeUntil: string;
}
