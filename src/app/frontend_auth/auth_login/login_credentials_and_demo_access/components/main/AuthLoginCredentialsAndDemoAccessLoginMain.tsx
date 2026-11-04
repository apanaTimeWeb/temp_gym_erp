// RESPONSIBILITY: Orchestrates the public Login visual composition and route-level client error boundaries without owning authentication business logic.
'use client';

import { ThemeToggle } from '@/components/ThemeToggle';

import AuthLoginErrorBoundary from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/error_boundary/AuthLoginCredentialsAndDemoAccessLoginErrorBoundary';

import AuthLoginForm from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/form/AuthLoginCredentialsAndDemoAccessLoginForm';

import AuthLoginHeroSection from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/hero_section/AuthLoginCredentialsAndDemoAccessLoginHeroSection';

import AuthLoginMobileHeader from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/mobile_header/AuthLoginCredentialsAndDemoAccessLoginMobileHeader';



/**
 * Composes the Login view after server-side route/session decisions have completed.
 * @description This is the feature's primary UI orchestration boundary; authentication API calls, validation, state calculations, and navigation remain in hooks/API layers.
 * @dependencies ThemeToggle, AuthLoginErrorBoundary, AuthLoginHeroSection, AuthLoginMobileHeader, and AuthLoginForm.
 * @edge-case Client render failures are isolated by region so a failure in one visual branch can be retried without exposing technical details.
 */
export default function AuthLoginMain() {
  return (
    <main className="relative flex min-h-screen bg-page font-sans">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <AuthLoginErrorBoundary>
        <AuthLoginHeroSection />
      </AuthLoginErrorBoundary>

      <AuthLoginErrorBoundary>
        <div className="relative flex w-full items-center justify-center bg-page p-6 pt-24 sm:p-12 xl:w-2/5 xl:pt-12">
          <AuthLoginMobileHeader />
          <AuthLoginForm />
        </div>
      </AuthLoginErrorBoundary>
    </main>
  );
}
