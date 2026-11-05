import { getTranslations } from 'next-intl/server';
export default async function NotFound() {
  const t = await getTranslations('TRAINER_PROGRESS_TRACKING');
  return <div role="status" className="space-y-2 p-6 text-secondary"><h1 className="text-primary font-bold">{t('TEXT_PAGE_NOT_FOUND')}</h1><p>{t('TEXT_PAGE_NOT_FOUND_DESCRIPTION')}</p></div>;
}
