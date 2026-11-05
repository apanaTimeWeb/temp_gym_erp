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
  return <main data-testid="trainer-canonical-account_personal_profile" className="mx-auto max-w-3xl space-y-5 p-4 text-primary sm:p-6">
    <h1 className="text-section-title font-bold">{t('TEXT_PERSONAL_INFORMATION')}</h1>
    <TrainerProfilePersonalView profileForm={model.profileForm} user={model.user}
      saveProfile={model.saveProfile} saveProfilePending={model.saveProfilePending} />
  </main>;
}
