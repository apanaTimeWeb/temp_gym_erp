// RESPONSIBILITY: Renders a structural PublicLanding skeleton while the route is loading.
import { getTranslations } from 'next-intl/server';

const PUBLIC_LANDING_SUMMARY_SKELETON_KEYS = ['summary-one', 'summary-two', 'summary-three'] as const;
const PUBLIC_LANDING_CONTENT_SKELETON_KEYS = ['content-one', 'content-two', 'content-three', 'content-four'] as const;

export default async function PublicLandingExperienceRouteLoading() {
  const t = await getTranslations('LANDING');
  return (
    <div className="min-h-screen bg-page" aria-busy="true">
      <p className="sr-only" role="status">{t('loading')}</p>
      <div className="fixed inset-x-0 top-0 z-20 h-16 border-b border-border bg-header-translucent" />
      <main className="space-y-10 px-4 pb-20 pt-24 sm:px-6">
        <section className="mx-auto grid min-h-96 max-w-7xl items-center gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="h-7 w-44 rounded-full bg-skeleton-base motion-safe:animate-pulse" />
            <div className="h-12 w-full max-w-2xl rounded-lg bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-12 w-4/5 max-w-2xl rounded-lg bg-skeleton-base motion-safe:animate-pulse" />
            <div className="h-20 w-full max-w-2xl rounded-lg bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="flex flex-wrap gap-4"><div className="h-12 w-40 rounded-xl bg-skeleton-base motion-safe:animate-pulse" /><div className="h-12 w-40 rounded-xl bg-skeleton-highlight motion-safe:animate-pulse" /></div>
          </div>
          <div className="hidden min-h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse lg:block" />
        </section>
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {PUBLIC_LANDING_SUMMARY_SKELETON_KEYS.map((skeletonKey) => <div key={skeletonKey} className="h-48 rounded-lg border border-border bg-skeleton-base motion-safe:animate-pulse" />)}
        </section>
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
          {PUBLIC_LANDING_CONTENT_SKELETON_KEYS.map((skeletonKey) => <div key={skeletonKey} className="h-56 rounded-lg border border-border bg-skeleton-highlight motion-safe:animate-pulse" />)}
        </section>
      </main>
    </div>
  );
}
