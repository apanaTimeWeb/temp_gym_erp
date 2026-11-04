// RESPONSIBILITY: Renders the static trainer team cards from PublicLanding-owned configuration.
import { getTranslations } from 'next-intl/server';
import { LANDING_TRAINERS } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingTrainerConstants';

export default async function PublicLandingTrainers() {
  const t = await getTranslations('LANDING');
  return (
    <section id="trainers" className="bg-page px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-5 inline-block rounded-full border border-border bg-warning-bg px-4 py-2 text-xs font-bold uppercase tracking-widest text-warning">{t('trainers.eyebrow')}</div>
          <h2 className="mb-4 text-4xl font-black text-primary sm:text-5xl">{t('trainers.title')} <span className="text-primary">{t('trainers.titleHighlight')}</span></h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LANDING_TRAINERS.map((trainer) => (
            <article key={trainer.nameKey} className="rounded-lg border border-border bg-card p-6 text-center motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:bg-surface-hover">
              <div className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-black ${trainer.avatarClass}`}>{trainer.initials}</div>
              <h3 className="mb-1 text-lg font-bold text-primary">{t(trainer.nameKey)}</h3>
              <p className="mb-3 text-xs font-semibold text-warning">{t(trainer.roleKey)}</p>
              <div className="mb-3 flex flex-wrap justify-center gap-2 text-xs text-secondary">
                <span className="rounded-full bg-surface-highlight px-3 py-1">{t('trainers.experience', { value: trainer.experienceYears })}</span>
                <span className="rounded-full bg-surface-highlight px-3 py-1">{t(trainer.certificationKey)}</span>
              </div>
              <p className="mt-2 text-xs text-secondary">{t('trainers.specialization', { value: t(trainer.specializationKey) })}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
