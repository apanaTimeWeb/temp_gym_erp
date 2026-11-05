// RESPONSIBILITY: Renders/orchestrates SuperadminTeamRolesAndAlertPreferencesPanel within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useEffect, useRef, useState } from 'react';

import { Bell, Loader2, Save } from 'lucide-react';
import { useLocale as useFormatterLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import Panel from '@/components/ui/Panel';

import SuperadminTeamAlertPreferencesEmptyState from '@/app/frontend_superadmin/superadmin_team/team_management/components/team_management_states_and_feedback/SuperadminTeamManagementAlertPreferencesEmptyState';
import SuperadminTeamRoleGroupsEmptyState from '@/app/frontend_superadmin/superadmin_team/team_management/components/team_management_states_and_feedback/SuperadminTeamManagementRoleGroupsEmptyState';
import { getSuperadminTeamAlertTranslationKeys } from '@/app/frontend_superadmin/superadmin_team/team_management/constants/superadmin_team_management_alert_translation_keys.constants';
import { SuperadminTeamAlertPreferenceApiError, useSuperadminTeamManagementAlertPreferences } from '@/app/frontend_superadmin/superadmin_team/team_management/hooks/useSuperadminTeamManagementAlertPreferences';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_team/team_management/utils/SuperadminTeamManagementPresentationFormatters';

import type { SuperadminTeamSectionProps } from '@/app/frontend_superadmin/superadmin_team/team_management/types/superadmin_team_management.types';

/**
 * RESPONSIBILITY: React component SuperadminTeamRolesAndAlertPreferencesPanel owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useEffect, useState
 * MODULE DEPENDENCIES: react, lucide-react, next-intl, sonner, @/components/ui/Panel, @/lib/formatters, @/app/frontend_superadmin/superadmin_team/team_management/components/team_management_states_and_feedback/SuperadminTeamManagementAlertPreferencesEmptyState, @/app/frontend_superadmin/superadmin_team/team_management/components/team_management_states_and_feedback/SuperadminTeamManagementRoleGroupsEmptyState, @/app/frontend_superadmin/superadmin_team/team_management/hooks/useSuperadminTeamManagementAlertPreferences, @/app/frontend_superadmin/superadmin_team/team_management/constants/superadmin_team_management_alert_translation_keys.constants, @/app/frontend_superadmin/superadmin_team/team_management/types/superadmin_team_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders Superadmin roles and editable alert preferences; mutation orchestration stays inside this feature panel.


/**
 * @description Owns the SuperadminTeamRolesAndAlertPreferencesPanel responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminTeamManagementRolesAndAlertPreferencesPanel({ data }: SuperadminTeamSectionProps) {
 const formatterLocale = useFormatterLocale();

  const t = useTranslations('superadmin_team');
  const { savePreferences: persistPreferences, isSaving: saving, error: saveError } = useSuperadminTeamManagementAlertPreferences();
  const [draft, setDraft] = useState<Record<string, boolean>>({});
  const lastServerDraftRef = useRef<Record<string, boolean> | null>(null);
  useEffect(() => {
    const nextServerDraft = Object.fromEntries(data.alerts.map((alert) => [alert.name, alert.enabled]));
    const previousServerDraft = lastServerDraftRef.current;
    setDraft((currentDraft) => {
      if (previousServerDraft === null) return nextServerDraft;
      const merged = { ...nextServerDraft };
      for (const [name, currentValue] of Object.entries(currentDraft)) {
        if (currentValue !== previousServerDraft[name]) merged[name] = currentValue;
      }
      return merged;
    });
    lastServerDraftRef.current = nextServerDraft;
  }, [data.alerts]);
  const handleSave = async () => {
    const preferences = data.alerts.map((alert) => ({ name: alert.name, enabled: draft[alert.name] ?? alert.enabled }));
    try {
      const response = await persistPreferences(preferences);
      const savedDraft = Object.fromEntries(preferences.map((preference) => [preference.name, preference.enabled]));
      // Keep the last observed server baseline until the invalidated query returns. This preserves the saved draft if an older cached response briefly arrives first.
      setDraft(savedDraft);
      toast.success(response.message, { id: 'superadmin-team-alert-preferences-saved' });
    } catch (error: unknown) {
      const message = error instanceof SuperadminTeamAlertPreferenceApiError ? error.message : t('ui.save_preferences_failed');
      toast.error(message, { id: 'superadmin-team-alert-preferences-error' });
    }
  };
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2"><Panel title={t('ui.role_groups_02a76b89')} description={t('ui.keep_platform_permissions_separated_by_job_r_0c8af13c')}><div className="space-y-3">{data.roles.length===0?<SuperadminTeamRoleGroupsEmptyState/>:data.roles.map(role=><div key={role.name} className="flex items-center justify-between rounded-lg border border-border bg-input p-3"><div><p className="font-medium text-primary">{role.name}</p><p className="text-xs text-secondary">{role.scope}</p></div><span className="text-sm text-primary">{formatNumber(role.permissions, formatterLocale)} {t('ui.permissions_41275a53')}</span></div>)}</div></Panel><Panel title={t('ui.my_alert_preferences_a765856f')} description={t('ui.choose_which_platform_alerts_the_current_ope_fa28563e')}><div className="space-y-3">{data.alerts.length===0?<SuperadminTeamAlertPreferencesEmptyState/>:data.alerts.map(alert=>{ const alertLabels = getSuperadminTeamAlertTranslationKeys(alert.channel, alert.threshold); return <label key={alert.name} className="flex items-center gap-3 rounded-lg border border-border p-3"><input type="checkbox" checked={draft[alert.name] ?? alert.enabled} disabled={saving} onChange={(event)=>setDraft(prev=>({...prev,[alert.name]:event.target.checked}))} className="size-4 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid={`superadmin_team-superadmin-team-roles-and-alert-preferences-panel-alert-preferences-panel-checkbox-${alert.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}/><Bell size={18} className="text-secondary"/><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-primary">{alert.name}</span><span className="block truncate text-xs text-secondary">{t(alertLabels.channel)} {t('ui.text_176848af')}{t(alertLabels.threshold)}</span></span></label>; })}</div>{saveError ? <p role="alert" className="mt-3 text-sm text-danger">{saveError instanceof SuperadminTeamAlertPreferenceApiError ? saveError.message : t('ui.alert_preferences_save_failed')}</p> : null}<button type="button" disabled={saving} onClick={handleSave} className="mt-4 inline-flex min-w-36 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11 min-w-11" data-testid="superadmin_team-superadmin-team-roles-and-alert-preferences-panel-alert-preferences-panel-button"><Save size={18}/>{saving?<><Loader2 size={18} className="motion-safe:animate-spin"/>{t('ui.saving_575f5f86')}</>:t('ui.save_preferences')}</button></Panel></div>;
}
