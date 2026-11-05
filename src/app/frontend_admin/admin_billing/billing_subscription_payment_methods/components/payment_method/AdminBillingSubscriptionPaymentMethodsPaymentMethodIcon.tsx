"use client";
// RESPONSIBILITY: Renders the semantic icon for one supported subscription payment method type.
// DATA FLOW: feature data/state and user input → AdminSubscriptionsManagementPaymentMethodIcon → accessible UI/events routed to owning hooks (admin_finance/finance_subscription_payment_methods/components/payment_method/AdminSubscriptionsManagementPaymentMethodIcon.tsx)

import { Building2, CreditCard, Smartphone } from 'lucide-react';
import type { PaymentMethod } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/types/AdminBillingSubscriptionPaymentMethodsTypes';

import type { AdminSubscriptionsPaymentMethodIconProps } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/types/AdminBillingSubscriptionPaymentMethodsPaymentMethodIconPropsTypes';


/**
 * AdminSubscriptionsManagementPaymentMethodIcon renders the admin subscriptions payment method icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsManagementPaymentMethodIcon: Renders the semantic icon for one supported subscription payment method type.
 * @dependencies Consumes AdminSubscriptionsTypes, AdminSubscriptionsPaymentMethodIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsManagementPaymentMethodIcon({ type }: AdminSubscriptionsPaymentMethodIconProps) {
  if (type === 'upi') return <Smartphone size={18} className="text-success"  strokeWidth={2}/>;
  if (type === 'netbanking') return <Building2 size={18} className="text-info"  strokeWidth={2}/>;
  return <CreditCard size={18} className="text-primary"  strokeWidth={2}/>;
}
