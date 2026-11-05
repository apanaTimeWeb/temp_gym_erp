// RESPONSIBILITY: Owns every route path used by the Manager members module.
/**
 * @description Canonical Manager members URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case URL-encodes live identifiers while preserving `:id` placeholders used by MSW route definitions.
 */
const managerMemberPathId = (id: string): string => id.startsWith(':') ? id : encodeURIComponent(id);

const MANAGER_MEMBERS_DIRECTORY_PAGES_LIST_URL = '/frontend_manager/manager_members/members_directory';
const MANAGER_MEMBERS_DIRECTORY_PAGES_ADD_URL = '/frontend_manager/manager_members/members_directory';
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_BASE_URL = '/api/v1/manager/members';
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_STATS_URL = '/api/v1/manager/members/stats';
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_PLANS_SNAPSHOT_URL = '/api/v1/manager/members/plans';
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_TRAINERS_URL = '/api/v1/manager/members/trainers';
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_DIET_PLANS_URL = '/api/v1/manager/members/diet-plans';
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_WORKOUTS_URL = '/api/v1/manager/members/workouts';
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_ATTENDANCE_URL = (id: string) => `/api/v1/manager/members/${managerMemberPathId(id)}/attendance`;
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_PAYMENTS_URL = (id: string) => `/api/v1/manager/members/${managerMemberPathId(id)}/payments`;
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_RENEW_URL = (id: string) => `/api/v1/manager/members/${managerMemberPathId(id)}/renew`;
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_GET_ONE_URL = (id: string) => `/api/v1/manager/members/${managerMemberPathId(id)}`;
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_DIET_ASSIGN_URL = (id: string) => `/api/v1/manager/members/${managerMemberPathId(id)}/diet-plans`;
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_WORKOUT_ASSIGN_URL = (id: string) => `/api/v1/manager/members/${managerMemberPathId(id)}/workouts`;
const MANAGER_MEMBERS_DIRECTORY_BACKEND_API_EXPORT_URL = '/api/v1/manager/members/export';
const MANAGER_MEMBERS_DIRECTORY_INTEGRATIONS_WHATSAPP_WEB_BASE_URL = 'https://wa.me';

export const MANAGER_MEMBERS_DIRECTORY_ROUTES = {
  PAGES: {
    LIST: MANAGER_MEMBERS_DIRECTORY_PAGES_LIST_URL,
    ADD: MANAGER_MEMBERS_DIRECTORY_PAGES_ADD_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_members' as const, LEAF: '/frontend_manager/manager_members/members_directory' as const }
} as const;

export const MANAGER_MEMBERS_DIRECTORY_API = {
  BASE: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_BASE_URL,
    STATS: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_STATS_URL,
    PLANS_SNAPSHOT: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_PLANS_SNAPSHOT_URL,
    TRAINERS: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_TRAINERS_URL,
    DIET_PLANS: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_DIET_PLANS_URL,
    WORKOUTS: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_WORKOUTS_URL,
    ATTENDANCE: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_ATTENDANCE_URL,
    PAYMENTS: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_PAYMENTS_URL,
    RENEW: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_RENEW_URL,
    GET_ONE: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_GET_ONE_URL,
    DIET_ASSIGN: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_DIET_ASSIGN_URL,
    WORKOUT_ASSIGN: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_WORKOUT_ASSIGN_URL,
    EXPORT: MANAGER_MEMBERS_DIRECTORY_BACKEND_API_EXPORT_URL,
  INTEGRATIONS: {
    WHATSAPP_WEB_BASE: MANAGER_MEMBERS_DIRECTORY_INTEGRATIONS_WHATSAPP_WEB_BASE_URL
  }
} as const;
