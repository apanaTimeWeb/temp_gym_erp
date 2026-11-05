// RESPONSIBILITY: Formats timestamps used by the Superadmin Gym WhatsApp receipt flow.
/** Formats a timestamp using the application locale for a customer-facing receipt. */
/**
 * @description Provides gyms formatting or feature utility behavior for formatSuperadminGymWhatsappReceiptDate.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatSuperadminGymWhatsappReceiptDate(now = new Date(), locale: string): string {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(now);
}
