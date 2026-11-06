// RESPONSIBILITY: Renders/orchestrates SuperadminBillingUsageMetersMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Superadmin feature UI for SuperadminBillingUsageMetersMain. Owns presentation and user interaction orchestration only; business data access remains in the feature API/query layer.
/**
 * RESPONSIBILITY: Renders the Usage Meters dashboard for superadmins to monitor tenant resource limits.
 * DATA FLOW: usageMetersApi -> SuperadminBillingUsageMetersMain -> UI
 */
// RESPONSIBILITY: Renders the SuperadminBillingUsageMetersMain component.
import { HardDrive, MessageSquare, Users, Mail, Send, Code2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { useUrlState } from '@/hooks/useUrlState';
import { displayValue } from '@/lib/display_value';

import SuperadminBillingUsageMetersProgressBar from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/components/usage_meters_dashboard_states_and_feedback/SuperadminBillingUsageMetersDashboardProgressBar';
import { SUPERADMIN_BILLING_USAGE_METERS_DATE_RANGE_OPTIONS } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/constants/superadmin_billing_usage_meters_dashboard.constants';
import { useSuperadminBillingUsageMetersDashboardPage } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/hooks/useSuperadminBillingUsageMetersDashboardPage';
import { formatSuperadminUsageMeterBillingDate } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/utils/SuperadminBillingUsageMetersDashboardDateFormatter';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/utils/SuperadminBillingUsageMetersDashboardNumberFormatter';
import { getProgressColor, isValidUsageDate } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/utils/SuperadminBillingUsageMetersDashboardUtils';

import type { UsageMeter } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/types/superadmin_billing_usage_meters_dashboard.types';


/**
 * @description Renders the SuperadminBillingUsageMetersMain component.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBillingUsageMetersDashboardMain() {
  const t = useTranslations('superadmin_billing_usage_meters');
  const locale = useLocale();
    const { getParam, setParam } = useUrlState();
    const requestedDateRange = getParam('range', 'this_month');
    const supportedRanges: readonly string[] = SUPERADMIN_BILLING_USAGE_METERS_DATE_RANGE_OPTIONS.map((option) => option.value);
    const dateRange = supportedRanges.includes(requestedDateRange) ? requestedDateRange : 'this_month';
    const requestedCustomFrom = getParam('from', '');
    const requestedCustomTo = getParam('to', '');
    const customFrom = isValidUsageDate(requestedCustomFrom) ? requestedCustomFrom : '';
    const customTo = isValidUsageDate(requestedCustomTo) ? requestedCustomTo : '';
    const hasInvalidCustomDate = dateRange === 'custom' && ((Boolean(requestedCustomFrom) && !isValidUsageDate(requestedCustomFrom)) || (Boolean(requestedCustomTo) && !isValidUsageDate(requestedCustomTo)));
    const isInvertedCustomRange = dateRange === 'custom' && Boolean(customFrom && customTo && customFrom > customTo);
    const hasInvalidCustomRange = hasInvalidCustomDate || isInvertedCustomRange;
    const queryParams = dateRange === 'custom' ? { range: dateRange, ...(customFrom ? { from: customFrom } : {}), ...(customTo ? { to: customTo } : {}) } : { range: dateRange };
    const query = useSuperadminBillingUsageMetersDashboardPage(queryParams, !hasInvalidCustomRange);
    const { data: queryData, isPending, isError, refetch } = query;

    const displayMeters = hasInvalidCustomRange ? [] : (queryData?.data ?? []);
    const formatBillingDate = (value: string) => formatSuperadminUsageMeterBillingDate(value, locale, t('ui.date_unavailable'));
    return (<div className="space-y-6 w-full">
      {isError ? <div className="rounded-lg border border-danger bg-danger-bg p-3 text-sm text-danger" role="alert">{t('ui.failed_to_load_usage_meters')} <button type="button" onClick={() => void refetch()} className="ms-2 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11 min-w-11">{t('ui.try_again_d876a9fe')}</button></div> : null}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t('ui.usage_meters_83ceafa1')}</h1>
          <p className="text-secondary mt-1">{t('ui.monitor_gym_resource_consumption_and_billing_c0c9399b')}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-48">
            <SearchableDropdown data-testid="superadmin_billing_usage_meters-superadmin-usage-meters-main-date-range" value={dateRange} onChange={(val) => setParam('range', String(val))} options={SUPERADMIN_BILLING_USAGE_METERS_DATE_RANGE_OPTIONS.map((option) => ({ label: t(option.labelKey), value: option.value }))}/>
          </div>

          {dateRange === 'custom' && (<div className="flex flex-col gap-1"><div className="flex items-center gap-2">
              <label className="sr-only" htmlFor="superadmin-usage-meters-date-from">{t('ui.from_date')}</label><input id="superadmin-usage-meters-date-from" type="date" aria-invalid={hasInvalidCustomRange || undefined} aria-describedby={hasInvalidCustomRange ? "superadmin-usage-meters-date-range-error" : undefined} value={customFrom} onChange={(e) => setParam('from', e.target.value)} className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" data-testid="superadmin_billing_usage_meters-superadmin-usage-meters-main-usage-meters-main-date"/>
              <label className="sr-only" htmlFor="superadmin-usage-meters-date-to">{t('ui.to_date')}</label><span className="text-secondary" aria-hidden="true">{t('ui.to_01b6e203')}</span>
              <input id="superadmin-usage-meters-date-to" type="date" aria-invalid={hasInvalidCustomRange || undefined} aria-describedby={hasInvalidCustomRange ? "superadmin-usage-meters-date-range-error" : undefined} value={customTo} onChange={(e) => setParam('to', e.target.value)} className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" data-testid="superadmin_billing_usage_meters-superadmin-usage-meters-main-meters-main-date-2"/>
            </div>{hasInvalidCustomRange ? <p className="text-xs text-danger" role="alert" id="superadmin-usage-meters-date-range-error" data-testid="superadmin_billing_usage_meters-invalid-date-range">{t('ui.invalid_date_range')}</p> : null}</div>)}
        </div>
      </div>

      {(() => { if (hasInvalidCustomRange || (isError && !queryData)) { return (null); } if (isPending) { return (<div className="p-6 space-y-4" aria-busy="true" data-testid="superadmin_billing_usage_meters-superadmin-usage-meters-main-loading">{[1, 2, 3].map(i => <div key={`skeleton-${i}`} className="h-32 rounded-xl bg-card motion-safe:animate-pulse" />)}</div>); } if (displayMeters.length === 0) { return (<div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-secondary" role="status">{t('ui.no_usage_meters_found')}</div>); } return (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayMeters.map((meter: UsageMeter) => {
            const dbGb = meter.databaseGb || 0;
            const mediaGb = meter.mediaGb;
            const totalStorage = dbGb + mediaGb;
            return (<div key={meter.id} className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card motion-safe:transition-all motion-safe:duration-base">
            <h3 className="text-lg font-bold text-primary mb-4 truncate" title={displayValue(meter.tenantName)}>{displayValue(meter.tenantName)}</h3>
            
            <div className="space-y-5" data-testid="superadmin_billing_usage_meters-superadmin-usage-meters-main-page-ready">
              {/* SMS Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <MessageSquare size={18}/> {t('ui.total_sms_sent_1742d971')}</span>
                  <span className="text-primary font-semibold">{formatNumber(meter.smsSent, locale)}</span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                  <SuperadminBillingUsageMetersProgressBar value={meter.smsSent} limit={meter.smsLimit} fillClassName={getProgressColor(meter.smsSent, meter.smsLimit)}/>
                </div>
                <p className="text-xs text-secondary mt-1.5">{t('ui.limit_9917a4b3')}{formatNumber(meter.smsLimit, locale)}</p>
              </div>

              {/* WhatsApp message meter */}
              {meter.whatsappMessagesSent !== undefined && <div><div className="mb-1.5 flex justify-between text-sm"><span className="flex items-center gap-1.5 text-secondary font-medium"><Send size={18} /> {t('ui.whatsapp_messages')}</span><span className="font-semibold text-primary">{formatNumber(meter.whatsappMessagesSent, locale)}</span></div><SuperadminBillingUsageMetersProgressBar value={meter.whatsappMessagesSent} limit={meter.whatsappLimit ?? 1} fillClassName={getProgressColor(meter.whatsappMessagesSent, meter.whatsappLimit ?? 1)} /><p className="mt-1.5 text-xs text-secondary">{t('ui.limit_9917a4b3')}{formatNumber(meter.whatsappLimit ?? 0, locale)}</p></div>}
              {/* Email meter */}
              {meter.emailsSent !== undefined && <div><div className="mb-1.5 flex justify-between text-sm"><span className="flex items-center gap-1.5 text-secondary font-medium"><Mail size={18} /> {t('ui.emails_sent')}</span><span className="font-semibold text-primary">{formatNumber(meter.emailsSent, locale)}</span></div><SuperadminBillingUsageMetersProgressBar value={meter.emailsSent} limit={meter.emailLimit ?? 1} fillClassName={getProgressColor(meter.emailsSent, meter.emailLimit ?? 1)} /><p className="mt-1.5 text-xs text-secondary">{t('ui.limit_9917a4b3')}{formatNumber(meter.emailLimit ?? 0, locale)}</p></div>}
              {/* API-call meter: the limit is optional in the contract. */}
              {meter.apiCallsCount !== undefined && <div><div className="mb-1.5 flex justify-between text-sm"><span className="flex items-center gap-1.5 text-secondary font-medium"><Code2 size={18} /> {t('ui.api_calls')}</span><span className="font-semibold text-primary">{formatNumber(meter.apiCallsCount, locale)}</span></div>{meter.apiCallsLimit !== undefined ? <><SuperadminBillingUsageMetersProgressBar value={meter.apiCallsCount} limit={meter.apiCallsLimit} fillClassName={getProgressColor(meter.apiCallsCount, meter.apiCallsLimit)} /><p className="mt-1.5 text-xs text-secondary">{t('ui.limit_9917a4b3')}{formatNumber(meter.apiCallsLimit, locale)}</p></> : null}</div>}

              {/* Storage Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <HardDrive size={18}/> {t('ui.total_storage_gb_d4a44fab')}</span>
                  <span className="text-primary font-semibold">{formatNumber(totalStorage, locale)} {t('ui.gb_79cba118')}</span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden flex">
                  <SuperadminBillingUsageMetersProgressBar value={dbGb} limit={meter.storageLimitGb} fillClassName="fill-primary" title={`${t('ui.database_storage')}: ${formatNumber(dbGb, locale)} GB`}/>
                  <SuperadminBillingUsageMetersProgressBar value={mediaGb} limit={meter.storageLimitGb} fillClassName="fill-warning" title={`${t('ui.binary_storage')}: ${formatNumber(mediaGb, locale)} GB`}/>
                </div>
                <div className="flex justify-between text-xs mt-1.5 text-secondary">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary text-on-primary"/>
                    <span>{t('ui.db_33ae9939')}{dbGb} {t('ui.gb_79cba118')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-warning text-on-warning"/>
                    <span>{t('ui.binary_beef6ec0')}{mediaGb} {t('ui.gb_79cba118')}</span>
                  </div>
                </div>
              </div>

              {/* Personnel Meters */}
              <div className="space-y-4 pt-2 border-t border-border">
                {/* Members */}
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-secondary font-medium">
                      <Users size={18}/> {t('ui.members_ef53538a')}</span>
                    <span className="text-primary font-semibold">
                      {formatNumber((meter.activeMembers ?? 0), locale)} <span className="text-xs text-secondary font-normal">{t('ui.active_4d3d769b')}</span> {t('ui.text_6666cd76')}{formatNumber((meter.totalMembers ?? meter.activeMembers ?? 0), locale)} <span className="text-xs text-secondary font-normal">{t('ui.total_96b01412')}</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                    <SuperadminBillingUsageMetersProgressBar value={meter.activeMembers ?? 0} limit={meter.memberLimit ?? 1} fillClassName={getProgressColor(meter.activeMembers ?? 0, meter.memberLimit ?? 1)}/>
                  </div>
                  <p className="text-xs text-secondary mt-1.5">{t('ui.limit_9917a4b3')}{formatNumber((meter.memberLimit ?? 0), locale)}</p>
                </div>

                {/* Staff */}
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-secondary font-medium">
                      <Users size={18}/> {t('ui.staff_8f7f9363')}</span>
                    <span className="text-primary font-semibold">{formatNumber((meter.staffCount ?? 0), locale)}</span>
                  </div>
                  <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                    <SuperadminBillingUsageMetersProgressBar value={meter.staffCount ?? 0} limit={meter.staffLimit ?? 1} fillClassName={getProgressColor(meter.staffCount ?? 0, meter.staffLimit ?? 1)}/>
                  </div>
                  <p className="text-xs text-secondary mt-1.5">{t('ui.limit_9917a4b3')}{formatNumber((meter.staffLimit ?? 0), locale)}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex justify-between items-center text-xs text-secondary">
              <span>{t('ui.billing_cycle_ends_949b51af')}</span>
              <span className="font-semibold text-primary">{formatBillingDate(meter.billingCycleEnd)}</span>
            </div>
          </div>);
        })}
      </div>); })()}
    </div>);
}
