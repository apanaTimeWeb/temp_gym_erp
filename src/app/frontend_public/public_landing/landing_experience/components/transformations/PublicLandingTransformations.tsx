// RESPONSIBILITY: Renders transformation success-story cards using static PublicLanding content; no client state or API data.
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { LANDING_TRANSFORMATIONS } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingTransformationConstants';

export default async function PublicLandingTransformations() {
  const t = await getTranslations('LANDING');
  return (
    <section id="transformations" className="bg-page px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-5 inline-block rounded-full border border-border bg-warning-bg px-4 py-2 text-xs font-bold uppercase tracking-widest text-warning">{t('transformations.eyebrow')}</div>
          <h2 className="mb-4 text-4xl font-black text-primary sm:text-5xl">{t('transformations.title')} <span className="text-primary">{t('transformations.titleHighlight')}</span></h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LANDING_TRANSFORMATIONS.map((transformation) => (
            <article key={transformation.nameKey} className="overflow-hidden rounded-lg border border-border bg-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:bg-surface-hover">
              <div className="p-6 pb-4">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-black text-on-primary">{transformation.initials}</div>
                  <div>
                    <h3 className="font-bold text-primary">{t(transformation.nameKey)}</h3>
                    <span className="rounded-full bg-warning-bg px-2 py-0.5 text-xs font-semibold text-warning">{t(transformation.typeKey)}</span>
                  </div>
                </div>
                <div className="mb-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border bg-danger-bg p-3 text-center"><p className="mb-1 text-xs font-semibold uppercase text-danger">{t('transformations.before')}</p><p className="text-lg font-black text-danger">{t('transformations.weightValue', { value: transformation.beforeKg })}</p></div>
                  <div className="flex items-center justify-center rounded-xl bg-surface-highlight p-3" aria-hidden="true"><ArrowRight size={18} strokeWidth={2} className="text-warning" /></div>
                  <div className="rounded-xl border border-border bg-success-bg p-3 text-center"><p className="mb-1 text-xs font-semibold uppercase text-success">{t('transformations.after')}</p><p className="text-lg font-black text-success">{t('transformations.weightValue', { value: transformation.afterKg })}</p></div>
                </div>
                <div className="mb-3 text-center text-xs text-secondary">{t('transformations.achievedIn', { value: transformation.durationMonths })}</div>
              </div>
              <div className="px-6 pb-6"><div className="rounded-xl bg-surface-highlight p-4"><p className="text-sm italic leading-relaxed text-secondary">&quot;{t(transformation.reviewKey)}&quot;</p></div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
