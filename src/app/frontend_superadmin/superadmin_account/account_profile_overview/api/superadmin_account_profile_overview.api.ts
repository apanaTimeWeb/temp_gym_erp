import { superadminProfileOverviewApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview_api_fetch.api';
import { SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/config/superadmin_account_profile_overview.url_config';
import { SuperadminAccountProfilePasswordResponseDataSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_api.schemas';
import { SuperadminAccountProfileDataSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_types.schemas';

import type { SuperadminAccountProfileData, UpdateSuperadminAccountProfilePayload, UpdateSuperadminPasswordPayload, Toggle2FAPayload, } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/types/superadmin_account_profile_overview.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAccountProfileApi owned by the superadmin_account_profile feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_types.schemas, @/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_api.schemas, @/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview_api_fetch.api, @/app/frontend_superadmin/superadmin_account/account_profile_overview/config/superadmin_account_profile_overview.url_config, @/app/frontend_superadmin/superadmin_account/account_profile_overview/types/superadmin_account_profile_overview.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


export const superadminProfileApi = {
    fetchProfile: () => apiFetch<SuperadminAccountProfileData>(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.BASE, { dataSchema: SuperadminAccountProfileDataSchema }),
    updateProfile: (payload: UpdateSuperadminAccountProfilePayload, idempotencyKey: string) => apiFetch<SuperadminAccountProfileData>(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.BASE, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminAccountProfileDataSchema
    }),
    updatePassword: (payload: UpdateSuperadminPasswordPayload, idempotencyKey: string) => apiFetch<null>(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.PASSWORD, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminAccountProfilePasswordResponseDataSchema
    }),
    updateTwoFactor: (payload: Toggle2FAPayload, idempotencyKey: string) => apiFetch<SuperadminAccountProfileData>(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.TWO_FACTOR, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminAccountProfileDataSchema
    }),
};
