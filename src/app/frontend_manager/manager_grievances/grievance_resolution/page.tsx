// Autonomous leaf route for manager_grievance.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_grievances/grievance_resolution/components/ManagerGrievanceResolutionMain';
import Loading from '@/app/frontend_manager/manager_grievances/grievance_resolution/loading';

export const dynamic = 'force-dynamic';

export default function ManagerGrievanceResolutionPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
