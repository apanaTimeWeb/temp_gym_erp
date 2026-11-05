/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationMessagingMockFixtures owned by the superadmin_communication_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/constants/superadmin_communication_messaging_center.constants, @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES, SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/constants/superadmin_communication_messaging_center.constants';

import type { TenantMessage, MessagingTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';


export const MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES: TenantMessage[] = [
    { id: 'm1', tenantId: 't1', tenantName: 'Iron Paradise', channel: SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.EMAIL, subject: 'Invoice Overdue', body: 'Please pay invoice #1234', status: SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES.SENT, sentAt: '2026-09-01T10:00:00Z', scheduledAt: null, createdAt: '2026-09-01T09:00:00Z' },
    { id: 'm2', tenantId: 't2', tenantName: 'Fit Life Studio', channel: SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.IN_APP, subject: 'Welcome to Smart Gym', body: 'Thanks for joining.', status: SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES.SENT, sentAt: '2026-09-15T14:30:00Z', scheduledAt: null, createdAt: '2026-09-15T14:30:00Z' },
    { id: 'm3', tenantId: 't3', tenantName: 'CoreFit Arena', channel: SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.SMS, subject: 'Renewal Reminder', body: 'Your subscription renews this week.', status: SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES.SCHEDULED, sentAt: null, scheduledAt: '2026-09-18T09:00:00Z', createdAt: '2026-09-16T07:30:00Z' },
    { id: 'm4', tenantId: 't4', tenantName: 'Peak Performance Studio', channel: SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.EMAIL, subject: 'Maintenance Notice', body: 'Planned maintenance window this weekend.', status: SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES.FAILED, sentAt: null, scheduledAt: null, createdAt: '2026-09-12T11:00:00Z' },
    { id: 'm5', tenantId: 't5', tenantName: 'Metro Fitness Network', channel: SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.IN_APP, subject: 'Plan Upgrade', body: 'Upgrade options are available.', status: SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES.SCHEDULED, sentAt: null, scheduledAt: '2026-09-20T10:00:00Z', createdAt: '2026-09-16T08:00:00Z' },
    { id: 'm6', tenantId: 't6', tenantName: 'Zen Wellness Hub', channel: SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.SMS, subject: 'Payment Confirmation', body: 'Your payment has been received.', status: SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES.SENT, sentAt: '2026-08-28T12:00:00Z', scheduledAt: null, createdAt: '2026-08-28T11:00:00Z' },
    { id: 'm7', tenantId: 't7', tenantName: 'Urban Strength Lab', channel: SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.EMAIL, subject: 'Trial Ending', body: 'Your trial period ends soon.', status: SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES.SENT, sentAt: '2026-08-22T13:00:00Z', scheduledAt: null, createdAt: '2026-08-22T12:30:00Z' },
    { id: 'm8', tenantId: 't8', tenantName: 'Lakeside Performance', channel: SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.IN_APP, subject: 'Account Update', body: 'Your account settings were updated.', status: SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES.SENT, sentAt: '2026-08-18T15:00:00Z', scheduledAt: null, createdAt: '2026-08-18T14:00:00Z' },
];
export const MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS: MessagingTenant[] = [
    { id: 't1', name: 'Iron Paradise', plan: 'Pro' }, { id: 't2', name: 'Fit Life Studio', plan: 'Basic' }, { id: 't3', name: 'CoreFit Arena', plan: 'Growth' }, { id: 't4', name: 'Peak Performance Studio', plan: 'Enterprise' }, { id: 't5', name: 'Metro Fitness Network', plan: 'Pro' }, { id: 't6', name: 'Zen Wellness Hub', plan: 'Basic' }, { id: 't7', name: 'Urban Strength Lab', plan: 'Growth' }, { id: 't8', name: 'Lakeside Performance', plan: 'Enterprise' },
];

/** Deterministic scale tiers for message list and tenant selector tests. */
export const createSuperadminMessagingScaleFixtures = (count: number) => {
    const size = Math.max(0, Math.floor(count));
    return {
        messages: Array.from({ length: size }, (_, index) => ({ ...MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES[index % MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES.length]!, id: `message-scale-${index + 1}`, tenantId: `tenant-scale-${index + 1}`, tenantName: `Scale Gym ${index + 1}` })),
        tenants: Array.from({ length: size }, (_, index) => ({ ...MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS[index % MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS.length]!, id: `tenant-scale-${index + 1}`, name: `Scale Gym ${index + 1}` })),
    };
};
export const MOCK_SUPERADMIN_MESSAGING_TIER_1_SMALL = createSuperadminMessagingScaleFixtures(10);
export const MOCK_SUPERADMIN_MESSAGING_TIER_2_MEDIUM = createSuperadminMessagingScaleFixtures(100);
export const MOCK_SUPERADMIN_MESSAGING_TIER_3_STRESS = createSuperadminMessagingScaleFixtures(500);

