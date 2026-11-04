// RESPONSIBILITY: Renders the static Services and Programs grid from PublicLanding-owned configuration.
import { getTranslations } from 'next-intl/server';
import { LANDING_SERVICES } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingServicesConstants';

export default async function PublicLandingServices() {
  const t = await getTranslations('LANDING');
  return (
    <section id="services" className="bg-page px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-5 inline-block rounded-full border border-border bg-warning-bg px-4 py-2 text-xs font-bold uppercase tracking-widest text-warning">{t('services.eyebrow')}</div>
          <h2 className="mb-4 text-4xl font-black text-primary sm:text-5xl">{t('services.title')} <span className="text-primary">{t('services.titleHighlight')}</span></h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article id={`service-${service.id}`} key={service.id} className="scroll-mt-20 rounded-lg border border-border bg-card p-6 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:bg-surface-hover">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${service.iconToneClass}`}><Icon size={18} strokeWidth={2} aria-hidden="true" /></div>
                <h3 className="mb-3 text-xl font-bold text-primary">{t(service.titleKey)}</h3>
                <p className="text-sm leading-relaxed text-secondary">{t(service.descriptionKey)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
