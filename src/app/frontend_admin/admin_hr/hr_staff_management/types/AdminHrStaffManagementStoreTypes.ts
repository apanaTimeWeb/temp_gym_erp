// RESPONSIBILITY: Contract for transient HR staff-directory UI state.
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';

export type AdminHrUiStoreState = {
  visibleColumns: string[];
  showModal: boolean;
  showProfileModal: boolean;
  editId: string | null;
  setVisibleColumns: (columns: string[]) => void;
  setShowModal: (value: boolean) => void;
  setShowProfileModal: (value: boolean) => void;
  setEditId: (value: string | null) => void;
  openAdd: () => void;
  openEdit: (staff: Staff) => void;
  openProfile: (staff: Staff) => void;
};
