import type { ManagerCommunicationsCampaignsViewId } from '@/app/frontend_manager/manager_communications/communications_compose/types/manager_communications_communications_compose.types';
export const MANAGER_COMMUNICATIONS_CAMPAIGNS_VIEW_IDS = ['compose', 'history', 'automations', 'churn_recovery'] as const satisfies readonly ManagerCommunicationsCampaignsViewId[];
export const MANAGER_COMMUNICATIONS_CAMPAIGNS_DEFAULT_VIEW: ManagerCommunicationsCampaignsViewId = 'compose';
