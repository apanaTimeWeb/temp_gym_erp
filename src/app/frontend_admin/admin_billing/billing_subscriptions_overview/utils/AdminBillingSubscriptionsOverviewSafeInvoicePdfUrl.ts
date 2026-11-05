// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for subscriptions_management; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_subscriptions/subscriptions_overview/utils/AdminSubscriptionsManagementSafeInvoicePdfUrl.ts)

/** Restricts invoice PDF navigation to same-origin relative paths. External CDN hosts require an explicit product allowlist. @description Implements isSafeAdminSubscriptionsInvoicePdfUrl for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function isSafeAdminSubscriptionsInvoicePdfUrl(value: string): boolean {
  // The URL parser normalizes dot segments before pathname can be inspected.
  // Reject encoded traversal/escaped separators on the original raw path first.
  if (!value || !value.startsWith('/') || value.startsWith('//') ||
      value.includes('\\') || /[\u0000-\u0020\u007f]/.test(value)) return false;
  const rawPath = value.split(/[?#]/, 1)[0];
  if (rawPath.split('/').some((segment) => {
    try {
      const decoded = decodeURIComponent(segment);
      return decoded === '.' || decoded === '..' ||
        decoded.includes('/') || decoded.includes('\\') ||
        /[\u0000-\u001f\u007f]/.test(decoded);
    } catch {
      return true; // Fail closed for malformed percent escapes.
    }
  })) return false;
  try {
    const parsed = new URL(value, 'https://same-origin.invalid');
    return parsed.origin === 'https://same-origin.invalid' && parsed.pathname.startsWith('/');
  } catch {
    return false;
  }
}
