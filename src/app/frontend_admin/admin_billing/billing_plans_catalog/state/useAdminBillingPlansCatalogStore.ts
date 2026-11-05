// RESPONSIBILITY: Core data logic hook for the admin module.
// DATA FLOW: user interaction → module-scoped UI state action → subscribing feature components (admin_plans/plans_catalog/state/useAdminBillingPlansCatalogStore.ts)

import { create } from 'zustand';
import type { AdminPlansStore } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogStoreTypes';
import { EMPTY_PLAN_FORM } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/constants/admin_billing_plans_catalog.constants';
/**
 * @description useAdminPlansStore: Core data logic hook for the admin module.
 * @dependencies Consumes AdminPlansStoreTypes, AdminPlansConstants, AdminPlansTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminPlansStore = create<AdminPlansStore>((set) => ({
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
  editId: null,
  setEditId: (id) => set({ editId: id }),
  form: EMPTY_PLAN_FORM,
  setForm: (form) => set({ form }),
}));

