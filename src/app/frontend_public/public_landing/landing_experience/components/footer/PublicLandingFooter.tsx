'use client';
// RESPONSIBILITY: Renders PublicLanding footer navigation, official social destinations, and newsletter mail-client handoff.
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_experience/config/public_landing_experience.url_config';
import { LANDING_FOOTER_PROGRAM_LINKS, LANDING_FOOTER_QUICK_LINKS, LANDING_SOCIAL_LINKS } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingNavigationConstants';
import { usePublicLandingNewsletter } from '@/app/frontend_public/public_landing/landing_experience/hooks/usePublicLandingNewsletter';

/**
 * Renders footer navigation, official social destinations, and newsletter mail-client handoff.
 * @dependencies PublicLanding URL/navigation constants, usePublicLandingNewsletter, next-intl.
 * @edge-case Newsletter failure remains local to the input and does not fabricate backend subscription success.
 */
/**
 * PublicLandingFooter owns the presentation for its documented PublicLanding section and consumes only module-owned configuration or approved infrastructure.
 * @dependencies PublicLanding translations/configuration and approved global UI primitives where imported.
 * @edge-case The section must remain usable with localized text, narrow viewports, and reduced-motion preferences.
 */
export default function PublicLandingFooter() {
  const t = useTranslations('LANDING');
  const newsletter = usePublicLandingNewsletter();
  return (
    <footer className="landing-print-footer border-t border-border bg-page px-4 pb-10 pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-2"><span className="text-2xl font-black tracking-tight text-primary">{t('brand.name')}</span></div>
            <p className="mb-6 text-sm leading-relaxed text-secondary">{t('brand.footerDescription')}</p>
            <nav className="flex flex-wrap gap-3" aria-label={t('footer.socialLinks')}>
              {LANDING_SOCIAL_LINKS.map(({ labelKey, href, icon: Icon, className }) => {
                const label = t(labelKey);
                const style = `flex min-h-11 min-w-11 items-center justify-center rounded-full bg-surface-highlight ${className}`;
                return href ? (
                  <a key={labelKey} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} data-testid={`public_landing-footer-social-${labelKey.split('.').pop() ?? 'item'}`} className={`${style} motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}><Icon size={18} strokeWidth={2} aria-hidden="true" /></a>
                ) : (
                  <span key={labelKey} role="img" aria-label={`${label}: ${t('footer.socialUnavailable')}`} title={t('footer.socialUnavailable')} data-testid={`public_landing-footer-social-${labelKey.split('.').pop() ?? 'item'}-unconfigured`} className={`${style} cursor-not-allowed text-disabled`}><Icon size={18} strokeWidth={2} aria-hidden="true" /></span>
                );
              })}
            </nav>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-primary">{t('footer.quickLinksTitle')}</h4>
            <ul className="space-y-3">{LANDING_FOOTER_QUICK_LINKS.map(({ labelKey, href }) => <li key={labelKey}><Link href={href} data-testid={`public_landing-footer-link-${labelKey.split('.').pop() ?? 'item'}`} className="inline-flex min-h-11 items-center rounded text-sm font-medium text-secondary motion-safe:transition-all motion-safe:duration-base hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t(labelKey)}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-primary">{t('footer.programsTitle')}</h4>
            <ul className="space-y-3">{LANDING_FOOTER_PROGRAM_LINKS.map(({ labelKey, href }) => <li key={labelKey}><Link href={href} data-testid={`public_landing-footer-program-${labelKey.split('.').pop() ?? 'item'}`} className="inline-flex min-h-11 items-center rounded text-sm text-secondary motion-safe:transition-all motion-safe:duration-base hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t(labelKey)}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-primary">{t('footer.newsletterTitle')}</h4>
            <p className="mb-4 text-sm text-secondary">{t('footer.newsletterDescription')}</p>
            <form noValidate onSubmit={newsletter.handleSubmit} className="flex rounded-lg border border-border bg-input p-1" data-testid="public_landing-footer-newsletter-form">
              <label htmlFor="landing-newsletter-email" className="sr-only">{t('footer.newsletterPlaceholder')}</label>
              <input id="landing-newsletter-email" type="email" {...newsletter.form.register('email')} placeholder={t('footer.newsletterPlaceholder')} data-testid="public_landing-footer-newsletter-email" className="w-full rounded bg-input px-3 text-sm text-primary placeholder:text-secondary motion-safe:transition-all motion-safe:duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50" aria-invalid={Boolean(newsletter.errorMessage)} aria-describedby={newsletter.errorMessage ? 'landing-newsletter-error' : undefined} required />
              <button type="submit" data-testid="public_landing-footer-newsletter-submit" className="min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('footer.newsletterRequest')}</button>
            </form>
            {newsletter.errorMessage && <p id="landing-newsletter-error" role="alert" data-testid="public_landing-footer-newsletter-error" className="mt-2 text-xs text-danger">{t(newsletter.errorMessage)}</p>}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-secondary md:flex-row">
          <p>{t('brand.copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href={PublicLandingUrlConfig.ANCHORS.CONTACT} data-testid="public_landing-footer-contact-link" className="inline-flex min-h-11 items-center rounded motion-safe:transition-all motion-safe:duration-base hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('footer.contactUs')}</Link>
            <Link href={PublicLandingUrlConfig.PAGES.ERP_LOGIN} data-testid="public_landing-footer-erp-link" className="flex min-h-11 items-center gap-1 rounded motion-safe:transition-all motion-safe:duration-base hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"><span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />{t('footer.erpPortal')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
