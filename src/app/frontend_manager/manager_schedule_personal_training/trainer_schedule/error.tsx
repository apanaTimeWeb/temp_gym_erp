// RESPONSIBILITY: Renders the manager schedule route-segment error fallback and exposes the documented retry action.
'use client';
import { MANAGER_TRAINER_SCHEDULE_ROUTES } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/config/manager_trainer_schedule.url_config';
import { useEffect } from 'react';

import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { logger } from '@/lib/logger';

import type { ManagerInfrastructureRouteErrorProps } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/ManagerTrainerScheduleLocalRouteErrorTypes';




/** @description Route-level ManagerTrainerScheduleError for the Manager frontend module. */
export default function ManagerTrainerScheduleError({ error, reset }: ManagerInfrastructureRouteErrorProps) {
  const t = useTranslations('MANAGER_TRAINER_SCHEDULE');

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    logger.error('Manager module route error', {
      route: MANAGER_TRAINER_SCHEDULE_ROUTES.UI.HOME,
      module: 'manager/schedule',
      errorDigest: error.digest,
      timestamp: new Date().toISOString() });
  }, [error]);

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-page" data-testid="manager_manager_schedule_personal_training-trainer-schedule-error-boundary-fallback">
      <div role="alert" aria-live="assertive" className="bg-overlay border border-danger p-8 rounded-2xl shadow-dialog max-w-md w-full text-center space-y-4" data-testid="manager_schedule-error-error">
        <div data-testid="manager_schedule-error-status" className="w-14 h-14 bg-danger-bg rounded-full flex items-center justify-center mx-auto text-danger-text">
          <AlertTriangle size={18} strokeWidth={2} />
        </div>
        <h2 className="text-xl font-bold text-text-primary">{t("COPY_SCHEDULE_UNAVAILABLE")}</h2>
        <p data-testid="manager_schedule-error-message" className="text-sm text-text-secondary">{t("COPY_WE_COULDN_T_LOAD_SCHEDULE_MODULE_TRY_AGAIN")}</p>
                <button data-testid="manager_schedule-error-retry"
          onClick={reset}
          className="min-h-11 min-w-32 px-6 py-2.5 bg-primary text-on-primary font-medium rounded-xl motion-safe:transition-all hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
         type="button">{t("COPY_TRY_AGAIN")}</button>
      </div>
    </div>
  );
}
