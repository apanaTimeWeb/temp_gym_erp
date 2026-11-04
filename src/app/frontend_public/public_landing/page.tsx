// FRAMEWORK ROUTE ADAPTER: Preserves this exact public landing URL and section ordering.
// Rendering composition is at the route boundary, not inside any autonomous sibling module.
import PublicLandingMain from '@/app/frontend_public/public_landing/landing_experience/components/main/PublicLandingMain';
import PublicLandingBooking from '@/app/frontend_public/public_landing/landing_booking/components/booking/PublicLandingBooking';
import PublicLandingContact from '@/app/frontend_public/public_landing/landing_contact/components/contact/PublicLandingContact';

export default function PublicLandingPage() {
  return <PublicLandingMain booking={<PublicLandingBooking />} contact={<PublicLandingContact />} />;
}
