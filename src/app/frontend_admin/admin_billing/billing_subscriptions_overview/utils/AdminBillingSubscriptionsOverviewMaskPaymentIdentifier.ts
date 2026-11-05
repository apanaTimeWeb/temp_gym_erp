// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for subscriptions_management; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_subscriptions/subscriptions_overview/utils/AdminSubscriptionsManagementMaskPaymentIdentifier.ts)

/** Masks a full UPI payment identifier before it is shown in a list. @description Implements maskAdminSubscriptionsUpiIdentifier for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function maskAdminSubscriptionsUpiIdentifier(value: string | undefined): string {
  if (!value) return '—';
  const at = value.lastIndexOf('@');
  if (at < 1 || at === value.length - 1) return '••••';
  const local = value.slice(0, at);
  const domain = value.slice(at + 1);
  const visiblePrefix = local.slice(0, Math.min(2, local.length));
  return `${visiblePrefix}${'•'.repeat(Math.max(3, local.length - visiblePrefix.length))}@${domain}`;
}
