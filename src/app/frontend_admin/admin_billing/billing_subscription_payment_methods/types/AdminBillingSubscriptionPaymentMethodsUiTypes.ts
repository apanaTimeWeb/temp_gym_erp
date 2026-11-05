// RESPONSIBILITY: Named UI contract for the Admin subscription tabs.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_subscription_payment_methods/types/AdminSubscriptionsManagementUiTypes.ts)

export type AdminSubscriptionsTab = 'overview' | 'plans' | 'invoices' | 'payment';
