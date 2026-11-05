// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_communication/communication_notices_and_announcements/constants/AdminCommunicationNoticesAndAnnouncementsConstants.ts)

import { addDays, format } from 'date-fns';
import type { Announcement, AnnouncementKPIData, AnnouncementStatus, AnnouncementPriority } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';


export const ANNOUNCEMENTS_ITEMS_PER_PAGE = 10;

// Used in the filter toolbar — lets admin filter the list across their branches.
export const ANNOUNCEMENT_GYM_OPTIONS = [
  { value: 'all', labelKey: 'announcements.AdminAnnouncementsFilters.allMyBranches' },
  { value: 'g1', labelKey: 'announcements.AdminAnnouncementsFilters.gymAndheriEast' },
  { value: 'g2', labelKey: 'announcements.AdminAnnouncementsFilters.gymBandraWest' },
  { value: 'g3', labelKey: 'announcements.AdminAnnouncementsFilters.gymPowai' },
  { value: 'g4', labelKey: 'announcements.AdminAnnouncementsFilters.gymThane' },
];

// Used in the compose modal — admin can only target their own branches.
// "All Gyms" is superadmin-only and must never appear here.
export const ANNOUNCEMENT_COMPOSE_GYM_OPTIONS = [
  { value: 'g1', labelKey: 'announcements.AdminAnnouncementsFilters.gymAndheriEast' },
  { value: 'g2', labelKey: 'announcements.AdminAnnouncementsFilters.gymBandraWest' },
  { value: 'g3', labelKey: 'announcements.AdminAnnouncementsFilters.gymPowai' },
  { value: 'g4', labelKey: 'announcements.AdminAnnouncementsFilters.gymThane' },
];

// Admin audience: no cross-gym "Managers" — admins broadcast to their own gym's people only.
export const ANNOUNCEMENT_AUDIENCE_OPTIONS = [
  { value: 'all' as const, labelKey: 'announcements.AdminAnnouncementsFilters.everyoneAtBranch' },
  { value: 'members' as const, labelKey: 'announcements.AdminAnnouncementsFilters.members' },
  { value: 'trainers' as const, labelKey: 'announcements.AdminAnnouncementsFilters.trainers' },
  { value: 'staff' as const, labelKey: 'announcements.AdminAnnouncementsFilters.staff' },
];

export const ANNOUNCEMENT_PRIORITY_OPTIONS = [
  { value: 'high', labelKey: 'announcements.AdminAnnouncementsFilters.high' },
  { value: 'medium', labelKey: 'announcements.AdminAnnouncementsFilters.medium' },
  { value: 'low', labelKey: 'announcements.AdminAnnouncementsFilters.low' },
];

export const ANNOUNCEMENT_STATUS_VALUES = { ACTIVE: 'active', SCHEDULED: 'scheduled', EXPIRED: 'expired', DRAFT: 'draft' } as const;

export const ANNOUNCEMENT_STATUS_OPTIONS = [
  { value: 'all', labelKey: 'announcements.AdminAnnouncementsFilters.allStatus' },
  { value: 'active', labelKey: 'announcements.AdminAnnouncementsFilters.active' },
  { value: 'scheduled', labelKey: 'announcements.AdminAnnouncementsFilters.scheduled' },
  { value: 'expired', labelKey: 'announcements.AdminAnnouncementsFilters.expired' },
  { value: 'draft', labelKey: 'announcements.AdminAnnouncementsFilters.draft' },
];



// Default form state — gymIds defaults to first branch (not 'all', which is superadmin-only).
export const EMPTY_ANNOUNCEMENT_FORM = {
  title:       '',
  body:        '',
  priority:    'medium' as const,
  audience:    ['all'] as ('all' | 'members' | 'managers' | 'trainers' | 'staff')[],
  gymIds:      ['g1'],
  publishedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  expiresAt:   format(addDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm"),
  isPinned:    false,
};

export const ANNOUNCEMENT_STATUS_LABEL_KEYS: Record<AnnouncementStatus, string> = { active: 'announcements.AdminAnnouncementsFilters.active', scheduled: 'announcements.AdminAnnouncementsFilters.scheduled', expired: 'announcements.AdminAnnouncementsFilters.expired', draft: 'announcements.AdminAnnouncementsFilters.draft' };
export const ANNOUNCEMENT_PRIORITY_LABEL_KEYS: Record<AnnouncementPriority, string> = { high: 'announcements.AdminAnnouncementsFilters.high', medium: 'announcements.AdminAnnouncementsFilters.medium', low: 'announcements.AdminAnnouncementsFilters.low' };

export const ANNOUNCEMENT_STATUS_STYLES: Record<AnnouncementStatus, string> = {
  active: 'bg-success text-on-success border-border',
  scheduled: 'bg-info text-on-info border-border',
  expired: 'bg-danger text-on-danger border-border',
  draft: 'bg-input text-secondary border-border',
} as const;

export const ANNOUNCEMENT_PRIORITY_STYLES: Record<AnnouncementPriority, string> = {
  high: 'bg-danger text-on-danger',
  medium: 'bg-warning-bg text-warning',
  low: 'bg-success text-on-success',
} as const;
