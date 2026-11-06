"use client";
// RESPONSIBILITY: Renders the Attendance table/card-stack with server-side sort/pagination and keyboard/touch-safe interaction.
/**
 * @description Renders attendance records with semantic table markup, sortable headers, row interactions, and mobile access to the same record data.
 * @dependencies Uses only attendance-owned data types, display helpers, and infrastructure primitives.
 * @edge-cases Handles nullable attendance fields, keyboard row interaction, empty records, and mobile action visibility without losing essential status data.
 */
import { Fragment, useState } from 'react';

import { Clock, LogOut } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import TrainerAttendanceEmptyState from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceEmptyState';

import TrainerAttendanceSortableHeader from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceSortableHeader';

import { TRAINER_ATTENDANCE_RECORD_TYPE, TRAINER_ATTENDANCE_TABLE_HEADERS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';

import { TrainerAttendanceFormatNumber } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceDisplayFormatters';

import { TrainerAttendanceFormatDate, TrainerAttendanceFormatTime } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceDisplayFormatters';

import { TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceTrainerInfrastructureConstants';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureTooltip';

import TrainerInfrastructurePagination from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructurePagination';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureSkeletonBlock';

import type { TrainerAttendanceSortField } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceInteractionTypes';

import type { TrainerAttendanceTableProps } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTableProps';

// DATA FLOW: URL-backed Attendance filters → TanStack Query → TrainerAttendanceTable props → desktop table/mobile cards.














/**
 * @description Owns the attendance feature UI responsibility represented by TABLE_COLUMNS, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const TABLE_COLUMNS = TRAINER_ATTENDANCE_TABLE_HEADERS.length;
/**
 * @description Owns the attendance feature UI responsibility represented by SORT_FIELDS, keeping feature behavior, state, and data ownership inside the Trainer module.
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
export default function TrainerAttendanceTable({ records, totalRecords, isPending, search, filterDate, currentPage, sortBy, sortDirection, onPageChange, onSort, onCheckOut }: TrainerAttendanceTableProps) {
  const locale = useLocale();
  const t = useTranslations('TRAINER_ATTENDANCE');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const totalPages = Math.max(1, Math.ceil(totalRecords / TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE));
  const hasFilter = Boolean(search.trim()) || filterDate !== 'ALL_TIME';

  if (isPending) {
    return (
      <div className="p-5" aria-busy="true" aria-label={t('TEXT_LOADING_ATTENDANCE_RECORDS')} data-testid="trainer_attendance-attendance-table_loading_attendance_records">
        <div className="space-y-2 motion-safe:animate-pulse">
          {SKELETON_ROW_IDS.map((id) => <TrainerInfrastructureSkeletonBlock key={id} className="h-16 rounded-xl border border-border" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-highlight">
            <tr data-testid="trainer_attendance-TrainerAttendanceTable-row-1">{TRAINER_ATTENDANCE_TABLE_HEADERS.map((header, index) => <TrainerAttendanceSortableHeader key={header} label={t(`TEXT_COLUMN_${SORT_FIELDS[index]!.toUpperCase()}`)} sortLabel={t('TEXT_SORT_BY', { label: t(`TEXT_COLUMN_${SORT_FIELDS[index]!.toUpperCase()}`) })} field={SORT_FIELDS[index]!} sortBy={sortBy} sortDirection={sortDirection} onSort={onSort}/>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {records.length === 0 ? (
              <tr data-testid="trainer_attendance-TrainerAttendanceTable-row-2"><td colSpan={TABLE_COLUMNS} className="p-0"><TrainerAttendanceEmptyState isFiltered={hasFilter} /></td></tr>
            ) : records.map((record) => {
              const personName = getPersonName(record);
              const initial = personName?.charAt(0).toUpperCase() ?? '?';
              const expanded = expandedId === record.id;
              return (
                <Fragment key={record.id}>
                  <tr data-testid={`trainer_attendance-attendance-table-row-${record.id}`} tabIndex={0} aria-expanded={expanded} onClick={() => setExpandedId((current) => current === record.id ? null : record.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setExpandedId((current) => current === record.id ? null : record.id); } }} className="cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring motion-safe:transition-colors motion-safe:duration-base">
                    <td className="cursor-pointer px-4 py-3 whitespace-nowrap"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-primary font-bold text-sm" aria-hidden="true">{initial}</div><div className="min-w-0"><TrainerInfrastructureTooltip content={String(displayValue(personName))}><div className="text-sm font-medium text-primary truncate max-w-52">{displayValue(personName)}</div></TrainerInfrastructureTooltip><div className="text-xs text-secondary">{record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? t('TEXT_MEMBER') : t('TEXT_STAFF')}</div></div></div></td>
                    <td className="px-4 py-3"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? 'bg-info-bg text-info' : 'bg-success-bg text-success'}`} data-testid={`trainer_attendance-table-type${record.id}`}>{record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? t('TEXT_MEMBER') : t('TEXT_STAFF')}</span></td>
                    <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{TrainerAttendanceFormatDate(record.date, locale)}</td>
                    <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap"><span className="flex items-center gap-1"><Clock size={18} strokeWidth={2} className="text-secondary" aria-hidden="true" />{TrainerAttendanceFormatTime(record.checkIn, locale)}</span></td>
                    <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                      {record.checkOut ? (
                        TrainerAttendanceFormatTime(record.checkOut, locale)
                      ) : onCheckOut && record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            void onCheckOut(record.id);
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-warning-bg text-warning-text hover:brightness-105 border border-warning/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:active:scale-95 transition-all"
                          title={t('TEXT_CHECK_OUT')}
                        >
                          <LogOut size={13} strokeWidth={2} aria-hidden="true" />
                          <span>{t('TEXT_CHECK_OUT')}</span>
                        </button>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{record.durationMinutes == null ? '—' : `${TrainerAttendanceFormatNumber(record.durationMinutes, locale)} ${t('TEXT_MINUTES_SHORT')}`}</td>
                    <td className="px-4 py-3"><span className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-input text-secondary border border-border">{displayValue(record.checkInMethod)}</span></td>
                  </tr>
                  {expanded && <tr className="bg-surface-highlight" data-testid="trainer_attendance-TrainerAttendanceTable-row-3"><td colSpan={TABLE_COLUMNS} className="px-4 py-3 text-sm text-secondary"><div className="grid grid-cols-1 sm:grid-cols-3 gap-3"><span><strong className="text-primary">{t('TEXT_RECORD_ID')}</strong> {record.id}</span><span><strong className="text-primary">{t('TEXT_NOTES_9C3BEF')}</strong> {displayValue(record.notes)}</span><span><strong className="text-primary">{t('TEXT_CHECK_IN_METHOD')}</strong> {displayValue(record.checkInMethod)}</span></div></td></tr>}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {records.length === 0 ? <TrainerAttendanceEmptyState isFiltered={hasFilter} /> : records.map((record) => {
          const personName = getPersonName(record);
          const initial = personName?.charAt(0).toUpperCase() ?? '?';
          return (
            <article key={record.id} className="bg-card rounded-xl border border-border p-4 shadow-card" data-testid={`trainer_attendance-table-card${record.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0"><div className="w-9 h-9 rounded-full bg-primary-subtle flex items-center justify-center text-primary font-bold text-sm shrink-0" aria-hidden="true">{initial}</div><div className="min-w-0"><TrainerInfrastructureTooltip content={String(displayValue(personName))}><h3 className="text-sm font-semibold text-primary break-words">{displayValue(personName)}</h3></TrainerInfrastructureTooltip><p className="text-xs text-secondary">{record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? t('TEXT_MEMBER') : t('TEXT_STAFF')}</p></div></div>
                <span className={`shrink-0 inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? 'bg-info-bg text-info' : 'bg-success-bg text-success'}`} data-testid={`trainer_attendance-table-type-mobile-${record.id}`}>{record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? t('TEXT_MEMBER') : t('TEXT_STAFF')}</span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_DATE')}</span><span className="text-primary">{TrainerAttendanceFormatDate(record.date, locale)}</span></p>
                <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_CHECK_IN_TIME')}</span><span className="text-primary">{TrainerAttendanceFormatTime(record.checkIn, locale)}</span></p>
                <div>
                  <span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_CHECK_OUT_TIME')}</span>
                  {record.checkOut ? (
                    <span className="text-primary">{TrainerAttendanceFormatTime(record.checkOut, locale)}</span>
                  ) : onCheckOut && record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? (
                    <button
                      type="button"
                      onClick={() => void onCheckOut(record.id)}
                      className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-warning-bg text-warning-text hover:brightness-105 border border-warning/30"
                    >
                      <LogOut size={13} strokeWidth={2} aria-hidden="true" />
                      <span>{t('TEXT_CHECK_OUT')}</span>
                    </button>
                  ) : (
                    <span className="text-primary">—</span>
                  )}
                </div>
                <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_DAYS')}</span><span className="text-primary">{record.durationMinutes == null ? '—' : `${TrainerAttendanceFormatNumber(record.durationMinutes, locale)} ${t('TEXT_MINUTES_SHORT')}`}</span></p>
                <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_CHECK_IN_METHOD')}</span><span className="text-primary">{displayValue(record.checkInMethod)}</span></p>
                <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_RECORD_ID')}</span><span className="text-primary">{record.id}</span></p>
                <p className="sm:col-span-2"><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_NOTES_9C3BEF')}</span><span className="text-primary">{displayValue(record.notes)}</span></p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="border-t border-border mt-4 pt-4"><TrainerInfrastructurePagination currentPage={currentPage} totalPages={totalPages} totalItems={totalRecords} itemsPerPage={TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE} onPageChange={onPageChange}/></div>
    </div>
  );
}

