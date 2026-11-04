'use client';
// RESPONSIBILITY: Renders the interactive BMI calculator view while state/calculation logic remains in usePublicLandingBmi.
import { CheckCircle, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePublicLandingBmi } from '@/app/frontend_public/public_landing/landing_experience/hooks/usePublicLandingBmi';

/**
 * Presents the PublicLanding BMI calculator with accessible validation and semantic result states.
 * @dependencies usePublicLandingBmi, next-intl, and global semantic theme tokens.
 * @edge-cases Error messaging only appears after invalid calculation; valid results show the semantic category and description.
 */
/**
 * PublicLandingBmiCalc owns the presentation for its documented PublicLanding section and consumes only module-owned configuration or approved infrastructure.
 * @dependencies PublicLanding translations/configuration and approved global UI primitives where imported.
 * @edge-case The section must remain usable with localized text, narrow viewports, and reduced-motion preferences.
 */
export default function PublicLandingBmiCalc() {
  const t = useTranslations('LANDING');
  const { weight, handleWeightChange, height, handleHeightChange, bmiResult, inputErrorKey, handleCalculate } = usePublicLandingBmi();
  const hasInputError = Boolean(inputErrorKey);
  const validationDescriptionId = hasInputError ? 'landing-bmi-error' : undefined;

  return (
    <section id="bmi" className="bg-page px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 rounded-xl border border-border bg-card p-8 shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 md:grid-cols-2 md:p-12">
          <div>
            <div className="mb-5 inline-block rounded-full border border-border bg-warning-bg px-4 py-2 text-xs font-bold uppercase tracking-widest text-warning">{t('bmi.eyebrow')}</div>
            <h2 className="mb-4 text-3xl font-black text-primary sm:text-4xl">{t('bmi.title')} <span className="text-primary">{t('bmi.titleHighlight')}</span></h2>
            <p className="mb-8 leading-relaxed text-secondary">{t('bmi.description')}</p>
            <form onSubmit={handleCalculate} className="space-y-4" noValidate data-testid="public_landing-bmi-form">
              <div>
                <label htmlFor="landing-bmi-height" className="mb-2 block text-sm font-semibold text-secondary">{t('bmi.heightLabel')} <span className="text-danger" aria-hidden="true">{t('shared.required')}</span></label>
                <div className="relative">
                  <input id="landing-bmi-height" type="number" value={height} onChange={handleHeightChange} placeholder={t('bmi.heightPlaceholder')} min="0.1" step="0.1" inputMode="decimal" required aria-invalid={hasInputError} aria-describedby={validationDescriptionId ? `landing-bmi-height-help ${validationDescriptionId}` : 'landing-bmi-height-help'} data-testid="public_landing-bmi-height-input" className="w-full rounded-md border border-border bg-input px-4 py-3 pe-12 text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" />
                  {height && !hasInputError ? <CheckCircle size={18} strokeWidth={2} className="absolute end-3 top-1/2 -translate-y-1/2 text-success" aria-hidden="true" /> : null}
                </div>
                <p id="landing-bmi-height-help" className="mt-2 text-xs text-secondary">{t('bmi.heightHelp')}</p>
              </div>
              <div>
                <label htmlFor="landing-bmi-weight" className="mb-2 block text-sm font-semibold text-secondary">{t('bmi.weightLabel')} <span className="text-danger" aria-hidden="true">{t('shared.required')}</span></label>
                <div className="relative">
                  <input id="landing-bmi-weight" type="number" value={weight} onChange={handleWeightChange} placeholder={t('bmi.weightPlaceholder')} min="0.1" step="0.1" inputMode="decimal" required aria-invalid={hasInputError} aria-describedby={validationDescriptionId ? `landing-bmi-weight-help ${validationDescriptionId}` : 'landing-bmi-weight-help'} data-testid="public_landing-bmi-weight-input" className="w-full rounded-md border border-border bg-input px-4 py-3 pe-12 text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" />
                  {weight && !hasInputError ? <CheckCircle size={18} strokeWidth={2} className="absolute end-3 top-1/2 -translate-y-1/2 text-success" aria-hidden="true" /> : null}
                </div>
                <p id="landing-bmi-weight-help" className="mt-2 text-xs text-secondary">{t('bmi.weightHelp')}</p>
              </div>
              {hasInputError ? <p id="landing-bmi-error" role="alert" aria-live="polite" data-testid="public_landing-bmi-validation-error" className="text-xs text-danger">{t(inputErrorKey ?? 'bmi.positiveValues')}</p> : null}
              <button type="submit" data-testid="public_landing-bmi-calculate-submit" className="mt-4 flex min-h-11 w-full items-center justify-center rounded-xl bg-primary py-3 font-bold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                {t('bmi.calculate')}
              </button>
            </form>
          </div>
          <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-border bg-input p-8 text-center">
            {bmiResult ? (
              <div className="motion-safe:transition-all motion-safe:duration-slow">
                <h3 className="mb-2 text-lg font-bold text-secondary">{t('bmi.resultTitle')}</h3>
                <div className={`mb-4 text-6xl font-black ${bmiResult.colorClass}`} aria-live="polite" data-testid="public_landing-bmi-result-value">{bmiResult.value}</div>
                <div className="mb-6 inline-block rounded-full border border-border bg-primary-subtle px-4 py-1.5 font-semibold text-primary" data-testid="public_landing-bmi-result-status">{t(`bmi.statuses.${bmiResult.status}`)}</div>
                <p className="text-sm text-secondary">{t(`bmi.statusDescriptions.${bmiResult.status}`)}</p>
              </div>
            ) : (
              <div className="text-secondary" data-testid="public_landing-bmi-empty-state">
                <Heart size={40} strokeWidth={2} className="mx-auto mb-4 text-secondary" aria-hidden="true" />
                <p>{t('bmi.empty')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
