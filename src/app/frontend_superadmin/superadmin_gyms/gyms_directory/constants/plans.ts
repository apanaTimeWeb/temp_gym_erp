import type { Plan } from '../types/tenant';

/**
 * Canonical Plans Master
 * Starter, Basic, Pro, Growth, Enterprise with price and memberLimit.
 * Used across tables, filters, and forms.
 */
export const PLANS_MASTER: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 999,
    memberLimit: 100,
    currency: 'INR',
    description: 'Perfect for boutique studios and single-trainer facilities',
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 2499,
    memberLimit: 250,
    currency: 'INR',
    description: 'Great for growing local gyms up to 250 members',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 4999,
    memberLimit: 600,
    currency: 'INR',
    description: 'Ideal for established fitness centers and multi-floor gyms',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 8999,
    memberLimit: 1200,
    currency: 'INR',
    description: 'Designed for expanding multi-zone clubs and mid-sized chains',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 14999,
    memberLimit: 3000,
    currency: 'INR',
    description: 'Full white-label SaaS solution for premium gym chains',
  },
];

export const PLAN_MAP = new Map<string, Plan>(
  PLANS_MASTER.map((p) => [p.id, p])
);

export function findPlan(planIdOrName?: string): Plan | undefined {
  if (!planIdOrName) return undefined;
  const lower = planIdOrName.toLowerCase();
  return (
    PLAN_MAP.get(lower) ||
    PLANS_MASTER.find(
      (p) => p.name.toLowerCase() === lower || p.id.toLowerCase() === lower
    )
  );
}
