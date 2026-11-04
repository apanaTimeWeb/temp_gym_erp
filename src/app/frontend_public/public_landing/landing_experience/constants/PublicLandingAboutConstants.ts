// RESPONSIBILITY: Owns About-only static KPI and feature-key configuration for PublicLanding.
import { Award, Clock, Heart, Users } from 'lucide-react';

export const LANDING_ABOUT_STATS = [
  { labelKey: 'about.stats.members', valueKey: 'about.statsValues.members', icon: Users, iconToneClass: 'bg-primary-subtle text-primary' },
  { labelKey: 'about.stats.trainers', valueKey: 'about.statsValues.trainers', icon: Award, iconToneClass: 'bg-info-bg text-info' },
  { labelKey: 'about.stats.hoursOpen', valueKey: 'about.statsValues.hoursOpen', icon: Clock, iconToneClass: 'bg-success-bg text-success' },
  { labelKey: 'about.stats.transformations', valueKey: 'about.statsValues.transformations', icon: Heart, iconToneClass: 'bg-warning-bg text-warning' },
] as const;

export const LANDING_ABOUT_FEATURE_KEYS = [
  'about.features.certifiedTrainers',
  'about.features.alwaysOpen',
  'about.features.foodDatabase',
  'about.features.ladiesOnly',
  'about.features.steamLockers',
  'about.features.dietConsultation',
] as const;
