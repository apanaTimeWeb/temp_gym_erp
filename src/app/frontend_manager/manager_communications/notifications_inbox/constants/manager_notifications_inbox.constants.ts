/** Canonical module-level constant registry for manager_notifications; child constant files remain the source of individual entries. */
export const ManagerNotificationsInboxConstants = {} as const;

export const MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES = {
  UNREAD: 'UNREAD',
  READ: 'READ',

  ALL: 'ALL',
} as const;
