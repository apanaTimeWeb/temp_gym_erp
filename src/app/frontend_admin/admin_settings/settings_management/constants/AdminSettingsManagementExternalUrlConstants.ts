// RESPONSIBILITY: Builds feature-owned contact links for the Admin Settings banner.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_settings/settings_management/constants/AdminSettingsManagementExternalUrlConstants.ts)

import { ADMIN_SETTINGS_EXTERNAL_URLS } from '@/app/frontend_admin/admin_settings/settings_management/config/admin_settings_management.url_config';

/** Accept only ordinary international/national telephone notation, without silently stripping letters or URI delimiters. */
export function normalizeAdminSettingsContactPhone(phone: string): string {
  const trimmed = phone.trim();
  if (!/^[+\d\s().-]+$/.test(trimmed) || (trimmed.includes('+') && !trimmed.startsWith('+'))) return '';
  if ((trimmed.match(/\+/g) ?? []).length > 1) return '';
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15 ? `${trimmed.startsWith('+') ? '+' : ''}${digits}` : '';
}

export function buildAdminSettingsWhatsAppWebUrl(phone: string): string {
  const normalized = normalizeAdminSettingsContactPhone(phone);
  return normalized ? `${ADMIN_SETTINGS_EXTERNAL_URLS.whatsappWeb}/${normalized.replace(/^\+/, '')}` : '';
}

export function buildAdminSettingsPhoneUrl(phone: string): string {
  const normalized = normalizeAdminSettingsContactPhone(phone);
  return normalized ? `${ADMIN_SETTINGS_EXTERNAL_URLS.telephone}${normalized}` : '';
}
