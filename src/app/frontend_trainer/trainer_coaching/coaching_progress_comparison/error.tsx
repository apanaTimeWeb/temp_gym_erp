'use client';
import { useTranslations } from 'next-intl';
export default function Error({reset}:{error:Error;reset:()=>void}) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  return <div role="alert" className="space-y-4 p-6 text-danger"><p>{t('TEXT_GENERIC_REQUEST_ERROR')}</p><button type="button" className="min-h-11 rounded-lg border border-border px-4 focus-visible:ring-2 focus-visible:ring-focus-ring" onClick={reset}>{t('TEXT_RETRY')}</button></div>;
}
