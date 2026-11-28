'use client';
// RESPONSIBILITY: Canonical Personal Profile screen; Security is an independent sibling route.
import { useTranslations } from 'next-intl';
import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_account/account_personal_profile/hooks/TrainerAccountPersonalProfileuseTrainerInfrastructureUnsavedChangesGuard';
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_account/account_personal_profile/components/TrainerAccountPersonalProfileTrainerInfrastructureSkeletonBlock';
import TrainerProfilePersonalView from './TrainerAccountPersonalProfileProfilePersonalView';
import { useTrainerAccountPersonalProfileDetails } from '../hooks/useTrainerAccountPersonalProfileDetails';

export default function TrainerAccountPersonalProfileDetailsMain() {
  const t = useTranslations('TRAINER_PROFILE');
  const model = useTrainerAccountPersonalProfileDetails();
  useTrainerInfrastructureUnsavedChangesGuard(model.isDirty);
  if (model.isPending) return <div role="status" className="mx-auto max-w-3xl space-y-4 p-6">
    <TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl border border-border" />
    <TrainerInfrastructureSkeletonBlock className="h-72 rounded-xl border border-border" />
  </div>;
  if (model.isError || !model.user) return <div role="alert" className="mx-auto max-w-3xl p-6 text-danger">
    <p>{t('TEXT_UNABLE_TO_LOAD_YOUR_PROFILE')}</p>
    <button type="button" onClick={() => void model.refetchProfile()}
      className="mt-3 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button>
  </div>;
  return <main data-testid="trainer-canonical-account_personal_profile" className="mx-auto max-w-3xl space-y-5 p-4 text-text-primary sm:p-6">
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#141B2D] dark:to-[#0C1220] p-5 shadow-card">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#22D3EE] via-[#38BDF8] to-transparent" />
      <h1 className="text-section-title font-extrabold text-text-primary">{t('TEXT_PERSONAL_INFORMATION')}</h1>
    </div>
    <TrainerProfilePersonalView profileForm={model.profileForm} user={model.user}
      saveProfile={model.saveProfile} saveProfilePending={model.saveProfilePending} />
  </main>;
}
