// RESPONSIBILITY: Renders Superadmin System Ops Infrastructure Flush Tenant Modal using its declared props and feature-local hooks.
'use client';
import { useMemo, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import SuperadminSystemOpsInfrastructureFlushTenantModalFooter from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureFlushTenantModalFooter';
import SuperadminSystemOpsInfrastructureFlushTenantModalHeader from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureFlushTenantModalHeader';
import SuperadminSystemOpsInfrastructureFlushTenantModalSelectionControls from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureFlushTenantModalSelectionControls';
import SuperadminSystemOpsInfrastructureFlushTenantModalTenantList from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureFlushTenantModalTenantList';
import { useSuperadminSystemOpsInfrastructureDialogA11y } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureDialogA11y';
import { useSuperadminSystemOpsInfrastructureFlushTenantMutation } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureFlushTenantMutation';
import { useSuperadminSystemOpsInfrastructureTenants } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureTenants';
import { useSuperadminSystemOpsInfrastructureUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureUnsavedChangesGuard';

import type { SuperadminFlushTenantModalProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_flush_tenant_modal.types';
import type { SuperadminInfrastructureFlushIntent } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_mutation.types';


/**
 * @description Renders the Superadmin system ops infrastructure flush tenant modal interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminSystemOpsInfrastructureFlushTenantModal({ isOpen, onClose, onFlush }: SuperadminFlushTenantModalProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  const [search, setSearch] = useState('');
  const [selectedTenantIds, setSelectedTenantIds] = useState<string[]>([]);
  const baselineSelectedTenantIdsRef = useRef<string[]>([]);
  const idempotencyIntentRef = useRef<SuperadminInfrastructureFlushIntent | null>(null);
  const { confirm } = useConfirm();
  const tenantsQuery = useSuperadminSystemOpsInfrastructureTenants(isOpen);
  const tenants = tenantsQuery.data?.data ?? [];
  const filteredTenants = useMemo(() => { const query = search.trim().toLowerCase(); return query ? tenants.filter((tenant) => tenant.name.toLowerCase().includes(query) || tenant.id.toLowerCase().includes(query)) : tenants; }, [search, tenants]);
  const flushMutation = useSuperadminSystemOpsInfrastructureFlushTenantMutation(onFlush, selectedTenantIds, idempotencyIntentRef, async () => confirm({ title: t('ui.confirm_flush_tenant_title'), message: t('ui.confirm_flush_tenant_message', { count: selectedTenantIds.length }), confirmText: t('ui.flush_cache_action'), cancelText: t('ui.cancel_action'), type: 'warning' }), (completed) => { if (!completed) { idempotencyIntentRef.current = null; return; } baselineSelectedTenantIdsRef.current = []; setSelectedTenantIds([]); setSearch(''); idempotencyIntentRef.current = null; onClose(); });
  const isDirty = JSON.stringify(selectedTenantIds) !== JSON.stringify(baselineSelectedTenantIdsRef.current);
  const handleClose = () => { if (flushMutation.isPending) return; idempotencyIntentRef.current = null; baselineSelectedTenantIdsRef.current = []; setSelectedTenantIds([]); setSearch(''); onClose(); };
  useSuperadminSystemOpsInfrastructureUnsavedChangesGuard(isOpen && isDirty && !flushMutation.isPending, t('ui.unsaved_cache_flush_selection'));
  const dialogRef = useSuperadminSystemOpsInfrastructureDialogA11y(isOpen, handleClose);
  if (!isOpen) return null;
  const toggleTenant = (tenantId: string) => setSelectedTenantIds((previous) => previous.includes(tenantId) ? previous.filter((id) => id !== tenantId) : [...previous, tenantId]);
  const selectVisibleTenants = () => setSelectedTenantIds((previous) => [...new Set([...previous, ...filteredTenants.map((tenant) => tenant.id)])]);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" role="dialog" aria-modal="true" aria-labelledby="superadmin-flush-tenant-title" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-flush-tenant-modal-dialog" ref={dialogRef}>
      <div className="my-auto flex max-h-dialog-desktop w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:zoom-in-95">
        <div className="shrink-0">
          <SuperadminSystemOpsInfrastructureFlushTenantModalHeader isPending={flushMutation.isPending} onClose={handleClose}/>
          <SuperadminSystemOpsInfrastructureFlushTenantModalSelectionControls search={search} filteredCount={filteredTenants.length} onSearchChange={setSearch} onSelectAll={selectVisibleTenants} onClear={() => setSelectedTenantIds([])}/>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar px-6 pb-6">
          <SuperadminSystemOpsInfrastructureFlushTenantModalTenantList isPending={tenantsQuery.isPending} isError={tenantsQuery.isError} tenants={tenants} filteredTenants={filteredTenants} selectedTenantIds={selectedTenantIds} onRetry={() => void tenantsQuery.refetch()} onToggle={toggleTenant}/>
        </div>
        <div className="shrink-0">
          <SuperadminSystemOpsInfrastructureFlushTenantModalFooter isPending={flushMutation.isPending} isTenantQueryPending={tenantsQuery.isPending} selectedCount={selectedTenantIds.length} onClose={handleClose} onFlush={() => { void flushMutation.mutateAsync().catch(() => false); }}/>
        </div>
      </div>
    </div>
  );
}
