// RESPONSIBILITY: Defines the UI-only Zustand state contract for the Superadmin Gyms feature.
import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types';

export type SuperadminGymsViewMode = 'list' | 'calendar';

export interface SuperadminGymsState {
  viewMode: SuperadminGymsViewMode;
  selectedGym: Tenant | null;
  isEditModalOpen: boolean;
  isWhatsappModalOpen: boolean;
  isDeleteModalOpen: boolean;
  gymToDelete: Tenant | null;
  setViewMode: (mode: SuperadminGymsViewMode) => void;
  openEditModal: (gym: Tenant) => void;
  closeEditModal: () => void;
  openWhatsappModal: (gym: Tenant) => void;
  closeWhatsappModal: () => void;
  openDeleteModal: (gym: Tenant) => void;
  closeDeleteModal: () => void;
}
