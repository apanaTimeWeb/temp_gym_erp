"use client";
import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/locales/admin_billing_subscription_invoices_en.json';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/components/feedback/AdminBillingSubscriptionInvoicesConfirmProvider';
import FeaturePage from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/page';

export default function AdminBillingSubscriptionInvoicesHarness({ children }: { children?: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0 }, mutations: { retry: false } } }));
  return <NextIntlClientProvider locale="en" messages={messages as never}><QueryClientProvider client={queryClient}><AdminNavigationLayoutConfirmProvider>{children ?? <FeaturePage />}</AdminNavigationLayoutConfirmProvider></QueryClientProvider></NextIntlClientProvider>;
}
