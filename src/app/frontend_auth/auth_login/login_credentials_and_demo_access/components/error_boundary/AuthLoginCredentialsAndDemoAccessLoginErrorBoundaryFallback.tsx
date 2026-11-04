// RESPONSIBILITY: Renders the Login client-error fallback and retry action using module-local translations and semantic tokens.
'use client';

import { CircleAlert } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { AuthLoginErrorBoundaryFallbackProps } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginErrorTypes';


/**
 * Renders the translated fallback owned by AuthLoginErrorBoundary.
 * @description Keeps hook-based translation access separate from the class error boundary.
 * @dependencies next-intl and the parent retry callback.
 * @edge-case Retry remains keyboard- and touch-accessible even when the Login form failed to render.
 */
export default function AuthLoginErrorBoundaryFallback({ onRetry }: AuthLoginErrorBoundaryFallbackProps) {
  const t = useTranslations('AUTH_LOGIN');

  return (
    <div
      data-testid="auth_login-error_boundary-root"
      className="flex min-h-96 w-full flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center shadow-card"
      role="alert"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-danger-bg text-danger" aria-hidden="true">
        <CircleAlert size={18} strokeWidth={2} />
      </div>
      <h2 className="mb-2 text-section-title font-semibold text-primary">{t('CLIENT_ERROR.TITLE')}</h2>
      <p className="mb-6 max-w-sm text-sm text-secondary">{t('CLIENT_ERROR.DESCRIPTION')}</p>
      <button
        type="button"
        data-testid="auth_login-error_boundary-retry"
        onClick={onRetry}
        className="min-h-11 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
      >
        {t('CLIENT_ERROR.RETRY')}
      </button>
    </div>
  );
}
