// RESPONSIBILITY: Return type contract for the Manager Notifications feature facade.
import type { Notification, NotificationKPIData } from '@/app/frontend_manager/manager_communications/notifications_inbox/types/manager_notifications_inbox.types';

export interface ManagerNotificationsInboxViewModel {
  notifications: Notification[];
  kpis: NotificationKPIData | null;
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleMarkRead: (id: string) => Promise<void>;
  handleMarkAllRead: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  reload: () => Promise<void>;
}
