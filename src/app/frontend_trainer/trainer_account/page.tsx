import { redirect } from 'next/navigation';
import { TRAINER_NOTIFICATIONS_URLS } from '@/app/frontend_trainer/trainer_account/account_notifications/config/trainer_account_notifications.url_config';

export default function TrainerDomainIndex(){redirect(TRAINER_NOTIFICATIONS_URLS.ROUTES.LIST);}
