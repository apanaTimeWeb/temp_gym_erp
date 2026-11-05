import { superadminTeamManagementApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_team/team_management/api/superadmin_team_management_api_fetch.api';
import { SUPERADMIN_TEAM_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_team/team_management/config/superadmin_team_management.url_config';
import { SuperadminTeamAlertPreferencesUpdateRequestSchema, SuperadminTeamAlertPreferencesUpdateResponseSchema, SuperadminTeamResponseSchema } from '@/app/frontend_superadmin/superadmin_team/team_management/schemas/superadmin_team_management_contract.schemas';

import type { SuperadminTeamResponse, SuperadminTeamAlertPreferenceUpdate } from '@/app/frontend_superadmin/superadmin_team/team_management/types/superadmin_team_management.types';
import type { ApiResponse } from '@/lib/api';


export async function fetchTeam(): Promise<ApiResponse<SuperadminTeamResponse>> {
    return apiFetch<SuperadminTeamResponse>(SUPERADMIN_TEAM_MANAGEMENT_API.BASE, { dataSchema: SuperadminTeamResponseSchema });
}
export async function updateTeamAlertPreferences(preferences: SuperadminTeamAlertPreferenceUpdate[], idempotencyKey: string): Promise<ApiResponse<null>> {
    const requestBody = SuperadminTeamAlertPreferencesUpdateRequestSchema.parse({ preferences });
  return apiFetch<null>(SUPERADMIN_TEAM_MANAGEMENT_API.ALERT_PREFERENCES, { method: 'PATCH', body: JSON.stringify(requestBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminTeamAlertPreferencesUpdateResponseSchema.shape.data });
}
