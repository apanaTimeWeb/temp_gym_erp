// RESPONSIBILITY: Renders aggregate testimonial rating and individual review cards from static PublicLanding content.
import { getTranslations } from 'next-intl/server';
import { Star } from 'lucide-react';
import { LANDING_MAX_RATING, LANDING_TESTIMONIALS } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingTestimonialConstants';

const PUBLIC_LANDING_RATING_STAR_KEYS = ['rating-star-one', 'rating-star-two', 'rating-star-three', 'rating-star-four', 'rating-star-five'] as const;

export default async function PublicLandingTestimonials() {
  const t = await getTranslations('LANDING');
  return (
    <section id="testimonials" className="bg-page px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center"><h2 className="text-4xl font-black text-primary sm:text-5xl">{t('testimonials.title')} <span className="text-primary">{t('testimonials.titleHighlight')}</span></h2></div>
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-primary-subtle p-8 text-center shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1">
            <div className="mb-2 text-6xl font-black text-primary">4.9</div>
            <div role="img" className="mb-3 flex justify-center gap-1 text-warning" aria-label={t('testimonials.ratingLabel', { value: LANDING_MAX_RATING, max: LANDING_MAX_RATING })} data-testid="public_landing-testimonials-summary-rating">
              {PUBLIC_LANDING_RATING_STAR_KEYS.slice(0, LANDING_MAX_RATING).map((starKey) => <Star key={starKey} size={18} strokeWidth={2} fill="currentColor" aria-hidden="true" />)}
            </div>
            <p className="text-secondary">{t('testimonials.reviewSummary')}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {LANDING_TESTIMONIALS.map((testimonial) => (
              <article key={testimonial.nameKey} className="flex flex-col justify-between rounded-lg border border-border bg-card p-8 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:bg-surface-hover">
                <div>
                  <div role="img" className="mb-4 flex gap-1 text-warning" aria-label={t('testimonials.ratingLabel', { value: testimonial.rating, max: LANDING_MAX_RATING })}>
                    {PUBLIC_LANDING_RATING_STAR_KEYS.slice(0, testimonial.rating).map((starKey) => <Star key={starKey} size={18} strokeWidth={2} fill="currentColor" aria-hidden="true" />)}
                  </div>
                  <p className="mb-6 leading-relaxed text-secondary italic">&quot;{t(testimonial.textKey)}&quot;</p>
                </div>
                <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-subtle text-sm font-bold text-primary">{testimonial.initials}</div><div><p className="text-sm font-bold text-primary">{t(testimonial.nameKey)}</p><p className="text-xs text-secondary">{t(testimonial.memberKey)}</p></div></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
