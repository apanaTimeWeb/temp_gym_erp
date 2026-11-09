// RESPONSIBILITY: Renders ManagerMembershipLifecycleContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import ManagerMembershipLifecycleCrudModal from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecycleCrudModal';
import ManagerMembershipLifecycleRequestChangeModal from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecycleRequestChangeModal';
import ManagerMembershipLifecycleTabs from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecycleTabs';


/** @description Renders the ManagerMembershipLifecycleContent component for its owning Manager frontend boundary. @dependencies Data flow: useManagerMembershipLifecycleLogic → Tabs, Toolbar, Grid, request-change modal, and create/edit modal. @edge-case Preserves modal lifecycle. */
export function ManagerMembershipLifecycleContent() {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');

  return (
    <div className="min-h-full pb-10">
      

      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{t('COPY_MEMBERSHIP_PLANS')}</h1>
        </div>
        <ManagerMembershipLifecycleTabs  data-testid="manager_plans-managerplanscontent-plans-tabs-1"/>
      </div>

      <ManagerMembershipLifecycleRequestChangeModal />
      <ManagerMembershipLifecycleCrudModal />
    </div>
  );
}
