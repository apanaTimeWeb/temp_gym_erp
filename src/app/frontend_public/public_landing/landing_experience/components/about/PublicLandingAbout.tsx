// RESPONSIBILITY: Renders the About section, mission statement, feature highlights, and static KPI cards.
import { getTranslations } from 'next-intl/server';
import { CheckCircle } from 'lucide-react';
import { LANDING_ABOUT_FEATURE_KEYS, LANDING_ABOUT_STATS } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingAboutConstants';

export default async function PublicLandingAbout() {
  const t = await getTranslations('LANDING');
  return (
    <section id="about" className="bg-page px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-block rounded-full border border-border bg-warning-bg px-4 py-2 text-xs font-bold uppercase tracking-widest text-warning">{t('about.eyebrow')}</div>
            <h2 className="mb-6 text-4xl font-black leading-tight text-primary sm:text-5xl">
              {t('about.title')} <br />
              <span className="text-primary">{t('about.titleHighlight')}</span>
            </h2>
            <h3 className="mb-2 text-xl font-bold text-primary">{t('about.missionTitle')}</h3>
            <p className="mb-6 text-lg leading-relaxed text-secondary">{t('about.mission')}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {LANDING_ABOUT_FEATURE_KEYS.map((featureKey) => (
                <div key={featureKey} className="flex items-center gap-2.5 text-sm text-secondary">
                  <CheckCircle size={18} strokeWidth={2} className="shrink-0 text-warning" aria-hidden="true" />
                  {t(featureKey)}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {LANDING_ABOUT_STATS.map(({ labelKey, valueKey, icon: Icon, iconToneClass }) => (
              <div key={labelKey} className="rounded-lg border border-border bg-card p-6 shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:bg-surface-hover">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${iconToneClass}`} aria-hidden="true"><Icon size={18} strokeWidth={2} /></div>
                <div className="mb-1 text-3xl font-black text-primary">{t(valueKey)}</div>
                <div className="text-sm text-secondary">{t(labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
