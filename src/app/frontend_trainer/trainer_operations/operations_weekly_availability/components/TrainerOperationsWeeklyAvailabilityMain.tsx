'use client';
// RESPONSIBILITY: Canonical weekly-availability page; leave requests belong to their own leaf.
import { useTranslations } from 'next-intl';
import TrainerScheduleWeeklyAvailability from './TrainerOperationsWeeklyAvailabilityScheduleWeeklyAvailability';
export default function TrainerOperationsWeeklyAvailabilityMain() {
  const t = useTranslations('TRAINER_SCHEDULE');
  return (
    <main data-testid="trainer-canonical-operations_weekly_availability" className="mx-auto min-h-full max-w-screen-xl space-y-5 p-4 sm:p-6">
      <h1 className="text-section-title font-bold text-primary">{t('TEXT_WEEKLY_AVAILABILITY')}</h1>
      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <TrainerScheduleWeeklyAvailability />
      </section>
    </main>
  );
}
