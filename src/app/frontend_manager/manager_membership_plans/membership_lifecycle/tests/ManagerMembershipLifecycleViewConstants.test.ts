import { describe, expect, it } from 'vitest';

import { resolveManagerMembershipLifecycleView } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/utils/ManagerMembershipLifecycleResolveView';
describe('Manager Plans view URL contract', () => { it.each(['VIEW_PLANS','MEMBERSHIP_ACTIVATE','MEMBERSHIP_RENEW','MEMBERSHIP_FREEZE','EXPIRY_CHECK'])('accepts %s', (view) => expect(resolveManagerMembershipLifecycleView(view)).toBe(view)); it('defaults invalid values safely', () => expect(resolveManagerMembershipLifecycleView('invalid')).toBe('VIEW_PLANS')); });
