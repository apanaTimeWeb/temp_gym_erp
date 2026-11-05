// RESPONSIBILITY: Renders/orchestrates not-found within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the not-found component and its associated UI logic.
import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { SUPERADMIN_GYMS_DETAIL_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/config/superadmin_gyms_detail.url_config';


/**
 * @description Renders GymNotFound within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function GymNotFound() {
  const t = useTranslations('superadmin_gyms');
    return (<div className="flex flex-col items-center justify-center min-h-96 gap-4 text-center p-8" data-testid="superadmin_gyms-not-found-not-found-not-found">
      <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center shadow-card">
        <span className="text-2xl text-secondary">{t('ui.text_d1457b72')}</span>
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-primary">{t('ui.gym_not_found_653cddd8')}</h2>
        <p className="text-secondary max-w-sm mx-auto">
          {t('ui.the_gym_you_are_looking_for_does_not_exist_o_d3211293')}</p>
      </div>
      <Link href={SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('list')} className="mt-4 px-5 py-2.5 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary-subtle motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" data-testid="superadmin_gyms-not-found-back-to-gyms-directory">
        {t('ui.back_to_gyms_directory_39d3c97f')}</Link>
    </div>);
}
