"use client";
// RESPONSIBILITY: Renders the Attendance table/card-stack with server-side sort/pagination and keyboard/touch-safe interaction.
/**
 * @description Renders attendance records with semantic table markup, sortable headers, row interactions, and mobile access to the same record data.
 * @dependencies Uses only attendance-owned data types, display helpers, and infrastructure primitives.
 * @edge-cases Handles nullable attendance fields, keyboard row interaction, empty records, and mobile action visibility without losing essential status data.
 */
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Clock, Eye } from 'lucide-react';
import TrainerOperationsTrainerAttendanceQuickViewModal from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceQuickViewModal';
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTypes';
import { useLocale, useTranslations } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import { displayValue } from '@/lib/display_value';
import TrainerAttendanceEmptyState from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceAttendanceEmptyState';

import TrainerAttendanceSortableHeader from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceAttendanceSortableHeader';

import { TRAINER_ATTENDANCE_RECORD_TYPE, TRAINER_ATTENDANCE_TABLE_HEADERS } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceConstants';

import { TrainerAttendanceFormatNumber } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceDisplayFormatters';

import { TrainerAttendanceFormatDate, TrainerAttendanceFormatTime } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceDisplayFormatters';

import { TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceTrainerInfrastructureConstants';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceTrainerInfrastructureTooltip';

import TrainerInfrastructurePagination from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceTrainerInfrastructurePagination';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceTrainerInfrastructureSkeletonBlock';

import type { TrainerAttendanceSortField } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceInteractionTypes';

import type { TrainerAttendanceTableProps } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTableProps';

// DATA FLOW: URL-backed Attendance filters → TanStack Query → TrainerAttendanceTable props → desktop table/mobile cards.














/**
 * @description Owns the attendance feature UI responsibility represented by TABLE_COLUMNS, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const SORT_FIELDS: readonly TrainerAttendanceSortField[] = ['name', 'type', 'date', 'checkIn', 'checkOut', 'durationMinutes', 'checkInMethod'];
/**
 * @description Owns the attendance feature UI responsibility represented by SKELETON_ROW_IDS, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const SKELETON_ROW_IDS = ['attendance-skeleton-1','attendance-skeleton-2','attendance-skeleton-3','attendance-skeleton-4','attendance-skeleton-5'] as const;

function getPersonName(record: TrainerAttendanceTableProps['records'][number]) {
  return record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? (record.member?.name ?? null) : (record.staff?.name ?? null);
}

/**
 * @description Renders the Attendance dataset in semantic desktop-table form and design-system mobile card-stack form.
 * @dependencies URL-backed filters/sort/page → TanStack Query → feature table props; feature-owned pagination and formatters.
 * @edge-case Preserves empty/loading states and keeps all essential identity, status, time and duration fields visible at every viewport.
 */
/**
 * @description Renders the attendance data table with module-owned status formatting, row actions, responsive behavior, and keyboard-accessible interactions.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves nullable-value fallbacks, keyboard access to row actions, and the documented mobile table strategy.
 */
export default function TrainerAttendanceTable({ records, totalRecords, isPending, search, filterDate, currentPage, sortBy, sortDirection, onPageChange, onSort }: TrainerAttendanceTableProps) {
  const locale = useLocale();
  const t = useTranslations('TRAINER_ATTENDANCE');
  const searchParams = useSearchParams();
  const startDate = searchParams?.get('startDate');
  const endDate = searchParams?.get('endDate');

  const displayedRecords = useMemo(() => {
    if (!startDate && !endDate) return records;
    return records.filter((r) => {
      if (!r.date) return true;
      if (startDate && r.date < startDate) return false;
      if (endDate && r.date > endDate) return false;
      return true;
    });
  }, [records, startDate, endDate]);

  const [quickViewRecord, setQuickViewRecord] = useState<TrainerAttendanceRecord | null>(null);
  const totalPages = Math.max(1, Math.ceil((startDate || endDate ? displayedRecords.length : totalRecords) / TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE));
  const hasFilter = Boolean(search.trim()) || filterDate !== 'ALL_TIME' || Boolean(startDate || endDate);
  const compactIndices = [0, 2, 3, 4, 5] as const;

  if (isPending) {
    return (
      <div role="status" className="p-5 space-y-3" aria-busy="true" aria-label={t('TEXT_LOADING_ATTENDANCE_RECORDS')} data-testid="trainer_attendance-attendance-table_loading_attendance_records">
        {SKELETON_ROW_IDS.map((id) => (
          <div key={id} className="grid grid-cols-2 md:grid-cols-7 items-center gap-3 rounded-xl border border-border bg-card p-3" aria-hidden="true">
            <div className="col-span-2 md:col-span-1 flex items-center gap-3 min-w-0">
              <TrainerInfrastructureSkeletonBlock className="h-10 w-10 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2"><TrainerInfrastructureSkeletonBlock className="h-3 w-28 max-w-full rounded" /><TrainerInfrastructureSkeletonBlock className="h-2.5 w-16 max-w-full rounded" /></div>
            </div>
            <TrainerInfrastructureSkeletonBlock className="h-5 w-20 max-w-full rounded-full" />
            <TrainerInfrastructureSkeletonBlock className="h-3 w-24 max-w-full rounded" />
            <TrainerInfrastructureSkeletonBlock className="h-3 w-16 max-w-full rounded" />
            <TrainerInfrastructureSkeletonBlock className="hidden md:block h-3 w-16 max-w-full rounded" />
            <TrainerInfrastructureSkeletonBlock className="hidden md:block h-3 w-14 max-w-full rounded" />
            <TrainerInfrastructureSkeletonBlock className="hidden md:block h-3 w-20 max-w-full rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="hidden md:block max-h-[640px] overflow-y-auto overflow-x-hidden">
        <table className="w-full text-start border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
            <tr className="bg-surface-highlight border-b border-border" data-testid="trainer_attendance-TrainerAttendanceTable-row-1">
              {compactIndices.map((idx) => (
                <TrainerAttendanceSortableHeader
                  key={TRAINER_ATTENDANCE_TABLE_HEADERS[idx]!}
                  label={t(`TEXT_COLUMN_${SORT_FIELDS[idx]!.toUpperCase()}`)}
                  sortLabel={t('TEXT_SORT_BY', { label: t(`TEXT_COLUMN_${SORT_FIELDS[idx]!.toUpperCase()}`) })}
                  field={SORT_FIELDS[idx]!}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onSort={onSort}
                />
              ))}
              <th scope="col" className="px-4 py-3 text-start text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                {t('TEXT_ACTIONS')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {displayedRecords.length === 0 ? (
              <tr data-testid="trainer_attendance-TrainerAttendanceTable-row-2"><td colSpan={compactIndices.length + 1} className="p-0"><TrainerAttendanceEmptyState isFiltered={hasFilter} /></td></tr>
            ) : displayedRecords.map((record) => {
              const personName = getPersonName(record);
              const initial = personName?.charAt(0).toUpperCase() ?? '?';
              return (
                <tr
                  key={record.id}
                  data-testid={`trainer_attendance-attendance-table-row-${record.id}`}
                  className="hover:bg-surface-hover transition-colors group"
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-primary font-bold text-sm shrink-0" aria-hidden="true">{initial}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <TrainerInfrastructureTooltip content={String(displayValue(personName))}>
                            <div className="text-sm font-bold text-text-primary truncate max-w-[180px]">{displayValue(personName)}</div>
                          </TrainerInfrastructureTooltip>
                          <CopyButton value={String(personName ?? '')} />
                        </div>
                        <div className="text-xs text-secondary font-mono flex items-center gap-1.5 mt-0.5">
                          <span>#{record.id.slice(-6)}</span>
                          <span>·</span>
                          <span>{record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? t('TEXT_MEMBER') : t('TEXT_STAFF')}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm text-secondary whitespace-nowrap">{TrainerAttendanceFormatDate(record.date, locale)}</td>
                  <td className="px-3 py-3 text-sm text-secondary whitespace-nowrap"><span className="flex items-center gap-1.5"><Clock size={15} strokeWidth={2} className="text-sky-500" aria-hidden="true" />{TrainerAttendanceFormatTime(record.checkIn, locale)}</span></td>
                  <td className="px-3 py-3 text-sm text-secondary whitespace-nowrap">{TrainerAttendanceFormatTime(record.checkOut, locale)}</td>
                  <td className="px-3 py-3 text-sm text-secondary whitespace-nowrap">{record.durationMinutes == null ? '—' : `${TrainerAttendanceFormatNumber(record.durationMinutes, locale)} ${t('TEXT_MINUTES_SHORT')}`}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setQuickViewRecord(record)}
                      className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 hover:bg-sky-500 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                      aria-label={`View attendance details for ${personName ?? record.id}`}
                      title="View details"
                      data-testid={`trainer_self_attendance-table-view-${record.id}`}
                    >
                      <Eye size={16} strokeWidth={2.2} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3 p-3">
        {displayedRecords.length === 0 ? <TrainerAttendanceEmptyState isFiltered={hasFilter} /> : displayedRecords.map((record) => {
          const personName = getPersonName(record);
          const initial = personName?.charAt(0).toUpperCase() ?? '?';
          return (
            <article key={record.id} className="bg-card rounded-xl border border-border p-4 shadow-card" data-testid={`trainer_attendance-table-card${record.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0"><div className="w-9 h-9 rounded-full bg-primary-subtle flex items-center justify-center text-primary font-bold text-sm shrink-0" aria-hidden="true">{initial}</div><div className="min-w-0"><TrainerInfrastructureTooltip content={String(displayValue(personName))}><h3 className="text-sm font-semibold text-primary break-words">{displayValue(personName)}</h3></TrainerInfrastructureTooltip><p className="text-xs text-secondary">{record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? t('TEXT_MEMBER') : t('TEXT_STAFF')}</p></div></div>
                <span className={`shrink-0 inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? 'bg-info-bg text-info' : 'bg-success-bg text-success'}`} data-testid={`trainer_attendance-table-type-mobile-${record.id}`}>{record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? t('TEXT_MEMBER') : t('TEXT_STAFF')}</span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_DATE')}</span><span className="text-text-primary">{TrainerAttendanceFormatDate(record.date, locale)}</span></p>
                <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_CHECK_IN_TIME')}</span><span className="text-text-primary">{TrainerAttendanceFormatTime(record.checkIn, locale)}</span></p>
                <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_CHECK_OUT_TIME')}</span><span className="text-text-primary">{TrainerAttendanceFormatTime(record.checkOut, locale)}</span></p>
                <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_DAYS')}</span><span className="text-text-primary">{record.durationMinutes == null ? '—' : `${TrainerAttendanceFormatNumber(record.durationMinutes, locale)} ${t('TEXT_MINUTES_SHORT')}`}</span></p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex justify-end">
                <button type="button" onClick={() => setQuickViewRecord(record)} className="min-h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 font-semibold px-3 text-xs"><Eye size={15} />View</button>
              </div>
            </article>
          );
        })}
      </div>
      <div className="border-t border-border mt-4 pt-4"><TrainerInfrastructurePagination currentPage={currentPage} totalPages={totalPages} totalItems={totalRecords} itemsPerPage={TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE} onPageChange={onPageChange}/></div>
      <TrainerOperationsTrainerAttendanceQuickViewModal
        record={quickViewRecord}
        onClose={() => setQuickViewRecord(null)}
      />
    </div>
  );
}

