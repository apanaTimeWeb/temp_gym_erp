// RESPONSIBILITY: Defines feature-local TypeScript contracts for communication_notices_and_announcements; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AnnouncementFormValues } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';
export interface AdminAnnouncementsStore {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  priorityFilter: string;
  setPriorityFilter: (v: string) => void;
  gymFilter: string;
  setGymFilter: (v: string) => void;
  currentPage: number;
  setCurrentPage: (v: number) => void;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  editingAnnouncementId: string | null;
  setEditingAnnouncementId: (id: string | null) => void;
  form: AnnouncementFormValues;
  setForm: (f: AnnouncementFormValues) => void;
}
