// Autonomous leaf route for manager_pt.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsMain';
import Loading from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/loading';


export default function ManagerPtAssignmentsPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
