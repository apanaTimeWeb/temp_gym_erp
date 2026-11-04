// RESPONSIBILITY: Renders the published static timetable using an accessible table on larger screens and card-stack presentation on mobile.
import { getTranslations } from 'next-intl/server';
import { LANDING_SCHEDULE, LANDING_SCHEDULE_DAYS } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingScheduleConstants';

export default async function PublicLandingSchedule() {
  const t = await getTranslations('LANDING');
  return (
    <section id="schedule" className="bg-page px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-5 inline-block rounded-full border border-border bg-warning-bg px-4 py-2 text-xs font-bold uppercase tracking-widest text-warning">{t('schedule.eyebrow')}</div>
          <h2 className="mb-4 text-4xl font-black text-primary sm:text-5xl">{t('schedule.title')} <span className="text-primary">{t('schedule.titleHighlight')}</span></h2>
          <p className="mx-auto max-w-xl text-secondary">{t('schedule.description')}</p>
        </div>

        <div className="hidden overflow-x-auto rounded-lg border border-border md:block" tabIndex={0} role="region" aria-label={t('schedule.caption')}>
          <table className="w-full min-w-max border-collapse bg-card">
            <caption className="sr-only">{t('schedule.caption')}</caption>
            <thead>
              <tr className="bg-surface-highlight text-primary">
                <th scope="col" className="sticky start-0 z-10 w-32 bg-surface-highlight px-4 py-4 text-start text-xs font-semibold uppercase text-secondary">{t('schedule.time')}</th>
                {LANDING_SCHEDULE_DAYS.map(({ key, labelKey }) => <th key={key} scope="col" className="min-w-32 px-4 py-4 text-start text-xs font-semibold uppercase text-secondary">{t(labelKey)}</th>)}
              </tr>
            </thead>
            <tbody>
              {LANDING_SCHEDULE.map((row) => (
                <tr key={row.time} className="text-sm text-secondary odd:bg-card even:bg-surface-zebra motion-safe:transition-all motion-safe:duration-base hover:bg-surface-hover">
                  <th scope="row" className="sticky start-0 z-10 w-32 bg-card px-4 py-4 text-sm font-semibold text-warning">{row.time}</th>
                  {LANDING_SCHEDULE_DAYS.map(({ key }) => <td key={key} className="min-w-32 px-4 py-4">{t(`schedule.entries.${row[key]}`)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 md:hidden" role="region" aria-label={t('schedule.caption')}>
          {LANDING_SCHEDULE.map((row) => (
            <article key={row.time} className="rounded-lg border border-border bg-card p-5 shadow-card">
              <h3 className="mb-4 text-sm font-bold text-warning">{row.time}</h3>
              <dl className="space-y-3">
                {LANDING_SCHEDULE_DAYS.map(({ key, labelKey }) => (
                  <div key={key} className="flex items-start justify-between gap-4 rounded-md bg-surface-highlight px-3 py-2">
                    <dt className="text-xs font-semibold uppercase text-secondary">{t(labelKey)}</dt>
                    <dd className="text-end text-sm text-primary">{t(`schedule.entries.${row[key]}`)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
