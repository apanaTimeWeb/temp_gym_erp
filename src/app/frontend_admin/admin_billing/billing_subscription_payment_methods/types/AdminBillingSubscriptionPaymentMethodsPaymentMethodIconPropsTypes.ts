// RESPONSIBILITY: Defines feature-local TypeScript contracts for subscriptions_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_subscription_payment_methods/types/AdminSubscriptionsManagementPaymentMethodIconPropsTypes.ts)

import type { PaymentMethod } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/types/AdminBillingSubscriptionPaymentMethodsTypes';
export interface AdminSubscriptionsPaymentMethodIconProps {
  type: PaymentMethod['type'];
}
