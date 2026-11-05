// RESPONSIBILITY: Resolve Zod validation markers to the owning module's translated field messages.
// DATA FLOW: Zod issue marker → verified namespace key → next-intl t(key) or literal fallback.

const I18N_VALIDATION_PREFIX = '__i18n:';

export const resolveAdminHrStaffManagementValidationMessage = (
  message: unknown,
  translate: (key: string) => string,
): string => typeof message === 'string' && message.startsWith(I18N_VALIDATION_PREFIX)
  ? translate(message.slice(I18N_VALIDATION_PREFIX.length))
  : String(message ?? '');
