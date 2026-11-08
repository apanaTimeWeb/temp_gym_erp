"use client";
// RESPONSIBILITY: Renders the repeatable exercise rows inside the Trainer workout form with Day-Wise Splits.
// DATA FLOW: React Hook Form field array → TrainerWorkoutExerciseFields → form inputs.
import { useState, useMemo } from 'react';
import { Plus, Trash2, Dumbbell, Calendar, Layers } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFieldArray } from 'react-hook-form';

import { useTrainerInfrastructureConfirm } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureConfirm';
import { TRAINER_WORKOUT_DEFAULT_EXERCISE } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansFormConstants';
import type { TrainerWorkoutExerciseFieldsProps } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansExerciseFieldsProps';

export const TRAINER_WORKOUT_EXERCISE_LIBRARY = [
  { name: 'Barbell Bench Press', category: 'Strength', muscle: 'Chest, Triceps, Shoulders', equipment: 'Barbell' },
  { name: 'Incline Dumbbell Press', category: 'Hypertrophy', muscle: 'Upper Chest, Deltoids', equipment: 'Dumbbell' },
  { name: 'Chest Press Machine', category: 'Strength', muscle: 'Chest, Triceps', equipment: 'Machine' },
  { name: 'Barbell Squat', category: 'Strength', muscle: 'Quadriceps, Glutes', equipment: 'Barbell' },
  { name: 'Leg Press', category: 'Strength', muscle: 'Quadriceps, Glutes', equipment: 'Machine' },
  { name: 'Romanian Deadlift', category: 'Strength', muscle: 'Hamstrings, Lower Back', equipment: 'Barbell' },
  { name: 'Lying Leg Curl', category: 'Hypertrophy', muscle: 'Hamstrings', equipment: 'Machine' },
  { name: 'Calf Raise', category: 'Strength', muscle: 'Calves', equipment: 'Machine' },
  { name: 'Lat Pulldown', category: 'Strength', muscle: 'Back, Biceps', equipment: 'Cable' },
  { name: 'Seated Cable Row', category: 'Strength', muscle: 'Mid-Back, Lats', equipment: 'Cable' },
  { name: 'Overhead Press', category: 'Strength', muscle: 'Shoulders, Triceps', equipment: 'Barbell' },
  { name: 'Lateral Raise', category: 'Hypertrophy', muscle: 'Side Deltoids', equipment: 'Dumbbell' },
  { name: 'Dumbbell Bicep Curl', category: 'Hypertrophy', muscle: 'Biceps', equipment: 'Dumbbell' },
  { name: 'Tricep Rope Pushdown', category: 'Hypertrophy', muscle: 'Triceps', equipment: 'Cable' },
  { name: 'Plank', category: 'Core', muscle: 'Core, Abs', equipment: 'Bodyweight' },
  { name: 'Hanging Leg Raise', category: 'Core', muscle: 'Abs, Hip Flexors', equipment: 'Bodyweight' },
];

