'use client';
// RESPONSIBILITY: Renders the PublicLanding route-segment error boundary, safe recovery action, and module observability event.
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import type { PublicLandingErrorBoundaryProps, PublicLandingErrorReporter } from '@/app/frontend_public/public_landing/landing_experience/types/PublicLandingExperienceTypes';

export default function PublicLandingExperienceRouteError({ error, reset }: PublicLandingErrorBoundaryProps) {
  const t = useTranslations('LANDING');
  useEffect(() => {
    const reporter = (globalThis as typeof globalThis & { __landingErrorReporter?: PublicLandingErrorReporter }).__landingErrorReporter;
    reporter?.({ route: '/landing', module: 'landing', digest: error.digest, timestamp: new Date().toISOString() });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-page p-6">
      <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-8 text-center shadow-dialog">
        <h2 className="text-2xl font-black text-primary">{t('errors.routeTitle')}</h2>
        <p className="text-sm text-secondary">{t('errors.routeDescription')}</p>
        <button type="button" onClick={reset} data-testid="public_landing-error-retry" className="mt-4 min-h-11 rounded-xl bg-primary px-8 py-3 font-bold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('errors.retry')}</button>
      </div>
    </div>
  );
}
