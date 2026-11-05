// RESPONSIBILITY: Owns mock-handler input/output types for the Admin announcements feature.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsMockHandlerTypes.ts)

import type { Announcement } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';

export type AdminAnnouncementsJsonObject = Record<string, unknown>;
export type AnnouncementRecord = Announcement;
