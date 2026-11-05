// RESPONSIBILITY: Pure Trainer domain index; route work is owned by its autonomous submodule.
import { redirect } from 'next/navigation';
import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';

export default function TrainerDashboardIndex() {
  redirect(TRAINER_DASHBOARD_URLS.ROUTES.LIST);
}
