// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Plans module. Single source of truth for plan data shapes.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_plans/plans_catalog/types/AdminBillingPlansCatalogTypes.ts)

import type { QueryStatus } from '@tanstack/react-query';

import type { AdminToastType } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogToastTypes';


export interface PlansContextType {
  plans: Plan[];
  totalItems: number;
  totalPages: number;
  status: QueryStatus;
  saving: boolean;
  toast: { message: string; type: AdminToastType } | null;

  search: string;
  setSearch: (s: string) => void;
  tierFilter: string;
  setTierFilter: (t: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  deletingPlanId: string | null;

  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editId: string | null;
  form: PlanFormValues;
  setForm: (form: PlanFormValues) => void;

  showToast: (msg: string, t: AdminToastType) => void;
  loadPlans: () => Promise<void>;
  openAdd: () => void;
  openEdit: (p: Plan) => void;
  savePlan: (data: PlanFormValues, onValidationError?: (error: unknown) => void) => Promise<void>;
  clearIntentKey: (intentId: string) => void;
  deletePlan: (id: string) => Promise<void>;
}

export interface Plan {
  id: string; name: string; tier: string;
  price1Month: number; price3Month: number;
  price6Month: number; price12Month: number; priceCustom?: number;
  features: string[]; isActive: boolean;
  freezeAllowed?: boolean;
  joiningFee?: number;
  ptSessionsIncluded?: number;
  taxRate?: number;
}


export type PlanFormValues = { name: string; tier: 'Bronze' | 'Silver' | 'Gold'; price1Month: string; price3Month: string; price6Month: string; price12Month: string; priceCustom: string; features: string };

export type AdminPlansUrlUpdate = { search?: string | null; tier?: string | null; page?: number };
