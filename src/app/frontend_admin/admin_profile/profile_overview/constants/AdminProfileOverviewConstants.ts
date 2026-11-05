// RESPONSIBILITY: Canonical feature-owned constants for the AdminProfile module.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_profile/profile_overview/constants/AdminProfileOverviewConstants.ts)

import { Lock, User } from 'lucide-react';
import type { ProfileTab, UpdateAdminPasswordPayload, UpdateAdminProfilePayload } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewTypes';

export const ADMIN_PROFILE_TABS: ReadonlyArray<{ id: ProfileTab; labelKey: string; icon: typeof User }> = [
  { id: 'personal', labelKey: 'profile.admin_profile_main.tabPersonal', icon: User },
  { id: 'security', labelKey: 'profile.admin_profile_main.tabSecurity', icon: Lock },
];

/** Stable empty values for the two profile forms; no business fallback data is introduced. */
export const ADMIN_PROFILE_EMPTY_FORM: UpdateAdminProfilePayload = { name: '', phone: '' };
export const ADMIN_PASSWORD_EMPTY_FORM: UpdateAdminPasswordPayload = { currentPassword: '', newPassword: '', confirmPassword: '' };
