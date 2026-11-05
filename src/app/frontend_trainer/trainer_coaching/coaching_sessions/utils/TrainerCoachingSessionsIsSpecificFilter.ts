import { TRAINER_SESSIONS_ALL_SESSION_FILTER } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';
import type { TrainerSessionsSessionFilter, TrainerSessionsSessionType } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';


/**
 * @description Narrows the Sessions filter union to a concrete session type while excluding the synthetic All filter.
 * @dependencies Uses only the module-owned filter type and session constants.
 * @edge-case The All filter is deliberately excluded so downstream APIs cannot receive it as a real session type.
 */
export function TrainerSessionsIsSpecificFilter(f: TrainerSessionsSessionFilter): f is TrainerSessionsSessionType {
  return f !== TRAINER_SESSIONS_ALL_SESSION_FILTER;
}
