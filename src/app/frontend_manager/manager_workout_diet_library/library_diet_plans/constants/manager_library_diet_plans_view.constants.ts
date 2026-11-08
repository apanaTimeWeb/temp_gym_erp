// RESPONSIBILITY: Defines and validates canonical view identifiers for the Manager Library module.
import type { LibraryView } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans.types';

export const MANAGER_LIBRARY_DIET_PLANS_VIEW_IDS = ['diet', 'exercises', 'deletion_requests'] as const satisfies readonly LibraryView[];
export const MANAGER_LIBRARY_DIET_PLANS_DEFAULT_VIEW: LibraryView = 'diet';
export const MANAGER_LIBRARY_DIET_PLANS_VIEW_QUERY_PARAM = 'view';
export const MANAGER_LIBRARY_DIET_PLANS_LEGACY_TAB_QUERY_PARAM = 'tab';
export const MANAGER_LIBRARY_DIET_PLANS_SEARCH_QUERY_PARAM = 'search';
export const MANAGER_LIBRARY_DIET_PLANS_PAGE_QUERY_PARAM = 'page';
