"use client";
// RESPONSIBILITY: Centered quick-view modal showing full comparison snapshot metrics for a member.
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Activity, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import TrainerProgressTrackingComparisonDelta from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/components/TrainerCoachingProgressComparisonProgressTrackingComparisonDelta';
import { TrainerProgressTrackingFormatNumber } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingDisplayFormatters';
import type { TrainerProgressTrackingComparisonMemberSnapshot } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingTypes';

export interface TrainerCoachingProgressComparisonQuickViewModalProps {
  snapshot: TrainerProgressTrackingComparisonMemberSnapshot | null;
  onClose: () => void;
}

export default function TrainerCoachingProgressComparisonQuickViewModal({
  snapshot,
  onClose,
}: TrainerCoachingProgressComparisonQuickViewModalProps) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const locale = useLocale();

  useEffect(() => {
    if (!snapshot) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [snapshot, onClose]);

  if (!snapshot || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trainer-comparison-quick-view-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      data-testid="trainer_comparison-quick-view-overlay"
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />
      <div
        className="relative z-10 w-full max-w-lg max-h-[88dvh] overflow-y-auto rounded-2xl border border-sky-500/35 bg-white dark:bg-[#0F172A] text-text-primary shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
        data-testid="trainer_comparison-quick-view-modal"
      >
        <span aria-hidden="true" className="pointer-events-none block h-[2px] w-full bg-gradient-to-r from-[#FF5A1F] via-[#38BDF8] to-[#10B981]" />
        <div className="p-5 sm:p-6 border-b border-border dark:border-white/10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-primary-subtle border border-border text-primary flex items-center justify-center font-extrabold text-lg shrink-0">
              {snapshot.memberName.charAt(0)}
            </div>
            <div className="min-w-0">
              <h2 id="trainer-comparison-quick-view-title" className="text-section-title font-extrabold text-text-primary truncate">
                {snapshot.memberName}
              </h2>
              <p className="text-xs text-secondary font-mono mt-0.5">Member #{snapshot.memberId}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="min-w-10 min-h-10 rounded-xl border border-border bg-input text-secondary hover:text-text-primary flex items-center justify-center cursor-pointer" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase">{t('TEXT_WEIGHT_KG')}</p>
              <p className="mt-1 font-bold text-text-primary">{snapshot.latestWeightKg == null ? displayValue(snapshot.latestWeightKg) : `${TrainerProgressTrackingFormatNumber(snapshot.latestWeightKg, locale)} kg`}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase">{t('TEXT_BMI')}</p>
              <p className="mt-1 font-bold text-text-primary">{snapshot.latestBmi == null ? displayValue(snapshot.latestBmi) : TrainerProgressTrackingFormatNumber(snapshot.latestBmi, locale)}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase">{t('TEXT_BODY_FAT_PERCENT')}</p>
              <p className="mt-1 font-bold text-text-primary">{snapshot.latestBodyFatPercent == null ? '—' : `${TrainerProgressTrackingFormatNumber(snapshot.latestBodyFatPercent, locale)}%`}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase">{t('TEXT_MUSCLE_MASS_KG')}</p>
              <p className="mt-1 font-bold text-text-primary">{snapshot.latestMuscleMassKg == null ? displayValue(snapshot.latestMuscleMassKg) : `${TrainerProgressTrackingFormatNumber(snapshot.latestMuscleMassKg, locale)} kg`}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase mb-1">{t('TEXT_DELTA_WEIGHT')}</p>
              <TrainerProgressTrackingComparisonDelta value={snapshot.weightChangeKg} lowerIsBetter={true} />
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase mb-1">{t('TEXT_DELTA_MUSCLE')}</p>
              <TrainerProgressTrackingComparisonDelta value={snapshot.muscleMassChange} lowerIsBetter={false} />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-input/60 p-3.5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5">
              <Activity size={14} className="text-sky-500" /> {t('TEXT_ENTRIES')}
            </span>
            <span className="font-bold text-text-primary">{TrainerProgressTrackingFormatNumber(snapshot.totalEntries, locale)}</span>
          </div>
        </div>

        <div className="p-4 sm:px-6 border-t border-border bg-header/60 flex justify-end">
          <button type="button" onClick={onClose} className="min-h-10 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
