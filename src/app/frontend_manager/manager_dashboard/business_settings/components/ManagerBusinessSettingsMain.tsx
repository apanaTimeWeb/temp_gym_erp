// RESPONSIBILITY: Renders ManagerBusinessSettingsMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import { Building, Clock, Globe, Loader2, Save, ShieldCheck, Users, HardDrive, CheckCircle2, Award, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

import { MANAGER_BUSINESS_SETTINGS_LANGUAGE_OPTIONS, MANAGER_BUSINESS_SETTINGS_TABS, MANAGER_BUSINESS_SETTINGS_TIMEZONE_OPTIONS } from '@/app/frontend_manager/manager_dashboard/business_settings/constants/manager_business_settings.constants';
import { MANAGER_BUSINESS_SETTINGS_GYM_FIELD_LABEL_KEYS, MANAGER_BUSINESS_SETTINGS_GYM_FIELD_LABELS } from '@/app/frontend_manager/manager_dashboard/business_settings/constants/ManagerBusinessSettingsFieldLabels';
import { resolveManagerBusinessSettingsView } from '@/app/frontend_manager/manager_dashboard/business_settings/utils/ManagerBusinessSettingsResolveView';
import { useManagerBusinessSettingsForm } from '@/app/frontend_manager/manager_dashboard/business_settings/hooks/useManagerBusinessSettingsForm';
import type { SettingsTab } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings.types';


