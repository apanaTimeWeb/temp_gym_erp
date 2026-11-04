// RESPONSIBILITY: Stores the public gallery's static asset and translation-key configuration.
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_experience/config/public_landing_experience.url_config';

export const LANDING_GALLERY_ITEMS = [
  { src: PublicLandingUrlConfig.ASSETS.GALLERY_CARDIO, altKey: 'gallery.items.cardio.alt', labelKey: 'gallery.items.cardio.label' },
  { src: PublicLandingUrlConfig.ASSETS.GALLERY_WEIGHTS, altKey: 'gallery.items.weights.alt', labelKey: 'gallery.items.weights.label' },
  { src: PublicLandingUrlConfig.ASSETS.GALLERY_STUDIO, altKey: 'gallery.items.studio.alt', labelKey: 'gallery.items.studio.label' },
] as const;
