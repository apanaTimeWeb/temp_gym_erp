// RESPONSIBILITY: Renders the desktop Login security status indicator using feature-safe semantic status tokens.
'use client';

import { useTranslations } from 'next-intl';



/**
 * Renders the desktop Login secure-status indicator using the global semantic success palette.
 * @description Communicates the documented security state without becoming an authentication authority or exposing backend details.
 * @dependencies next-intl for localized status copy and global semantic status tokens for contrast-safe presentation.
 * @edge-case The animated status dot is decorative; the localized text remains the accessible source of meaning and is not color-only.
 */
export default function AuthLoginHeroSecureStatus() {
  const t = useTranslations('AUTH_LOGIN');
  return (
    <div data-testid="auth_login-hero_secure-status" className="relative inline-flex w-fit items-center gap-2 rounded-full border border-border bg-success-bg px-4 py-2">
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success text-on-success motion-safe:animate-pulse" />
      <span className="text-xs font-semibold text-success">{t('SECURE_BADGE')}</span>
    </div>
  );
}
