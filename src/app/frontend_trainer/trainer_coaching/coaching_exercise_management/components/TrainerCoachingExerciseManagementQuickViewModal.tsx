"use client";
// RESPONSIBILITY: Centered quick-view modal showing full exercise metadata, target muscles, instructions, and media link.
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Activity, Dumbbell, Edit2, ExternalLink, FileText, Layers, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import { TRAINER_WORKOUT_DIFFICULTY_STYLES } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/TrainerCoachingExerciseManagementConstants';
import type { TrainerWorkoutExercise } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementTypes';

export interface TrainerCoachingExerciseManagementQuickViewModalProps {
  exercise: TrainerWorkoutExercise | null;
  onClose: () => void;
  onEdit: (id: string) => void;
}

export default function TrainerCoachingExerciseManagementQuickViewModal({
  exercise,
  onClose,
  onEdit,
}: TrainerCoachingExerciseManagementQuickViewModalProps) {
  const t = useTranslations('TRAINER_WORKOUT');

  useEffect(() => {
    if (!exercise) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [exercise, onClose]);

  if (!exercise || typeof document === 'undefined') return null;

  const muscles = Array.isArray(exercise.muscleGroup)
    ? exercise.muscleGroup.join(', ')
    : displayValue(exercise.muscleGroup);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trainer-exercise-quick-view-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      data-testid="trainer_workout-exercise-quick-view-overlay"
    >
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative z-10 w-full max-w-xl max-h-[88dvh] overflow-y-auto rounded-2xl border border-sky-500/35 bg-card dark:bg-[#0E1526]/98 text-text-primary shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
        data-testid="trainer_workout-exercise-quick-view-modal"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none block h-[2px] w-full bg-gradient-to-r from-[#FF5A1F] via-[#38BDF8] to-[#10B981]"
        />
        <div className="p-5 sm:p-6 border-b border-border dark:border-white/10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/35 text-sky-500 flex items-center justify-center shrink-0">
              <Dumbbell size={22} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="trainer-exercise-quick-view-title" className="text-section-title font-extrabold text-text-primary truncate">
                  {displayValue(exercise.name)}
                </h2>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${TRAINER_WORKOUT_DIFFICULTY_STYLES[exercise.difficulty as keyof typeof TRAINER_WORKOUT_DIFFICULTY_STYLES] ?? 'bg-input text-secondary'}`}>
                  {displayValue(exercise.difficulty)}
                </span>
              </div>
              <p className="text-xs text-secondary font-mono mt-1">ID: #{exercise.id}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-10 min-h-10 rounded-xl border border-border bg-input text-secondary hover:text-text-primary flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-input/60 p-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <Activity size={14} className="text-sky-500" /> {t('TEXT_PRIMARY_MUSCLE')}
              </p>
              <p className="mt-1 font-semibold text-text-primary">{muscles}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <Layers size={14} className="text-emerald-500" /> {t('TEXT_EQUIPMENT')} &amp; {t('TEXT_CATEGORY')}
              </p>
              <p className="mt-1 font-semibold text-text-primary">
                {displayValue(exercise.equipment)} · {displayValue(exercise.category)}
              </p>
            </div>
          </div>

          {(exercise.sets != null || exercise.reps || exercise.duration) && (
            <div className="rounded-xl border border-border bg-input/60 p-3.5 flex flex-wrap gap-5">
              {exercise.sets != null && <div><span className="text-xs text-secondary uppercase block">Sets</span><span className="font-bold text-text-primary">{exercise.sets}</span></div>}
              {exercise.reps && <div><span className="text-xs text-secondary uppercase block">Reps</span><span className="font-bold text-text-primary">{exercise.reps}</span></div>}
              {exercise.duration && <div><span className="text-xs text-secondary uppercase block">Duration</span><span className="font-bold text-text-primary">{exercise.duration}</span></div>}
            </div>
          )}

          <div className="rounded-xl border border-border bg-input/60 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5 mb-1.5">
              <FileText size={14} className="text-amber-500" /> Coaching Instructions
            </p>
            <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
              {exercise.instructions || exercise.description || 'No detailed instructions provided.'}
            </p>
          </div>

          {exercise.videoUrl && (
            <a
              href={exercise.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-sky-500 hover:underline"
            >
              <ExternalLink size={14} /> Open Demonstration Video
            </a>
          )}
        </div>

        <div className="p-4 sm:px-6 border-t border-border bg-header/60 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="min-h-10 px-4 rounded-xl border border-border bg-input text-xs font-semibold text-secondary hover:text-text-primary cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              const id = exercise.id;
              onClose();
              onEdit(id);
            }}
            className="min-h-10 inline-flex items-center gap-1.5 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover cursor-pointer"
          >
            <Edit2 size={14} /> {t('TEXT_EDIT_EXERCISE')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
