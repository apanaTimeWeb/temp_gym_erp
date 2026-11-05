// RESPONSIBILITY: Defines the UI-only Zustand state contract for the Superadmin Plans feature.
import type { SubscriptionPlan } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types';

export interface SuperadminBillingPlansStoreState {
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedPlan: SubscriptionPlan | null;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (plan: SubscriptionPlan) => void;
  closeEditModal: () => void;
}
