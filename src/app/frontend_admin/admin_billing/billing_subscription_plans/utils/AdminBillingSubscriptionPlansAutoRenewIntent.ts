// RESPONSIBILITY: Separates auto-renew on/off request identities without guessing server toggle semantics.
// DATA FLOW: verified subscription autoRenew state → direction-specific mutation intent ID.
export function adminBillingSubscriptionPlansAutoRenewIntent(currentlyEnabled: boolean): string {
  return `toggle-auto-renew:${currentlyEnabled ? 'off' : 'on'}`;
}
