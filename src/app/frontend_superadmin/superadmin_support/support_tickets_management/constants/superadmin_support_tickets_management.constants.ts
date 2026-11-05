/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSupportTicketsConstants owned by the superadmin_support_tickets feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Contains constants and mock data for Superadmin Tickets
import type { TicketPriority, TicketStatus } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types';

export const SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES = { OPEN: 'OPEN', IN_PROGRESS: 'IN_PROGRESS', WAITING: 'WAITING', RESOLVED: 'RESOLVED', CLOSED: 'CLOSED' } as const;

export const PriorityColors: Record<TicketPriority, string> = {
    LOW: 'text-success bg-success-bg border-border',
    NORMAL: 'text-secondary bg-surface-highlight border-border',
    MEDIUM: 'text-primary bg-primary-subtle border-border',
    HIGH: 'text-warning bg-warning-bg border-border',
    URGENT: 'text-warning bg-warning-bg border-border',
    CRITICAL: 'text-danger bg-danger-bg border-border'
};

export const StatusColors: Record<TicketStatus, string> = {
    [SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.OPEN]: 'text-warning',
    [SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.IN_PROGRESS]: 'text-primary',
    [SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.WAITING]: 'text-warning',
    [SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.RESOLVED]: 'text-success',
    [SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.CLOSED]: 'text-secondary',
};

export const SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER = 'ALL' as const;

export const SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES = { LOW: 'LOW', NORMAL: 'NORMAL', MEDIUM: 'MEDIUM', HIGH: 'HIGH', URGENT: 'URGENT', CRITICAL: 'CRITICAL' } as const;
