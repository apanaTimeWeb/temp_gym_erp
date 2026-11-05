// RESPONSIBILITY: Pure Trainer domain index; route work is owned by its autonomous submodule.
import { redirect } from 'next/navigation';
import { TRAINER_EARNINGS_URLS } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/config/trainer_earnings_overview_and_ledger.url_config';

export default function TrainerEarningsIndex() {
  redirect(TRAINER_EARNINGS_URLS.ROUTES.LIST);
}
