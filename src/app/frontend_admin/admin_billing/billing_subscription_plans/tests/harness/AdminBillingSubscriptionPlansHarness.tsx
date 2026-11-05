"use client";
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_billing/billing_subscription_plans/locales/admin_billing_subscription_plans_en.json';
import { AdminNavigationLayoutConfirmProvider as AdminBillingLocalConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/components/feedback/AdminBillingSubscriptionPlansConfirmProvider';
import FeaturePage from '@/app/frontend_admin/admin_billing/billing_subscription_plans/page';

export default function AdminBillingSubscriptionPlansHarness({ children }: { children?: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } } }));
  return <NextIntlClientProvider locale="en" messages={messages as never}><QueryClientProvider client={queryClient}><AdminBillingLocalConfirmProvider>{children ?? <FeaturePage />}</AdminBillingLocalConfirmProvider></QueryClientProvider></NextIntlClientProvider>;
}
