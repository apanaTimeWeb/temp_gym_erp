'use client';
import { useTranslations } from 'next-intl';
export default function Error({ reset }: { error: Error; reset: () => void }) {
 const t=useTranslations('superadmin_platform_configuration_features');
 return <div role="alert" className="rounded-xl border border-border bg-danger-bg p-6"><p className="text-danger">{t('ui.feature_data_could_not_be_loaded_2c1bc05')}</p><button type="button" onClick={reset} className="mt-3 min-h-11 rounded bg-card px-4 text-primary focus-visible:ring-2 focus-visible:ring-primary">{t('ui.try_again_94b8c58')}</button></div>;
}
