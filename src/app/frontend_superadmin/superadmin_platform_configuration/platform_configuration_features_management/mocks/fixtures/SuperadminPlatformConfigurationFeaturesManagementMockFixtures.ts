/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationFeaturesMockFixtures owned by the superadmin_platform_configuration_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns feature-owned mock records and feature flag history used only by development/test handlers.
import type { FeatureFlag, ReleaseNote, SuperadminFeatureHistoryEntry } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';
export const SUPERADMIN_FEATURE_TENANTS = [
  { id: 't1', name: 'Iron Paradise', plan: 'Pro' }, { id: 't2', name: 'Fit Life Studio', plan: 'Basic' }, { id: 't3', name: 'CrossFit Box', plan: 'Enterprise' },
] as const;
export const SUPERADMIN_FEATURE_FLAGS: FeatureFlag[] = [
  { id: 'f1', name: 'Beta Dashboard', description: 'New analytics layout', isGlobalEnabled: false, enabledTenantIds: ['t1', 't2'] },
  { id: 'f2', name: 'AI Workout Generator', description: 'Generates workouts using AI', isGlobalEnabled: true, enabledTenantIds: [] },
  { id: 'f3', name: 'WhatsApp Integration', description: 'Send automated WhatsApp alerts', isGlobalEnabled: false, enabledTenantIds: ['t3'] },
];
export const SUPERADMIN_RELEASE_NOTES: ReleaseNote[] = [
  { id: 'rn1', version: 'v2.1.0', title: 'WhatsApp Alerts Live', content: 'Added WhatsApp integration for all Enterprise users.', date: '2026-08-15', isPublished: true },
  { id: 'rn2', version: 'v2.2.0-beta', title: 'AI Workouts Beta', content: 'Testing AI generated workouts.', date: '2026-09-01', isPublished: false },
];
export const SUPERADMIN_FEATURE_HISTORY: Record<string, SuperadminFeatureHistoryEntry[]> = {
  f1: [{ id: 'hist-f1-1', action: 'Created feature flag', user: 'System Admin', timestamp: '2026-06-19T10:00:00.000Z' }, { id: 'hist-f1-2', action: 'Toggled global state to DISABLED', user: 'Superadmin User', timestamp: '2026-09-02T10:00:00.000Z' }, { id: 'hist-f1-3', action: 'Updated canary rollout to 2 tenants', user: 'Superadmin User', timestamp: '2026-09-15T10:00:00.000Z' }],
  f2: [{ id: 'hist-f2-1', action: 'Created feature flag', user: 'System Admin', timestamp: '2026-06-19T11:00:00.000Z' }, { id: 'hist-f2-2', action: 'Toggled global state to ENABLED', user: 'Superadmin User', timestamp: '2026-09-02T11:00:00.000Z' }],
  f3: [{ id: 'hist-f3-1', action: 'Created feature flag', user: 'System Admin', timestamp: '2026-06-20T10:00:00.000Z' }, { id: 'hist-f3-2', action: 'Updated canary rollout to 1 tenant', user: 'Superadmin User', timestamp: '2026-09-16T10:00:00.000Z' }],
};
