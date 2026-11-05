// Autonomous leaf route for manager_plans.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecycleMain';
import Loading from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/loading';


export default function ManagerMembershipLifecyclePage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
