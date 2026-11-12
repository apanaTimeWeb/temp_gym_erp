// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationFeaturesFeatureHistoryModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders one feature flag's change history from the feature-owned API/query boundary.
import { Clock, Loader2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Tooltip from "@/components/ui/Tooltip";

import { useSuperadminPlatformConfigurationFeaturesManagementDialogA11y } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementDialogA11y';
import { useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory';
import { formatDate } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementFormatters';

import type { SuperadminPlatformConfigurationFeaturesFeatureHistoryModalProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_feature_history_modal.types';


/**
 * @description Renders one feature flag's change history from the feature-owned API/query boundary.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminPlatformConfigurationFeaturesManagementFeatureHistoryModal({ isOpen, onClose, flag }: SuperadminPlatformConfigurationFeaturesFeatureHistoryModalProps) {
  const t = useTranslations('superadmin_platform_configuration_features');
  const query = useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory(flag?.id ?? null);
  const dialogRef = useSuperadminPlatformConfigurationFeaturesManagementDialogA11y(isOpen && Boolean(flag), onClose);
  if (!isOpen || !flag) return null;
  return (
    <div className="fixed inset-0 z-40 flex justify-end overflow-y-auto bg-overlay backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in motion-safe:duration-base">
      <div className="flex h-full w-full max-w-md flex-col border-s border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:slide-in-from-right-full motion-safe:duration-slow" role="dialog" aria-modal="true" aria-labelledby="superadmin-feature-history-title" data-testid="superadmin_platform_configuration_features-superadmin-features-feature-history-modal-feature-history-modal-dialog" ref={dialogRef}>
        <div className="shrink-0 flex items-center justify-between border-b border-border p-6">
          <div>
            <h2 id="superadmin-feature-history-title" className="text-xl font-bold text-primary">{t('ui.change_history_7d04950')}</h2>
            <Tooltip content={flag.name}><p className="mt-1 max-w-md truncate text-sm text-secondary">{flag.name}</p></Tooltip>
          </div>
          <button type="button" data-autofocus="true" onClick={onClose} aria-label={t('ui.close_history_7534a40')} className="min-h-11 min-w-11 rounded-lg p-2 text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_platform_configuration_features-superadmin-features-feature-history-modal-feature-history-modal-close">
            <X size={18} strokeWidth={2} aria-hidden="true"/>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-6">
          {(() => { if (query.isPending) { return (<div className="flex min-h-48 items-center justify-center gap-2 text-secondary" aria-busy="true" data-testid="superadmin_platform_configuration_features-feature-history-loading-state"><Loader2 size={18} className="motion-safe:animate-spin"/>  {t('ui.loading_history_fb86e17')}</div>); } if (query.isError) { return (<div role="alert" className="rounded-lg border border-border bg-danger-bg p-4 text-sm text-danger" data-testid="superadmin_platform_configuration_features-superadmin-features-feature-history-modal-feature-history-modal-history">{t('ui.unable_to_load_feature_history_cd86345')} <button  type="button" onClick={() => void query.refetch()} className="min-h-11 ms-1 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_platform_configuration_features-superadmin-features-feature-history-modal-feature-history-modal-retry">{t('ui.retry_3a73ca1')}</button></div>); } if ((query.data?.data?.length ?? 0) === 0) { return (<div className="rounded-lg border border-border bg-card p-6 text-center text-sm text-secondary">{t('ui.no_change_history_is_available_for_this_feature__1357905')}</div>); } return (<div className="relative space-y-6 before:absolute before:inset-0 before:ms-5 before:w-0.5 before:bg-surface-highlight">
              {query.data?.data?.map((log) => (
                <div key={log.id} className="relative flex items-start gap-4">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-border bg-floating text-secondary shadow-card"><Clock size={18} strokeWidth={2} aria-hidden="true"/></div>
                  <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-4 shadow-card">
                    <div className="mb-1 flex items-center justify-between gap-2"><div className="text-sm font-bold text-primary">{log.user}</div><time className="shrink-0 text-xs font-medium text-secondary">{formatDate(log.timestamp)}</time></div>
                    <div className="text-sm text-secondary">{log.action}</div>
                  </div>
                </div>
              ))}
            </div>); })()}
        </div>
      </div>
    </div>
  );
}
