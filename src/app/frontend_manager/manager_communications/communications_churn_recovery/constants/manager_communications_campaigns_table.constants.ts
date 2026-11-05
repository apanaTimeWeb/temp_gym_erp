/**
 * @description Provides the ManagerCommunicationsCampaignsTableConstants implementation for the communications module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_COMMUNICATION_HISTORY_HEADERS = ['Campaign', 'Channel', 'Segment', 'Recipients', 'Sent', 'Status', 'Date'] as const;
export const MANAGER_CHURN_RECOVERY_TABLE_HEADERS = ['Member / Plan', 'Phone', 'Exit Date', 'Since Exit', 'Reason', 'Status', 'Action'] as const;
