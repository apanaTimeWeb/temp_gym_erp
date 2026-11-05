// RESPONSIBILITY: Defines feature-local TypeScript contracts for plans_catalog; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_plans/plans_catalog/types/AdminBillingPlansCatalogStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { PlanFormValues } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';
export interface AdminPlansStore {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editId: string | null;
  setEditId: (id: string | null) => void;
  form: PlanFormValues;
  setForm: (form: PlanFormValues) => void;
}
