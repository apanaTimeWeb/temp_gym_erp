// RESPONSIBILITY: Renders and orchestrates SuperadminPlatformConfigurationWhiteLabelingDrawer for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlatformConfigurationWhiteLabelingDrawer owned by the superadmin_platform_configuration_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useEffect
 * MODULE DEPENDENCIES: react, lucide-react, next-intl, @/components/ui/Feedback/ConfirmProvider, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/utils/SuperadminPlatformConfigurationWhiteLabelingSettingsFormatters, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/hooks/useSuperadminPlatformConfigurationWhiteLabelingSettingsUpdateDomainStatus, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/state/useSuperadminPlatformConfigurationWhiteLabelingSettingsStore, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings_component.types, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the selected White-labeling domain drawer and delegates status mutations to the feature hook.
import { useEffect, useRef } from 'react';

import { AlertTriangle, CheckCircle, Loader2, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_DNS_GUIDANCE } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';
import { useSuperadminPlatformConfigurationWhiteLabelingSettingsUpdateDomainStatus } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/hooks/useSuperadminPlatformConfigurationWhiteLabelingSettingsUpdateDomainStatus';
import { useSuperadminPlatformConfigurationWhiteLabelingSettingsStore } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/state/useSuperadminPlatformConfigurationWhiteLabelingSettingsStore';
import { formatWhiteLabelingDate } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/utils/SuperadminPlatformConfigurationWhiteLabelingSettingsFormatters';

