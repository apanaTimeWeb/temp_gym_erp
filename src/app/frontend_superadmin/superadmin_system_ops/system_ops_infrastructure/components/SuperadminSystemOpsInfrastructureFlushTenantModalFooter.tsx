// RESPONSIBILITY: Renders Superadmin System Ops Infrastructure Flush Tenant Modal Footer using its declared props and feature-local hooks.
'use client';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { SuperadminSystemOpsInfrastructureFlushTenantModalFooterProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_flush_tenant_modal_footer.types';
/**
 * @description Renders the Superadmin system ops infrastructure flush tenant modal footer interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminSystemOpsInfrastructureFlushTenantModalFooter({ isPending, isTenantQueryPending, selectedCount, onClose, onFlush }: SuperadminSystemOpsInfrastructureFlushTenantModalFooterProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  return <div className="flex justify-end gap-3 border-t border-border bg-sidebar px-6 py-5"><button type="button" onClick={onClose} disabled={isPending} className="min-h-11 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-flush-tenant-modal-cancel">{t('ui.cancel_5ab7db1')}</button><button type="button" onClick={onFlush} disabled={selectedCount === 0 || isPending || isTenantQueryPending} className="inline-flex min-h-11 min-w-44 items-center justify-center gap-2 rounded-md border border-border bg-warning-bg px-5 py-2.5 text-sm font-medium text-warning motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-flush-tenant-modal-control">{isPending ? <><Loader2 size={18} className="motion-safe:animate-spin"/>{t('ui.flushing_4c9e01f')}</> : t('ui.flush_tenants')}</button></div>;
}
