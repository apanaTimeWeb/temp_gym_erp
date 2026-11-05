// RESPONSIBILITY: Composes the leave-request screen and modal views; scheduling and persistence logic stay in hooks.
"use client";
import { useTranslations } from 'next-intl';
import TrainerScheduleLeaveRequests from './TrainerOperationsLeaveRequestsScheduleLeaveRequests';
import TrainerScheduleRequestLeaveModal from './TrainerOperationsLeaveRequestsScheduleRequestLeaveModal';
export default function TrainerOperationsLeaveRequestsMain() {
 const t=useTranslations('TRAINER_SCHEDULE');
 return <main className="min-h-full space-y-5 p-4 sm:p-6"><h1 className="text-section-title font-bold text-primary">{t('TEXT_LEAVE_REQUESTS')}</h1><TrainerScheduleLeaveRequests/><TrainerScheduleRequestLeaveModal/></main>;
}
