import { redirect } from 'next/navigation';
import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/trainer_coaching_workout_plans.url_config';

export default function TrainerDomainIndex(){redirect(TRAINER_WORKOUT_URLS.ROUTES.LIST);}
