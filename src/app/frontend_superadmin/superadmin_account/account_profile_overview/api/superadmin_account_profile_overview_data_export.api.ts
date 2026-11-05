import { superadminProfileOverviewApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview_api_fetch.api';
import { SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/config/superadmin_account_profile_overview.url_config';
import { SuperadminAccountProfileOverviewApiResponseSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_api_response.schema';
import { SuperadminDataExportResponseSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_data_export.schemas';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAccountProfileDataExportApi owned by the superadmin_account_profile feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_api_response.schema, @/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_data_export.schemas, @/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview_api_fetch.api, @/app/frontend_superadmin/superadmin_account/account_profile_overview/config/superadmin_account_profile_overview.url_config, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the Superadmin tenant-data export request contract.


export const superadminProfileDataExportApi = {
  requestFullDataExport: (idempotencyKey: string) => apiFetch<null>(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.EXPORT_DATA, {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminAccountProfileOverviewApiResponseSchema(SuperadminDataExportResponseSchema),
  }),
};
