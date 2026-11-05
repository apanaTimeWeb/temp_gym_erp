// RESPONSIBILITY: TypeScript types for the Announcements / Notice Board module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes.ts)

export type AnnouncementStatus = 'active' | 'scheduled' | 'expired' | 'draft';
export type AnnouncementPriority = 'high' | 'medium' | 'low';
export type AnnouncementAudience = 'all' | 'members' | 'managers' | 'trainers' | 'staff';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  audience: AnnouncementAudience[];
  gymIds: string[];
  gymNames: string[];
  publishedAt: string;
  expiresAt: string;
  createdBy: string;
  createdAt: string;
  viewCount: number;
  viewsByBranch?: { branchId: string, count: number }[];
  isPinned: boolean;
  deliveryStatus?: string;
  pushNotificationSent?: boolean;
  acknowledgedCount?: number;
}

export interface AnnouncementFormValues {
  title: string;
  body: string;
  priority: AnnouncementPriority;
  audience: AnnouncementAudience[];
  gymIds: string[];
  publishedAt: string;
  expiresAt: string;
  isPinned: boolean;
}

export interface AnnouncementKPIData {
  total: number;
  active: number;
  scheduled: number;
  expired: number;
  totalViews: number;
  pinned: number;
}
export interface AdminAnnouncementsQueryParams {
  page: number;
  limit: number;
  search?: string;
  status?: AnnouncementStatus;
  priority?: AnnouncementPriority;
  gymId?: string;
}