export default function TrainerWorkoutExerciseFields({ control, register }: TrainerWorkoutExerciseFieldsProps) {
  const t = useTranslations('TRAINER_WORKOUT');
  const { fields, append, remove } = useFieldArray({ control, name: 'workoutExercises' });
  const { confirm } = useTrainerInfrastructureConfirm();

  // Collect existing unique days from the exercise records or default to ['Day 1']
  const initialDays = useMemo(() => {
    const rawFields = fields as Array<{ day?: string }>;
    const collected = Array.from(new Set(rawFields.map((f) => f.day || 'Day 1')));
    return collected.length > 0 ? collected : ['Day 1'];
  }, [fields]);

  const [daysList, setDaysList] = useState<string[]>(initialDays);
  const [activeDay, setActiveDay] = useState<string>(initialDays[0] || 'Day 1');

  const handleAddDay = () => {
    const nextDayNumber = daysList.length + 1;
    const newDayName = `Day ${nextDayNumber}`;
    if (!daysList.includes(newDayName)) {
      setDaysList([...daysList, newDayName]);
      setActiveDay(newDayName);
    }
  };

  const handleAppend = () => {
    append({
      ...TRAINER_WORKOUT_DEFAULT_EXERCISE,
      day: activeDay,
      sortOrder: fields.length,
    });
  };

  const handleRemove = async (index: number) => {
    const approved = await confirm({
      title: t('TEXT_REMOVE_EXERCISE_TITLE'),
      message: t('TEXT_REMOVE_EXERCISE_MESSAGE'),
      type: 'danger',
      confirmText: t('TEXT_REMOVE'),
    });
    if (approved) remove(index);
  };

  // Find exercises matching the active day
  const activeDayExercises = fields
    .map((field, index) => ({ field, index }))
    .filter(({ field }: { field: { day?: string } }) => (field.day || 'Day 1') === activeDay);

  return (
    <div className="pt-4 border-t border-border mt-4">
      {/* Header and Day Splits Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <label className="block text-sm font-bold text-primary flex items-center gap-1.5">
            <Layers size={18} className="text-primary" />
            {t("TEXT_WORKOUT_EXERCISES")} (Day-Wise Split)
          </label>
          <p className="text-xs text-secondary mt-0.5">
            Organize exercises into daily routines (Push, Pull, Legs, etc.)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddDay}
            className="min-h-9 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border text-secondary hover:text-primary hover:bg-input flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-testid="trainer_workout-add-day-split"
          >
            <Calendar size={14} />
            + Add Day Split
          </button>
          <button
            type="button"
            onClick={handleAppend}
            className="min-h-9 text-xs font-semibold text-on-primary bg-primary px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-testid="trainer_workout-trainerworkoutexercisefields-button_1"
          >
            <Plus size={16} strokeWidth={2} />
            {t("TEXT_ADD_EXERCISE")}
          </button>
        </div>
      </div>

      {/* Day Split Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border mb-3 custom-scrollbar">
        {daysList.map((day) => {
          const count = fields.filter((f: { day?: string }) => (f.day || 'Day 1') === day).length;
          const isActive = activeDay === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border shrink-0 motion-safe:transition-all ${
                isActive
                  ? 'bg-primary-subtle border-focus text-primary font-semibold'
                  : 'bg-card border-transparent text-secondary hover:bg-input hover:text-primary'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`}
            >
              <span>{day}</span>
              <span className="ms-1.5 px-1.5 py-0.2 rounded-full bg-input text-[10px] opacity-80">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Exercise Rows for Active Day */}
      <div className="space-y-3">
        {activeDayExercises.map(({ field, index }) => (
          <div
            key={field.id}
            className="bg-floating border border-border rounded-xl p-3 flex flex-col sm:flex-row gap-3"
          >
            {/* Hidden day field */}
            <input type="hidden" {...register(`workoutExercises.${index}.day`)} value={activeDay} />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor={`trainer-workout-exercise-${index}-name`}
                  className="block text-xs uppercase font-bold text-secondary"
                >
                  {t("TEXT_EXERCISE_NAME_4622A0")}
                </label>
                <span className="text-2xs text-secondary font-medium">Library Integrated</span>
              </div>
              <input
                id={`trainer-workout-exercise-${index}-name`}
                type="text"
                list="trainer-workout-exercise-library-list"
                placeholder="e.g. Barbell Bench Press"
                {...register(`workoutExercises.${index}.name`)}
                className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                data-testid={`trainer_workout-exercise-fields-name-${field.id}`}
              />
            </div>
            <div className="w-20">
              <label
                htmlFor={`trainer-workout-exercise-${index}-sets`}
                className="block text-xs uppercase font-bold text-secondary mb-1"
              >
                {t("TEXT_SETS")}
              </label>
              <input
                id={`trainer-workout-exercise-${index}-sets`}
                type="number"
                min="1"
                max="20"
                step="1"
                {...register(`workoutExercises.${index}.sets`, { valueAsNumber: true })}
                className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                data-testid={`trainer_workout-exercise-fields-sets-${field.id}`}
              />
            </div>
            <div className="w-20">
              <label
                htmlFor={`trainer-workout-exercise-${index}-reps`}
                className="block text-xs uppercase font-bold text-secondary mb-1"
              >
                {t("TEXT_REPS")}
              </label>
              <input
                id={`trainer-workout-exercise-${index}-reps`}
                type="number"
                min="1"
                max="100"
                step="1"
                {...register(`workoutExercises.${index}.reps`)}
                className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                data-testid={`trainer_workout-exercise-fields-reps-${field.id}`}
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor={`trainer-workout-exercise-${index}-weight`}
                className="block text-xs uppercase font-bold text-secondary mb-1"
              >
                {t("TEXT_WEIGHT")}
              </label>
              <input
                id={`trainer-workout-exercise-${index}-weight`}
                type="text"
                placeholder="e.g. 50kg"
                {...register(`workoutExercises.${index}.weight`)}
                className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                data-testid={`trainer_workout-exercise-fields-weight-${field.id}`}
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor={`trainer-workout-exercise-${index}-rest`}
                className="block text-xs uppercase font-bold text-secondary mb-1"
              >
                {t("TEXT_REST")}
              </label>
              <input
                id={`trainer-workout-exercise-${index}-rest`}
                type="text"
                placeholder="e.g. 60s"
                {...register(`workoutExercises.${index}.restTime`)}
                className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                data-testid={`trainer_workout-exercise-fields-rest-${field.id}`}
              />
            </div>
            <div className="flex items-end pb-0.5">
              <button
                type="button"
                aria-label={t("TEXT_REMOVE_EXERCISE")}
                onClick={() => void handleRemove(index)}
                className="min-w-11 min-h-11 p-2 text-danger hover:bg-danger-bg rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                data-testid={`trainer_workout-exercise-fields-remove-${field.id}`}
              >
                <Trash2 size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}

        {activeDayExercises.length === 0 && (
          <div className="text-center py-6 border border-dashed border-border rounded-xl text-secondary text-sm">
            <Dumbbell size={18} className="mx-auto mb-2 opacity-50" strokeWidth={2} />
            No exercises added for {activeDay} yet. Click "+ Add Exercise" above.
          </div>
        )}
      </div>

      <datalist id="trainer-workout-exercise-library-list">
        {TRAINER_WORKOUT_EXERCISE_LIBRARY.map((ex) => (
          <option key={ex.name} value={ex.name}>
            {ex.category} · {ex.muscle} ({ex.equipment})
          </option>
        ))}
      </datalist>
    </div>
  );
}
