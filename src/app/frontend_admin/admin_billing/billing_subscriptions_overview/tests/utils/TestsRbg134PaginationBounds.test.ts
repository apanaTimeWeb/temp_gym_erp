// RBG134: invoice metadata cannot report pages outside a bounded result set.
import { describe, it, expect } from 'vitest';
import { paginateAdminFinanceSubscriptionInvoices } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewPaginateInvoices';
import type { Invoice } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewTypes';
const rows=Array.from({length:11},(_,i)=>({id:String(i)})) as Invoice[];
describe('SubscriptionsOverview invoice metadata normalization',()=>{
 it('clamps obsolete page to last available and uses accurate next/previous metadata',()=>{
  const data=paginateAdminFinanceSubscriptionInvoices(rows,999999,10);
  expect(data.page).toBe(2);expect(data.items).toHaveLength(1);
  expect(data.hasPrevPage).toBe(true);expect(data.hasNextPage).toBe(false);
 });
 it('normalizes non-finite pages and unbounded limits and preserves empty page semantics',()=>{
  expect(paginateAdminFinanceSubscriptionInvoices(rows,NaN,Infinity).limit).toBe(10);
  expect(paginateAdminFinanceSubscriptionInvoices(rows,1,2000000).limit).toBe(10);
  const empty=paginateAdminFinanceSubscriptionInvoices([],Number.MAX_SAFE_INTEGER,10);
  expect(empty.page).toBe(1);expect(empty.items).toEqual([]);
  expect(empty.hasPrevPage).toBe(false);
 });
});