import type { SuperadminPlatformConfigurationWhiteLabelingDrawerProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings_component.types';


/**
 * @description Owns the SuperadminPlatformConfigurationWhiteLabelingDrawer responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformConfigurationWhiteLabelingSettingsDrawer({ domains }: SuperadminPlatformConfigurationWhiteLabelingDrawerProps) {
  const t = useTranslations('superadmin_platform_configuration_white_labeling');
  const locale = useLocale();
  const { selectedDomainId, setSelectedDomainId } = useSuperadminPlatformConfigurationWhiteLabelingSettingsStore();
  const { mutateAsync: updateStatus, isPending } = useSuperadminPlatformConfigurationWhiteLabelingSettingsUpdateDomainStatus();
  const { confirm } = useConfirm();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const domain = domains.find((item) => item.id === selectedDomainId);

// EFFECT INTENT: Refreshes drawer detail state when the selected domain changes; dependencies intentionally track the selected identifier and owning query state.
  useEffect(() => {
    if (!selectedDomainId) return;
    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setSelectedDomainId(null); return; }
      if (event.key !== 'Tab') return;
      const root = document.getElementById('superadmin-white-labeling-drawer');
      if (!root) return;
      const focusable = Array.from(root.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [selectedDomainId, setSelectedDomainId]);

  if (!domain) return null;

  const markFailed = async () => {
    try {
      const confirmed = await confirm({ title: t('ui.confirm_mark_domain_failed_title_repair'), message: t('ui.confirm_mark_domain_failed_message_repair', { domain: domain.domain }), type: 'danger', confirmText: t('ui.mark_failed_action_repair') });
      if (confirmed) { await updateStatus({ id: domain.id, dto: { status: 'failed' } }); setSelectedDomainId(null); }
    } catch {
      // The mutation hook owns user-visible error feedback; consume rejection at the event boundary.
    }
  };

  const markVerified = async () => {
    try { await updateStatus({ id: domain.id, dto: { status: 'active' } }); setSelectedDomainId(null); }
    catch { /* The mutation hook owns user-visible error feedback. */ }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-overlay backdrop-blur-sm motion-safe:transition-opacity" onClick={() => setSelectedDomainId(null)} aria-hidden="true"  data-testid="superadmin_platform_configuration_white_labeling-superadminwhitelabelingdrawer-interaction-layer-1"/>
      <aside id="superadmin-white-labeling-drawer" className="fixed inset-y-0 end-0 z-40 flex w-full max-w-md flex-col border-s border-border bg-overlay shadow-dialog motion-safe:transition-transform motion-safe:duration-slow" aria-labelledby="superadmin-white-labeling-drawer-title" aria-modal="true" role="dialog" data-testid="superadmin_platform_configuration_white_labeling-drawer-dialog">
        <div className="flex shrink-0 items-center justify-between border-b border-border p-6">
          <div className="min-w-0"><h2 id="superadmin-white-labeling-drawer-title" className="text-xl font-bold text-primary">{t('ui.manage_domain_c24cb688')}</h2><p className="mt-1 truncate text-sm text-secondary" title={domain.gymName}>{domain.gymName}</p></div>
          <button ref={closeButtonRef} type="button" onClick={() => setSelectedDomainId(null)} className="min-h-11 min-w-11 rounded-lg p-2 text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('ui.close_panel_8ead57d8')} data-testid="superadmin_platform_configuration_white_labeling-superadmin-white-labeling-drawer-labeling-drawer-close-panel"><X size={18} aria-hidden="true"/></button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-6 custom-scrollbar">
          <section className="space-y-4"><h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{t('ui.domain_configuration_0b20d625')}</h3><div className="space-y-3 rounded-xl border border-border bg-input p-4 text-sm"><div className="flex items-center justify-between gap-3"><span className="text-secondary">{t('ui.target_domain_5d99d075')}</span><span className="max-w-60 truncate rounded-md bg-page px-2 py-1 font-medium text-primary" title={domain.domain}>{domain.domain}</span></div><div className="flex items-center justify-between gap-3"><span className="text-secondary">{t('ui.dns_status_7cb2d2ac')}</span><span className={`${(() => { if (domain.status === 'active') { return ('text-success'); } if (domain.status === 'failed') { return ('text-danger'); } return ('text-warning'); })()} font-medium`}>{t(`ui.status_${domain.status}`)}</span></div><div className="flex items-center justify-between gap-3"><span className="text-secondary">{t('ui.ssl_certificate_880b12b8')}</span><span className={`${(() => { if (domain.sslStatus === 'issued') { return ('text-success'); } if (domain.sslStatus === 'failed') { return ('text-danger'); } return ('text-warning'); })()} font-medium`}>{t(`ui.status_${domain.sslStatus}`)}</span></div><div className="flex items-center justify-between gap-3"><span className="text-secondary">{t('ui.added_on_70e4179a')}</span><span className="text-primary">{formatWhiteLabelingDate(domain.createdAt, locale)}</span></div></div></section>

          <section className="space-y-4"><h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{t('ui.branding_profile_825a9821')}</h3><div className="space-y-4 rounded-xl border border-border bg-input p-4"><div className="flex items-center gap-4"><span className="w-24 shrink-0 text-sm text-secondary">{t('ui.app_logo_607422d6')}</span>{domain.logoUrl ? <span className="truncate text-sm font-medium text-primary" title={domain.logoUrl}>{t('ui.configured_61aa63eb')}</span> : <span className="rounded-md border border-border bg-page px-3 py-1.5 text-sm font-medium text-primary">{t('ui.not_provided_99817313')}</span>}</div><div className="flex items-center gap-4"><span className="w-24 shrink-0 text-sm text-secondary">{t('ui.theme_color_04975fb6')}</span>{domain.primaryColor ? <div className="flex min-w-0 items-center gap-2"><span className="rounded-full border border-border bg-primary-subtle px-2 py-1 text-xs font-semibold text-primary" aria-hidden="true">{t('ui.color_cb5feb1b')}</span><span className="truncate font-mono text-sm text-primary">{domain.primaryColor}</span></div> : <span className="rounded-md border border-border bg-page px-3 py-1.5 text-sm font-medium text-primary">{t('ui.default_7a1920d6')}</span>}</div></div></section>

          <section className="space-y-4"><h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{t('ui.dns_instructions_for_gym_76c7148d')}</h3><div className="space-y-2 rounded-xl border border-border bg-page p-4 text-sm text-secondary"><p>{t('ui.the_gym_owner_needs_to_add_the_following_dns_56915fbc')}</p><div className="overflow-x-auto rounded-md border border-border bg-input p-3 font-mono text-xs text-primary"><p>{t('ui.type_e659b52e')}{SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_DNS_GUIDANCE.recordType}</p><p>{t('ui.name_4e140ba7')}{SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_DNS_GUIDANCE.recordName}</p><p>{t('ui.value_acdb802b')}{SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_DNS_GUIDANCE.recordValue}</p></div><p className="text-xs text-disabled">{t('ui.dns_propagation_guidance')}</p></div></section>
        </div>

        <div className="shrink-0 space-y-3 border-t border-border bg-page p-6">
          {domain.status !== 'active' ? <button type="button" onClick={() => void markVerified()} disabled={isPending} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-success px-4 py-2.5 font-medium text-on-success motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50" data-testid="superadmin_platform_configuration_white_labeling-superadmin-white-labeling-drawer-white-labeling-drawer-button"><CheckCircle size={18} aria-hidden="true"/>{isPending ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> {t('ui.saving_575f5f86')}</> : <>{t('ui.mark_as_verified_b5ab56d2')}</>}</button> : null}
          {domain.status === 'pending' ? <button type="button" onClick={() => void markFailed()} disabled={isPending} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-danger px-4 py-2.5 font-medium text-on-danger motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50" data-testid="superadmin_platform_configuration_white_labeling-drawer-mark-failed"><AlertTriangle size={18} aria-hidden="true"/>{isPending ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> {t('ui.saving_575f5f86')}</> : <>{t('ui.mark_as_failed_6e0267ce')}</>}</button> : null}
          <button type="button" onClick={() => setSelectedDomainId(null)} className="min-h-11 w-full rounded-lg bg-input px-4 py-2.5 font-medium text-primary hover:bg-surface-highlight motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_platform_configuration_white_labeling-superadmin-white-labeling-drawer-white-labeling-drawer-close">{t('ui.close_d3d2e617')}</button>
        </div>
      </aside>
    </>
  );
}
