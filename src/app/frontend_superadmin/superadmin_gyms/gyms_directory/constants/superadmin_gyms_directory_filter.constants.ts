/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsFilterConstants owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns static filter/view option configuration used by the Superadmin Gyms toolbar and status tabs.
// DATA FLOW: SuperadminGymsFilterConstants → SuperadminGymsMain/SuperadminGymsToolbar → URL/UI filter state.

export const SUPERADMIN_GYMS_STATUS_FILTER_OPTIONS = [
  { value: 'All', labelKey: 'ui.gym_status_all' },
  { value: 'ACTIVE', labelKey: 'ui.status_active' },
  { value: 'SUSPENDED', labelKey: 'ui.status_suspended' },
  { value: 'TRIAL', labelKey: 'ui.status_trial' },
  { value: 'EXPIRED', labelKey: 'ui.status_expired' },
  { value: 'CANCELLED', labelKey: 'ui.status_cancelled' },
] as const;

export const SUPERADMIN_GYMS_STATUS_SELECT_OPTIONS = SUPERADMIN_GYMS_STATUS_FILTER_OPTIONS.map((option) => ({
  value: option.value,
  labelKey: option.value === 'All' ? 'ui.gym_status_all' : option.labelKey,
}));

export const SUPERADMIN_GYMS_PLAN_FILTER_OPTIONS = [
  { value: 'All', labelKey: 'ui.gym_plan_all' },
  { value: 'BASIC', labelKey: 'ui.gym_plan_basic' },
  { value: 'STARTER', labelKey: 'ui.gym_plan_starter' },
  { value: 'PRO', labelKey: 'ui.gym_plan_pro' },
  { value: 'ENTERPRISE', labelKey: 'ui.gym_plan_enterprise' },
] as const;

export const SUPERADMIN_GYMS_VIEW_MODE_OPTIONS = [
  { value: 'list', labelKey: 'ui.gym_view_list' },
  { value: 'calendar', labelKey: 'ui.gym_view_calendar' },
] as const;
