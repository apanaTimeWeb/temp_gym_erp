// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for hr_management; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_hr/hr_staff_management/utils/AdminHrManagementMaskEmail.ts)

/** Masks the local part of an email for list contexts; full addresses remain available in detail views. @description Implements maskAdminHrEmail for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function maskAdminHrEmail(value: unknown): string {
  if (typeof value !== 'string') return '—';
  const email = value.trim();
  const at = email.lastIndexOf('@');
  if (at <= 0 || at === email.length - 1) return email ? '••••' : '—';
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const visible = local.length <= 1 ? '••••' : local.length === 2 ? `${local[0]}•` : `${local.slice(0, 2)}•••`;
  return `${visible}@${domain}`;
}
