"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import { TRAINER_ATTENDANCE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/config/trainer_operations_member_attendance.url_config';

import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureRouteErrorFallback';




/**
 * @description Provides the attendance route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerAttendanceRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_attendance-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="attendance" route={TRAINER_ATTENDANCE_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
