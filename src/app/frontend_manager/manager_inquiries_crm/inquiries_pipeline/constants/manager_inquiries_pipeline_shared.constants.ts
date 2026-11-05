// RESPONSIBILITY: Centralized constants, Zod schema, and shared data for the Inquiries module. Single source of truth for all hardcoded values.

/**
 * @description Provides the ManagerInquiriesPipelineSharedConstants implementation for the inquiries module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const INQUIRIES_STATUS_LABEL_KEYS = {
  NEW: 'TEXT_STATUS_NEW',
  FOLLOW_UP: 'TEXT_STATUS_FOLLOW_UP',
  CONVERTED: 'TEXT_STATUS_CONVERTED',
  LOST: 'TEXT_STATUS_LOST',
} as const;

export const INQUIRIES_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  NEW: { bg: 'bg-info-bg', text: 'text-info-text' },
  FOLLOW_UP: { bg: 'bg-warning-bg', text: 'text-warning-text' },
  CONVERTED: { bg: 'bg-success-bg', text: 'text-success-text' },
  LOST: { bg: 'bg-danger-bg', text: 'text-danger-text' } };

export const INQUIRY_SOURCES = ['Walk-in', 'Call', 'Website', 'WhatsApp', 'Referral', 'Facebook', 'Instagram'] as const;

export const INQUIRY_SOURCE_LABEL_KEYS: Record<(typeof INQUIRY_SOURCES)[number], string> = {
  'Walk-in': 'TEXT_SOURCE_WALK_IN',
  Call: 'TEXT_SOURCE_CALL',
  Website: 'TEXT_SOURCE_WEBSITE',
  WhatsApp: 'TEXT_SOURCE_WHATSAPP',
  Referral: 'TEXT_SOURCE_REFERRAL',
  Facebook: 'TEXT_SOURCE_FACEBOOK',
  Instagram: 'TEXT_SOURCE_INSTAGRAM',
};



export const INQUIRIES_TABLE_HEADER_KEYS = [
  'TEXT_HEADER_INQUIRY_NAME', 'TEXT_HEADER_CONTACT', 'TEXT_HEADER_SOURCE',
  'TEXT_HEADER_STATUS', 'TEXT_HEADER_DATE', 'TEXT_HEADER_ACTIONS',
] as const;

export const INQUIRY_MODAL_FIELDS = [
  { labelKey: 'TEXT_FIELD_FULL_NAME', key: 'name', type: 'text', req: true },
  { labelKey: 'TEXT_FIELD_PHONE', key: 'phone', type: 'tel', req: true },
  { labelKey: 'TEXT_FIELD_EMAIL_OPTIONAL', key: 'email', type: 'email', req: false },
  { labelKey: 'TEXT_FIELD_NOTES', key: 'notes', type: 'text', req: false },
] as const;



