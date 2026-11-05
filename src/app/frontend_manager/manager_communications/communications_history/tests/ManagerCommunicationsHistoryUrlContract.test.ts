import { MANAGER_COMMUNICATIONS_CAMPAIGNS_API } from '@/app/frontend_manager/manager_communications/communications_history/config/manager_communications_communications_history.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_communications API URL contract', () => {
  it('matches the feature API contract for AUTOMATION', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.AUTOMATION('sample-id')).toBe("/api/v1/manager/communications/automations/sample-id"); });
  it('matches the feature API contract for AUTOMATIONS', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.AUTOMATIONS).toBe("/api/v1/manager/communications/automations"); });
  it('matches the feature API contract for CAMPAIGNS', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CAMPAIGNS).toBe("/api/v1/manager/communications/campaigns"); });
  it('matches the feature API contract for CHURNED_MEMBERS', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CHURNED_MEMBERS).toBe("/api/v1/manager/communications/churned-members"); });
  it('matches the feature API contract for CHURN_KPIS', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CHURN_KPIS).toBe("/api/v1/manager/communications/churn-kpis"); });
  it('matches the feature API contract for KPIS', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.KPIS).toBe("/api/v1/manager/communications/kpis"); });
  it('matches the feature API contract for SEGMENT', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.SEGMENT('sample-id')).toBe("/api/v1/manager/communications/segments/sample-id"); });
  it('matches the feature API contract for WIN_BACK', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.WIN_BACK).toBe("/api/v1/manager/communications/win-back"); });
});
