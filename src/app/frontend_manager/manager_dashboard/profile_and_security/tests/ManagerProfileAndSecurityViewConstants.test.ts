import { describe, expect, it } from 'vitest';

import { resolveManagerProfileAndSecurityView } from '@/app/frontend_manager/manager_dashboard/profile_and_security/utils/ManagerProfileAndSecurityResolveView';
describe('Manager Profile view URL contract', () => { it.each(['personal','security'])('accepts %s', (view) => expect(resolveManagerProfileAndSecurityView(view)).toBe(view)); it('defaults invalid values safely', () => expect(resolveManagerProfileAndSecurityView('invalid')).toBe('personal')); });
