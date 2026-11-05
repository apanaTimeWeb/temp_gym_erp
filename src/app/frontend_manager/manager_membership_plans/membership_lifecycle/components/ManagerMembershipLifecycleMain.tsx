// RESPONSIBILITY: Renders ManagerMembershipLifecycleMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerMembershipLifecycleContent } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecycleContent';

/** @description Orchestrator for the Plans module. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembershipLifecycleMain() {
  return <ManagerMembershipLifecycleContent />;
}
