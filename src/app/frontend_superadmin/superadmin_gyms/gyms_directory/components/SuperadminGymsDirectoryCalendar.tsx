// RESPONSIBILITY: Renders/orchestrates SuperadminGymsCalendar within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsCalendar owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useMemo
 * MODULE DEPENDENCIES: react, date-fns, date-fns/locale, next-intl, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryTable, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryCalendarUtils, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the subscription renewal calendar view for Gym tenants.
import { useMemo } from 'react';

import { addDays, format, getMonth, getYear, parseISO, startOfToday, startOfWeek } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import { useLocale, useTranslations } from 'next-intl';

import { useSuperadminGymsDirectoryTable } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryTable';
import { getSuperadminGymsCalendarGrid } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryCalendarUtils';

import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types';


/** @description Renders the gym calendar presentation for the owning module. @dependencies Receives feature-owned calendar configuration and display data. @edge-case Handles empty calendar state without dereferencing missing events. */
export default function SuperadminGymsDirectoryCalendar() {
  const t = useTranslations('superadmin_gyms');
  const locale = useLocale();
  const dateLocale = locale.startsWith('hi') ? hi : enUS;
    const { filteredGyms, isPending, isError, handleRowClick, refetch } = useSuperadminGymsDirectoryTable();
    // Create a simple calendar grid for the current month
    const { daysInMonth, startDay, currentYear, currentMonth, monthName } = useMemo(() => {
        const today = startOfToday();
        const year = getYear(today);
        const month = getMonth(today);
        const { daysInMonth, leadingEmptyDays: startDay } = getSuperadminGymsCalendarGrid(year, month);
        const monthName = format(today, 'MMMM', { locale: dateLocale });
        return { daysInMonth, startDay, currentYear: year, currentMonth: month, monthName };
    }, [dateLocale]);
    const gymsByDate = useMemo(() => {
        const map: Record<number, Tenant[]> = {};
        filteredGyms.forEach(gym => {
            // The list API contract provides a trial-end date but no authoritative paid renewal date.
            // Do not display a creation date as if it were a renewal event.
            if (!gym.trialEndsAt) return;
            const date = parseISO(gym.trialEndsAt);
            if (Number.isNaN(date.getTime()) || getYear(date) !== currentYear || getMonth(date) !== currentMonth) return;
            const day = date.getDate();
            map[day] ??= [];
            map[day].push(gym);
        });
        return map;
    }, [filteredGyms, currentMonth, currentYear]);
    if (isPending) {
        return (
          <section className="rounded-xl border border-border bg-card p-6" aria-label={t('ui.loading_calendar_5e68e6b5')} aria-busy="true" data-testid="superadmin_gyms-calendar-loading">
            <div className="mb-6 flex items-center justify-between gap-4"><div className="h-6 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-4 w-28 rounded bg-skeleton-base motion-safe:animate-pulse" /></div>
            <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl bg-surface-highlight">
              {Array.from({ length: 49 }, (_, index) => <div key={`calendar-skeleton-${index}`} className={`min-h-10 rounded-sm bg-skeleton-base motion-safe:animate-pulse ${index >= 7 ? 'min-h-24' : ''}`} />)}
            </div>
          </section>
        );
    }

    if (isError) {
        return <div role="alert" className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-danger-bg p-8 text-danger" data-testid="superadmin_gyms-calendar-error-state"><p>{t('ui.unable_to_load_renewal_calendar_42a1e2f8')}</p><button type="button" onClick={() => void refetch()} className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('actions.retry')}</button></div>;
    }
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: startDay }, (_, i) => i);
    return (<div className="p-6 bg-card border border-border rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">
          {monthName} {currentYear} {t('ui.trial_expirations')}</h2>
        <div className="flex items-center gap-4 text-sm text-secondary">
          <span className="flex items-center gap-2"><div aria-hidden="true" className="w-3 h-3 rounded-full bg-warning"></div> {t('ui.trial_ends_01354510')}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-surface-highlight rounded-xl overflow-hidden shadow-card">
        {Array.from({ length: 7 }, (_, index) => format(addDays(startOfWeek(new Date(currentYear, currentMonth, 1), { locale: dateLocale }), index), 'EEE', { locale: dateLocale })).map(day => (<div key={day} className="bg-input p-3 text-center text-xs font-semibold text-secondary uppercase tracking-wider">
            {day}
          </div>))}
        
        {blanks.map(blank => (<div key={`blank-${blank}`} className="bg-card min-h-32 p-2"/>))}
        
        {days.map(day => {
            const dayGyms = gymsByDate[day] || [];
            return (<div key={day} className="bg-card min-h-32 p-2 hover:bg-input motion-safe:transition-colors group border-t border-border">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-primary">{day}</span>
                {dayGyms.length > 0 && (<span className="text-xs bg-primary-subtle text-primary px-1.5 rounded-full font-medium">{dayGyms.length}</span>)}
              </div>
              <div className="space-y-1 overflow-y-auto max-h-20 scrollbar-thin">
                {dayGyms.map(gym => (<button type="button" key={gym.id} onClick={() => handleRowClick(gym)} className="w-full truncate rounded border border-border bg-page p-1.5 text-start text-xs hover:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors min-h-11 min-w-11" title={`${gym.name} (${gym.plan})`} data-testid="superadmin_gyms-superadmin-gyms-calendar-superadmin-gyms-calendar-button">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${gym.trialEndsAt ? 'bg-warning text-on-warning' : 'bg-success text-on-success'}`}/>
                      <span className="truncate text-primary font-medium">{gym.name}</span>
                    </div>
                  </button>))}
              </div>
            </div>);
        })}
      </div>
    </div>);
}
