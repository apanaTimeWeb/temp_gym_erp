// RESPONSIBILITY: Renders/orchestrates SuperadminAccountProfileAvatarCard within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Displays the superadmin's avatar, name, role badge, and last login info.


import { useEffect, useState } from 'react';

import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { formatDate, formatDateTime } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/utils/SuperadminAccountProfileOverviewFormatters';

import type { SuperadminAccountProfileAvatarCardProps } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/types/superadmin_account_profile_overview_avatar_card.types';

/**
 * @description Displays the superadmin's avatar, name, role badge, and last login info.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAccountProfileOverviewAvatarCard({ profile }: SuperadminAccountProfileAvatarCardProps) {
  const t = useTranslations('superadmin_account_profile');
  const [avatarFailed, setAvatarFailed] = useState(false);
  useEffect(() => setAvatarFailed(false), [profile?.avatarUrl]);
    if (!profile)
        return null;
    const initials = (profile.name?.trim() || 'SA')
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    const lastLogin = profile.lastLoginAt
        ? formatDateTime(profile.lastLoginAt)
        : '—';
    return (<div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center gap-4 shadow-card">
      <div className="relative w-20 h-20 overflow-hidden rounded-full bg-primary-subtle border-2 border-focus flex items-center justify-center">
        {profile.avatarUrl && !avatarFailed ? <Image src={profile.avatarUrl} alt={t('ui.profile_avatar_alt', { name: profile.name })} width={80} height={80} unoptimized onError={() => setAvatarFailed(true)} className="h-full w-full object-cover" /> : <span className="superadmin-page-title text-primary">{initials}</span>}
      </div>
      <div>
        <h2 className="text-lg font-bold text-primary">{profile.name}</h2>
        <p className="text-sm text-secondary">{profile.email}</p>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-subtle rounded-full">
        <ShieldCheck size={18} className="text-primary" strokeWidth={2}/>
        <span className="text-xs font-semibold text-primary">{t('ui.superadmin_5da4ea4')}</span>
      </div>
      <div className="w-full border-t border-border pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary">{t('ui.last_login_920ecc3')}</span>
          <span className="text-primary">{lastLogin}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary">{t('ui.2fa_02afb25')}</span>
          <span className={profile.twoFactorEnabled ? 'text-success font-medium' : 'text-danger font-medium'}>
            {profile.twoFactorEnabled ? t('ui.enabled') : t('ui.disabled')}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary">{t('ui.member_since_5311e63')}</span>
          <span className="text-primary">
            {formatDate(profile.createdAt)}
          </span>
        </div>
      </div>
    </div>);
}
