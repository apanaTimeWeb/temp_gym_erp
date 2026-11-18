import { PLANS_MASTER, findPlan } from '../constants/SuperadminGymsDirectoryPlans';
import type { Tenant, Plan } from '../types/SuperadminGymsDirectoryTenantTypes';

export * from './SuperadminGymsDirectoryDateUtils';

/**
 * Calculates Monthly Recurring Revenue (MRR) for a tenant.
 * Rule: Returns 0 if subscriptionState is TRIAL, EXPIRED, or CANCELLED,
 * or if accessStatus is INACTIVE. Otherwise returns the plan price.
 */
export function getMrr(
  tenant: Pick<Tenant, 'accessStatus' | 'subscriptionState' | 'planId'> | null | undefined,
  plans: Plan[] = PLANS_MASTER
): number {
  if (!tenant) return 0;

  if (tenant.accessStatus === 'INACTIVE') {
    return 0;
  }

  if (
    tenant.subscriptionState === 'TRIAL' ||
    tenant.subscriptionState === 'EXPIRED' ||
    tenant.subscriptionState === 'CANCELLED'
  ) {
    return 0;
  }

  const plan =
    plans.find((p) => p.id === tenant.planId || p.name.toLowerCase() === tenant.planId?.toLowerCase()) ||
    findPlan(tenant.planId);

  return plan ? plan.price : 0;
}

/**
 * Formats currency in INR with ₹ symbol and 2 decimal places.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Masks an email for privacy (e.g., jo****@iron.com).
 */
export function maskEmail(email?: string): string {
  if (!email || !email.includes('@')) return email || '';
  const [user, domain] = email.split('@');
  if (user.length <= 2) {
    return `${user}****@${domain}`;
  }
  return `${user.slice(0, 2)}****@${domain}`;
}
