"use client";
// RESPONSIBILITY: Renders the paginated Progress entries table/card stack with responsive search and dropdown filtering.
// DATA FLOW: Query response → filtered rows/cards; URL page/sort → query refresh; delete → typed confirmation → mutation.

import { useState, useMemo } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import TrainerCoachingIndividualProgressQuickViewModal from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressQuickViewModal';
import { useLocale, useTranslations } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import TrainerInfrastructurePagination from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressTrainerInfrastructurePagination';
import TrainerProgressTrackingSortDirectionIcon from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingSortDirectionIcon';
import { TRAINER_PROGRESS_TRACKING_PROGRESS_TABLE_COLUMNS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingConstants';
import { displayValue } from '@/lib/display_value';
import { TrainerProgressTrackingFormatNumber, TrainerProgressTrackingFormatDate } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingDisplayFormatters';
import type { TrainerProgressTrackingTableProps } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTableProps';
import type { TrainerProgressTrackingProgressEntry, TrainerProgressTrackingProgressSortField } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';
import { TrainerCoachingIndividualProgressProgressTrackingFilterBar } from './TrainerCoachingIndividualProgressProgressTrackingFilterBar';

export default function TrainerProgressTrackingTable({
  entries,
  totalEntries,
  currentPage,
  itemsPerPage,
  sortBy,
  sortDirection,
  onPageChange,
  onSort,
  onEdit,
  onDelete,
}: TrainerProgressTrackingTableProps) {
  const locale = useLocale();
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');

  const [quickViewEntry, setQuickViewEntry] = useState<TrainerProgressTrackingProgressEntry | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState<'all' | '30d' | '3m' | '6m' | 'this_year'>('all');
  const [bmiCategoryFilter, setBmiCategoryFilter] = useState<'all' | 'normal' | 'overweight' | 'underweight' | 'body_fat'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (entry: TrainerProgressTrackingProgressEntry) => {
    onDelete(entry.id);
  };

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (dateRangeFilter !== 'all') {
        const entryDate = new Date(entry.date).getTime();
        const now = new Date().getTime();
        const dayMs = 24 * 60 * 60 * 1000;
        if (dateRangeFilter === '30d' && now - entryDate > 30 * dayMs) return false;
        if (dateRangeFilter === '3m' && now - entryDate > 90 * dayMs) return false;
        if (dateRangeFilter === '6m' && now - entryDate > 180 * dayMs) return false;
        if (dateRangeFilter === 'this_year') {
          if (new Date(entry.date).getFullYear() !== new Date().getFullYear()) return false;
        }
      }

      if (bmiCategoryFilter === 'normal' && (entry.bmi < 18.5 || entry.bmi > 24.9)) return false;
      if (bmiCategoryFilter === 'overweight' && entry.bmi < 25) return false;
      if (bmiCategoryFilter === 'underweight' && entry.bmi >= 18.5) return false;
      if (bmiCategoryFilter === 'body_fat' && entry.bodyFatPercent == null) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const notesMatch = entry.notes?.toLowerCase().includes(q);
        const dateMatch = entry.date.toLowerCase().includes(q);
        if (!notesMatch && !dateMatch) return false;
      }

      return true;
    });
  }, [entries, dateRangeFilter, bmiCategoryFilter, searchQuery]);

  const hasActiveFilters = dateRangeFilter !== 'all' || bmiCategoryFilter !== 'all' || searchQuery.trim() !== '';
  const totalPages = Math.max(1, Math.ceil(totalEntries / itemsPerPage));
  const compactColumns = TRAINER_PROGRESS_TRACKING_PROGRESS_TABLE_COLUMNS.filter((col) =>
    col.field === 'date' ||
    col.field === 'weightKg' ||
    col.field === 'bmi' ||
    col.field === 'bodyFatPercent' ||
    col.field === 'muscleMassKg'
  );
  const TABLE_COLUMN_COUNT = compactColumns.length + 1;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden space-y-0">
      <TrainerCoachingIndividualProgressProgressTrackingFilterBar
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        bmiCategoryFilter={bmiCategoryFilter}
        setBmiCategoryFilter={setBmiCategoryFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredCount={filteredEntries.length}
        totalEntries={totalEntries}
      />

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="max-h-[640px] overflow-y-auto overflow-x-hidden">
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
              <tr data-testid="trainer_progress_tracking-TrainerProgressTrackingTable-row-1">
                {compactColumns.map((column: { labelKey: string; field: string | null }) => (
                  <th
                    key={column.labelKey}
                    scope="col"
                    className="px-3 py-3 text-start text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap"
                  >
                    {column.field ? (
                      <button
                        type="button"
                        onClick={() => onSort(column.field as TrainerProgressTrackingProgressSortField)}
                        className="min-w-11 min-h-11 inline-flex items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all"
                        aria-label={t('TEXT_SORT_COLUMN', { column: t(column.labelKey) })}
                        data-testid={`trainer_progress_tracking-progress-table-sort-${column.field ?? column.labelKey}`}
                      >
                        {t(column.labelKey)}
                        <TrainerProgressTrackingSortDirectionIcon active={sortBy === column.field} direction={sortDirection} />
                      </button>
                    ) : (
                      t(column.labelKey)
                    )}
                  </th>
                ))}
                <th scope="col" className="px-3 py-3 text-start text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{t('TEXT_ACTIONS')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_COLUMN_COUNT} className="py-12 text-center text-secondary">
                    <p className="text-sm font-semibold text-text-primary">{t('TEXT_NO_PROGRESS_ENTRIES_YET')}</p>
                    {hasActiveFilters && (
                      <p className="text-xs text-secondary mt-1">No entries matched the selected filters.</p>
                    )}
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <tr key={entry.id} data-testid={`trainer_progress_tracking-progress-table-row-${entry.id}`} className="hover:bg-surface-hover transition-colors group">
                    <td className="px-3 py-3 text-text-primary whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text-primary text-sm">
                          {TrainerProgressTrackingFormatDate(entry.date, locale)}
                        </span>
                        <CopyButton value={entry.date} />
                      </div>
                      <p className="text-xs text-secondary font-mono flex items-center gap-1.5 mt-0.5">#{entry.id.slice(-6)}</p>
                    </td>
                    <td className="px-3 py-3 text-text-primary whitespace-nowrap">{TrainerProgressTrackingFormatNumber(entry.weightKg, locale)} kg</td>
                    <td className="px-3 py-3 text-text-primary whitespace-nowrap">{TrainerProgressTrackingFormatNumber(entry.bmi, locale)}</td>
                    <td className="px-3 py-3 text-text-primary whitespace-nowrap">{entry.bodyFatPercent == null ? displayValue(entry.bodyFatPercent) : `${TrainerProgressTrackingFormatNumber(entry.bodyFatPercent, locale)}%`}</td>
                    <td className="px-3 py-3 text-text-primary whitespace-nowrap">{entry.muscleMassKg == null ? displayValue(entry.muscleMassKg) : `${TrainerProgressTrackingFormatNumber(entry.muscleMassKg, locale)} kg`}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setQuickViewEntry(entry); }}
                          className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 hover:bg-sky-500 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                          aria-label={`View details for ${entry.date}`}
                          title="View full measurements"
                          data-testid={`trainer_progress_tracking-progress-table-view-${entry.id}`}
                        >
                          <Eye size={16} strokeWidth={2.2} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); onEdit(entry); }}
                          className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                          aria-label={t('TEXT_EDIT_ENTRY_65440F')}
                          title={t('TEXT_EDIT_ENTRY_65440F')}
                          data-testid={`trainer_progress_tracking-progress-table-edit-${entry.id}`}
                        >
                          <Pencil size={16} strokeWidth={2} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); void handleDelete(entry); }}
                          className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl border border-rose-500/25 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                          aria-label={t('TEXT_DELETE_ENTRY')}
                          title={t('TEXT_DELETE_ENTRY')}
                          data-testid={`trainer_progress_tracking-progress-table-delete-${entry.id}`}
                        >
                          <Trash2 size={16} strokeWidth={2} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Stack */}
      <div className="cursor-pointer md:hidden space-y-3 p-3">
        {filteredEntries.map((entry) => (
          <article key={entry.id} className="bg-card rounded-xl border border-border p-4 shadow-card" data-testid={`trainer-progress-tracking-progress-table-card-${entry.id}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-text-primary truncate">{TrainerProgressTrackingFormatDate(entry.date, locale)}</h3>
                <p className="text-xs text-secondary">{t('TEXT_DATE')}</p>
              </div>
              <span className="shrink-0 inline-flex px-2 py-1 rounded-md text-xs font-semibold bg-info-bg text-info" data-testid={`trainer-progress-tracking-table-entry-state-${entry.id}`}>
                {t('TEXT_PROGRESS_TRACKING')}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_WEIGHT_KG')}</span><span className="text-text-primary">{TrainerProgressTrackingFormatNumber(entry.weightKg, locale)} kg</span></p>
              <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_BMI')}</span><span className="text-text-primary">{TrainerProgressTrackingFormatNumber(entry.bmi, locale)}</span></p>
              <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_BODY_FAT_PERCENT')}</span><span className="text-text-primary">{entry.bodyFatPercent == null ? displayValue(entry.bodyFatPercent) : `${TrainerProgressTrackingFormatNumber(entry.bodyFatPercent, locale)}%`}</span></p>
              <p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_MUSCLE_MASS_KG')}</span><span className="text-text-primary">{entry.muscleMassKg == null ? displayValue(entry.muscleMassKg) : `${TrainerProgressTrackingFormatNumber(entry.muscleMassKg, locale)} kg`}</span></p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex gap-2">
              <button type="button" onClick={() => setQuickViewEntry(entry)} className="min-h-11 inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 font-semibold px-3 text-xs"><Eye size={16} />View</button>
              <button type="button" onClick={() => onEdit(entry)} className="min-h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300 font-semibold hover:bg-amber-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all" aria-label={t('TEXT_EDIT_ENTRY_65440F')} data-testid="trainer_progress_tracking-trainerprogresstrackingtable-button_5">
                <Pencil size={16} strokeWidth={2} aria-hidden="true" />{t('TEXT_EDIT')}
              </button>
              <button type="button" onClick={() => void handleDelete(entry)} className="min-h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 font-semibold hover:bg-rose-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all" aria-label={t('TEXT_DELETE_ENTRY')} data-testid="trainer_progress_tracking-trainerprogresstrackingtable-button_6">
                <Trash2 size={16} strokeWidth={2} aria-hidden="true" />{t('TEXT_DELETE')}
              </button>
            </div>
          </article>
        ))}
        {filteredEntries.length === 0 && <div className="text-center py-10 text-secondary">{t('TEXT_NO_PROGRESS_ENTRIES_YET')}</div>}
      </div>

      <TrainerInfrastructurePagination currentPage={currentPage} totalPages={totalPages} totalItems={totalEntries} itemsPerPage={itemsPerPage} onPageChange={onPageChange} />
      <TrainerCoachingIndividualProgressQuickViewModal entry={quickViewEntry} onClose={() => setQuickViewEntry(null)} onEdit={onEdit} />
    </div>
  );
}
