// Autonomous leaf route for manager_schedule.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleMain';
import Loading from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/loading';


export default function ManagerTrainerSchedulePage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
