/**
 * Centralized environment configuration.
 * Validates and provides access to public and server runtime environment variables.
 */

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  NEXT_PUBLIC_AUTH_DEMO_MODE: process.env.NEXT_PUBLIC_AUTH_DEMO_MODE ?? 'true',
  NEXT_PUBLIC_LANDING_FACEBOOK_URL: process.env.NEXT_PUBLIC_LANDING_FACEBOOK_URL || '',
  NEXT_PUBLIC_LANDING_INSTAGRAM_URL: process.env.NEXT_PUBLIC_LANDING_INSTAGRAM_URL || '',
  NEXT_PUBLIC_LANDING_X_URL: process.env.NEXT_PUBLIC_LANDING_X_URL || '',
  NEXT_PUBLIC_LANDING_YOUTUBE_URL: process.env.NEXT_PUBLIC_LANDING_YOUTUBE_URL || '',
  NEXT_PUBLIC_LANDING_EMAIL: process.env.NEXT_PUBLIC_LANDING_EMAIL || '',
  NEXT_PUBLIC_LANDING_PHONE: process.env.NEXT_PUBLIC_LANDING_PHONE || '',
  NEXT_PUBLIC_LANDING_ADDRESS: process.env.NEXT_PUBLIC_LANDING_ADDRESS || '',
} as const;

export default env;

