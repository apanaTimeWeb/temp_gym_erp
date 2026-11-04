// RESPONSIBILITY: Renders the central Login hero product message, feature list, and stat cards.
'use client';

import { CheckCircle2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { AuthLoginConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessLoginConstants';



/**
 * Renders the central product story for the desktop Login hero.
 * @description Keeps the hero's content structure together while presentation data remains centralized in Login constants.
 * @dependencies next-intl, Lucide icons, and AuthLoginConstants.
 * @edge-case Each stat carries its own stable icon so adding/reordering statistics cannot change icon identity.
 */
export default function AuthLoginHeroContent() {
  const t = useTranslations('AUTH_LOGIN');
  return (
    <div className="relative space-y-8">
      <div>
        <h2 className="text-5xl font-bold leading-tight tracking-tight text-primary">{t('TITLE')}<br /><span className="text-primary">{t('SUBTITLE')}</span></h2>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-secondary">{t('HERO_DESCRIPTION')}</p>
      </div>

      <ul className="space-y-3">
        {AuthLoginConstants.HERO_FEATURE_KEYS.map((featureKey) => (
          <li key={featureKey} className="flex items-center gap-3">
            <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-success" />
            <span className="text-sm text-secondary">{t(featureKey)}</span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-3 gap-3">
        {AuthLoginConstants.HERO_STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.labelKey} className="rounded-lg border border-border bg-card p-4 shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-subtle">
              <Icon size={18} strokeWidth={2} aria-hidden="true" className="text-primary" />
            </span>
              <p className="mt-3 text-kpi font-bold leading-none text-primary">{stat.value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-secondary">{t(stat.labelKey)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
