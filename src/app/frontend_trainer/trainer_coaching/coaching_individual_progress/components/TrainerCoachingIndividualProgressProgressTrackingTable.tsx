"use client";
// RESPONSIBILITY: Renders the paginated Progress entries table/card stack and delegates edits/deletes to the owning feature.
/**
 * @description Renders progress entries as an accessible table with row expansion and the documented mobile card-stack fallback.
 * @dependencies Consumes progress entries from the owning feature query layer and feature-local formatters only.
 * @edge-cases Handles nullable measurements, empty records, repeated row expansion, keyboard activation, and preserved action reachability on mobile.
 */
// DATA FLOW: Query response → rows/cards; URL page/sort → query refresh; delete → typed confirmation → mutation.
import { Fragment, useState } from 'react';

import { Pencil, Trash2 } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { useTrainerInfrastructureConfirm } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureConfirm';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressTrainerInfrastructureTooltip';

import TrainerInfrastructurePagination from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressTrainerInfrastructurePagination';

import TrainerProgressTrackingSortDirectionIcon from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingSortDirectionIcon';

import { TRAINER_PROGRESS_TRACKING_PROGRESS_TABLE_COLUMNS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingConstants';

import { displayValue } from '@/lib/display_value';
import { TrainerProgressTrackingFormatNumber, TrainerProgressTrackingFormatDate } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingDisplayFormatters';

import type { TrainerProgressTrackingTableProps } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTableProps';

import type { TrainerProgressTrackingProgressEntry, TrainerProgressTrackingProgressSortField } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';

/**
 * @description Renders Progress entries in semantic desktop-table form and mobile card-stack form while preserving edit/delete behavior.
 * @dependencies Query result, URL-owned page/sort state, feature mutation callbacks, and module confirmation infrastructure.
 * @edge-case Displays nullable metrics as an en dash and keeps every required measurement and action visible on mobile.
 */
/**
 * @description Renders the progress tracking data table with module-owned status formatting, row actions, responsive behavior, and keyboard-accessible interactions.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves nullable-value fallbacks, keyboard access to row actions, and the documented mobile table strategy.
 */
export default function TrainerProgressTrackingTable({ entries, totalEntries, currentPage, itemsPerPage, sortBy, sortDirection, onPageChange, onSort, onEdit, onDelete }: TrainerProgressTrackingTableProps) {
  const locale = useLocale();
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const { confirm } = useTrainerInfrastructureConfirm();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const totalPages = Math.max(1, Math.ceil(totalEntries / itemsPerPage));

  const handleDelete = async (entry: TrainerProgressTrackingProgressEntry) => {
    const approved = await confirm({ title: t('TEXT_DELETE_ENTRY_TITLE'), message: t('TEXT_DELETE_ENTRY_MESSAGE', { date: entry.date }), type: 'danger', confirmText: t('TEXT_DELETE'), requireTypedConfirmation: true, confirmationPhrase: t('TEXT_DELETE_ENTRY_CONFIRMATION') });
    if (approved) onDelete(entry.id);
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-surface-highlight" data-testid="trainer_progress_tracking-TrainerProgressTrackingTable-row-1">{TRAINER_PROGRESS_TRACKING_PROGRESS_TABLE_COLUMNS.map((column) => <th key={column.labelKey} scope="col" className="px-4 py-3 text-start text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{column.field ? <button type="button" onClick={() => onSort(column.field as TrainerProgressTrackingProgressSortField)} className="min-w-11 min-h-11 inline-flex items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_SORT_COLUMN', { column: t(column.labelKey) })} data-testid={`trainer_progress_tracking-progress-table-sort-${column.field ?? column.labelKey}`}>{t(column.labelKey)}<TrainerProgressTrackingSortDirectionIcon active={sortBy === column.field} direction={sortDirection} /></button> : t(column.labelKey)}</th>)}<th scope="col" className="px-4 py-3 text-start text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{t('TEXT_ACTIONS')}</th></tr></thead>
          <tbody className="divide-y divide-border">{entries.map((entry) => { const expanded = expandedId === entry.id; return <Fragment key={entry.id}><tr data-testid={`trainer_progress_tracking-progress-table-row-${entry.id}`} className="hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base"><td className="px-4 py-3 text-primary whitespace-nowrap"><button type="button" aria-expanded={expanded} aria-controls={expanded ? `trainer-progress-entry-notes-${entry.id}` : undefined} onClick={() => setExpandedId((current) => current === entry.id ? null : entry.id)} className="min-h-11 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page underline-offset-2 hover:underline" data-testid={`trainer_progress_tracking-progress-table-expand-${entry.id}`}>{TrainerProgressTrackingFormatDate(entry.date, locale)}</button></td><td className="px-4 py-3 text-primary">{TrainerProgressTrackingFormatNumber(entry.weightKg, locale)}</td><td className="px-4 py-3 text-primary">{TrainerProgressTrackingFormatNumber(entry.heightCm, locale)}</td><td className="px-4 py-3 text-primary">{TrainerProgressTrackingFormatNumber(entry.bmi, locale)}</td><td className="px-4 py-3 text-primary">{entry.bodyFatPercent == null ? displayValue(entry.bodyFatPercent) : TrainerProgressTrackingFormatNumber(entry.bodyFatPercent, locale)}</td><td className="px-4 py-3 text-primary">{entry.muscleMassKg == null ? displayValue(entry.muscleMassKg) : TrainerProgressTrackingFormatNumber(entry.muscleMassKg, locale)}</td><td className="px-4 py-3 text-primary">{entry.waistCm == null ? displayValue(entry.waistCm) : TrainerProgressTrackingFormatNumber(entry.waistCm, locale)}</td><td className="px-4 py-3 text-secondary max-w-40"><TrainerInfrastructureTooltip content={String(displayValue(entry.notes))}><span className="block max-w-40 truncate">{displayValue(entry.notes)}</span></TrainerInfrastructureTooltip></td><td className="px-4 py-3"><div className="flex items-center gap-2"><button type="button" onClick={(event) => { event.stopPropagation(); onEdit(entry); }} className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_EDIT_ENTRY_65440F')} title={t('TEXT_EDIT_ENTRY_65440F')} data-testid={`trainer_progress_tracking-progress-table-edit-${entry.id}`}><Pencil size={18} strokeWidth={2} aria-hidden="true" /></button><button type="button" onClick={(event) => { event.stopPropagation(); void handleDelete(entry); }} className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 rounded-lg text-secondary hover:text-danger hover:bg-danger-bg motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_DELETE_ENTRY')} title={t('TEXT_DELETE_ENTRY')} data-testid={`trainer_progress_tracking-progress-table-delete-${entry.id}`}><Trash2 size={18} strokeWidth={2} aria-hidden="true" /></button></div></td></tr>{expanded && <tr id={`trainer-progress-entry-notes-${entry.id}`} className="bg-surface-highlight" data-testid="trainer_progress_tracking-TrainerProgressTrackingTable-row-2"><td colSpan={TRAINER_PROGRESS_TRACKING_PROGRESS_TABLE_COLUMNS.length + 1} className="px-4 py-3 text-sm text-secondary">{displayValue(entry.notes)}</td></tr>}</Fragment>; })}</tbody>
        </table>
      </div>

      <div className="cursor-pointer md:hidden space-y-3 p-3">
        {entries.map((entry) => <article key={entry.id} className="bg-card rounded-xl border border-border p-4 shadow-card" data-testid={`trainer-progress-tracking-progress-table-card-${entry.id}`}>
          <div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="font-semibold text-primary truncate">{TrainerProgressTrackingFormatDate(entry.date, locale)}</h3><p className="text-xs text-secondary">{t('TEXT_DATE')}</p></div><span className="shrink-0 inline-flex px-2 py-1 rounded-md text-xs font-semibold bg-info-bg text-info" data-testid={`trainer-progress-tracking-table-entry-state-${entry.id}`}>{t('TEXT_PROGRESS_TRACKING')}</span></div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_WEIGHT_KG')}</span><span className="text-primary">{TrainerProgressTrackingFormatNumber(entry.weightKg, locale)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_HEIGHT_CM')}</span><span className="text-primary">{TrainerProgressTrackingFormatNumber(entry.heightCm, locale)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_BMI')}</span><span className="text-primary">{TrainerProgressTrackingFormatNumber(entry.bmi, locale)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_BODY_FAT_PERCENT')}</span><span className="text-primary">{entry.bodyFatPercent == null ? displayValue(entry.bodyFatPercent) : `${TrainerProgressTrackingFormatNumber(entry.bodyFatPercent, locale)}%`}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_MUSCLE_MASS_KG')}</span><span className="text-primary">{entry.muscleMassKg == null ? displayValue(entry.muscleMassKg) : TrainerProgressTrackingFormatNumber(entry.muscleMassKg, locale)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_WAIST_CM')}</span><span className="text-primary">{entry.waistCm == null ? displayValue(entry.waistCm) : TrainerProgressTrackingFormatNumber(entry.waistCm, locale)}</span></p><p className="col-span-2"><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_NOTES')}</span><span className="text-primary">{displayValue(entry.notes)}</span></p></div>
          <div className="mt-4 pt-3 border-t border-border flex gap-2"><button type="button" onClick={() => onEdit(entry)} className="min-h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_EDIT_ENTRY_65440F')} data-testid="trainer_progress_tracking-trainerprogresstrackingtable-button_5"><Pencil size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_EDIT')}</button><button type="button" onClick={() => void handleDelete(entry)} className="min-h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-danger text-on-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_DELETE_ENTRY')} data-testid="trainer_progress_tracking-trainerprogresstrackingtable-button_6"><Trash2 size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_DELETE')}</button></div>
        </article>)}
        {entries.length === 0 && <div className="text-center py-10 text-secondary">{t('TEXT_NO_PROGRESS_ENTRIES_YET')}</div>}
      </div>

      <TrainerInfrastructurePagination currentPage={currentPage} totalPages={totalPages} totalItems={totalEntries} itemsPerPage={itemsPerPage} onPageChange={onPageChange}/>
    </div>
  );
}

