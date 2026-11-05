"use client";
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { logger } from '@/lib/logger';
export default function NotificationsError({error,reset}:{error:Error & {digest?:string};reset:()=>void}){
 const t=useTranslations('superadmin_communication_notifications');
 useEffect(()=>logger.error('Notifications route error',error),[error]);
 return <section role="alert" className="rounded-xl border border-border bg-card p-6 text-danger"><h2>{t('ui.notifications_could_not_be_loaded')}</h2><button className="mt-4 min-h-11 rounded-md bg-primary px-4 py-2 text-on-primary" type="button" onClick={reset}>{t('ui.retry_88c6aec')}</button></section>;
}
