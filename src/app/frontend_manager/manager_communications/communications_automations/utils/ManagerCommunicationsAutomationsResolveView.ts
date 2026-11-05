// RESPONSIBILITY: Validates and resolves Communications view identifiers.
import type { ManagerCommunicationsCampaignsViewId } from '@/app/frontend_manager/manager_communications/communications_automations/types/manager_communications_communications_automations.types';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_DEFAULT_VIEW, MANAGER_COMMUNICATIONS_CAMPAIGNS_VIEW_IDS } from '@/app/frontend_manager/manager_communications/communications_automations/constants/manager_communications_campaigns_view.constants';

export function resolveManagerCommunicationsCampaignsView(value: string | null | undefined): ManagerCommunicationsCampaignsViewId {
  return MANAGER_COMMUNICATIONS_CAMPAIGNS_VIEW_IDS.includes(value as ManagerCommunicationsCampaignsViewId) ? value as ManagerCommunicationsCampaignsViewId : MANAGER_COMMUNICATIONS_CAMPAIGNS_DEFAULT_VIEW;
}
