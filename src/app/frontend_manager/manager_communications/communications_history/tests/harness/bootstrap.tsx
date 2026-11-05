// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for communications_campaigns.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerCommunicationsCampaignsHarness } from '@/app/frontend_manager/manager_communications/communications_history/tests/harness/ManagerCommunicationsHistoryHarness';

export function renderManagerCommunicationsCampaigns(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerCommunicationsCampaignsHarness>{children}</ManagerCommunicationsCampaignsHarness> });
}
