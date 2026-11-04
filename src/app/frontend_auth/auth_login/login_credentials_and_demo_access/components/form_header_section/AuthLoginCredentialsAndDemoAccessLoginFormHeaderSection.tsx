// RESPONSIBILITY: Renders the Login form's navigational back link and identity heading without owning form state.
'use client';

import { ChevronLeft } from 'lucide-react';

import Image from 'next/image';

import Link from 'next/link';

import type { AuthLoginFormHeaderSectionProps } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginTypes';



/**
 * Renders the Login form header and landing-page return action.
 * @description Keeps branding and route-link presentation separate from interactive authentication controls.
 * @dependencies next/image, next/link, and the landing-route prop supplied by AuthLoginForm.
 * @edge-case The back action always uses the module URL configuration passed by AuthLoginForm.
 */
export default function AuthLoginFormHeaderSection({ backToHomeLabel, backToHomeAriaLabel, landingRoute, brand, logoSource, title, subtitle }: AuthLoginFormHeaderSectionProps) {
  return (
    <div className="flex flex-col gap-8">
      <Link
        href={landingRoute}
        data-testid="auth_login-form-back_home"
        className="group inline-flex min-h-11 items-center gap-1.5 self-start rounded-md text-sm text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:underline motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        aria-label={backToHomeAriaLabel}
      >
        <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" className="text-secondary motion-safe:transition-colors motion-safe:duration-base ease-in-out group-hover:text-primary" />
        {backToHomeLabel}
      </Link>

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="mb-1 h-16 w-16 overflow-hidden rounded-lg border border-border bg-card shadow-card">
          <Image src={logoSource} alt={brand} width={64} height={64} sizes="64px" className="h-full w-full object-cover" priority />
        </div>
        <h1 className="text-page-title font-bold text-primary">{title}</h1>
        <p className="text-sm text-secondary">{subtitle}</p>
      </div>
    </div>
  );
}
