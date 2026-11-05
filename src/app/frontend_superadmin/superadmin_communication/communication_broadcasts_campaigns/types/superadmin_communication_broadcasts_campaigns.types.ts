import { z } from 'zod';

import { BroadcastStatusSchema, BroadcastAudienceSchema, BroadcastResponseSchema, BroadcastSchema, SuperadminCommunicationBroadcastsTenantSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_contract.schemas';

import type { SUPERADMIN_BROADCAST_STATUS_FILTER_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';


/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines all TypeScript types, Zod schemas, and form data shapes for the Broadcasts module. Single source of truth for broadcast data contracts.
export type BroadcastStatus = z.infer<typeof BroadcastStatusSchema>;
export type BroadcastAudience = z.infer<typeof BroadcastAudienceSchema>;

export type BroadcastStatusFilter = keyof typeof SUPERADMIN_BROADCAST_STATUS_FILTER_CODES;export type Broadcast = z.infer<typeof BroadcastResponseSchema>;export type BroadcastFormData = z.infer<typeof BroadcastSchema>;
export interface SuperadminCommunicationBroadcastsHeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    statusFilter?: BroadcastStatusFilter;
    onStatusFilterChange?: (value: BroadcastStatusFilter) => void;
    onCreateClick: () => void;
}
export interface SuperadminCommunicationBroadcastsTableProps {
    broadcasts: Broadcast[];
    onSend: (id: string) => void;
    onEdit: (broadcast: Broadcast) => void;
    onDelete: (id: string) => void;
    onCreateClick: () => void;
}
export interface SuperadminBroadcastStatusBadgeProps {
    status: BroadcastStatus;
}
export interface SuperadminCommunicationBroadcastsEmptyStateProps {
    onCreateClick: () => void;
}export type SuperadminCommunicationBroadcastsTenant = z.infer<typeof SuperadminCommunicationBroadcastsTenantSchema>;
