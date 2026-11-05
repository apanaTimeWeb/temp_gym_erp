// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_billing/billing_plans_catalog/constants/admin_billing_plans_catalog.constants.ts)

export const TIERS = ['Bronze', 'Silver', 'Gold'] as const;



export const EMPTY_PLAN_FORM: import('@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes').PlanFormValues = { 
 name: '', 
 tier: 'Gold', 
 price1Month: '', 
 price3Month: '', 
 price6Month: '', 
 price12Month: '', 
 priceCustom: '', 
 features: '' 
};

export const PLANS_ITEMS_PER_PAGE = 10;
