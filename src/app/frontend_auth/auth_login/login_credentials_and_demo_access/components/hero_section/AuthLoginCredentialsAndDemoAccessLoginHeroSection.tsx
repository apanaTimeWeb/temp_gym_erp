// RESPONSIBILITY: Composes the static desktop Login hero regions and owns only the hero container/background treatment.
'use client';

import Image from 'next/image';

import AuthLoginHeroBrand from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/hero_brand/AuthLoginCredentialsAndDemoAccessLoginHeroBrand';

import AuthLoginHeroContent from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/hero_content/AuthLoginCredentialsAndDemoAccessLoginHeroContent';

import AuthLoginHeroSecureStatus from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/hero_secure_status/AuthLoginCredentialsAndDemoAccessLoginHeroSecureStatus';

import { AuthLoginConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessLoginConstants';



/**
 * Renders the desktop-only Login hero shell and composes its three major visual regions.
 * @description Brand, central product story, and secure status are isolated child responsibilities; no authentication logic enters this component.
 * @dependencies next/image and Login hero child components.
 * @edge-case Hidden below the desktop breakpoint so mobile branding remains owned by AuthLoginMobileHeader.
 */
export default function AuthLoginHeroSection() {
  return (
    <section className="relative hidden min-h-screen w-3/5 overflow-hidden bg-sidebar p-12 xl:flex xl:flex-col xl:justify-between">
      <div aria-hidden="true" className="absolute inset-0 bg-sidebar" />
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={AuthLoginConstants.ASSETS.HERO_IMAGE} alt="" fill sizes="60vw" className="object-cover opacity-10" priority />
      </div>
      <AuthLoginHeroBrand />
      <AuthLoginHeroContent />
      <AuthLoginHeroSecureStatus />
    </section>
  );
}
