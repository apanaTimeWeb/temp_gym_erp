// TypeScript domain contracts are inferred from the canonical runtime schema where a response schema exists.


import { SUPERADMIN_ACCOUNT_PROFILE_TABS } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/constants/superadmin_account_profile_overview.constants';
import { SuperadminAccountProfileDataSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_types.schemas';

import type { infer as ZodInfer } from 'zod';

export type SuperadminAccountProfileData = ZodInfer<typeof SuperadminAccountProfileDataSchema>;
export interface UpdateSuperadminAccountProfilePayload { name: string; phone: string; timezone?: string; language?: string; }
export interface UpdateSuperadminPasswordPayload { currentPassword: string; newPassword: string; }
export interface Toggle2FAPayload { enabled: boolean; password: string; }
export type ProfileTab = typeof SUPERADMIN_ACCOUNT_PROFILE_TABS[number];
