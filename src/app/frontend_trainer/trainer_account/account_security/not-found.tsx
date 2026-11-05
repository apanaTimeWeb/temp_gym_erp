import { getTranslations } from 'next-intl/server';
export default async function NotFound() {
  const t = await getTranslations('TRAINER_ACCOUNT_SECURITY');
  return <div role="status" className="p-6 text-secondary">{t('TEXT_PAGE_NOT_FOUND')}</div>;
}
