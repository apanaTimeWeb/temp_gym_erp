// Autonomous leaf route for manager_profile.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_dashboard/profile_and_security/components/ManagerProfileAndSecurityMain';
import Loading from '@/app/frontend_manager/manager_dashboard/profile_and_security/loading';

export const dynamic = 'force-dynamic';

export default function ManagerProfileAndSecurityPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
