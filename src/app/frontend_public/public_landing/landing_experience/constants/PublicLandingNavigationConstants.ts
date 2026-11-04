// RESPONSIBILITY: Stores public navigation link contracts while consuming the centralized URL config for every destination.
import { Camera, Globe, Hash, Play } from 'lucide-react';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_experience/config/public_landing_experience.url_config';

export const LANDING_NAVIGATION_LINKS = [
  { labelKey: 'navigation.about', href: PublicLandingUrlConfig.ANCHORS.ABOUT },
  { labelKey: 'navigation.plans', href: PublicLandingUrlConfig.ANCHORS.PLANS },
  { labelKey: 'navigation.trainers', href: PublicLandingUrlConfig.ANCHORS.TRAINERS },
  { labelKey: 'navigation.services', href: PublicLandingUrlConfig.ANCHORS.SERVICES },
  { labelKey: 'navigation.schedule', href: PublicLandingUrlConfig.ANCHORS.SCHEDULE },
  { labelKey: 'navigation.booking', href: PublicLandingUrlConfig.ANCHORS.BOOKING },
  { labelKey: 'navigation.gallery', href: PublicLandingUrlConfig.ANCHORS.GALLERY },
] as const;

export const LANDING_MOBILE_NAVIGATION_LINKS = [
  ...LANDING_NAVIGATION_LINKS,
  { labelKey: 'navigation.contact', href: PublicLandingUrlConfig.ANCHORS.CONTACT },
] as const;

export const LANDING_FOOTER_QUICK_LINKS = [
  { labelKey: 'footer.quickLinks.about', href: PublicLandingUrlConfig.ANCHORS.ABOUT },
  { labelKey: 'footer.quickLinks.plans', href: PublicLandingUrlConfig.ANCHORS.PLANS },
  { labelKey: 'footer.quickLinks.trainers', href: PublicLandingUrlConfig.ANCHORS.TRAINERS },
  { labelKey: 'footer.quickLinks.schedule', href: PublicLandingUrlConfig.ANCHORS.SCHEDULE },
  { labelKey: 'footer.quickLinks.gallery', href: PublicLandingUrlConfig.ANCHORS.GALLERY },
  { labelKey: 'footer.quickLinks.contact', href: PublicLandingUrlConfig.ANCHORS.CONTACT },
] as const;

export const LANDING_FOOTER_PROGRAM_LINKS = [
  { labelKey: 'services.items.bodybuilding.title', href: PublicLandingUrlConfig.ANCHORS.SERVICE_BODYBUILDING },
  { labelKey: 'services.items.weightLoss.title', href: PublicLandingUrlConfig.ANCHORS.SERVICE_WEIGHT_LOSS },
  { labelKey: 'services.items.weightGain.title', href: PublicLandingUrlConfig.ANCHORS.SERVICE_WEIGHT_GAIN },
  { labelKey: 'services.items.cardio.title', href: PublicLandingUrlConfig.ANCHORS.SERVICE_CARDIO },
  { labelKey: 'services.items.crossfit.title', href: PublicLandingUrlConfig.ANCHORS.SERVICE_CROSSFIT },
  { labelKey: 'services.items.yoga.title', href: PublicLandingUrlConfig.ANCHORS.SERVICE_YOGA },
  { labelKey: 'services.items.zumba.title', href: PublicLandingUrlConfig.ANCHORS.SERVICE_ZUMBA },
  { labelKey: 'services.items.personalTraining.title', href: PublicLandingUrlConfig.ANCHORS.SERVICE_PERSONAL_TRAINING },
  { labelKey: 'services.items.dietPlan.title', href: PublicLandingUrlConfig.ANCHORS.SERVICE_DIET_PLAN },
] as const;

export const LANDING_SOCIAL_LINKS = [
  { labelKey: 'footer.social.facebook', href: PublicLandingUrlConfig.EXTERNAL.FACEBOOK, icon: Globe, className: 'landing-social-facebook' },
  { labelKey: 'footer.social.instagram', href: PublicLandingUrlConfig.EXTERNAL.INSTAGRAM, icon: Camera, className: 'landing-social-instagram' },
  { labelKey: 'footer.social.x', href: PublicLandingUrlConfig.EXTERNAL.X, icon: Hash, className: 'landing-social-x' },
  { labelKey: 'footer.social.youtube', href: PublicLandingUrlConfig.EXTERNAL.YOUTUBE, icon: Play, className: 'landing-social-youtube' },
] as const;
