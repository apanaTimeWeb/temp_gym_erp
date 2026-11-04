// RESPONSIBILITY: Validates a newsletter mailto request using RHF/Zod; no subscription backend is assumed.
// FLOW: Footer form -> Zod validation -> user mail client request (not a confirmed subscription).
'use client';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { PublicLandingNewsletterSchema } from '@/app/frontend_public/public_landing/landing_experience/schemas/PublicLandingNewsletterSchema';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_experience/config/public_landing_experience.url_config';
import type { z } from 'zod';

type NewsletterValues = z.infer<typeof PublicLandingNewsletterSchema>;
/** Constructs an email handoff; a submitted email must never imply backend subscription success. */
export function usePublicLandingNewsletter() {
  const t = useTranslations('LANDING');
  const form = useForm<NewsletterValues>({ resolver: zodResolver(PublicLandingNewsletterSchema), defaultValues: { email: '' }, mode: 'onBlur' });
  const email = form.watch('email');
  const destination = PublicLandingUrlConfig.EXTERNAL.EMAIL;
  const mailtoHref = useMemo(
    () => destination ? `${destination}?subject=${encodeURIComponent(t('footer.newsletter.subject'))}&body=${encodeURIComponent(t('footer.newsletter.mailtoBody', { email }))}` : null,
    [destination, email, t],
  );
  const handleSubmit = form.handleSubmit((values) => {
    if (!destination) {
      form.setError('email', { type: 'manual', message: 'footer.newsletter.destinationUnavailable' });
      return;
    }
    const href = `${destination}?subject=${encodeURIComponent(t('footer.newsletter.subject'))}&body=${encodeURIComponent(t('footer.newsletter.mailtoBody', { email: values.email }))}`;
    window.location.assign(href);
  });
  return { form, email, errorMessage: form.formState.errors.email?.message ?? '', handleSubmit, mailtoHref };
}
