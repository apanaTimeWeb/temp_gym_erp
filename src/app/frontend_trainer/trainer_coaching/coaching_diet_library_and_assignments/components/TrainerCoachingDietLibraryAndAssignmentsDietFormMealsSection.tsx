"use client";
import { Plus, Trash2, Utensils, Lock } from 'lucide-react';
import type { UseFormRegister, UseFormWatch, FieldErrors, FieldArrayWithId } from 'react-hook-form';
import type { TrainerLibraryDietPlanFormValues } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/schemas/TrainerCoachingDietLibraryAndAssignmentsDietFormSchema';

interface MealsSectionProps {
  fields: FieldArrayWithId<TrainerLibraryDietPlanFormValues, 'meals', 'id'>[];
  append: (value: { name: string; time: string; items: string; description: string }) => void;
  remove: (index: number) => void;
  register: UseFormRegister<TrainerLibraryDietPlanFormValues>;
  watch: UseFormWatch<TrainerLibraryDietPlanFormValues>;
  errors: FieldErrors<TrainerLibraryDietPlanFormValues>;
}

export function TrainerCoachingDietLibraryAndAssignmentsDietFormMealsSection({
  fields,
  append,
  remove,
  register,
  watch,
  errors,
}: MealsSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-secondary uppercase tracking-wider flex items-center gap-1.5">
          <Utensils size={15} className="text-primary" />
          Meal Breakdown ({fields.length})
        </p>
        <button
          type="button"
          onClick={() =>
            append({
              name: `Meal ${fields.length + 1}`,
              time: '12:00 PM',
              items: '',
              description: '',
            })
          }
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary-subtle rounded-lg border border-border"
        >
          <Plus size={14} /> Add Meal
        </button>
      </div>

      {errors.meals && <p className="text-xs text-danger mb-2">{errors.meals.message}</p>}

      <div className="space-y-3">
        {fields.map((field, index) => {
          const currentName = watch(`meals.${index}.name`) || field.name || `Meal ${index + 1}`;
          const isCoreMeal = ['breakfast', 'lunch', 'dinner'].includes(currentName.trim().toLowerCase());

          return (
            <div
              key={field.id}
              className="p-3.5 bg-input border border-border rounded-xl space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="w-5 h-5 rounded-full bg-primary-subtle text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                {isCoreMeal ? (
                  <div className="flex-1 px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-bold text-text-primary flex items-center justify-between">
                    <span>{currentName}</span>
                    <span className="text-2xs text-secondary px-2 py-0.5 rounded-full bg-input border border-border flex items-center gap-1 font-medium">
                      <Lock size={10} className="text-secondary" /> Core Meal
                    </span>
                    <input type="hidden" {...register(`meals.${index}.name` as const)} value={currentName} />
                  </div>
                ) : (
                  <input
                    {...register(`meals.${index}.name` as const)}
                    placeholder="e.g., Afternoon Snack / Pre-Workout"
                    className="flex-1 px-2.5 py-1.5 bg-input border border-border rounded-lg text-sm font-semibold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  />
                )}
                <input
                  {...register(`meals.${index}.time` as const)}
                  placeholder="e.g., 08:30 AM"
                  className="w-28 px-2.5 py-1.5 bg-input border border-border rounded-lg text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
                {!isCoreMeal && fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    aria-label={`Remove Meal ${index + 1}`}
                    className="p-1.5 text-danger hover:bg-danger-bg rounded-lg"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              <input
                {...register(`meals.${index}.items` as const)}
                placeholder="Foods & ingredients (e.g. 100g oatmeal, 1 banana, 30g almonds)"
                className="w-full px-2.5 py-1.5 bg-input border border-border rounded-lg text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />

              <input
                {...register(`meals.${index}.description` as const)}
                placeholder="Prep notes or guidance (optional)"
                className="w-full px-2.5 py-1 bg-input border border-border rounded-lg text-2xs text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
