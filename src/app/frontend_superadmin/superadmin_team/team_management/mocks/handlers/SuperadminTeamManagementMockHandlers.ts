import { http, HttpResponse } from 'msw';

import { SUPERADMIN_TEAM_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_team/team_management/config/superadmin_team_management.url_config';
import { SUPERADMIN_TEAM_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_team/team_management/mocks/fixtures/SuperadminTeamManagementMockFixtures';
import { SuperadminTeamAlertPreferencesUpdateRequestSchema } from '@/app/frontend_superadmin/superadmin_team/team_management/schemas/superadmin_team_management_contract.schemas';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminTeamMockHandlers owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_team/team_management/schemas/superadmin_team_management_contract.schemas, @/app/frontend_superadmin/superadmin_team/team_management/mocks/fixtures/SuperadminTeamManagementMockFixtures, @/app/frontend_superadmin/superadmin_team/team_management/config/superadmin_team_management.url_config
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns mutable MSW behavior for Superadmin team and alert preferences.


let mockTeam = structuredClone(SUPERADMIN_TEAM_MOCK_FIXTURE);

export function resetSuperadminTeamMockState(): void {
  mockTeam = structuredClone(SUPERADMIN_TEAM_MOCK_FIXTURE);
}
export const superadminTeamHandlers = [
    http.get('*' + SUPERADMIN_TEAM_MANAGEMENT_API.BASE, () => HttpResponse.json({ success:true, message:'Superadmin team data loaded.', data:mockTeam, requestId: crypto.randomUUID()})),
    http.patch('*' + SUPERADMIN_TEAM_MANAGEMENT_API.ALERT_PREFERENCES, async ({ request }) => {
      let requestBody: unknown;
      try { requestBody = await request.json(); } catch { return HttpResponse.json({ success: false, message: 'Invalid alert-preference payload.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: 400, requestId: crypto.randomUUID()}, { status: 400 }); }
      const parsed = SuperadminTeamAlertPreferencesUpdateRequestSchema.safeParse(requestBody);
      if (!parsed.success) return HttpResponse.json({ success: false, message: 'Invalid alert-preference payload.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: 400, requestId: crypto.randomUUID()}, { status: 400 });
      const knownNames = new Set(mockTeam.alerts.map((alert) => alert.name));
      if (knownNames.size !== mockTeam.alerts.length) return HttpResponse.json({ success: false, message: 'Alert identities are ambiguous.', data: null, errorCode: 'CONFLICT', statusCode: 409, requestId: crypto.randomUUID()}, { status: 409 });
      if (new Set(parsed.data.preferences.map((item) => item.name)).size !== parsed.data.preferences.length) return HttpResponse.json({ success: false, message: 'Duplicate alert preference.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: 400, requestId: crypto.randomUUID()}, { status: 400 });
      if (parsed.data.preferences.some((item) => !knownNames.has(item.name))) return HttpResponse.json({ success: false, message: 'Unknown alert preference.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: 400, requestId: crypto.randomUUID()}, { status: 400 });
      mockTeam = { ...mockTeam, alerts: mockTeam.alerts.map((alert) => { const update = parsed.data.preferences.find((item) => item.name === alert.name); return update ? { ...alert, enabled: update.enabled } : alert; }) };
      return HttpResponse.json({ success: true, message: 'Alert preferences updated.', data: null, requestId: crypto.randomUUID()});
    }),
];
