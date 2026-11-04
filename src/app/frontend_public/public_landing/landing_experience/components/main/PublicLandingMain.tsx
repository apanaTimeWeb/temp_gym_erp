import type { ReactNode } from 'react';
// RESPONSIBILITY: Composes the PublicLanding page sections in scroll order and owns the module query-provider boundary.
import PublicLandingQueryProvider from '@/app/frontend_public/public_landing/landing_experience/components/query_provider/PublicLandingQueryProvider';
import PublicLandingNavbar from '@/app/frontend_public/public_landing/landing_experience/components/navbar/PublicLandingNavbar';
import PublicLandingHero from '@/app/frontend_public/public_landing/landing_experience/components/hero/PublicLandingHero';
import PublicLandingAbout from '@/app/frontend_public/public_landing/landing_experience/components/about/PublicLandingAbout';
import PublicLandingBmiCalc from '@/app/frontend_public/public_landing/landing_experience/components/bmi_calc/PublicLandingBmiCalc';
import PublicLandingPlans from '@/app/frontend_public/public_landing/landing_experience/components/plans/PublicLandingPlans';
import PublicLandingTrainers from '@/app/frontend_public/public_landing/landing_experience/components/trainers/PublicLandingTrainers';
import PublicLandingServices from '@/app/frontend_public/public_landing/landing_experience/components/services/PublicLandingServices';
import PublicLandingSchedule from '@/app/frontend_public/public_landing/landing_experience/components/schedule/PublicLandingSchedule';
import PublicLandingGallery from '@/app/frontend_public/public_landing/landing_experience/components/gallery/PublicLandingGallery';
import PublicLandingTransformations from '@/app/frontend_public/public_landing/landing_experience/components/transformations/PublicLandingTransformations';
import PublicLandingTestimonials from '@/app/frontend_public/public_landing/landing_experience/components/testimonials/PublicLandingTestimonials';
import PublicLandingFooter from '@/app/frontend_public/public_landing/landing_experience/components/footer/PublicLandingFooter';

/**
 * PublicLandingMain owns the presentation for its documented PublicLanding section and consumes only module-owned configuration or approved infrastructure.
 * @dependencies PublicLanding translations/configuration and approved global UI primitives where imported.
 * @edge-case The section must remain usable with localized text, narrow viewports, and reduced-motion preferences.
 */
export default function PublicLandingMain({ booking, contact }: { booking: ReactNode; contact: ReactNode }) {
  return (
    <PublicLandingQueryProvider>
      <div className="min-h-screen landing-module bg-page text-primary">
        <PublicLandingNavbar />
        <main>
          <PublicLandingHero />
          <PublicLandingAbout />
          <PublicLandingBmiCalc />
          <PublicLandingPlans />
          <PublicLandingTrainers />
          <PublicLandingServices />
          <PublicLandingSchedule />
          <PublicLandingGallery />
          {booking}
          <PublicLandingTransformations />
          <PublicLandingTestimonials />
          {contact}
        </main>
        <PublicLandingFooter />
      </div>
    </PublicLandingQueryProvider>
  );
}
