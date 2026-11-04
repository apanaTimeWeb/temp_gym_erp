'use client';
// RESPONSIBILITY: Renders the Booking form, validation states, backend feedback, retry, loading state, and successful reset action.
import { ArrowRight, CheckCircle, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PublicLandingUnsavedChangesDialog from '@/app/frontend_public/public_landing/landing_booking/components/confirm_dialog/PublicLandingBookingUnsavedChangesDialog';
import { usePublicLandingBookingForm } from '@/app/frontend_public/public_landing/landing_booking/hooks/usePublicLandingBookingForm';
import { LANDING_BOOKING_OPTIONS, LANDING_PHONE_COUNTRY_CODE } from '@/app/frontend_public/public_landing/landing_booking/constants/PublicLandingBookingFormConstants';
import { usePublicLandingOnlineStatus } from '@/app/frontend_public/public_landing/landing_booking/hooks/usePublicLandingBookingOnlineStatus';
import PublicLandingOfflineNotice from '@/app/frontend_public/public_landing/landing_booking/components/offline_notice/PublicLandingBookingOfflineNotice';
import { getPublicLandingTodayDateInputValue } from '@/app/frontend_public/public_landing/landing_booking/utils/PublicLandingBookingDateUtils';

const BOOKING_TYPE_HELP_ID = 'landing-booking-type-help';

/**
 * Presents the public booking workflow as a pure view over the RHF/TanStack Query hook.
 * @dependencies booking hook, booking static configuration, connection-status hook, and next-intl.
 * @edge-cases Failed requests preserve all fields; retry is same intent; offline state blocks new submission without erasing input.
 */
/**
 * PublicLandingBooking owns the presentation for its documented PublicLanding section and consumes only module-owned configuration or approved infrastructure.
 * @dependencies PublicLanding translations/configuration and approved global UI primitives where imported.
 * @edge-case The section must remain usable with localized text, narrow viewports, and reduced-motion preferences.
 */
export default function PublicLandingBooking() {
  const t = useTranslations('LANDING');
  const { form, navigationGuard, submit, retry, canRetry, startNewBooking, isSubmitting, isSuccess, errorMessage, successMessage } = usePublicLandingBookingForm();
  const isOnline = usePublicLandingOnlineStatus();
  const today = getPublicLandingTodayDateInputValue();
  const watchedName = form.watch('name');
  const watchedEmail = form.watch('email');
  const watchedPhone = form.watch('phone');
  const watchedDate = form.watch('date');

  return (
    <>
    <PublicLandingUnsavedChangesDialog open={navigationGuard.isConfirmOpen} onStay={navigationGuard.stay} onLeave={navigationGuard.leave} />
    <section id="booking" className="bg-page px-4 py-24">
      <div className="relative mx-auto max-w-xl">
        <div className="mb-16 text-center">
          <div className="mb-5 inline-block rounded-full border border-border bg-warning-bg px-4 py-2 text-xs font-bold uppercase tracking-widest text-warning">{t('booking.eyebrow')}</div>
          <h2 className="mb-4 text-4xl font-black text-primary sm:text-5xl">{t('booking.title')} <span className="text-primary">{t('booking.titleHighlight')}</span></h2>
          <p className="mx-auto max-w-xl text-secondary">{t('booking.description')}</p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-card md:p-12">
          {!isOnline && !isSuccess ? <PublicLandingOfflineNotice /> : null}
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center motion-safe:transition-all motion-safe:duration-slow" data-testid="public_landing-booking-success-state">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-bg"><CheckCircle className="text-success" size={40} strokeWidth={2} aria-hidden="true" /></div>
              <h3 className="mb-2 text-3xl font-bold text-primary">{t('booking.confirmed')}</h3>
              <p className="max-w-xl text-secondary">{successMessage}</p>
              <button type="button" onClick={startNewBooking} data-testid="public_landing-booking-start-new" className="mt-6 min-h-11 rounded-xl border border-border px-6 py-3 font-semibold text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('booking.bookAnother')}</button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={submit} noValidate data-testid="public_landing-booking-form">
              <fieldset disabled={isSubmitting} aria-describedby={BOOKING_TYPE_HELP_ID}>
                <legend className="sr-only">{t('booking.typeLegend')}</legend>
                <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {LANDING_BOOKING_OPTIONS.map(({ value, icon: Icon, labelKey }) => (
                    <label key={value} className="cursor-pointer">
                      <input type="radio" value={value} {...form.register('type')} className="peer sr-only" data-testid={`public_landing-booking-type-${value}`} />
                      <span className="flex min-h-11 flex-col items-center justify-center rounded-xl border border-border bg-card p-4 text-center motion-safe:transition-all motion-safe:duration-base peer-checked:border-focus peer-checked:bg-warning-bg peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-page">
                        <Icon className="mx-auto mb-2 text-warning" size={18} strokeWidth={2} aria-hidden="true" />
                        <span className="font-semibold text-primary">{t(labelKey)}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <p id={BOOKING_TYPE_HELP_ID} className="text-xs text-secondary">{t('booking.typeHelp')}</p>
              </fieldset>

              <div>
                <label htmlFor="landing-booking-name" className="mb-2 block text-sm font-semibold text-secondary">{t('booking.name')} <span className="text-danger" aria-hidden="true">{t('shared.required')}</span></label>
                <div className="relative">
                  <input id="landing-booking-name" type="text" autoComplete="name" required disabled={isSubmitting} {...form.register('name')} data-testid="public_landing-booking-name-input" className="w-full rounded-md border border-border bg-input px-4 py-3 pe-12 text-primary placeholder:text-secondary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.name)} aria-describedby={form.formState.errors.name ? 'landing-booking-name-error' : undefined} />
                  {watchedName && !form.formState.errors.name ? <CheckCircle size={18} strokeWidth={2} className="absolute end-3 top-1/2 -translate-y-1/2 text-success" aria-hidden="true" /> : null}
                </div>
                {form.formState.errors.name && <p id="landing-booking-name-error" role="alert" data-testid="public_landing-booking-name-error" className="mt-2 text-xs text-danger">{form.formState.errors.name.type === 'server' ? form.formState.errors.name.message : t(form.formState.errors.name.message ?? '')}</p>}
              </div>
              <div>
                <label htmlFor="landing-booking-email" className="mb-2 block text-sm font-semibold text-secondary">{t('booking.email')} <span className="text-danger" aria-hidden="true">{t('shared.required')}</span></label>
                <div className="relative">
                  <input id="landing-booking-email" type="email" autoComplete="email" required disabled={isSubmitting} {...form.register('email')} data-testid="public_landing-booking-email-input" className="w-full rounded-md border border-border bg-input px-4 py-3 pe-12 text-primary placeholder:text-secondary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.email)} aria-describedby={form.formState.errors.email ? 'landing-booking-email-error' : undefined} />
                  {watchedEmail && !form.formState.errors.email ? <CheckCircle size={18} strokeWidth={2} className="absolute end-3 top-1/2 -translate-y-1/2 text-success" aria-hidden="true" /> : null}
                </div>
                {form.formState.errors.email && <p id="landing-booking-email-error" role="alert" data-testid="public_landing-booking-email-error" className="mt-2 text-xs text-danger">{form.formState.errors.email.type === 'server' ? form.formState.errors.email.message : t(form.formState.errors.email.message ?? '')}</p>}
              </div>
              <div>
                <label htmlFor="landing-booking-phone" className="mb-2 block text-sm font-semibold text-secondary">{t('booking.phone')} <span className="text-danger" aria-hidden="true">{t('shared.required')}</span></label>
                <div className="relative flex overflow-hidden rounded-md border border-border bg-input focus-within:border-focus focus-within:ring-2 focus-within:ring-primary">
                  <span className="flex items-center justify-center border-e border-border bg-surface-highlight px-4 text-sm font-medium text-secondary">{LANDING_PHONE_COUNTRY_CODE}</span>
                  <input id="landing-booking-phone" type="tel" inputMode="numeric" required autoComplete="tel" maxLength={10} disabled={isSubmitting} {...form.register('phone')} placeholder={t('booking.phonePlaceholder')} data-testid="public_landing-booking-phone-input" className="w-full bg-transparent px-4 py-3 pe-12 text-primary placeholder:text-secondary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none" aria-invalid={Boolean(form.formState.errors.phone)} aria-describedby={form.formState.errors.phone ? 'landing-booking-phone-error' : undefined} />
                  {watchedPhone && !form.formState.errors.phone ? <CheckCircle size={18} strokeWidth={2} className="absolute end-3 top-1/2 -translate-y-1/2 text-success" aria-hidden="true" /> : null}
                </div>
                {form.formState.errors.phone && <p id="landing-booking-phone-error" role="alert" data-testid="public_landing-booking-phone-error" className="mt-2 text-xs text-danger">{form.formState.errors.phone.type === 'server' ? form.formState.errors.phone.message : t(form.formState.errors.phone.message ?? '')}</p>}
              </div>
              <div>
                <label htmlFor="landing-booking-date" className="mb-2 block text-sm font-semibold text-secondary">{t('booking.date')} <span className="text-danger" aria-hidden="true">{t('shared.required')}</span></label>
                <div className="relative">
                  <input id="landing-booking-date" type="date" min={today} required disabled={isSubmitting} {...form.register('date')} data-testid="public_landing-booking-date-input" className="w-full rounded-md border border-border bg-input px-4 py-3 pe-12 text-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.date)} aria-describedby={form.formState.errors.date ? 'landing-booking-date-error' : undefined} />
                  {watchedDate && !form.formState.errors.date ? <CheckCircle size={18} strokeWidth={2} className="absolute end-3 top-1/2 -translate-y-1/2 text-success" aria-hidden="true" /> : null}
                </div>
                {form.formState.errors.date && <p id="landing-booking-date-error" role="alert" data-testid="public_landing-booking-date-error" className="mt-2 text-xs text-danger">{form.formState.errors.date.type === 'server' ? form.formState.errors.date.message : t(form.formState.errors.date.message ?? '')}</p>}
              </div>

              {errorMessage ? <div role="alert" data-testid="public_landing-booking-api-error" className="rounded-md border border-border bg-danger-bg px-4 py-3 text-sm text-danger"><p className="font-semibold">{t('booking.errorTitle')}</p><p className="mt-1">{errorMessage}</p><button type="button" onClick={retry} disabled={isSubmitting || !isOnline || !canRetry} data-testid="public_landing-booking-retry" className="mt-3 min-h-11 rounded-lg border border-border px-4 py-2 text-danger motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('booking.retry')}</button></div> : null}
              <button type="submit" disabled={isSubmitting || !isOnline} aria-disabled={isSubmitting || !isOnline} data-testid="public_landing-booking-submit" className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-primary py-4 text-lg font-bold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary-subtle disabled:text-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                <span className="inline-flex min-w-44 items-center justify-center gap-2">{isSubmitting ? <><LoaderCircle size={18} strokeWidth={2} className="motion-safe:animate-spin motion-reduce:hidden" aria-hidden="true" /><span>{t('booking.processing')}</span></> : <><span>{t('booking.submit')}</span><ArrowRight size={18} strokeWidth={2} aria-hidden="true" /></>}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
    </>
  );
}
