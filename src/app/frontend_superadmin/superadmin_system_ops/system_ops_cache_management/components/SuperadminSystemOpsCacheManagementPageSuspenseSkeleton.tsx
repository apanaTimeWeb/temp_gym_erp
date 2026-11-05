// RESPONSIBILITY: Feature-owned loading fallback with stable dimensions and translated accessibility status.
'use client';
import { useTranslations } from 'next-intl';
export default function SuperadminSystemOpsCacheManagementPageSuspenseSkeleton() {
 const t = useTranslations('superadmin_system_ops_cache_management');
 return <section role="status" aria-label={t('ui.route_loading')} aria-busy="true" data-testid="system_ops_cache_management-route-loading" className="min-h-64 rounded-xl border border-border bg-card p-6 motion-safe:animate-pulse" />;
}
