import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/trainer_coaching_exercise_management.url_config';

export default async function TrainerCoachingExerciseManagementNotFound() {
  const t = await getTranslations('TRAINER_WORKOUT');
  return <div className="p-6 text-primary"><p>{t('TEXT_PAGE_NOT_FOUND')}</p><Link href={TRAINER_WORKOUT_URLS.ROUTES.LIST} className="min-h-11 inline-flex items-center underline focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_WORKOUT_EXERCISES')}</Link></div>;
}
