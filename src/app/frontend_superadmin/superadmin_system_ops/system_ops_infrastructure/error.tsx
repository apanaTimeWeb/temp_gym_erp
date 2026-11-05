"use client";
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { logger } from '@/lib/logger';
export default function SystemOpsInfrastructureError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('superadmin_system_ops');
  useEffect(() => { logger.error('Infrastructure route error', error); }, [error]);
  return <section role="alert" className="rounded-xl border border-border bg-card p-8 text-center"><h2 className="text-lg font-semibold text-danger">{t('ui.error_title')}</h2><p className="my-3 text-secondary">{t('ui.error_description')}</p><button className="min-h-11 rounded-md bg-primary px-5 py-2 font-semibold text-on-primary focus-visible:ring-2 focus-visible:ring-primary" type="button" onClick={reset}>{t('ui.retry')}</button></section>;
}
