"use client";
// RESPONSIBILITY: Modal form for creating and editing Trainer Diet Plans with macro calculations and meal builder.
import { useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2, Utensils, Zap, Loader2, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/TrainerCoachingDietLibraryAndAssignmentsuseTrainerInfrastructureDialogFocusTrap';
import { TRAINER_LIBRARY_GOALS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/TrainerCoachingDietLibraryAndAssignmentsConstants';
import {
  TrainerLibraryDietPlanFormSchema,
  type TrainerLibraryDietPlanFormValues,
} from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/schemas/TrainerCoachingDietLibraryAndAssignmentsDietFormSchema';
import type { TrainerLibraryDietPlan } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';

export interface TrainerLibraryDietFormModalProps {
  isOpen: boolean;
  plan: TrainerLibraryDietPlan | null;
  isSaving: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: TrainerLibraryDietPlanFormValues, idempotencyKey: string) => Promise<void>;
}

export default function TrainerLibraryDietFormModal({
  isOpen,
  plan,
  isSaving,
  errorMessage,
  onClose,
  onSubmit,
}: TrainerLibraryDietFormModalProps) {
  const t = useTranslations('TRAINER_LIBRARY');
  const dialogRef = useRef<HTMLDivElement>(null);
  const isEdit = Boolean(plan);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TrainerLibraryDietPlanFormValues>({
    resolver: zodResolver(TrainerLibraryDietPlanFormSchema),
    defaultValues: {
      name: '',
      goal: 'Weight Loss',
      calories: 2000,
      protein: 150,
      carbs: 200,
      fats: 60,
      description: '',
      meals: [
        { name: 'Breakfast', time: '08:00 AM', items: 'Oats, scoop of whey protein, berries', description: 'Morning energy boost' },
        { name: 'Lunch', time: '01:00 PM', items: 'Grilled chicken breast, quinoa, steamed broccoli', description: 'High protein recovery' },
        { name: 'Dinner', time: '08:00 PM', items: 'Salmon fillet, sweet potato, leafy greens', description: 'Clean evening meal' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'meals',
  });

  useEffect(() => {
    if (isOpen) {
      if (plan) {
        reset({
          name: plan.name,
          goal: plan.goal || 'Weight Loss',
          calories: plan.calories ?? 2000,
          protein: plan.protein ?? 150,
          carbs: plan.carbs ?? 200,
          fats: plan.fats ?? 60,
          description: plan.description ?? '',
          meals: plan.meals?.length
            ? plan.meals.map((m) =>
                typeof m === 'string'
                  ? { name: m, time: '', items: '', description: '' }
                  : {
                      name: m.name ?? 'Meal',
                      time: m.time ?? '',
                      items: m.items ?? '',
                      description: m.description ?? '',
                    }
              )
            : [{ name: 'Meal 1', time: '08:00 AM', items: '', description: '' }],
        });
      } else {
        reset({
          name: '',
          goal: 'Weight Loss',
          calories: 2000,
          protein: 150,
          carbs: 200,
          fats: 60,
          description: '',
          meals: [
            { name: 'Breakfast', time: '08:00 AM', items: 'Oats, whey protein, mixed berries', description: 'High fiber & protein' },
            { name: 'Lunch', time: '01:00 PM', items: 'Grilled chicken, brown rice, vegetables', description: 'Nutrient-dense lunch' },
            { name: 'Dinner', time: '08:00 PM', items: 'Fish fillet or paneer, quinoa, salad', description: 'Light recovery dinner' },
          ],
        });
      }
    }
  }, [isOpen, plan, reset]);

  useTrainerInfrastructureDialogFocusTrap({
    isOpen,
    dialogRef,
    onEscape: onClose,
  });

  if (!isOpen) return null;

  const handleFormSubmit = async (values: TrainerLibraryDietPlanFormValues) => {
    const idempotencyKey = `diet-form-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    await onSubmit(values, idempotencyKey);
  };

  return (
    <div className="fixed inset-0 bg-overlay-backdrop z-50 flex items-center justify-center p-4 overflow-y-auto" role="presentation">
      <div
        ref={dialogRef}
        className="my-auto bg-card border border-border rounded-2xl shadow-dialog w-full max-w-2xl max-h-dialog-desktop flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="diet-form-title"
        tabIndex={-1}
      >
        {/* Modal Header */}
        <div className="shrink-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between rounded-t-2xl">
          <div>
            <h3 id="diet-form-title" className="text-lg font-bold text-primary">
              {isEdit ? t('TEXT_EDIT_DIET_PLAN') ?? 'Edit Diet Plan' : t('TEXT_CREATE_CUSTOM_DIET_PLAN') ?? 'Create Custom Diet Plan'}
            </h3>
            <p className="text-xs text-secondary mt-0.5">
              {isEdit
                ? 'Update macros and meal structure for this diet plan'
                : 'Tailor nutritional guidelines, target macros, and meals for your clients'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('TEXT_CLOSE') ?? 'Close'}
            disabled={isSaving}
            className="min-w-10 min-h-10 p-2 rounded-lg hover:bg-primary-subtle text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="min-h-0 flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          {errorMessage && (
            <div className="p-3 bg-danger-bg border border-danger rounded-xl text-danger text-sm" role="alert">
              {errorMessage}
            </div>
          )}

          {/* Basic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="diet-name" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
                Plan Name *
              </label>
              <input
                id="diet-name"
                {...register('name')}
                placeholder="e.g., Lean Muscle Hypertrophy Diet"
                className="w-full px-3 py-2 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
              {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="diet-goal" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
                Primary Goal *
              </label>
              <select
                id="diet-goal"
                {...register('goal')}
                className="w-full px-3 py-2 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {TRAINER_LIBRARY_GOALS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.value}
                  </option>
                ))}
              </select>
              {errors.goal && <p className="text-xs text-danger mt-1">{errors.goal.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="diet-description" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
              Description & Strategy
            </label>
            <textarea
              id="diet-description"
              rows={2}
              {...register('description')}
              placeholder="e.g., Calorie deficit with optimal protein distribution across 4 meals"
              className="w-full px-3 py-2 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring resize-none"
            />
          </div>

          {/* Macro Targets */}
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap size={15} className="text-warning" />
              Daily Nutritional Targets
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-input/40 p-3.5 rounded-xl border border-border">
              <div>
                <label htmlFor="macro-calories" className="block text-xs text-secondary mb-1">
                  Calories (kcal) *
                </label>
                <input
                  id="macro-calories"
                  type="number"
                  {...register('calories', { valueAsNumber: true })}
                  className="w-full px-2.5 py-1.5 bg-input border border-border rounded-lg text-sm text-primary font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
                {errors.calories && <p className="text-2xs text-danger mt-0.5">{errors.calories.message}</p>}
              </div>

              <div>
                <label htmlFor="macro-protein" className="block text-xs text-secondary mb-1">
                  Protein (g) *
                </label>
                <input
                  id="macro-protein"
                  type="number"
                  {...register('protein', { valueAsNumber: true })}
                  className="w-full px-2.5 py-1.5 bg-input border border-border rounded-lg text-sm text-primary font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
                {errors.protein && <p className="text-2xs text-danger mt-0.5">{errors.protein.message}</p>}
              </div>

              <div>
                <label htmlFor="macro-carbs" className="block text-xs text-secondary mb-1">
                  Carbs (g) *
                </label>
                <input
                  id="macro-carbs"
                  type="number"
                  {...register('carbs', { valueAsNumber: true })}
                  className="w-full px-2.5 py-1.5 bg-input border border-border rounded-lg text-sm text-primary font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
                {errors.carbs && <p className="text-2xs text-danger mt-0.5">{errors.carbs.message}</p>}
              </div>

              <div>
                <label htmlFor="macro-fats" className="block text-xs text-secondary mb-1">
                  Fats (g) *
                </label>
                <input
                  id="macro-fats"
                  type="number"
                  {...register('fats', { valueAsNumber: true })}
                  className="w-full px-2.5 py-1.5 bg-input border border-border rounded-lg text-sm text-primary font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
                {errors.fats && <p className="text-2xs text-danger mt-0.5">{errors.fats.message}</p>}
              </div>
            </div>
          </div>

          {/* Meals Section */}
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
                    className="p-3.5 bg-input/20 border border-border rounded-xl space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary-subtle text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      {isCoreMeal ? (
                        <div className="flex-1 px-3 py-1.5 bg-card border border-border/80 rounded-lg text-sm font-bold text-primary flex items-center justify-between">
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
                          className="flex-1 px-2.5 py-1.5 bg-input border border-border rounded-lg text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                        />
                      )}
                      <input
                        {...register(`meals.${index}.time` as const)}
                        placeholder="e.g., 08:30 AM"
                        className="w-28 px-2.5 py-1.5 bg-input border border-border rounded-lg text-xs text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
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
                      className="w-full px-2.5 py-1.5 bg-input border border-border rounded-lg text-xs text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                    />

                    <input
                      {...register(`meals.${index}.description` as const)}
                      placeholder="Prep notes or guidance (optional)"
                      className="w-full px-2.5 py-1 bg-input/50 border border-border rounded-lg text-2xs text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-border flex items-center justify-end gap-3 sticky bottom-0 bg-card shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="min-h-11 px-4 py-2 border border-border rounded-xl text-sm font-medium text-secondary hover:bg-primary-subtle"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="min-h-11 px-5 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover flex items-center gap-2"
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              {isEdit ? 'Save Changes' : 'Create Diet Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
