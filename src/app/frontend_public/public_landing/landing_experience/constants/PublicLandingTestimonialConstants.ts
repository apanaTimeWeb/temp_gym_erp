// RESPONSIBILITY: Owns testimonial content keys and stable rating-star values for PublicLanding.
export const LANDING_MAX_RATING = 5 as const;
export const LANDING_RATING_STAR_VALUES = [1, 2, 3, 4, 5] as const;

export const LANDING_TESTIMONIALS = [
  { nameKey: 'testimonials.items.sneha.name', rating: 5, textKey: 'testimonials.items.sneha.text', memberKey: 'testimonials.items.sneha.member', initials: 'SM' },
  { nameKey: 'testimonials.items.vijay.name', rating: 5, textKey: 'testimonials.items.vijay.text', memberKey: 'testimonials.items.vijay.member', initials: 'VS' },
  { nameKey: 'testimonials.items.anita.name', rating: 5, textKey: 'testimonials.items.anita.text', memberKey: 'testimonials.items.anita.member', initials: 'AG' },
  { nameKey: 'testimonials.items.rohit.name', rating: 5, textKey: 'testimonials.items.rohit.text', memberKey: 'testimonials.items.rohit.member', initials: 'RY' },
] as const;

export const LANDING_TESTIMONIAL_SUMMARY_SCORE = '4.9';
