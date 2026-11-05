/** Static options and status codes owned by Superadmin Integrations. */
export const SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_KEY_SCOPES = ['READ', 'WRITE'] as const;
export const SUPERADMIN_INTEGRATION_STATUS_CODES = { ACTIVE: 'ACTIVE', CONNECTED: 'CONNECTED', DEGRADED: 'DEGRADED', DELIVERED: 'DELIVERED', FAILED: 'FAILED', REVOKED: 'REVOKED' } as const;
export function getSuperadminIntegrationStatusLabelKey(status: string): string | null {
  const keys: Record<string, string> = {
    ACTIVE: 'ui.status_active', CONNECTED: 'ui.status_connected', DEGRADED: 'ui.status_degraded', DELIVERED: 'ui.status_delivered', FAILED: 'ui.status_failed', REVOKED: 'ui.status_revoked',
  };
  return keys[status] ?? null;
}
