// RESPONSIBILITY: Validates optional, public-facing business destinations; never substitutes fabricated contact details.
// FLOW: Build-time NEXT_PUBLIC_LANDING_* settings -> validated link or null -> accessible landing UI.
const trustedProfile = (value: string | undefined, host: string): string | null => {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || (url.hostname !== host && !url.hostname.endsWith(`.${host}`))) return null;
    if (url.username || url.password || url.pathname === '/' || url.pathname === '') return null;
    return url.toString();
  } catch { return null; }
};
const emailAddress = (value: string | undefined): string | null =>
  value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? value.trim() : null;
const phoneNumber = (value: string | undefined): string | null =>
  value && /^\+[1-9]\d{7,14}$/.test(value.trim()) ? value.trim() : null;

// RESPONSIBILITY: The single routing, anchor, API, external-destination, and asset contract owned by PublicLanding.
export const PublicLandingUrlConfig = {
  PAGES: {
    LANDING: '/frontend_public/public_landing',
    ERP_LOGIN: '/frontend_auth/auth/login',
    SAAS_LOGIN: '/frontend_auth/auth/login',
  },
  ANCHORS: {
    HOME: '#home',
    ABOUT: '#about',
    BMI: '#bmi',
    SERVICES: '#services',
    PLANS: '#plans',
    SCHEDULE: '#schedule',
    TRAINERS: '#trainers',
    GALLERY: '#gallery',
    TESTIMONIALS: '#testimonials',
    CONTACT: '#contact',
    BOOKING: '#booking',
    TRANSFORMATIONS: '#transformations',
    SERVICE_BODYBUILDING: '#service-bodybuilding',
    SERVICE_WEIGHT_LOSS: '#service-weight-loss',
    SERVICE_WEIGHT_GAIN: '#service-weight-gain',
    SERVICE_CARDIO: '#service-cardio',
    SERVICE_CROSSFIT: '#service-crossfit',
    SERVICE_YOGA: '#service-yoga',
    SERVICE_ZUMBA: '#service-zumba',
    SERVICE_PERSONAL_TRAINING: '#service-personal-training',
    SERVICE_DIET_PLAN: '#service-diet-plan',
  },
  BACKEND_API: {
    BOOKING: '/landing/bookings',
    CONTACT: '/landing/contact',
  },
  EXTERNAL: {
    FACEBOOK: trustedProfile(process.env.NEXT_PUBLIC_LANDING_FACEBOOK_URL, 'facebook.com'),
    INSTAGRAM: trustedProfile(process.env.NEXT_PUBLIC_LANDING_INSTAGRAM_URL, 'instagram.com'),
    X: trustedProfile(process.env.NEXT_PUBLIC_LANDING_X_URL, 'x.com'),
    YOUTUBE: trustedProfile(process.env.NEXT_PUBLIC_LANDING_YOUTUBE_URL, 'youtube.com'),
    PHONE: phoneNumber(process.env.NEXT_PUBLIC_LANDING_PHONE) ? `tel:${phoneNumber(process.env.NEXT_PUBLIC_LANDING_PHONE)}` : null,
    EMAIL: emailAddress(process.env.NEXT_PUBLIC_LANDING_EMAIL) ? `mailto:${emailAddress(process.env.NEXT_PUBLIC_LANDING_EMAIL)}` : null,
    ADDRESS: process.env.NEXT_PUBLIC_LANDING_ADDRESS?.trim() || null,
  },
  ASSETS: {
    LOGO: '/logo.png',
    HERO: '/gym_hero.png',
    GALLERY_CARDIO: '/gym_gallery_cardio.png',
    GALLERY_WEIGHTS: '/gym_gallery_weights.png',
    GALLERY_STUDIO: '/gym_gallery_studio.png',
  },
} as const;
