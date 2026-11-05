// RESPONSIBILITY: Owns every route path used by the Manager schedule module.
/**
 * @description Canonical Manager schedule URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_TRAINER_SCHEDULE_UI_PAGE_HOME_URL = '/frontend_manager/manager_schedule_personal_training/trainer_schedule';
const MANAGER_TRAINER_SCHEDULE_BACKEND_API_BASE_URL = '/api/v1/manager/schedule';
const MANAGER_TRAINER_SCHEDULE_BACKEND_API_SHIFTS_URL = '/api/v1/manager/schedule/shifts';
const MANAGER_TRAINER_SCHEDULE_BACKEND_API_SHIFT_URL = (id: string) => `/api/v1/manager/schedule/shifts/${id}`;

export const MANAGER_TRAINER_SCHEDULE_ROUTES = {
  UI: {
    HOME: MANAGER_TRAINER_SCHEDULE_UI_PAGE_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_schedule_personal_training' as const, LEAF: '/frontend_manager/manager_schedule_personal_training/trainer_schedule' as const }
} as const;

export const MANAGER_TRAINER_SCHEDULE_API = {
  BASE: MANAGER_TRAINER_SCHEDULE_BACKEND_API_BASE_URL,
    SHIFTS: MANAGER_TRAINER_SCHEDULE_BACKEND_API_SHIFTS_URL,
    SHIFT: MANAGER_TRAINER_SCHEDULE_BACKEND_API_SHIFT_URL
} as const;
