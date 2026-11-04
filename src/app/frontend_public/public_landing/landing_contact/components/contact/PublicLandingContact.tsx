'use client';
// RESPONSIBILITY: Renders public contact details, RHF/Zod form states, backend-driven feedback, retry, and reset actions.
import { CheckCircle, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PublicLandingUnsavedChangesDialog from '@/app/frontend_public/public_landing/landing_contact/components/confirm_dialog/PublicLandingContactUnsavedChangesDialog';
import { usePublicLandingContactForm } from '@/app/frontend_public/public_landing/landing_contact/hooks/usePublicLandingContactForm';
import { LANDING_CONTACT_DETAILS } from '@/app/frontend_public/public_landing/landing_contact/constants/PublicLandingContactConstants';
import { usePublicLandingOnlineStatus } from '@/app/frontend_public/public_landing/landing_contact/hooks/usePublicLandingContactOnlineStatus';
import PublicLandingOfflineNotice from '@/app/frontend_public/public_landing/landing_contact/components/offline_notice/PublicLandingContactOfflineNotice';

/**
 * Presents public contact information and the module-owned contact request workflow.
 * @dependencies contact hook, contact-detail constants, connection-status hook, and next-intl.
 * @edge-cases Failed requests retain entered values; retry uses the same intent; offline state blocks submission without clearing the form.
 */
/**
 * PublicLandingContact owns the presentation for its documented PublicLanding section and consumes only module-owned configuration or approved infrastructure.
 * @dependencies PublicLanding translations/configuration and approved global UI primitives where imported.
 * @edge-case The section must remain usable with localized text, narrow viewports, and reduced-motion preferences.
 */
export default function PublicLandingContact() {
  const t = useTranslations('LANDING');
  const { form, navigationGuard, submit, retry, canRetry, startNewMessage, isSubmitting, isSuccess, errorMessage, successMessage } = usePublicLandingContactForm();
  const isOnline = usePublicLandingOnlineStatus();
  const watchedName = form.watch('name');
  const watchedEmail = form.watch('email');
  const watchedMessage = form.watch('message');

  return (
    <>
    <PublicLandingUnsavedChangesDialog open={navigationGuard.isConfirmOpen} onStay={navigationGuard.stay} onLeave={navigationGuard.leave} />
    <section id="contact" className="bg-page px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-5 inline-block rounded-full border border-border bg-warning-bg px-4 py-2 text-xs font-bold uppercase tracking-widest text-warning">{t('contact.eyebrow')}</div>
          <h2 className="mb-4 text-4xl font-black text-primary sm:text-5xl">{t('contact.title')} <span className="text-primary">{t('contact.titleHighlight')}</span></h2>
        </div>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-2xl font-bold text-primary">{t('contact.introTitle')}</h3>
            <p className="mb-8 text-secondary">{t('contact.description')}</p>
            <div className="mb-8 space-y-6">
              {LANDING_CONTACT_DETAILS.map(({ icon: Icon, titleKey, text, href }) => (
                <div key={titleKey} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warning-bg"><Icon className="text-warning" size={18} strokeWidth={2} aria-hidden="true" /></div>
                  <div>
                    <h4 className="text-lg font-bold text-primary">{t(titleKey)}</h4>
                    {href ? <a href={href} data-testid={`public_landing-contact-${titleKey.split('.').pop() ?? 'detail'}-link`} className="rounded text-secondary motion-safe:transition-all motion-safe:duration-base hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{text}</a> : <p className="text-secondary">{text ?? t('contact.details.unavailable')}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-card md:p-10">
            {!isOnline && !isSuccess ? <PublicLandingOfflineNotice /> : null}
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-10 text-center motion-safe:transition-all motion-safe:duration-slow" data-testid="public_landing-contact-success-state">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-bg"><CheckCircle className="text-success" size={32} strokeWidth={2} aria-hidden="true" /></div>
                <h3 className="mb-2 text-xl font-bold text-primary">{t('contact.confirmed')}</h3>
                <p className="text-secondary">{successMessage}</p>
                <button type="button" onClick={startNewMessage} data-testid="public_landing-contact-start-new" className="mt-6 min-h-11 rounded-xl border border-border px-6 py-3 text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('contact.sendAnother')}</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5" noValidate data-testid="public_landing-contact-form">
                <div>
                  <label htmlFor="landing-contact-name" className="mb-2 block text-sm font-semibold text-secondary">{t('contact.name')} <span className="text-danger" aria-hidden="true">{t('shared.required')}</span></label>
                  <div className="relative">
                    <input id="landing-contact-name" type="text" autoComplete="name" required disabled={isSubmitting} {...form.register('name')} data-testid="public_landing-contact-name-input" className="w-full rounded-md border border-border bg-input px-4 py-3 pe-12 text-primary placeholder:text-secondary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.name)} aria-describedby={form.formState.errors.name ? 'landing-contact-name-error' : undefined} />
                    {watchedName && !form.formState.errors.name ? <CheckCircle size={18} strokeWidth={2} className="absolute end-3 top-1/2 -translate-y-1/2 text-success" aria-hidden="true" /> : null}
                  </div>
                  {form.formState.errors.name ? <p id="landing-contact-name-error" role="alert" data-testid="public_landing-contact-name-error" className="mt-2 text-xs text-danger">{form.formState.errors.name.type === 'server' ? form.formState.errors.name.message : t(form.formState.errors.name.message ?? '')}</p> : null}
                </div>
                <div>
                  <label htmlFor="landing-contact-email" className="mb-2 block text-sm font-semibold text-secondary">{t('contact.email')} <span className="text-danger" aria-hidden="true">{t('shared.required')}</span></label>
                  <div className="relative">
                    <input id="landing-contact-email" type="email" autoComplete="email" required disabled={isSubmitting} {...form.register('email')} data-testid="public_landing-contact-email-input" className="w-full rounded-md border border-border bg-input px-4 py-3 pe-12 text-primary placeholder:text-secondary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.email)} aria-describedby={form.formState.errors.email ? 'landing-contact-email-error' : undefined} />
                    {watchedEmail && !form.formState.errors.email ? <CheckCircle size={18} strokeWidth={2} className="absolute end-3 top-1/2 -translate-y-1/2 text-success" aria-hidden="true" /> : null}
                  </div>
                  {form.formState.errors.email ? <p id="landing-contact-email-error" role="alert" data-testid="public_landing-contact-email-error" className="mt-2 text-xs text-danger">{form.formState.errors.email.type === 'server' ? form.formState.errors.email.message : t(form.formState.errors.email.message ?? '')}</p> : null}
                </div>
                <div>
                  <label htmlFor="landing-contact-message" className="mb-2 block text-sm font-semibold text-secondary">{t('contact.message')} <span className="text-danger" aria-hidden="true">{t('shared.required')}</span></label>
                  <div className="relative">
                    <textarea id="landing-contact-message" rows={4} required disabled={isSubmitting} {...form.register('message')} data-testid="public_landing-contact-message-input" className="w-full resize-none rounded-md border border-border bg-input px-4 py-3 text-primary placeholder:text-secondary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.message)} aria-describedby={form.formState.errors.message ? 'landing-contact-message-error' : undefined} />
                    {watchedMessage && !form.formState.errors.message ? <CheckCircle size={18} strokeWidth={2} className="absolute end-3 top-3 text-success" aria-hidden="true" /> : null}
                  </div>
                  {form.formState.errors.message ? <p id="landing-contact-message-error" role="alert" data-testid="public_landing-contact-message-error" className="mt-2 text-xs text-danger">{form.formState.errors.message.type === 'server' ? form.formState.errors.message.message : t(form.formState.errors.message.message ?? '')}</p> : null}
                </div>

                {errorMessage ? <div role="alert" data-testid="public_landing-contact-api-error" className="rounded-xl border border-border bg-danger-bg px-4 py-3 text-sm text-danger"><p className="font-semibold">{t('contact.errorTitle')}</p><p className="mt-1">{errorMessage}</p><button type="button" onClick={retry} disabled={isSubmitting || !isOnline || !canRetry} data-testid="public_landing-contact-retry" className="mt-3 min-h-11 rounded-lg border border-border px-4 py-2 text-danger motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('contact.retry')}</button></div> : null}
                <button type="submit" disabled={isSubmitting || !isOnline} aria-disabled={isSubmitting || !isOnline} data-testid="public_landing-contact-submit" className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary py-3.5 font-bold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary-subtle disabled:text-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"><span className="inline-flex min-w-40 items-center justify-center gap-2">{isSubmitting ? <><LoaderCircle size={18} strokeWidth={2} className="motion-safe:animate-spin motion-reduce:hidden" aria-hidden="true" />{t('contact.sending')}</> : t('contact.submit')}</span></button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
