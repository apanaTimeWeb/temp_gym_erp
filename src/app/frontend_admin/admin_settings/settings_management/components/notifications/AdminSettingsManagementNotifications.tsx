"use client";
// RESPONSIBILITY: Manages the Notifications settings tab.
// DATA FLOW: feature data/state and user input → AdminSettingsManagementNotifications → accessible UI/events routed to owning hooks (admin_settings/settings_management/components/notifications/AdminSettingsManagementNotifications.tsx)

import { useTranslations } from 'next-intl';
import { resolveAdminSettingsManagementValidationMessage } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementValidationMessages';

import type { NotificationsSettingsType } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementTypes';
import { useAdminSettingsNotificationsForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementForms';
import type { AdminSettingsSortDirection } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementSortTypes';
import { useState, useMemo } from 'react';
import { Save, Loader2, RefreshCw, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import AdminSettingsEmptyState from '@/app/frontend_admin/admin_settings/settings_management/components/empty_state/AdminSettingsManagementEmptyState';
import { ADMIN_SETTINGS_NOTIFICATION_CHANNELS, ADMIN_SETTINGS_NOTIFICATION_EVENTS } from '@/app/frontend_admin/admin_settings/settings_management/constants/AdminSettingsManagementConstants';
import type { AdminSettingsNotificationsProps } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementNotificationsPropsTypes';

/**
 * AdminSettingsManagementNotifications renders the admin settings notifications UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsManagementNotifications: Manages the Notifications settings tab.
 * @dependencies Consumes AdminSettingsTypes, useAdminSettingsForms, AdminSettingsSortTypes, AdminSettingsEmptyState, AdminSettingsConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSettingsManagementNotifications({ initialData }: AdminSettingsNotificationsProps) {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => resolveAdminSettingsManagementValidationMessage(message, (key) => t(key));

  const { form, formValues, mutation, submitForm } = useAdminSettingsNotificationsForm(initialData);

  const onSubmit = (data: NotificationsSettingsType) => submitForm(data);

  const [eventSort, setEventSort] = useState<AdminSettingsSortDirection>('asc');

  const channels = ADMIN_SETTINGS_NOTIFICATION_CHANNELS.map((channel) => ({ ...channel, label: t(channel.labelKey) }));
  const events = useMemo(() => ADMIN_SETTINGS_NOTIFICATION_EVENTS.map((event) => ({ ...event, label: t(event.labelKey) })), [t]);
  const sortedEvents = useMemo(() => [...events].sort((a,b) => eventSort === 'asc' ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)), [eventSort, events]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6" data-testid="admin_settings-admin_settings-notifications-control">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">{t('settings.admin_settings_notifications.text_753a22b2eb')}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-notifications-control-2">
            <RefreshCw size={18}  strokeWidth={2}/> {t('settings.admin_settings_notifications.text_44c57abd88')}</button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-notifications-control-3">
            {mutation.isPending ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> : <Save size={18}  strokeWidth={2}/>} {mutation.isPending ? t('settings.admin_settings_notifications.auto_a9194ac4ba') : t('settings.admin_settings_notifications.auto_d728c9d935')}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-highlight border-b border-border">
                <th scope="col" aria-sort={eventSort === 'asc' ? 'ascending' : 'descending'} className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider" data-testid="admin_settings-admin_settings-notifications-control-4">
                  <button type="button" onClick={() => setEventSort((current) => current === 'asc' ? 'desc' : 'asc')} className="flex min-h-11 items-center gap-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="settings-management-settings-management-notifications-set-event-sort">
                    {t('settings.admin_settings_notifications.text_ad8919ace0')}
                    {eventSort === 'asc' ? <ChevronUp size={18} className="text-primary" aria-hidden="true" strokeWidth={2}/> : <ChevronDown size={18} className="text-primary" aria-hidden="true" strokeWidth={2}/>}
                  </button>
                </th>
                {channels.map(c => (
                  <th key={c.key} scope="col" className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ${c.color}`}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedEvents.length === 0 ? <tr><td colSpan={channels.length + 1}><AdminSettingsEmptyState /></td></tr> : sortedEvents.map((ev, __testIdIndex66) => (
                <tr key={ev.key} className="hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-4 py-3 text-sm text-primary font-medium">{ev.label}</td>
                  {channels.map((c, __testIdIndex69) => {
                    const fieldName = `${c.key}${ev.key}` as keyof NotificationsSettingsType;
                    const isChecked = (formValues[fieldName] ?? initialData[fieldName]) as boolean;
                    return (
                      <td key={c.key} className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => form.setValue(fieldName, !isChecked as Extract<NotificationsSettingsType[typeof fieldName], boolean>, { shouldDirty: true })}
                          aria-label={t('admin_settings_notifications.auto_toggle', { control: c.label, event: ev.label })} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95"
                         data-testid={`admin_settings-admin_settings-notifications-control-5-map66-${__testIdIndex66}-1`}>
                          {isChecked
                            ? <CheckCircle size={18} className="text-success mx-auto"  strokeWidth={2}/>
                            : <XCircle size={18} className="text-secondary mx-auto"  strokeWidth={2}/>}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-border">
          <div>
            <label htmlFor="admin-settings-notifications-expiry-reminder" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_notifications.text_7132b660ce')}</label>
            <input
              aria-describedby={form.formState.errors.expiryReminderDays ? "admin-settings-notifications-expiryReminderDays-error" : undefined} id="admin-settings-notifications-expiry-reminder"
              aria-invalid={Boolean(form.formState.errors.expiryReminderDays)}
              type="number"
              min="1"
              max="30"
              step="1"
              {...form.register('expiryReminderDays', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
             data-testid="admin_settings-admin_settings-notifications-control-6"/>
            {form.formState.errors.expiryReminderDays && <p id="admin-settings-notifications-expiryReminderDays-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.expiryReminderDays.message)}</p>}
          </div>
          <div>
            <label htmlFor="admin-settings-notifications-absence-threshold" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_notifications.text_e2e4f78594')}</label>
            <input
              aria-describedby={form.formState.errors.absenceThresholdDays ? "admin-settings-notifications-absenceThresholdDays-error" : undefined} id="admin-settings-notifications-absence-threshold"
              aria-invalid={Boolean(form.formState.errors.absenceThresholdDays)}
              type="number"
              min="1"
              max="30"
              step="1"
              {...form.register('absenceThresholdDays', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
             data-testid="admin_settings-admin_settings-notifications-control-7"/>
            {form.formState.errors.absenceThresholdDays && <p id="admin-settings-notifications-absenceThresholdDays-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.absenceThresholdDays.message)}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}

