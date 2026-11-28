"use client";
// RESPONSIBILITY: Centered quick-view modal showing complete body composition measurements, circumferences, and notes for a progress entry.
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Activity, Calendar, Edit2, FileText, Ruler, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import {
  TrainerProgressTrackingFormatDate,
  TrainerProgressTrackingFormatNumber,
} from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingDisplayFormatters';
import type { TrainerProgressTrackingProgressEntry } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';

export interface TrainerCoachingIndividualProgressQuickViewModalProps {
  entry: TrainerProgressTrackingProgressEntry | null;
  onClose: () => void;
  onEdit: (entry: TrainerProgressTrackingProgressEntry) => void;
}

export default function TrainerCoachingIndividualProgressQuickViewModal({
  entry,
  onClose,
  onEdit,
}: TrainerCoachingIndividualProgressQuickViewModalProps) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const locale = useLocale();

  useEffect(() => {
    if (!entry) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [entry, onClose]);

  if (!entry || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trainer-progress-quick-view-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      data-testid="trainer_progress-quick-view-overlay"
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />
      <div
        className="relative z-10 w-full max-w-xl max-h-[88dvh] overflow-y-auto rounded-2xl border border-sky-500/35 bg-card dark:bg-[#0E1526]/98 text-text-primary shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
        data-testid="trainer_progress-quick-view-modal"
      >
        <span aria-hidden="true" className="pointer-events-none block h-[2px] w-full bg-gradient-to-r from-[#FF5A1F] via-[#38BDF8] to-[#10B981]" />
        <div className="p-5 sm:p-6 border-b border-border dark:border-white/10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/35 text-sky-500 flex items-center justify-center shrink-0">
              <Calendar size={22} />
            </div>
            <div className="min-w-0">
              <h2 id="trainer-progress-quick-view-title" className="text-section-title font-extrabold text-text-primary truncate">
                {TrainerProgressTrackingFormatDate(entry.date, locale)}
              </h2>
              <p className="text-xs text-secondary font-mono mt-0.5">Entry #{entry.id}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-10 min-h-10 rounded-xl border border-border bg-input text-secondary hover:text-text-primary flex items-center justify-center cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase">{t('TEXT_WEIGHT_KG')}</p>
              <p className="mt-1 font-bold text-text-primary">{TrainerProgressTrackingFormatNumber(entry.weightKg, locale)} kg</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase">{t('TEXT_HEIGHT_CM')}</p>
              <p className="mt-1 font-bold text-text-primary">{TrainerProgressTrackingFormatNumber(entry.heightCm, locale)} cm</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase">{t('TEXT_BMI')}</p>
              <p className="mt-1 font-bold text-text-primary">{TrainerProgressTrackingFormatNumber(entry.bmi, locale)}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase">{t('TEXT_BODY_FAT_PERCENT')}</p>
              <p className="mt-1 font-bold text-text-primary">{entry.bodyFatPercent == null ? '—' : `${TrainerProgressTrackingFormatNumber(entry.bodyFatPercent, locale)}%`}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase">{t('TEXT_MUSCLE_MASS_KG')}</p>
              <p className="mt-1 font-bold text-text-primary">{entry.muscleMassKg == null ? '—' : `${TrainerProgressTrackingFormatNumber(entry.muscleMassKg, locale)} kg`}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase">{t('TEXT_WAIST_CM')}</p>
              <p className="mt-1 font-bold text-text-primary">{entry.waistCm == null ? '—' : `${TrainerProgressTrackingFormatNumber(entry.waistCm, locale)} cm`}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-input/60 p-3.5 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-secondary uppercase flex items-center gap-1.5"><Ruler size={13} className="text-emerald-500" /> Chest</p>
              <p className="mt-1 font-semibold text-text-primary">{entry.chestCm == null ? '—' : `${TrainerProgressTrackingFormatNumber(entry.chestCm, locale)} cm`}</p>
            </div>
            <div>
              <p className="text-xs text-secondary uppercase flex items-center gap-1.5"><Activity size={13} className="text-amber-500" /> Hip</p>
              <p className="mt-1 font-semibold text-text-primary">{entry.hipCm == null ? '—' : `${TrainerProgressTrackingFormatNumber(entry.hipCm, locale)} cm`}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-input/60 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5 mb-1.5">
              <FileText size={14} className="text-sky-500" /> {t('TEXT_NOTES')}
            </p>
            <p className="text-sm text-text-primary whitespace-pre-wrap">{displayValue(entry.notes)}</p>
          </div>
        </div>

        <div className="p-4 sm:px-6 border-t border-border bg-header/60 flex items-center justify-end gap-2.5">
          <button type="button" onClick={onClose} className="min-h-10 px-4 rounded-xl border border-border bg-input text-xs font-semibold text-secondary hover:text-text-primary cursor-pointer">
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(entry);
            }}
            className="min-h-10 inline-flex items-center gap-1.5 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover cursor-pointer"
          >
            <Edit2 size={14} /> {t('TEXT_EDIT')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
