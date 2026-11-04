// RESPONSIBILITY: Owns Hero-only static KPI configuration for the public PublicLanding surface.
export const LANDING_HERO_STATS = [
  { valueKey: 'hero.statsValues.members', labelKey: 'hero.stats.members' },
  { valueKey: 'hero.statsValues.trainers', labelKey: 'hero.stats.trainers' },
  { valueKey: 'hero.statsValues.alwaysOpen', labelKey: 'hero.stats.alwaysOpen' },
  { valueKey: 'hero.statsValues.experience', labelKey: 'hero.stats.experience' },
] as const;
