// RESPONSIBILITY: Orchestrates the Login route loading state from independently repairable hero and form skeleton regions.
'use client';

import { useTranslations } from 'next-intl';

import AuthLoginLoadingFormSkeleton from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/loading_skeleton/AuthLoginCredentialsAndDemoAccessLoginLoadingFormSkeleton';

import AuthLoginLoadingHeroSkeleton from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/loading_skeleton/AuthLoginCredentialsAndDemoAccessLoginLoadingHeroSkeleton';



/**
 * Renders the complete Login loading state from isolated visual-region skeletons.
 * @description Keeps each major skeleton region independently repairable while preserving the production 60/40 page geometry.
 * @dependencies AuthLoginLoadingHeroSkeleton and AuthLoginLoadingFormSkeleton.
 * @edge-case The root container remains full-height on mobile and switches to the two-column desktop composition at `xl` (1280px+).
 */
export default function AuthLoginLoadingSkeleton() {
  const t = useTranslations('AUTH_LOGIN');

  return (
    <div data-testid="auth_login-loading-root" className="min-h-screen bg-page xl:flex" role="status" aria-label={t('LOADING_SCREEN')}>
      <AuthLoginLoadingHeroSkeleton />
      <AuthLoginLoadingFormSkeleton />
    </div>
  );
}
