'use client';
// RESPONSIBILITY: Renders the static membership plan cards and locale-aware minor-unit pricing.
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle } from 'lucide-react';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_experience/config/public_landing_experience.url_config';
import { LANDING_CURRENCY_CODE, LANDING_PLANS } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingPlansConstants';
import { formatPublicLandingCurrency } from '@/app/frontend_public/public_landing/landing_experience/utils/PublicLandingFormattingUtils';

/**
 * Renders documented membership plans with locale-aware minor-unit INR pricing and booking CTAs.
 * @dependencies PublicLanding plan constants, PublicLanding URL config, module currency formatter, next-intl.
 * @edge-case Prices remain raw minor units until the render-time locale-aware formatter is applied.
 */
/**
 * PublicLandingPlans owns the presentation for its documented PublicLanding section and consumes only module-owned configuration or approved infrastructure.
 * @dependencies PublicLanding translations/configuration and approved global UI primitives where imported.
 * @edge-case The section must remain usable with localized text, narrow viewports, and reduced-motion preferences.
 */
export default function PublicLandingPlans() {
  const locale = useLocale();
  const t = useTranslations('LANDING');
  return (
    <section id="plans" className="bg-page px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center"><div className="mb-5 inline-block rounded-full border border-border bg-warning-bg px-4 py-2 text-xs font-bold uppercase tracking-widest text-warning">{t('plans.eyebrow')}</div><h2 className="mb-4 text-4xl font-black text-primary sm:text-5xl">{t('plans.title')} <span className="text-primary">{t('plans.titleHighlight')}</span></h2><p className="mx-auto max-w-xl text-secondary">{t('plans.description')}</p></div>
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 lg:grid-cols-5">
          {LANDING_PLANS.map((plan) => <article key={plan.key} className={`relative flex flex-col rounded-lg border border-border bg-card p-6 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:bg-surface-hover ${plan.featured ? 'shadow-card lg:-translate-y-2' : ''}`}>
            {plan.badgeKey && <div className="absolute -top-4 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-warning px-4 py-1.5 text-xs font-bold text-on-warning">{t(plan.badgeKey)}</div>}
            <h3 className="mb-2 text-lg font-bold text-primary">{t(plan.nameKey)}</h3>
            <div className="mb-4"><div className="mb-1 text-3xl font-black text-primary">{formatPublicLandingCurrency(plan.priceMinor, LANDING_CURRENCY_CODE, locale)}</div><span className="block text-sm text-secondary line-through">{formatPublicLandingCurrency(plan.oldPriceMinor, LANDING_CURRENCY_CODE, locale)}</span><span className="text-sm text-secondary">{t(plan.durationKey)}</span>{plan.includeEmiNote && <span className="mt-1 block text-xs font-semibold text-success">{t('plans.emi')}</span>}</div>
            <div className="mb-6 flex-1 space-y-3">{plan.featureKeys.map((featureKey) => <div key={featureKey} className="flex items-start gap-2.5 text-xs text-secondary"><CheckCircle size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-warning" aria-hidden="true" />{t(featureKey)}</div>)}</div>
            <Link href={PublicLandingUrlConfig.ANCHORS.BOOKING} data-testid={`public_landing-plan-${plan.key}-book`} className="block min-h-11 rounded-xl bg-primary py-3 text-center text-sm font-bold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('plans.buyMembership')}</Link>
          </article>)}
        </div>
      </div>
    </section>
  );
}
