// Preserve the historical domain URL by redirecting to the verified canonical leaf route.
import { redirect } from 'next/navigation';

export default function ManagerSchedulePersonalTrainingDomainRedirectPage() {
  redirect('/frontend_manager/manager_schedule_personal_training/trainer_schedule');
}
