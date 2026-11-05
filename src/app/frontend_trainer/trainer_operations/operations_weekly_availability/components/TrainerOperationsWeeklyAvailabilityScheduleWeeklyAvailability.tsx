"use client";
// RESPONSIBILITY: Renders the Trainer weekly availability editor and keeps form, dirty-state, and mutation concerns out of JSX orchestration.
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/hooks/TrainerOperationsWeeklyAvailabilityuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/hooks/TrainerOperationsWeeklyAvailabilityuseTrainerInfrastructureIdempotencyKey';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/hooks/TrainerOperationsWeeklyAvailabilityuseTrainerInfrastructureUnsavedChangesGuard';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/components/TrainerOperationsWeeklyAvailabilityTrainerInfrastructureSkeletonBlock';

import { TRAINER_SCHEDULE_DEFAULT_AVAILABILITY_TIMES } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/utils/TrainerOperationsWeeklyAvailabilityScheduleConstants';

import { useTrainerScheduleMutations } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/hooks/useTrainerOperationsWeeklyAvailabilityScheduleMutations';

import { useTrainerScheduleQuery } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/hooks/useTrainerOperationsWeeklyAvailabilityScheduleQuery';

import { TrainerScheduleWeeklyAvailabilityFormSchema } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/schemas/TrainerOperationsWeeklyAvailabilityScheduleDomainSchemas';

import type { TrainerScheduleWeeklyAvailabilityFormValues } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/types/TrainerOperationsWeeklyAvailabilityScheduleTypes';


// DATA FLOW: TanStack Query schedule data -> React Hook Form -> availability mutation -> authoritative response -> form reset/query invalidation.














/**
 * @description Renders the Trainer weekly availability editor and keeps form, dirty-state, and mutation concerns out of JSX orchestration.
 * @dependencies TanStack Query schedule data -> React Hook Form -> availability mutation -> authoritative response -> form reset/query invalidation.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and edits the Trainer weekly availability matrix while delegating persistence to the schedule mutation hook.
 * @dependencies Schedule-owned mutation/query contracts and module UI state.
 * @edge-case Partial edits must be preserved until successful save or an explicit discard.
 */
/**
 * @description Owns the schedule feature UI responsibility represented by TrainerScheduleWeeklyAvailability, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerScheduleWeeklyAvailability() {
  const t = useTranslations('TRAINER_SCHEDULE');
  const { data, isPending, isError, isFetching, refetch } = useTrainerScheduleQuery();
  const { updateAvailability, updateAvailabilityPending } = useTrainerScheduleMutations();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const form = useForm<TrainerScheduleWeeklyAvailabilityFormValues>({
    resolver: zodResolver(TrainerScheduleWeeklyAvailabilityFormSchema),
    defaultValues: { days: [] },
    mode: 'onTouched',
  });
  const { register, handleSubmit, reset, getValues, watch, formState } = form;
  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(formState.isDirty && !updateAvailabilityPending);

  /* Hydrates the form from the server only after the query has produced authoritative availability; the dependency is intentionally tied to the query result. */
