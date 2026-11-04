// RESPONSIBILITY: Provides the PublicLanding branded missing-route recovery surface for route-segment not-found states.
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_experience/config/public_landing_experience.url_config';

export default async function PublicLandingExperienceRouteNotFound() {
  const t = await getTranslations('LANDING');
  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-6 text-center">
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-10 shadow-card">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-warning">{t('notFound.eyebrow')}</p>
        <h1 className="mb-4 text-3xl font-black text-primary">{t('notFound.title')}</h1>
        <p className="mb-8 text-secondary">{t('notFound.description')}</p>
        <Link href={PublicLandingUrlConfig.PAGES.LANDING} data-testid="public_landing-notfound-back" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('notFound.back')}</Link>
      </div>
    </main>
  );
}