/** @description Renders the ManagerBusinessSettingsMain component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (6 documented module/import dependencies).. @edge-case Preserves error state, retry/recovery. */
export default function ManagerBusinessSettingsMain() {
  const t = useTranslations('MANAGER_BUSINESS_SETTINGS');

  const { settings, isPending, isError, error, retry, form, submit } = useManagerBusinessSettingsForm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedView = searchParams.get('view') ?? searchParams.get('tab');
  const [localTab, setLocalTab] = useState<SettingsTab | null>(null);
  const activeTab: SettingsTab = localTab ?? resolveManagerBusinessSettingsView(requestedView);
  const setActiveTab = useCallback((view: SettingsTab) => {
    setLocalTab(view);
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    params.delete('tab');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const { control, register, formState: { errors, isSubmitting } } = form;
  if (isPending && !settings) return <div className="space-y-5 p-6 motion-safe:animate-pulse"><div className="h-8 w-48 rounded bg-skeleton-base" /><div className="h-12 w-96 max-w-full rounded bg-skeleton-base" /><div className="h-96 rounded-xl bg-skeleton-base" /></div>;
  if (isError && !settings) return <div data-testid="manager_settings-manager-settings-main-status" role="alert" className="m-6 flex flex-col gap-3 rounded-xl border border-danger bg-danger-bg p-5 text-sm"><p className="font-semibold text-danger-text">{ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR'))}</p><button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 w-fit rounded-lg bg-primary text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_settings-manager-settings-main-button-action" type="button" onClick={() => void retry()} >{t("COPY_RETRY")}</button></div>;

  return (
    <div className="w-full max-w-5xl space-y-6 bg-page text-text-primary">
      <div><h1 className="text-page-title font-bold text-text-primary">{t("COPY_APP_SETTINGS")}</h1><p className="mt-1 text-sm text-text-secondary">{t("COPY_MANAGE_PREFERENCES_APP_BEHAVIOUR")}</p></div>
      <div data-testid="manager_settings-managersettingsmain-tablist" className="flex max-w-full overflow-x-auto rounded-xl bg-input p-1"role="tablist" aria-label={t("COPY_MANAGER_BUSINESS_SETTINGS_SECTIONS")}>
        {MANAGER_BUSINESS_SETTINGS_TABS.map((tab, mapIndex) => <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-h-11 whitespace-nowrap rounded-lg px-4 text-sm font-medium motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${activeTab === tab.id ? 'bg-card text-primary shadow-card' : 'text-text-secondary hover:bg-surface-hover hover:text-primary'} ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_settings-settings-managersettingsmain-button-app-settings-${mapIndex}`} key={tab.id} id={`manager-settings-tab-${tab.id}`} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`manager-settings-panel-${tab.id}`} onClick={() => setActiveTab(tab.id)} >{t(tab.labelKey)}</button>)}
      </div>
      <form data-testid="manager_settings-managersettingsmain-form-1" onSubmit={submit} className="space-y-6">
        {activeTab === 'region' && <section data-testid="manager_settings-managersettingsmain-tabpanel-1" id="manager-settings-panel-region"role="tabpanel" aria-labelledby="manager-settings-tab-region" className="space-y-5 rounded-xl border border-border bg-card p-5 sm:p-6"><div className="flex items-center gap-2 border-b border-border pb-3"><Globe size={18} strokeWidth={2} className="text-primary" aria-hidden="true"/><h2 className="text-base font-semibold text-text-primary">{t("COPY_REGION_AMP_LANGUAGE")}</h2></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><div><label className="mb-1.5 block text-sm font-medium text-text-secondary">{t("COPY_LANGUAGE")}</label><Controller name="preferences.language" control={control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_LANGUAGE")} dataTestId="manager_settings-managersettingsmain-managersearchabledropdown-1" value={field.value} onChange={field.onChange} options={MANAGER_BUSINESS_SETTINGS_LANGUAGE_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} placeholder={t("COPY_SELECT_LANGUAGE")}  data-testid="manager_settings-managersettingsmain-searchable-dropdown-1"/>} /></div><div><label className="mb-1.5 block text-sm font-medium text-text-secondary">{t("COPY_TIMEZONE")}</label><Controller name="preferences.timezone" control={control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_TIMEZONE")} dataTestId="manager_settings-managersettingsmain-managersearchabledropdown-2" value={field.value} onChange={field.onChange} options={MANAGER_BUSINESS_SETTINGS_TIMEZONE_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} placeholder={t("COPY_SELECT_TIMEZONE")}  data-testid="manager_settings-managersettingsmain-searchable-dropdown-2"/>} /></div></div>{([['preferences.pushNotificationsEnabled','TEXT_PUSH_NOTIFICATIONS','TEXT_PUSH_NOTIFICATIONS_HELP'],['preferences.emailDailyReports','TEXT_EMAIL_DAILY_REPORTS','TEXT_EMAIL_DAILY_REPORTS_HELP']] as const).map(([name,labelKey,descriptionKey], mapIndex) => <Controller key={name} name={name} control={control} render={({ field }) => <label className="flex min-h-11 items-center justify-between gap-4 rounded-xl border border-border bg-input p-3"><div><p className="text-sm font-medium text-primary">{t(labelKey)}</p><p className="mt-0.5 text-xs text-text-secondary">{t(descriptionKey)}</p></div><input data-testid={`manager_settings-settings-managersettingsmain-input-${String(name).replaceAll(".", "-")}`} type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-focus-ring" aria-label={t(labelKey)} /></label>} />)}</section>}

        {activeTab === 'gym_profile' && <section data-testid="manager_settings-managersettingsmain-tabpanel-2" id="manager-settings-panel-gym_profile"role="tabpanel" aria-labelledby="manager-settings-tab-gym_profile" className="space-y-5 rounded-xl border border-border bg-card p-5 sm:p-6"><div className="flex items-center gap-2 border-b border-border pb-3"><Building size={18} strokeWidth={2} className="text-primary" aria-hidden="true" /><h2 className="text-base font-semibold text-text-primary">{t("COPY_GYM_PROFILE")}</h2></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{(Object.keys(MANAGER_BUSINESS_SETTINGS_GYM_FIELD_LABELS) as Array<keyof typeof MANAGER_BUSINESS_SETTINGS_GYM_FIELD_LABELS>).map((fieldName, mapIndex) => { const id = `gym-${String(fieldName)}`; const fieldError = errors.gymProfile?.[fieldName]?.message; return <div key={fieldName}><label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-secondary">{t(MANAGER_BUSINESS_SETTINGS_GYM_FIELD_LABEL_KEYS[fieldName])}</label><input data-testid={`manager_settings-settings-managersettingsmain-input-${String(fieldName)}`} id={id} {...register(`gymProfile.${fieldName}`)} aria-invalid={Boolean(fieldError)} aria-describedby={fieldError ? `${id}-error` : undefined} className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />{fieldError && <p data-testid={`manager_settings-settings-settingsmain-alert-region-andamp-language-${mapIndex}`} id={`${id}-error`} role="alert" className="mt-1 text-xs text-danger-text">{String(fieldError)}</p>}</div>; })}</div></section>}

        {activeTab === 'operating_hours' && <section data-testid="manager_settings-managersettingsmain-tabpanel-3" id="manager-settings-panel-operating_hours"role="tabpanel" aria-labelledby="manager-settings-tab-operating_hours" className="space-y-5 rounded-xl border border-border bg-card p-5 sm:p-6"><div className="flex items-center gap-2 border-b border-border pb-3"><Clock size={18} strokeWidth={2} className="text-primary" aria-hidden="true"/><h2 className="text-base font-semibold text-text-primary">{t("COPY_OPERATING_HOURS")}</h2></div>{(settings?.operatingHours ?? []).map((item, index) => <div key={item.day} className="flex flex-col gap-3 rounded-xl border border-border bg-input p-3 sm:flex-row sm:items-center"><Controller name={`operatingHours.${index}.isOpen`} control={control} render={({ field }) => <label className="flex min-h-11 items-center gap-2 sm:w-32"><input data-testid={`manager_settings-settings-managersettingsmain-input-${item.day}-is-open`} type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-focus-ring" />{item.day}</label>} /><label className="flex flex-1 items-center gap-2 text-xs text-text-secondary">{t("COPY_OPEN")}<input data-testid={`manager_settings-settings-managersettingsmain-input-${item.day}-open-time`} aria-label={t("TEXT_OPENING_TIME_FOR_DAY", { value: item.day })} type="time" {...register(`operatingHours.${index}.openTime`)} className="min-h-11 flex-1 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" /></label><span className="text-text-secondary sm:pt-2">{t("COPY_TEXT")}</span><label className="flex flex-1 items-center gap-2 text-xs text-text-secondary">{t("COPY_CLOSE")}<input data-testid={`manager_settings-settings-managersettingsmain-input-${item.day}-close-time`} aria-label={t("TEXT_CLOSING_TIME_FOR_DAY", { value: item.day })} type="time" {...register(`operatingHours.${index}.closeTime`)} className="min-h-11 flex-1 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" /></label></div>)}</section>}

        {activeTab === 'subscription' && (
          <section
            data-testid="manager_settings-managersettingsmain-tabpanel-subscription"
            id="manager-settings-panel-subscription"
            role="tabpanel"
            aria-labelledby="manager-settings-tab-subscription"
            className="space-y-6 rounded-xl border border-border bg-card p-5 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={22} className="text-primary" />
                <div>
                  <h2 className="text-base font-semibold text-text-primary">Branch SaaS License & Quotas</h2>
                  <p className="text-xs text-text-secondary mt-0.5">Assigned by Superadmin Enterprise Master Account</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-success-bg text-success-text border border-success/30 rounded-lg text-xs font-semibold">
                  <CheckCircle2 size={14} />
                  <span>License Active</span>
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-bold">
                  Enterprise Tier
                </span>
              </div>
            </div>

            {/* Quota meters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-input rounded-xl border border-border space-y-2">
                <div className="flex items-center justify-between text-xs text-text-secondary font-medium">
                  <span className="flex items-center gap-1.5"><Users size={14} className="text-primary" /> Member Capacity</span>
                  <span className="font-bold text-text-primary">84%</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-text-primary">420</span>
                  <span className="text-xs text-text-secondary">/ 500 Max</span>
                </div>
                <div className="w-full bg-card rounded-full h-2 overflow-hidden border border-border/50">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '84%' }} />
                </div>
                <p className="text-[11px] text-text-secondary">80 member slots remaining</p>
              </div>

              <div className="p-4 bg-input rounded-xl border border-border space-y-2">
                <div className="flex items-center justify-between text-xs text-text-secondary font-medium">
                  <span className="flex items-center gap-1.5"><Award size={14} className="text-success-text" /> Staff Seats</span>
                  <span className="font-bold text-text-primary">72%</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-text-primary">18</span>
                  <span className="text-xs text-text-secondary">/ 25 Seats</span>
                </div>
                <div className="w-full bg-card rounded-full h-2 overflow-hidden border border-border/50">
                  <div className="bg-success-text h-2 rounded-full" style={{ width: '72%' }} />
                </div>
                <p className="text-[11px] text-text-secondary">7 staff seats available</p>
              </div>

              <div className="p-4 bg-input rounded-xl border border-border space-y-2">
                <div className="flex items-center justify-between text-xs text-text-secondary font-medium">
                  <span className="flex items-center gap-1.5"><HardDrive size={14} className="text-info-text" /> Cloud Storage</span>
                  <span className="font-bold text-text-primary">25%</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-text-primary">12.4 GB</span>
                  <span className="text-xs text-text-secondary">/ 50 GB</span>
                </div>
                <div className="w-full bg-card rounded-full h-2 overflow-hidden border border-border/50">
                  <div className="bg-info-text h-2 rounded-full" style={{ width: '25%' }} />
                </div>
                <p className="text-[11px] text-text-secondary">37.6 GB high-speed cloud storage free</p>
              </div>
            </div>

            {/* License Details & Enabled Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-input/40 rounded-xl border border-border space-y-3">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Subscription Specifications</h3>
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-text-secondary">SaaS Plan</dt>
                    <dd className="font-semibold text-text-primary">Multi-Branch Enterprise Suite</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-secondary">Billing Cycle</dt>
                    <dd className="font-semibold text-text-primary">Annual (Superadmin Managed)</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-secondary">Validity Period</dt>
                    <dd className="font-semibold text-text-primary">01 Jan 2026 – 31 Dec 2026</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-secondary">SLA Guarantee</dt>
                    <dd className="font-semibold text-success-text">99.9% Uptime Guarantee</dd>
                  </div>
                </dl>
              </div>

              <div className="p-4 bg-input/40 rounded-xl border border-border space-y-3">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Enabled Operational Modules</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'WhatsApp Automation',
                    'Biometric QR / Face Sync',
                    'Store POS & Invoicing',
                    'Member Mobile Portal',
                    'Trainer PT Scheduling',
                    'Diet & Workout Library',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-1.5 text-text-primary">
                      <Zap size={12} className="text-primary shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}



        <div className="flex justify-end pt-2"><button data-testid="manager_settings-manager-settings-main-button-submit" type="submit" disabled={isSubmitting} className="flex min-h-11 min-w-32 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-on-primary shadow-card motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out hover:brightness-110">{isSubmitting ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true"/> : <Save size={18} strokeWidth={2} aria-hidden="true"/>}{isSubmitting ? t("TEXT_SAVING") : t("TEXT_SAVE_SETTINGS")}</button></div>
      </form>
    </div>
  );
}
