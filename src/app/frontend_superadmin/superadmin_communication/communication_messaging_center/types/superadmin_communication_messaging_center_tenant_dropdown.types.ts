import type { MessagingTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';

export interface SuperadminCommunicationMessagingTenantDropdownProps {
  value: string;
  onChange: (id: string) => void;
  tenants: MessagingTenant[];
}
