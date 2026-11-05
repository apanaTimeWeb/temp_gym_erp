// RESPONSIBILITY: Prop contract for the searchable Superadmin tenant message table.
import { SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/constants/superadmin_communication_messaging_center.constants';

import type { MessageChannel, TenantMessage } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';



export interface SuperadminCommunicationMessagingMessagesTabProps {
  search: string;
  setSearch: (value: string) => void;
  channelFilter: MessageChannel | typeof SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER;
  setChannelFilter: (value: MessageChannel | typeof SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER) => void;
  setRange: (start: string, end: string) => void;
  messages: TenantMessage[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isFetching: boolean;
}
