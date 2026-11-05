// RESPONSIBILITY: Owns mutable in-memory mock state for the Admin announcements feature.
// DATA FLOW: immutable seed fixture → cloned session state → MSW mutation handlers → subsequent queries.

import { MOCK_ANNOUNCEMENTS } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/mocks/fixtures/AdminCommunicationNoticesAndAnnouncementsMockFixtures';
import type { Announcement } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';

/**
 * cloneAnnouncements is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function cloneAnnouncements(records: Announcement[]): Announcement[] {
  return records.map((record) => ({
    ...record,
    audience: [...record.audience],
    gymIds: [...record.gymIds],
    gymNames: [...record.gymNames],
  }));
}

let adminAnnouncementsMockState = cloneAnnouncements(MOCK_ANNOUNCEMENTS);

/**
 * getAdminAnnouncementsMockState is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function getAdminAnnouncementsMockState(): Announcement[] {
  return adminAnnouncementsMockState;
}

/**
 * setAdminAnnouncementsMockState is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function setAdminAnnouncementsMockState(nextState: Announcement[]): void {
  adminAnnouncementsMockState = nextState;
}

/**
 * resetAdminAnnouncementsMockState is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function resetAdminAnnouncementsMockState(): void {
  adminAnnouncementsMockState = cloneAnnouncements(MOCK_ANNOUNCEMENTS);
}
