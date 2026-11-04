// RESPONSIBILITY: Renders the desktop Login hero brand identity only.
'use client';

import { useTranslations } from 'next-intl';

import Image from 'next/image';

import { AuthLoginConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessLoginConstants';



/**
 * Renders the desktop Login brand identity with the optimized public logo and localized tagline.
 * @description Presentation-only hero branding with no authentication or navigation behavior.
 * @dependencies next-intl, next/image, and AuthLoginConstants for the approved Login logo asset.
 * @edge-case The component is rendered only in the desktop hero branch; the mobile header owns its own compact brand treatment.
 */
export default function AuthLoginHeroBrand() {
  const t = useTranslations('AUTH_LOGIN');
  return (
    <div className="relative flex items-center gap-3">
      <div className="h-11 w-11 overflow-hidden rounded-md border border-border bg-card shadow-card">
        <Image src={AuthLoginConstants.ASSETS.LOGO} alt={t('BRAND')} width={44} height={44} sizes="44px" className="h-full w-full object-cover" priority />
      </div>
      <div>
        <p className="text-xl font-bold leading-none text-primary">{t('BRAND')}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-widest text-secondary">{t('BRAND_TAGLINE')}</p>
      </div>
    </div>
  );
}
