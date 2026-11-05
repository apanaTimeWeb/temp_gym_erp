"use client";
// RESPONSIBILITY: Compatibility hand-off to the independent Account Security route.
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { TRAINER_PROFILE_PAGE_SECURITY } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';

export default function TrainerProfileSecurityView() {
  const t = useTranslations('TRAINER_PROFILE');
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-section-title font-semibold text-primary">{t('TEXT_SECURITY')}</h2>
      <Link href={TRAINER_PROFILE_PAGE_SECURITY} className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        {t('TEXT_SECURITY')}
      </Link>
    </section>
  );
}
