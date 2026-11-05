// RESPONSIBILITY: Owns MSW handlers for the Admin subscriptions feature.
// DATA FLOW: subscriptions API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { http, HttpResponse } from 'msw';
// Keep mock pagination consistent with the validated, positive-integer API contract.
const normalizeMockPagination = (value: string | null, fallback: number): number => {
  if (value === null) return fallback;
  if (!/^[1-9]\d*$/.test(value)) return fallback;
  const n = Number(value);
  return Number.isSafeInteger(n) && n > 0 && n <= 100 ? n : fallback;
};
import { MOCK_CURRENT_SUBSCRIPTION, MOCK_PAYMENT_METHODS, MOCK_SAAS_PLANS, MOCK_INVOICES, MOCK_SUBSCRIPTION_KPI } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/mocks/fixtures/AdminBillingSubscriptionPlansMockFixtures';
import { paginateAdminFinanceSubscriptionInvoices } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/utils/AdminBillingSubscriptionPlansPaginateInvoices';

const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});
const simulatedError = (request: Request) => new URL(request.url).searchParams.get('scenario') === 'error';
const errorResponse = (message: string, status = 500) => HttpResponse.json({ errorCode: 'ADMIN_API_ERROR', statusCode: status, requestId: globalThis.crypto.randomUUID(), success: false, message, data: null }, { status });

let subscriptionState = structuredClone(MOCK_CURRENT_SUBSCRIPTION);
let paymentMethodsState = structuredClone(MOCK_PAYMENT_METHODS);

export const adminSubscriptionsMockHandlers = [
  http.get('*/admin/subscriptions/fetchSubscription', ({ request }) => simulatedError(request) ? errorResponse('Subscription request failed') : ok(subscriptionState)),
  http.get('*/admin/subscriptions/fetchPlans', ({ request }) => simulatedError(request) ? errorResponse('Plans request failed') : ok(MOCK_SAAS_PLANS)),
  http.get('*/admin/subscriptions/fetchInvoices', ({ request }) => { if (simulatedError(request)) return errorResponse('Invoices request failed'); const url = new URL(request.url); const page = normalizeMockPagination(url.searchParams.get('page'), 1); const limit = normalizeMockPagination(url.searchParams.get('limit'), 10); const pagination = paginateAdminFinanceSubscriptionInvoices(MOCK_INVOICES, page, limit); return HttpResponse.json({ success: true, message: 'Invoice history loaded', data: pagination.items, meta: { total: pagination.total, page: pagination.page, limit: pagination.limit, totalPages: pagination.totalPages, hasNextPage: pagination.hasNextPage, hasPrevPage: pagination.hasPrevPage } , requestId: globalThis.crypto.randomUUID() }); }),
  http.get('*/admin/subscriptions/fetchPaymentMethods', ({ request }) => simulatedError(request) ? errorResponse('Payment methods request failed') : ok(paymentMethodsState)),
  http.get('*/admin/subscriptions/fetchKPIs', ({ request }) => simulatedError(request) ? errorResponse('Subscription KPI request failed') : ok(MOCK_SUBSCRIPTION_KPI)),
  http.post('*/admin/subscriptions/upgradePlan', async ({ request }) => { const body = (await request.json()) as { planId?: string; id?: string }; const planId = String(body.planId ?? body.id ?? ''); const plan = MOCK_SAAS_PLANS.find(p => p.id === planId); if (!plan) return errorResponse('Plan not found', 404); subscriptionState = { ...subscriptionState, planId: plan.id, planName: plan.name, tier: plan.tier, monthlyPrice: plan.monthlyPrice, annualPrice: plan.annualPrice }; return ok(null, 'Plan upgraded'); }),
  http.post('*/admin/subscriptions/toggleAutoRenew', () => { subscriptionState = { ...subscriptionState, autoRenew: !subscriptionState.autoRenew }; return ok(null, 'Auto-renewal updated'); }),
  http.post('*/admin/subscriptions/setDefaultPaymentMethod', async ({ request }) => { const body = (await request.json()) as { id?: string; paymentMethodId?: string }; const id = String(body.id ?? body.paymentMethodId ?? ''); if (!paymentMethodsState.some((p) => p.id === id)) return errorResponse('Payment method not found', 404); paymentMethodsState = paymentMethodsState.map(p => ({ ...p, isDefault: p.id === id })); return ok(null, 'Default payment method updated'); }),
  http.delete('*/admin/subscriptions/removePaymentMethod', async ({ request }) => { const body = (await request.json()) as { id?: string; paymentMethodId?: string }; const id = String(body.id ?? body.paymentMethodId ?? ''); const target = paymentMethodsState.find((p) => p.id === id); if (!target) return errorResponse('Payment method not found', 404); if (target.isDefault) return errorResponse('Choose another default payment method before removing this one', 409); paymentMethodsState = paymentMethodsState.filter(p => p.id !== id); return ok(null, 'Payment method removed'); })
];
