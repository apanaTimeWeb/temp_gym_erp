// Autonomous leaf route for manager_maintenance.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_maintenance/maintenance_requests/components/ManagerMaintenanceRequestsMain';
import Loading from '@/app/frontend_manager/manager_maintenance/maintenance_requests/loading';


export default function ManagerMaintenanceRequestsPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
