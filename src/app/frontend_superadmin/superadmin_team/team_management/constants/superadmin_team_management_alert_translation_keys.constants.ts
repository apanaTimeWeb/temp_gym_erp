/** Whitelists server-provided alert metadata before constructing translation lookups. */
const CHANNEL_KEYS: Readonly<Record<string, string>> = Object.freeze({
  IN_APP: 'ui.channel_in_app',
  EMAIL: 'ui.channel_email',
  IN_APP_EMAIL: 'ui.channel_in_app_email',
});
const THRESHOLD_KEYS: Readonly<Record<string, string>> = Object.freeze({
  ANY_FAILURE: 'ui.threshold_any_failure',
  ANY_TENANT_FAILURE: 'ui.threshold_any_tenant_failure',
  CRITICAL_ONLY: 'ui.threshold_critical_only',
  ABOVE_90: 'ui.threshold_above_90',
});
const normalize = (value: string): string => value.trim().toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '');
export function getSuperadminTeamAlertTranslationKeys(channel: string, threshold: string) {
  return {
    channel: CHANNEL_KEYS[normalize(channel)] ?? 'ui.channel_unknown',
    threshold: THRESHOLD_KEYS[normalize(threshold)] ?? 'ui.threshold_unknown',
  } as const;
}
