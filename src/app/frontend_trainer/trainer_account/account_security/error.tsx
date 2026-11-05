'use client';
import { useTranslations } from 'next-intl';
export default function Error({reset}:{error:Error;reset:()=>void}) {
 const t = useTranslations('TRAINER_ACCOUNT_SECURITY');
 return <div role="alert" className="p-6 text-danger"><p>{t('TEXT_UNABLE_TO_LOAD_YOUR_PROFILE')}</p><button type="button" className="min-h-11 underline" onClick={reset}>{t('TEXT_RETRY')}</button></div>;
}
