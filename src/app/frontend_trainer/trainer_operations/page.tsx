import { redirect } from 'next/navigation';
import { TRAINER_ATTENDANCE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/config/trainer_operations_member_attendance.url_config';

export default function TrainerDomainIndex(){redirect(TRAINER_ATTENDANCE_URLS.ROUTES.LIST);}
