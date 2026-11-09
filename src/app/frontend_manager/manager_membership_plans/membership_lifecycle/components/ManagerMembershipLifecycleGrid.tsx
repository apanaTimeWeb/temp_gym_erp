// RESPONSIBILITY: Renders ManagerMembershipLifecycleGrid's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import ManagerMembershipLifecycleEmptyState from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecycleEmptyState';
import ManagerMembershipLifecyclePlanCard from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecyclePlanCard';
import { useManagerMembershipLifecycleLogic } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleLogic';


/** @description Renders the ManagerMembershipLifecycleGrid component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves loading state, empty state, error state. */
export default function ManagerMembershipLifecycleGrid() {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');
  const { filteredPlans, isPending, isError, errorMessage, search } = useManagerMembershipLifecycleLogic();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3].map(i => (
          <div key={`plan-skeleton-${i}`} className="h-64 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 text-center space-y-3">
        <p className="text-sm text-danger-text font-medium">Failed to load plans</p>
      </div>
    );
  }

  if (filteredPlans.length === 0) { return <ManagerMembershipLifecycleEmptyState search={search} />; }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {filteredPlans.map(plan => (
        <ManagerMembershipLifecyclePlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
