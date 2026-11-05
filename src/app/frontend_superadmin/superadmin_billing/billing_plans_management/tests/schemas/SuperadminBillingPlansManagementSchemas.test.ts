// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.


import { describe, expect, it } from 'vitest';

import { subscriptionPlanSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_aliases.schemas';
import { SuperadminBillingPlansEmptyResponseSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_api.schemas';
import { SubscriptionPlanSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_contract.schemas';
import { SuperadminBillingPlansV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management_v1_contract.schemas';
import { planFormSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management.schemas';

describe('subscriptionPlanSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(subscriptionPlanSchema.safeParse({}).success).toBe(false);
  });
});


describe('planFormSchema required text fields', () => {
  it('rejects whitespace-only plan names and feature labels', () => {
    expect(planFormSchema.shape.name.safeParse('   ').success).toBe(false);
    expect(planFormSchema.shape.features.element.shape.value.safeParse('   ').success).toBe(false);
  });
});

describe('SuperadminBillingPlansEmptyResponseSchema', () => {
  it('accepts the supported no-content envelopes without inventing an API payload', () => {
    expect(SuperadminBillingPlansEmptyResponseSchema.safeParse(null).success).toBe(true);
    expect(SuperadminBillingPlansEmptyResponseSchema.safeParse({}).success).toBe(true);
    expect(SuperadminBillingPlansEmptyResponseSchema.safeParse(undefined).success).toBe(true);
  });
});


describe('SubscriptionPlanSchema currency contract', () => {
  it('rejects malformed currency codes before edit-form currency formatting', () => {
    const result = SubscriptionPlanSchema.safeParse({ id: 'p1', name: 'Plan', priceMonthly: 100, priceAnnual: 1000, maxMembers: 10, maxStaff: 2, features: ['Access'], activeTenants: 0, isPublic: true, trialDays: 14, setupFee: 0, currency: 'NOT_A_CURRENCY', isArchived: false });
    expect(result.success).toBe(false);
  });
});


describe('Plans V1 canonical response envelope', () => {
  it('requires requestId on success and complete canonical diagnostics on failure', () => {
    const data = { plans: [], versions: [], addons: [], migration: { from: 'v1', to: 'v2', tenants: 0, monthlyChange: 0, limitConflicts: 0 } };
    expect(SuperadminBillingPlansV1ResponseSchema.safeParse({ success: true, message: 'ok', data }).success).toBe(false);
    expect(SuperadminBillingPlansV1ResponseSchema.safeParse({ success: true, message: 'ok', data, requestId: 'req-1' }).success).toBe(true);
    expect(SuperadminBillingPlansV1ResponseSchema.safeParse({ success: false, message: 'failed', data: null }).success).toBe(false);
    expect(SuperadminBillingPlansV1ResponseSchema.safeParse({ success: false, message: 'failed', data: null, errorCode: 'FAILED', statusCode: 500, requestId: 'req-2' }).success).toBe(true);
  });
});

describe('Plans archive response contract', () => {
  it('validates the archived plan payload returned by the feature mock', () => {
    const archived = { id: 'p-1', name: 'Archived', priceMonthly: 100, priceAnnual: 1000, maxMembers: 10, maxStaff: 2, features: ['Access'], activeTenants: 0, isPublic: false, trialDays: 0, setupFee: 0, currency: 'INR', isArchived: true };
    expect(SubscriptionPlanSchema.safeParse(archived).success).toBe(true);
  });
});
