"use client";
import { useEffect, useState } from 'react';
import { Calendar, Check, Clock, Copy, CopyPlus, Dumbbell, Edit2, Layers, Target, UserPlus, X } from 'lucide-react';
import { displayValue } from '@/lib/display_value';
import { TRAINER_WORKOUT_DIFFICULTY_STYLES } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/TrainerCoachingWorkoutPlansConstants';
import type { TrainerWorkoutWorkout } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansTypes';

interface Props {
  plan: TrainerWorkoutWorkout | null;
  onClose: () => void;
  onEdit: (id: string) => void;
  onAssign: (plan: TrainerWorkoutWorkout) => void;
  onClone?: (plan: TrainerWorkoutWorkout) => void;
}

function buildWorkoutSummaryText(plan: TrainerWorkoutWorkout): string {
  const lines = [
    `Workout Plan: ${plan.name}`,
    `Level: ${plan.level} | Days/Week: ${plan.days} | Duration: ${plan.duration} | Focus: ${plan.focus}`,
  ];
  if (plan.goal) lines.push(`Goal: ${plan.goal}`);
  if (plan.instructions) lines.push(`Instructions: ${plan.instructions}`);
  const exercises = plan.workoutExercises ?? [];
  if (exercises.length > 0) {
    lines.push('', 'Exercises:');
    exercises.forEach((ex, i) => {
      lines.push(`${i + 1}. [${ex.day || 'Day 1'}] ${ex.name} — ${ex.sets} sets x ${ex.reps} reps${ex.restTime ? ` (${ex.restTime} rest)` : ''}`);
    });
  }
  return lines.join('\n');
}

