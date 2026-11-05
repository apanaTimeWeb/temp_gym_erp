import { MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES } from '@/app/frontend_manager/manager_communications/notifications_inbox/constants/manager_notifications_inbox.constants';
import { NOTIFICATION_PRIORITY_VALUES } from '@/app/frontend_manager/manager_communications/notifications_inbox/constants/manager_notifications_inbox_shared.constants';
import type { Notification, NotificationKPIData } from '@/app/frontend_manager/manager_communications/notifications_inbox/types/manager_notifications_inbox.types';

/**
 * @description Provides the ManagerNotificationsInboxMockData implementation for the notifications module.
 * @dependencies @/app/frontend_manager/manager_communications/manager_notifications_types/ManagerNotificationsInboxTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const NOTIFICATION_TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  SYSTEM:       { bg: 'bg-input', text: 'text-text-secondary', label: 'System'       },
  PAYMENT:      { bg: 'bg-success-bg',   text: 'text-success-text',   label: 'Payment'      },
  EXPIRY:       { bg: 'bg-danger-bg',    text: 'text-danger-text',    label: 'Expiry'       },
  ATTENDANCE:   { bg: 'bg-info-bg',      text: 'text-info-text',      label: 'Attendance'   },
  INQUIRY:      { bg: 'bg-warning-bg',   text: 'text-warning-text',   label: 'Inquiry'      },
  ANNOUNCEMENT: { bg: 'bg-primary-subtle',   text: 'text-primary',   label: 'Announcement' } };

export const NOTIFICATION_PRIORITY_STYLES: Record<string, { bg: string; text: string }> = {
  HIGH:   { bg: 'bg-danger-bg',  text: 'text-danger-text'  },
  MEDIUM: { bg: 'bg-warning-bg', text: 'text-warning-text' },
  LOW:    { bg: 'bg-info-bg',    text: 'text-info-text'    } };

const now = new Date();
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'EXPIRY',       priority: NOTIFICATION_PRIORITY_VALUES[0],   status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.UNREAD, title: 'Membership Expiring Soon',    message: 'Rahul Sharma\'s membership expires in 3 days.',          memberName: 'Rahul Sharma',  createdAt: daysAgo(0) },
  { id: '2', type: 'PAYMENT',      priority: NOTIFICATION_PRIORITY_VALUES[0],   status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.UNREAD, title: 'Payment Overdue',             message: 'Priya Patel has an overdue payment of ₹2,500.',          memberName: 'Priya Patel',   createdAt: daysAgo(0) },
  { id: '3', type: 'EXPIRY',       priority: NOTIFICATION_PRIORITY_VALUES[0],   status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.UNREAD, title: 'Membership Expired',          message: 'Amit Kumar\'s membership expired yesterday.',            memberName: 'Amit Kumar',    createdAt: daysAgo(1) },
  { id: '4', type: 'INQUIRY',      priority: NOTIFICATION_PRIORITY_VALUES[1], status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.UNREAD, title: 'New Inquiry Received',        message: 'Sneha Reddy submitted a trial session inquiry.',         memberName: 'Sneha Reddy',   createdAt: daysAgo(1) },
  { id: '5', type: 'PAYMENT',      priority: NOTIFICATION_PRIORITY_VALUES[1], status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.READ,   title: 'Payment Received',            message: 'Vikram Singh paid ₹3,000 via UPI.',                     memberName: 'Vikram Singh',  createdAt: daysAgo(2) },
  { id: '6', type: 'ATTENDANCE',   priority: NOTIFICATION_PRIORITY_VALUES[2],    status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.READ,   title: 'Low Attendance Alert',        message: 'Neha Joshi has not checked in for 7 days.',             memberName: 'Neha Joshi',    createdAt: daysAgo(2) },
  { id: '7', type: 'ANNOUNCEMENT', priority: NOTIFICATION_PRIORITY_VALUES[1], status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.UNREAD, title: 'New Announcement from Admin', message: 'Gym will be closed on 26th Jan for Republic Day.',                                    createdAt: daysAgo(3) },
  { id: '8', type: 'SYSTEM',       priority: NOTIFICATION_PRIORITY_VALUES[2],    status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.READ,   title: 'System Maintenance',          message: 'Scheduled maintenance on Sunday 2–4 AM.',                                            createdAt: daysAgo(4) },
  { id: '9', type: 'EXPIRY',       priority: NOTIFICATION_PRIORITY_VALUES[0],   status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.UNREAD, title: 'Membership Expiring Soon',    message: 'Deepak Verma\'s membership expires in 5 days.',         memberName: 'Deepak Verma',  createdAt: daysAgo(0) },
  { id: '10', type: 'PAYMENT',     priority: NOTIFICATION_PRIORITY_VALUES[1], status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.READ,   title: 'Partial Payment Received',    message: 'Kavya Nair paid ₹1,500 of ₹3,000 due.',                memberName: 'Kavya Nair',    createdAt: daysAgo(5) },
];

export const MOCK_NOTIFICATION_KPIS: NotificationKPIData = {
  total: MOCK_NOTIFICATIONS.length,
  unread: MOCK_NOTIFICATIONS.filter(n => n.status === MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.UNREAD).length,
  highPriority: MOCK_NOTIFICATIONS.filter(n => n.priority === NOTIFICATION_PRIORITY_VALUES[0]).length,
  todayCount: MOCK_NOTIFICATIONS.filter(n => n.createdAt >= daysAgo(1)).length };

