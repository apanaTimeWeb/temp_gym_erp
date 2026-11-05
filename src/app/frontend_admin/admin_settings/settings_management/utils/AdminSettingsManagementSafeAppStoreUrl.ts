// RESPONSIBILITY: Permit only unambiguous external HTTPS app-store URLs, without embedded URL credentials.
/** A URL intended for a user-clickable external link must be explicit HTTPS without userinfo or controls. */
export function isSafeAdminSettingsAppStoreUrl(value: unknown): value is string {
  if (typeof value !== 'string' || !/^https:\/\/[^\s\u0000-\u001f\u007f]+$/iu.test(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.hostname) && url.username === '' && url.password === '';
  } catch { return false; }
}
