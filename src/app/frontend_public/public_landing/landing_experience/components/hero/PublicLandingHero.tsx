// RESPONSIBILITY: Renders the public PublicLanding hero, CTA navigation, and static social-proof metrics.
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_experience/config/public_landing_experience.url_config';
import { LANDING_HERO_STATS } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingHeroConstants';

export default async function PublicLandingHero() {
  const t = await getTranslations('LANDING');
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page">
      <div className="absolute inset-0"><Image src={PublicLandingUrlConfig.ASSETS.HERO} alt="" fill priority sizes="100vw" className="object-cover" /></div>
      <div className="landing-hero-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="landing-hero-bottom-fade pointer-events-none absolute bottom-0 start-0 end-0 h-32" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface-highlight px-4 py-2 text-sm font-medium text-warning backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-success motion-safe:animate-pulse" aria-hidden="true" />{t('brand.welcome')}</div>
        <h1 className="mb-6 text-5xl font-black leading-tight text-primary sm:text-6xl md:text-7xl">{t('hero.transformBody')}<br /><span className="text-primary">{t('hero.buildConfidence')}</span></h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-secondary sm:text-xl">{t('hero.description')}</p>
        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={PublicLandingUrlConfig.ANCHORS.PLANS} data-testid="public_landing-hero-start-journey" className="landing-hero-primary-cta flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:w-auto">{t('hero.startJourney')} <ArrowRight size={18} strokeWidth={2} aria-hidden="true" /></Link>
          <Link href={PublicLandingUrlConfig.ANCHORS.BOOKING} data-testid="public_landing-hero-book-trial" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border px-8 py-4 text-lg font-bold text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:w-auto"><Play size={18} strokeWidth={2} className="text-primary" fill="currentColor" aria-hidden="true" />{t('hero.bookTrial')}</Link>
          <Link href={PublicLandingUrlConfig.ANCHORS.CONTACT} data-testid="public_landing-hero-contact" className="flex min-h-11 w-full items-center justify-center rounded-xl border border-border px-8 py-4 text-lg font-bold text-secondary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:w-auto">{t('hero.contactUs')}</Link>
        </div>
        <div className="mx-auto mb-8 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">{LANDING_HERO_STATS.map((stat) => <div key={stat.labelKey} className="text-center"><div className="text-2xl font-black text-primary">{t(stat.valueKey)}</div><div className="mt-1 text-xs text-secondary">{t(stat.labelKey)}</div></div>)}</div>
      </div>
      <Link href={PublicLandingUrlConfig.ANCHORS.ABOUT} aria-label={t('navigation.scrollToAbout')} data-testid="public_landing-hero-scroll-about" className="absolute bottom-8 start-1/2 z-10 flex min-h-11 min-w-11 -translate-x-1/2 items-center justify-center rounded-full text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:animate-bounce motion-safe:transition-all motion-safe:duration-base"><ChevronDown size={18} strokeWidth={2} aria-hidden="true" /></Link>
    </section>
  );
}
