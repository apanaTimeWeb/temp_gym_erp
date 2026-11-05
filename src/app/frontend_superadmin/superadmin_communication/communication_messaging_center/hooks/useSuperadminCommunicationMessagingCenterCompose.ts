import type { SuperadminCommunicationMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center_compose.types';
import type { MessagingTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';



/**
 * @description Returns the messaging compose submission callback consumed by the compose modal.
 * @dependencies Depends on the caller-provided async send handler; owns no server state or UI state.
 * @edge-case Preserves promise rejection propagation so the feature owner can show safe retry feedback and reset unsaved state only after success.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminCommunicationMessagingCenterCompose → owning feature view/components.
/**
 * @description Owns the feature-local superadmin messaging compose responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminCommunicationMessagingCenterCompose(tenants: MessagingTenant[]) {
  return (values: SuperadminCommunicationMessagingComposeValues) => {
    const tenant = tenants.find((candidate) => candidate.id === values.tenantId);
    return tenant ? { ...values, tenantName: tenant.name } : null;
  };
}
