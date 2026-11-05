import { describe, expect, it } from 'vitest';

import { resolveManagerBusinessSettingsView } from '@/app/frontend_manager/manager_dashboard/business_settings/utils/ManagerBusinessSettingsResolveView';
describe('Manager Settings view URL contract', () => { it.each(['region','gym_profile','operating_hours'])('accepts %s', (view) => expect(resolveManagerBusinessSettingsView(view)).toBe(view)); it('defaults invalid values safely', () => expect(resolveManagerBusinessSettingsView('invalid')).toBe('region')); });
