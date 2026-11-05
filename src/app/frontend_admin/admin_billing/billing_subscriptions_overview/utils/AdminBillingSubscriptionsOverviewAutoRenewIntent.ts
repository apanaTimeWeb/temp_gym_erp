// RESPONSIBILITY: Keep auto-renew ON and OFF idempotency retries separate within this leaf.
// DATA FLOW: confirmed current subscription autoRenew state → intent identity → mutation registry.
// This client helper does not assert server-side toggle atomicity or idempotency support.
export function adminBillingSubscriptionsOverviewAutoRenewIntent(currentlyEnabled: boolean): string {
  return `toggle-auto-renew:${currentlyEnabled ? 'off' : 'on'}`;
}
