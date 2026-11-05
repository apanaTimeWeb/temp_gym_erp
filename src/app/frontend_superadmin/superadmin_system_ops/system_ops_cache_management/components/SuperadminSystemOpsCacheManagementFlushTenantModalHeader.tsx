// RESPONSIBILITY: Renders Superadmin System Ops Cache Management Flush Tenant Modal Header using its declared props and feature-local hooks.
'use client';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { SuperadminSystemOpsCacheManagementFlushTenantModalHeaderProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/types/superadmin_system_ops_cache_management_flush_tenant_modal_header.types';
/**
 * @description Renders the Superadmin system ops infrastructure flush tenant modal header interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminSystemOpsCacheManagementFlushTenantModalHeader({ isPending, onClose }: SuperadminSystemOpsCacheManagementFlushTenantModalHeaderProps) {
  const t = useTranslations('superadmin_system_ops_cache_management');
  return <div className="flex items-center justify-between border-b border-border px-6 py-5"><div><h2 id="superadmin-flush-tenant-title" className="text-lg font-bold text-primary">{t('ui.flush_specific_tenant_7d43c74')}</h2><p className="text-sm text-secondary">{t('ui.select_tenants_whose_redis_cache_should_be_cleared_04932a1')}</p></div><button type="button" onClick={onClose} disabled={isPending} aria-label={t('ui.close_tenant_cache_flush_dialog_e2d344d')} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95"><X size={18} aria-hidden="true" /></button></div>;
}
