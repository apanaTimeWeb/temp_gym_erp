// RESPONSIBILITY: Feature-owned loading fallback with stable dimensions and translated accessibility status.
'use client';
import { useTranslations } from 'next-intl';
export default function SuperadminCommunicationNotificationsPageSuspenseSkeleton() {
 const t = useTranslations('ui');
 return <section role="status" aria-label={t('ui.route_loading')} aria-busy="true" data-testid="communication_notifications-route-loading" className="min-h-64 rounded-xl border border-border bg-card p-6 motion-safe:animate-pulse" />;
}
