import { describe, expect, it } from 'vitest';
import { MOCK_SUPERADMIN_NOTIFICATIONS } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/mocks/fixtures/SuperadminCommunicationNotificationsMockFixtures';
describe('Superadmin Notifications fixture integrity',()=>{
 it('retains all severity classes and initial read status',()=>{
  expect(MOCK_SUPERADMIN_NOTIFICATIONS).toHaveLength(4);
  expect(MOCK_SUPERADMIN_NOTIFICATIONS.some(n=>n.type==='CRITICAL')).toBe(true);
  expect(MOCK_SUPERADMIN_NOTIFICATIONS.some(n=>!n.read)).toBe(true);
 });
});
