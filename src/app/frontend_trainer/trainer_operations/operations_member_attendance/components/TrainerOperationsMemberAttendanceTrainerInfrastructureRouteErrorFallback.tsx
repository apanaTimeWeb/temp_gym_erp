// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Shared role-level dumb route error presentation; it receives module/route metadata and never exposes raw error internals.
import { useEffect } from 'react';

import { RefreshCw, AlertTriangle } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { TrainerInfrastructureErrorReporter } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceTrainerInfrastructureErrorReporter';

import type { TrainerInfrastructureRouteErrorFallbackProps } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceTrainerInfrastructureRouteErrorFallbackProps';







/**
 * @description Shared role-level dumb route error presentation; it receives module/route metadata and never exposes raw error internals.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the infrastructure-owned safe error fallback used by Trainer route boundaries.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerInfrastructureRouteErrorFallback({ errorDigest, moduleName, route, reset }: TrainerInfrastructureRouteErrorFallbackProps) {
  const t = useTranslations('TRAINER_SHELL');
// Effect contract: report the caught route error once for the current route/module/digest while keeping raw details out of the UI.
  useEffect(() => { TrainerInfrastructureErrorReporter({ module: moduleName, route, timestamp: new Date().toISOString(), errorDigest }); }, [errorDigest, moduleName, route]);
  return <div className="min-h-screen flex items-center justify-center p-6"><div role="alert" className="w-full max-w-md bg-card border border-border rounded-xl shadow-dialog p-6 text-center space-y-4"><div className="mx-auto w-12 h-12 rounded-full bg-danger-bg text-danger flex items-center justify-center" data-testid={"trainer_infrastructure-route-error-danger-state-18-1"}><AlertTriangle size={18} aria-hidden="true" strokeWidth={2}/></div><h2 className="text-section-title font-bold text-primary">{t("TEXT_SOMETHING_WENT_WRONG")}</h2><p className="text-sm text-secondary">{t("TEXT_THIS_SECTION_COULD_NOT_BE_LOADED_YOU_CAN_AB1ACB89")}</p><button type="button" onClick={reset} className="min-h-11 inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_infrastructure-trainerinfrastructurerouteerrorfallback-button_1"><RefreshCw size={18} aria-hidden="true" strokeWidth={2}/>{t("TEXT_RETRY")}</button></div></div>;
}
