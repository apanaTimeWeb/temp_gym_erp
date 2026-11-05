import { describe, expect, it } from 'vitest';

import { resolveManagerCommunicationsCampaignsView } from '@/app/frontend_manager/manager_communications/communications_history/utils/ManagerCommunicationsHistoryResolveView';
describe('Manager Communications view URL contract', () => { it.each(['compose','history','automations','churn_recovery'])('accepts %s', (view) => expect(resolveManagerCommunicationsCampaignsView(view)).toBe(view)); it('defaults invalid values safely', () => expect(resolveManagerCommunicationsCampaignsView('invalid')).toBe('compose')); it('defaults absent values safely', () => expect(resolveManagerCommunicationsCampaignsView(null)).toBe('compose')); });