export default function TrainerCoachingWorkoutPlansQuickViewModal({ plan, onClose, onEdit, onAssign, onClone }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!plan) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [plan, onClose]);

  if (!plan) return null;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildWorkoutSummaryText(plan));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked in restricted context
    }
  };

  const tags = Array.isArray(plan.tags)
    ? plan.tags
    : typeof plan.tags === 'string'
      ? String(plan.tags).split(',').map((t) => t.trim()).filter(Boolean)
      : [];

  const exercisesList = plan.workoutExercises ?? [];
  const groupedDays = exercisesList.reduce<Record<string, typeof exercisesList>>((acc, ex) => {
    const dayKey = ex.day || 'Day 1';
    if (!acc[dayKey]) acc[dayKey] = [];
    acc[dayKey].push(ex);
    return acc;
  }, {});

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-backdrop p-4 overflow-y-auto"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="workout-quick-view-title"
        className="my-auto w-full max-w-2xl rounded-2xl border border-border bg-white dark:bg-[#0F172A] text-text-primary shadow-dialog overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4 bg-white dark:bg-[#0F172A]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl border border-sky-500/30 bg-sky-500/15 flex items-center justify-center text-sky-500 shrink-0">
              <Dumbbell size={18} />
            </div>
            <div className="min-w-0">
              <h3 id="workout-quick-view-title" className="text-lg font-bold text-text-primary truncate">
                {displayValue(plan.name)}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${TRAINER_WORKOUT_DIFFICULTY_STYLES[plan.level as keyof typeof TRAINER_WORKOUT_DIFFICULTY_STYLES] ?? 'bg-input text-secondary'}`}>
                  {displayValue(plan.level)}
                </span>
                <span className="text-xs font-mono text-secondary">#{plan.id}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close workout details"
            className="min-w-10 min-h-10 inline-flex items-center justify-center rounded-xl text-secondary hover:text-text-primary hover:bg-input cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          {/* Core Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-border bg-input p-3">
              <p className="text-[11px] uppercase font-semibold text-secondary flex items-center gap-1">
                <Calendar size={12} /> Days / Week
              </p>
              <p className="mt-1 text-base font-bold text-text-primary">{displayValue(plan.days)}</p>
            </div>
            <div className="rounded-xl border border-border bg-input p-3">
              <p className="text-[11px] uppercase font-semibold text-secondary flex items-center gap-1">
                <Layers size={12} /> Exercises
              </p>
              <p className="mt-1 text-base font-bold text-text-primary">{displayValue(plan.exercises)}</p>
            </div>
            <div className="rounded-xl border border-border bg-input p-3">
              <p className="text-[11px] uppercase font-semibold text-secondary flex items-center gap-1">
                <Clock size={12} /> Duration
              </p>
              <p className="mt-1 text-base font-bold text-text-primary">{displayValue(plan.duration)}</p>
            </div>
            <div className="rounded-xl border border-border bg-input p-3">
              <p className="text-[11px] uppercase font-semibold text-secondary flex items-center gap-1">
                <Target size={12} /> Focus
              </p>
              <p className="mt-1 text-base font-bold text-text-primary truncate">{displayValue(plan.focus)}</p>
            </div>
          </div>

          {/* Goal / Schedule / Assignment */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-border bg-card p-4 text-sm">
            <div>
              <dt className="text-xs font-semibold text-secondary uppercase">Goal</dt>
              <dd className="mt-0.5 text-text-primary">{displayValue(plan.goal)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-secondary uppercase">Assigned Member</dt>
              <dd className="mt-0.5 text-text-primary">{plan.assignedMemberId ? plan.assignedMemberId : 'Global / Reusable Template'}</dd>
            </div>
            {(plan.startDate || plan.endDate) && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold text-secondary uppercase">Schedule Window</dt>
                <dd className="mt-0.5 text-text-primary">
                  {displayValue(plan.startDate)} → {displayValue(plan.endDate)}
                </dd>
              </div>
            )}
            {plan.instructions && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold text-secondary uppercase">Instructions / Coaching Notes</dt>
                <dd className="mt-0.5 whitespace-pre-wrap text-text-primary">{plan.instructions}</dd>
              </div>
            )}
          </dl>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="text-xs bg-input border border-border text-secondary px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Day-wise Exercises */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-text-primary">Exercise Breakdown</h4>
            {exercisesList.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-4 text-xs text-secondary text-center">
                No exercises linked to this workout plan yet.
              </p>
            ) : (
              Object.entries(groupedDays).map(([dayName, dayExercises]) => (
                <div key={dayName} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="border-b border-border bg-surface-highlight px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
                    {dayName} ({dayExercises.length})
                  </div>
                  <div className="divide-y divide-border">
                    {dayExercises.map((ex, i) => (
                      <div key={`${dayName}-${ex.name}-${i}`} className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                        <span className="font-semibold text-text-primary">{ex.name}</span>
                        <div className="flex flex-wrap items-center gap-3 text-secondary">
                          <span><strong className="text-text-primary">{ex.sets}</strong> sets</span>
                          <span>× <strong className="text-text-primary">{ex.reps}</strong> reps</span>
                          {ex.weight ? <span>@ {ex.weight}</span> : null}
                          {ex.restTime ? <span className="px-2 py-0.5 rounded-md bg-input border border-border">{ex.restTime} rest</span> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-border px-5 py-4 bg-white dark:bg-[#0F172A]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void handleCopySummary()}
              className="min-h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-input px-3.5 text-xs sm:text-sm font-semibold text-text-primary hover:bg-surface-hover cursor-pointer"
              data-testid="trainer_workout-quick-view-copy-summary"
            >
              {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
              {copied ? 'Copied!' : 'Copy Summary'}
            </button>
            {onClone && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onClone(plan);
                }}
                className="min-h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-purple-500/35 bg-purple-500/10 px-3.5 text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-300 hover:bg-purple-500/20 cursor-pointer"
                data-testid="trainer_workout-quick-view-clone"
              >
                <CopyPlus size={15} />
                Clone Plan
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="min-h-10 rounded-xl border border-border bg-input px-4 text-sm font-semibold text-text-primary hover:bg-surface-hover cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onAssign(plan);
              }}
              className="min-h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 px-4 text-sm font-semibold text-sky-600 dark:text-sky-300 hover:bg-sky-500/25 cursor-pointer"
            >
              <UserPlus size={15} />
              Assign Plan
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(plan.id);
              }}
              className="min-h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-on-primary hover:bg-primary-hover cursor-pointer"
            >
              <Edit2 size={15} />
              Edit Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
