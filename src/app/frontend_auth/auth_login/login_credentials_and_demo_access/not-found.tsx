// RESPONSIBILITY: Provides the branded Login not-found route boundary and exposes the documented recovery navigation.
import { getTranslations } from 'next-intl/server';

import Link from 'next/link';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';



/**
 * Renders the public Login not-found recovery state.
 * @description Keeps the 404 surface within the public Auth context and returns the user to the configured landing route.
 * @dependencies next-intl server translations and the Auth URL configuration.
 * @edge-case This route intentionally links to the public landing page rather than the authenticated dashboard.
 */
export default async function LoginNotFound() {
  const t = await getTranslations('AUTH_LOGIN');

  return (
    <main className="flex min-h-screen items-center justify-center bg-page p-6">
      <section
        data-testid="auth_login-not_found-root"
        className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-card"
      >
        <p className="mb-2 text-4xl font-bold text-primary" aria-hidden="true">404</p>
        <h1 className="mb-2 text-section-title font-semibold text-primary">{t('NOT_FOUND.TITLE')}</h1>
        <p className="mb-6 text-sm text-secondary">{t('NOT_FOUND.DESCRIPTION')}</p>
        <Link
          href={AuthUrlConfig.PAGES.LANDING}
          data-testid="auth_login-not_found-back_home"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          {t('NOT_FOUND.BACK_TO_HOME')}
        </Link>
      </section>
    </main>
  );
}
