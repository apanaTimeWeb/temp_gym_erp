/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationWhiteLabelingConstants owned by the superadmin_platform_configuration_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns static White-labeling UI configuration such as status options and DNS guidance.
export const SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SEARCH_DEBOUNCE_MS = 300;

export type SuperadminPlatformConfigurationWhiteLabelingStatusFilter = 'all' | 'pending' | 'active' | 'failed';

export const SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_STATUS_OPTIONS = [
  { value: 'all', labelKey: 'ui.all_statuses' },
  { value: 'pending', labelKey: 'ui.pending_2d13df6f' },
  { value: 'active', labelKey: 'ui.active_8b4e3d3' },
  { value: 'failed', labelKey: 'ui.failed_d7c8c85b' },
] as const;

/** Canonical search identity shared by URL state, query keys, API calls, and MSW. */
export function normalizeWhiteLabelSearch(value: string | null | undefined): string {
  return (value ?? '').trim().replace(/\s+/g, ' ').toLocaleLowerCase('en-US');
}

export const SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_DNS_GUIDANCE = {
  recordType: 'CNAME',
  recordName: '@',
  recordValue: 'proxy.gymsmart360.com',
} as const;