// Effect contract: hydrate editable availability controls from the server response and keep the local draft aligned after successful refresh.
  useEffect(() => {
    if (data?.availability && !formState.isDirty && !updateAvailabilityPending) reset({ days: data.availability });
  }, [data?.availability, formState.isDirty, updateAvailabilityPending, reset]);

  const handleToggle = (index: number) => {
    const current = getValues(`days.${index}`);
    if (!current) return;
    const nextAvailable = !current.isAvailable;
    form.setValue(`days.${index}`, {
      ...current,
      isAvailable: nextAvailable,
      startTime: nextAvailable && current.startTime === '00:00' ? TRAINER_SCHEDULE_DEFAULT_AVAILABILITY_TIMES.startTime : current.startTime,
      endTime: nextAvailable && current.endTime === '00:00' ? TRAINER_SCHEDULE_DEFAULT_AVAILABILITY_TIMES.endTime : current.endTime,
    }, { shouldDirty: true, shouldValidate: true });
    if (!nextAvailable) {
      form.setValue(`days.${index}.startTime`, '00:00', { shouldDirty: true, shouldValidate: true });
      form.setValue(`days.${index}.endTime`, '00:00', { shouldDirty: true, shouldValidate: true });
    }
  };

  const handleDiscard = async () => {
    const approved = await guardNavigation(() => reset({ days: data?.availability ?? [] }));
    if (approved) actionKeys.clear('schedule-availability-update');
  };

  const handleSave = async (values: TrainerScheduleWeeklyAvailabilityFormValues) => {
    const actionId = 'schedule-availability-update';
    try {
      const response = await updateAvailability({
        data: values.days,
        idempotencyKey: actionKeys.begin(actionId),
      });
      reset({ days: response.data });
      actionKeys.clear(actionId);
      showSuccess(response.message, actionId);
    } catch (error) {
      showError(error, actionId);
    }
  };

  if (isPending) {
    return (
      <div className="p-6 space-y-4 " aria-label={t("TEXT_LOADING_AVAILABILITY")}>
        {Array.from({ length: 7 }, (_, index) => (
          <TrainerInfrastructureSkeletonBlock key={`availability-skeleton-${index + 1}`} className="h-16 rounded-xl border border-border " />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 bg-danger-bg border border-border rounded-xl " role="alert" data-testid="trainer_schedule-schedule-weekly_availability_unable_to_load_your_weekly_availability">
        <p className="text-sm text-danger " data-testid="trainer_schedule-weekly-availability_error_state">{t("TEXT_UNABLE_TO_LOAD_YOUR_WEEKLY_AVAILABILITY")}</p>
        <button type="button" onClick={() => void refetch()} disabled={isFetching} className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center gap-2 px-4 rounded-lg bg-danger text-on-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_schedule-trainerscheduleweeklyavailability-button_1">{isFetching ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2}/>{t("TEXT_RETRYING")}</> : t("TEXT_RETRY")}</button>
      </div>
    );
  }

  // Seven canonical weekday identities remain stable for forms and API payloads;
  // only their visible/accessible labels are translated.
  const weekdayLabel = (day: string): string => ({
    Monday: t('DAY_MONDAY'), Tuesday: t('DAY_TUESDAY'), Wednesday: t('DAY_WEDNESDAY'),
    Thursday: t('DAY_THURSDAY'), Friday: t('DAY_FRIDAY'), Saturday: t('DAY_SATURDAY'),
    Sunday: t('DAY_SUNDAY'),
  }[day] ?? day);

  const days = watch('days');

  return (
    <form onSubmit={handleSubmit(handleSave)} className="p-6 space-y-6 " noValidate data-testid="trainer_schedule-trainerscheduleweeklyavailability-form_2">
      <div>
        <h2 className="text-section-title font-bold text-primary ">{t("TEXT_STANDARD_AVAILABILITY")}</h2>
        <p className="text-sm text-secondary mt-1 ">{t("TEXT_SET_YOUR_RECURRING_WEEKLY_WORKING_HOURS__F6AD4F6E")}</p>
      </div>

      <div className="space-y-4 max-w-3xl ">
        {days.map((day, index) => (
          <div key={day.day} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border ${day.isAvailable ? 'border-focus bg-surface-highlight' : 'border-border bg-input'} `}>
            <div className="flex items-center gap-4 ">
              <label className="relative inline-flex items-center cursor-pointer ">
                <input
                  id={`trainer-schedule-${day.day}-available`}
                  type="checkbox"
                  aria-label={`${weekdayLabel(day.day)} ${t("TEXT_AVAILABILITY")}`}
                  aria-invalid={Boolean(formState.errors.days?.[index]?.isAvailable)}
                  {...register(`days.${index}.isAvailable`)}
                  onChange={() => handleToggle(index)}
                  className="sr-only peer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
                 data-testid={`trainer_schedule-weekly-availability-toggle-${day.day.toLowerCase()}`}/>
                <span className="w-11 h-6 bg-input peer-focus-visible:ring-2 peer-focus-visible:ring-focus-ring rounded-full motion-safe:transition-colors motion-safe:duration-base peer-checked:bg-primary-subtle" aria-hidden="true" />
                <span className="absolute start-0.5 top-0.5 h-5 w-5 rounded-full border border-border bg-card motion-safe:transition-transform motion-safe:peer-checked:translate-x-5" aria-hidden="true" />
                <span className="sr-only ">{t("TEXT_TOGGLE")}{weekdayLabel(day.day)} {t("TEXT_AVAILABILITY")}</span>
              </label>
              <span className={`font-semibold w-24 ${day.isAvailable ? 'text-primary' : 'text-secondary line-through'} `}>{weekdayLabel(day.day)}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 w-full sm:w-auto ">
              <div>
                <label htmlFor={`trainer-schedule-${day.day}-start`} className="sr-only ">{weekdayLabel(day.day)} {t("TEXT_START_TIME")}</label>
                <input
                  id={`trainer-schedule-${day.day}-start`}
                  aria-label={`${weekdayLabel(day.day)} ${t("TEXT_START_TIME")}`}
                  aria-invalid={Boolean(formState.errors.days?.[index]?.startTime)}
                  type="time"
                  disabled={!day.isAvailable}
                  {...register(`days.${index}.startTime`)}
                  className="w-full sm:w-32 min-h-11 bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-50  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
                 data-testid={`trainer_schedule-weekly-availability-start-${day.day.toLowerCase()}`}/>
              </div>
              <span className="text-secondary font-medium text-sm text-center ">{t("TEXT_TO")}</span>
              <div>
                <label htmlFor={`trainer-schedule-${day.day}-end`} className="sr-only ">{weekdayLabel(day.day)} {t("TEXT_END_TIME")}</label>
                <input
                  id={`trainer-schedule-${day.day}-end`}
                  aria-label={`${weekdayLabel(day.day)} ${t("TEXT_END_TIME")}`}
                  aria-invalid={Boolean(formState.errors.days?.[index]?.endTime)}
                  type="time"
                  disabled={!day.isAvailable}
                  {...register(`days.${index}.endTime`)}
                  className="w-full sm:w-32 min-h-11 bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-50  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
                 data-testid={`trainer_schedule-weekly-availability-end-${day.day.toLowerCase()}`}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-6 flex flex-col-reverse sm:flex-row justify-end gap-3 ">
        <button type="button" onClick={() => void handleDiscard()} disabled={!formState.isDirty || updateAvailabilityPending} className="min-h-11 px-5 rounded-xl border border-border text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_schedule-trainerscheduleweeklyavailability-button_6">{t("TEXT_DISCARD_CHANGES")}</button>
        <button type="submit" disabled={updateAvailabilityPending || !formState.isDirty} className="min-h-11 min-w-40 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_schedule-schedule-weekly_availability_submit">
          {updateAvailabilityPending && <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/>}
          {updateAvailabilityPending ? t("TEXT_SAVING_AVAILABILITY") : t("TEXT_SAVE_AVAILABILITY")}
        </button>
      </div>
    </form>
  );
}
