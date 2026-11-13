// RESPONSIBILITY: Renders/orchestrates SuperadminAccountProfileAvatarCard within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Displays the superadmin's avatar, name, role badge, and last login info.


import { useEffect, useState } from 'react';

import { Camera, ShieldCheck } from 'lucide-react';
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
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  useEffect(() => setAvatarFailed(false), [profile?.avatarUrl]);

  if (!profile)
    return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLocalAvatar(reader.result as string);
        setAvatarFailed(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = (profile.name?.trim() || 'SA')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const lastLogin = profile.lastLoginAt
    ? formatDateTime(profile.lastLoginAt)
    : '—';

  const currentAvatarSrc = localAvatar || profile.avatarUrl;

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center gap-4 shadow-card">
      <div className="group relative w-20 h-20 overflow-hidden rounded-full bg-primary-subtle border-2 border-focus flex items-center justify-center">
        {currentAvatarSrc && !avatarFailed ? (
          <Image
            src={currentAvatarSrc}
            alt={t('ui.profile_avatar_alt', { name: profile.name })}
            width={80}
            height={80}
            unoptimized
            onError={() => setAvatarFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="superadmin-page-title text-primary">{initials}</span>
        )}
        <label
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 motion-safe:transition-opacity cursor-pointer text-white"
          title="Change Avatar"
        >
          <Camera size={20} aria-hidden="true" />
          <span className="text-[10px] font-semibold mt-0.5">Upload</span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleAvatarChange}
            aria-label="Upload new avatar image"
          />
        </label>
      </div>

      <label className="text-xs text-primary font-medium cursor-pointer hover:underline flex items-center gap-1.5 focus-within:ring-2 focus-within:ring-primary rounded px-1.5 py-0.5">
        <Camera size={14} aria-hidden="true" />
        <span>Change Avatar</span>
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleAvatarChange}
          aria-label="Change Avatar"
        />
      </label>

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
