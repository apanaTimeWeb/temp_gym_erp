// RESPONSIBILITY: Owns PublicLanding service/program catalog used by the public Services section.
import { Award, CheckCircle, Dumbbell, Heart, Play, Shield, Users, Zap } from 'lucide-react';
import type { PublicLandingServiceConfig } from '@/app/frontend_public/public_landing/landing_experience/types/PublicLandingExperienceTypes';

export const LANDING_SERVICES: readonly PublicLandingServiceConfig[] = [
  { id: 'bodybuilding', titleKey: 'services.items.bodybuilding.title', descriptionKey: 'services.items.bodybuilding.description', icon: Dumbbell, iconToneClass: 'landing-service-icon--primary' },
  { id: 'weight-loss', titleKey: 'services.items.weightLoss.title', descriptionKey: 'services.items.weightLoss.description', icon: Play, iconToneClass: 'landing-service-icon--danger' },
  { id: 'weight-gain', titleKey: 'services.items.weightGain.title', descriptionKey: 'services.items.weightGain.description', icon: Award, iconToneClass: 'landing-service-icon--purple' },
  { id: 'cardio', titleKey: 'services.items.cardio.title', descriptionKey: 'services.items.cardio.description', icon: Heart, iconToneClass: 'landing-service-icon--success' },
  { id: 'crossfit', titleKey: 'services.items.crossfit.title', descriptionKey: 'services.items.crossfit.description', icon: Zap, iconToneClass: 'landing-service-icon--warning' },
  { id: 'yoga', titleKey: 'services.items.yoga.title', descriptionKey: 'services.items.yoga.description', icon: Users, iconToneClass: 'landing-service-icon--info' },
  { id: 'zumba', titleKey: 'services.items.zumba.title', descriptionKey: 'services.items.zumba.description', icon: Users, iconToneClass: 'landing-service-icon--danger' },
  { id: 'personal-training', titleKey: 'services.items.personalTraining.title', descriptionKey: 'services.items.personalTraining.description', icon: Shield, iconToneClass: 'landing-service-icon--primary' },
  { id: 'diet-plan', titleKey: 'services.items.dietPlan.title', descriptionKey: 'services.items.dietPlan.description', icon: CheckCircle, iconToneClass: 'landing-service-icon--success' },
];

