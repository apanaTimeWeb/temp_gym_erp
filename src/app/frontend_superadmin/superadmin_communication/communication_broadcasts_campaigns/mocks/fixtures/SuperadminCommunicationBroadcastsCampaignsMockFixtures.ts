import { SUPERADMIN_BROADCAST_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import type { Broadcast } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationBroadcastsMockFixtures owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
export const SUPERADMIN_COMMUNICATION_BROADCASTS_UNSCOPED_RECIPIENT_COUNT = 42;

export const MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS: Broadcast[] = [
    { id: 'b1', title: 'System Maintenance', content: 'Scheduled maintenance for all tenants.', status: SUPERADMIN_BROADCAST_STATUS_CODES.SENT, targetGymIds: ['t1', 't2'], scheduledDate: null, sentDate: '2026-09-01T02:00:00Z', totalRecipients: 100, deliveredCount: 95, failedCount: 5, audience: 'ALL_TENANTS' },
    { id: 'b2', title: 'AI Workout Beta', content: 'AI workouts are now available in beta.', status: SUPERADMIN_BROADCAST_STATUS_CODES.SCHEDULED, targetGymIds: ['t1'], scheduledDate: '2026-10-01T10:00:00Z', sentDate: null, totalRecipients: 50, deliveredCount: 0, failedCount: 0, audience: 'PRO_ONLY' },
    { id: 'b3', title: 'Payment Reminder', content: 'Please review your recent payment activity.', status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT, targetGymIds: ['t3'], scheduledDate: null, sentDate: null, totalRecipients: 18, deliveredCount: 0, failedCount: 0, audience: 'SUSPENDED_ONLY' },
    { id: 'b4', title: 'September Billing Notice', content: 'Invoices for September are available.', status: SUPERADMIN_BROADCAST_STATUS_CODES.SENT, targetGymIds: [], scheduledDate: null, sentDate: '2026-09-05T04:00:00Z', totalRecipients: 125, deliveredCount: 121, failedCount: 4, audience: 'ALL_TENANTS' },
    { id: 'b5', title: 'Pro Plan Webinar', content: 'Join the monthly Pro plan webinar.', status: SUPERADMIN_BROADCAST_STATUS_CODES.SCHEDULED, targetGymIds: ['t2', 't3'], scheduledDate: '2026-10-05T12:00:00Z', sentDate: null, totalRecipients: 40, deliveredCount: 0, failedCount: 0, audience: 'PRO_ONLY' },
    { id: 'b6', title: 'Security Alert Draft', content: 'A security reminder for administrators.', status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT, targetGymIds: ['t1'], scheduledDate: null, sentDate: null, totalRecipients: 12, deliveredCount: 0, failedCount: 0, audience: 'SUSPENDED_ONLY' },
    { id: 'b7', title: 'Holiday Hours', content: 'Updated platform support hours.', status: SUPERADMIN_BROADCAST_STATUS_CODES.SENT, targetGymIds: ['t2'], scheduledDate: null, sentDate: '2026-09-10T06:00:00Z', totalRecipients: 30, deliveredCount: 30, failedCount: 0, audience: 'ALL_TENANTS' },
    { id: 'b8', title: 'New Reports Module', content: 'New analytics and reporting capabilities.', status: SUPERADMIN_BROADCAST_STATUS_CODES.SCHEDULED, targetGymIds: ['t3'], scheduledDate: '2026-10-10T09:00:00Z', sentDate: null, totalRecipients: 20, deliveredCount: 0, failedCount: 0, audience: 'PRO_ONLY' },
    { id: 'b9', title: 'Onboarding Reminder', content: 'Complete your onboarding checklist.', status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT, targetGymIds: ['t2'], scheduledDate: null, sentDate: null, totalRecipients: 14, deliveredCount: 0, failedCount: 0, audience: 'ALL_TENANTS' },
    { id: 'b10', title: 'Service Update', content: 'Platform service update and improvements.', status: SUPERADMIN_BROADCAST_STATUS_CODES.SENT, targetGymIds: ['t1', 't3'], scheduledDate: null, sentDate: '2026-09-12T11:00:00Z', totalRecipients: 55, deliveredCount: 53, failedCount: 2, audience: 'ALL_TENANTS' },
    { id: 'b11', title: 'Enterprise Advisory', content: 'Enterprise tenant advisory notice.', status: SUPERADMIN_BROADCAST_STATUS_CODES.SCHEDULED, targetGymIds: ['t3'], scheduledDate: '2026-10-15T08:00:00Z', sentDate: null, totalRecipients: 8, deliveredCount: 0, failedCount: 0, audience: 'PRO_ONLY' },
    { id: 'b12', title: 'Draft Feature Survey', content: 'Tell us what you want next.', status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT, targetGymIds: [], scheduledDate: null, sentDate: null, totalRecipients: 75, deliveredCount: 0, failedCount: 0, audience: 'ALL_TENANTS' },
];
export const SUPERADMIN_BROADCAST_TENANTS = [
    { id: 't1', name: 'Iron Paradise', plan: 'Pro' },
    { id: 't2', name: 'Fit Life Studio', plan: 'Basic' },
    { id: 't3', name: 'CrossFit Box', plan: 'Enterprise' },
    { id: 't4', name: 'Zenith Fitness', plan: 'Pro' },
    { id: 't5', name: 'Peak Performance', plan: 'Enterprise' },
];
