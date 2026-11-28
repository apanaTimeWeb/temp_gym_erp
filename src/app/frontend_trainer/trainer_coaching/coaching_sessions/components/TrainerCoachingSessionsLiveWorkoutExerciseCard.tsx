"use client";
import { Check, Plus, Trash2 } from 'lucide-react';
import type { LiveWorkoutExercise } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

interface ExerciseCardProps {
  exercise: LiveWorkoutExercise;
  exIndex: number;
  onAddSet: (exerciseId: string) => void;
  onToggleSetCompleted: (exerciseId: string, setId: string) => void;
  onUpdateSetValue: (
    exerciseId: string,
    setId: string,
    field: 'actualWeightKg' | 'actualReps' | 'rpe',
    value: number
  ) => void;
  onRemoveSet: (exerciseId: string, setId: string) => void;
}

export function TrainerCoachingSessionsLiveWorkoutExerciseCard({
  exercise,
  exIndex,
  onAddSet,
  onToggleSetCompleted,
  onUpdateSetValue,
  onRemoveSet,
}: ExerciseCardProps) {
  return (
    <div className="bg-floating border border-border rounded-xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 rounded-lg bg-primary-subtle text-primary text-xs font-bold flex items-center justify-center shrink-0">
            {exIndex + 1}
          </span>
          <h3 className="font-bold text-text-primary text-base truncate">{exercise.name}</h3>
        </div>
        <button
          type="button"
          onClick={() => onAddSet(exercise.id)}
          className="min-h-9 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
        >
          <Plus size={14} /> Add Set
        </button>
      </div>

      {/* Sets Mobile Card Stack */}
      <div className="md:hidden space-y-2.5">
        {exercise.sets.map((set) => (
          <div
            key={set.id}
            className={`rounded-xl border border-border p-3 space-y-2.5 text-xs ${set.completed ? 'bg-success-bg text-primary font-medium' : 'bg-card text-primary'}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-secondary">Set #{set.setNumber}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleSetCompleted(exercise.id, set.id)}
                  className={`min-h-9 min-w-9 rounded-lg inline-flex items-center justify-center transition-colors ${
                    set.completed
                      ? 'bg-success text-on-primary'
                      : 'bg-input border border-border text-secondary hover:border-primary'
                  }`}
                  aria-label={`Toggle set ${set.setNumber} completion`}
                >
                  <Check size={16} strokeWidth={set.completed ? 3 : 2} />
                </button>
                {exercise.sets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveSet(exercise.id, set.id)}
                    className="min-h-9 min-w-9 inline-flex items-center justify-center text-secondary hover:text-danger p-1 rounded-lg border border-border"
                    aria-label={`Remove set ${set.setNumber}`}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <label className="space-y-1">
                <span className="block text-[10px] text-secondary uppercase">Wt ({set.targetWeightKg}kg)</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={set.actualWeightKg}
                  onChange={(e) => onUpdateSetValue(exercise.id, set.id, 'actualWeightKg', Number(e.target.value))}
                  className="w-full min-h-9 px-2 py-1 rounded bg-input border border-border text-center text-text-primary font-semibold focus-visible:ring-1 focus-visible:ring-focus-ring"
                />
              </label>
              <label className="space-y-1">
                <span className="block text-[10px] text-secondary uppercase">Reps ({set.targetReps})</span>
                <input
                  type="number"
                  min="1"
                  value={set.actualReps}
                  onChange={(e) => onUpdateSetValue(exercise.id, set.id, 'actualReps', Number(e.target.value))}
                  className="w-full min-h-9 px-2 py-1 rounded bg-input border border-border text-center text-text-primary font-semibold focus-visible:ring-1 focus-visible:ring-focus-ring"
                />
              </label>
              <label className="space-y-1">
                <span className="block text-[10px] text-secondary uppercase">RPE (1-10)</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={set.rpe}
                  onChange={(e) => onUpdateSetValue(exercise.id, set.id, 'rpe', Number(e.target.value))}
                  className="w-full min-h-9 px-2 py-1 rounded bg-input border border-border text-center text-text-primary font-semibold focus-visible:ring-1 focus-visible:ring-focus-ring"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Sets Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="text-secondary uppercase border-b border-border text-[11px]">
            <tr>
              <th className="py-2 px-2 text-center w-12">Set</th>
              <th className="py-2 px-3">Target Wt (kg)</th>
              <th className="py-2 px-3">Actual Wt (kg)</th>
              <th className="py-2 px-3">Target Reps</th>
              <th className="py-2 px-3">Actual Reps</th>
              <th className="py-2 px-3">RPE (1-10)</th>
              <th className="py-2 px-3 text-center w-16">Done</th>
              <th className="py-2 px-1 text-center w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {exercise.sets.map((set) => (
              <tr
                key={set.id}
                className={`transition-colors ${set.completed ? 'bg-success-bg text-primary font-medium' : 'text-primary'}`}
              >
                <td className="py-2 px-2 text-center font-bold text-secondary">
                  {set.setNumber}
                </td>
                <td className="py-2 px-3 text-secondary">
                  {set.targetWeightKg} kg
                </td>
                <td className="py-2 px-3">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={set.actualWeightKg}
                    onChange={(e) => onUpdateSetValue(exercise.id, set.id, 'actualWeightKg', Number(e.target.value))}
                    className="w-16 px-2 py-1 rounded bg-card border border-border text-center text-text-primary font-semibold focus-visible:ring-1 focus-visible:ring-focus-ring"
                  />
                </td>
                <td className="py-2 px-3 text-secondary">
                  {set.targetReps}
                </td>
                <td className="py-2 px-3">
                  <input
                    type="number"
                    min="1"
                    value={set.actualReps}
                    onChange={(e) => onUpdateSetValue(exercise.id, set.id, 'actualReps', Number(e.target.value))}
                    className="w-14 px-2 py-1 rounded bg-card border border-border text-center text-text-primary font-semibold focus-visible:ring-1 focus-visible:ring-focus-ring"
                  />
                </td>
                <td className="py-2 px-3">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={set.rpe}
                    onChange={(e) => onUpdateSetValue(exercise.id, set.id, 'rpe', Number(e.target.value))}
                    className="w-12 px-2 py-1 rounded bg-card border border-border text-center text-text-primary font-semibold focus-visible:ring-1 focus-visible:ring-focus-ring"
                  />
                </td>
                <td className="py-2 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => onToggleSetCompleted(exercise.id, set.id)}
                    className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors ${
                      set.completed
                        ? 'bg-success text-on-primary'
                        : 'bg-card border border-border text-secondary hover:border-primary'
                    }`}
                    aria-label={`Toggle set ${set.setNumber} completion`}
                  >
                    <Check size={16} strokeWidth={set.completed ? 3 : 2} />
                  </button>
                </td>
                <td className="py-2 px-1 text-center">
                  {exercise.sets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveSet(exercise.id, set.id)}
                      className="text-secondary hover:text-danger p-1 rounded"
                      aria-label={`Remove set ${set.setNumber}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
