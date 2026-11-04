import { TrendingUp, Users, Zap } from 'lucide-react';

import { AuthRoleConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessRoleConstants';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessSessionConstants';

// RESPONSIBILITY: Owns static Login presentation configuration, role demo controls, asset references, and translation-key registries.

export const AuthLoginMutationMode = {
  CREDENTIALS: 'credentials',
  DEMO: 'demo',
} as const;

export const AuthLoginConstants = {
  ASSETS: {
    LOGO: '/logo.png',
    HERO_IMAGE: '/gym-hero.jpg',
  },
  PASSWORD_MIN_LENGTH: AuthSessionConstants.PASSWORD_MIN_LENGTH,
  UNSAVED_CHANGES_WARNING: 'You have unsaved changes.',
  KEYBOARD_SHORTCUTS: { SUBMIT: 's' as const },
  HERO_STATS: [
    { value: '500+', labelKey: 'HERO_STATS.GYMS_MANAGED', icon: TrendingUp },
    { value: '2L+', labelKey: 'HERO_STATS.ACTIVE_MEMBERS', icon: Users },
    { value: '99.9%', labelKey: 'HERO_STATS.UPTIME_SLA', icon: Zap },
  ],
  HERO_FEATURE_KEYS: [
    'HERO_FEATURES.MEMBERS_PLANS',
    'HERO_FEATURES.ATTENDANCE_BIOMETRIC',
    'HERO_FEATURES.FINANCE_HR_PAYROLL',
    'HERO_FEATURES.WHATSAPP_EMAIL',
  ],
  DEMO_BUTTONS: [
    { role: AuthRoleConstants.SUPERADMIN, labelKey: 'DEMO.SUPERADMIN' },
    { role: AuthRoleConstants.ADMIN, labelKey: 'DEMO.ADMIN' },
    { role: AuthRoleConstants.MANAGER, labelKey: 'DEMO.MANAGER' },
    { role: AuthRoleConstants.TRAINER, labelKey: 'DEMO.TRAINER' },
  ],
} as const;


export const AuthLoginFormTranslationKeys = {
  EMAIL_INVALID: 'VALIDATION.EMAIL_INVALID',
  PASSWORD_MIN_LENGTH: 'VALIDATION.PASSWORD_MIN_LENGTH',
  ERROR_UNAVAILABLE: 'ERRORS.UNAVAILABLE',
} as const;

