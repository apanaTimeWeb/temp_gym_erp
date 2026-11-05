import { describe, expect, it } from 'vitest';
import { SuperadminTeamAlertPreferencesUpdateRequestSchema } from '@/app/frontend_superadmin/superadmin_team/team_management/schemas/superadmin_team_management_contract.schemas';

describe('SuperadminTeamAlertPreferencesUpdateRequestSchema', () => {
  it('accepts the documented preference update payload', () => {
    expect(SuperadminTeamAlertPreferencesUpdateRequestSchema.safeParse({ preferences: [{ name: 'payment-recovery-failure', enabled: false }] }).success).toBe(true);
  });
  it('rejects duplicate preference names because names are the mutation identity', () => {
    expect(SuperadminTeamAlertPreferencesUpdateRequestSchema.safeParse({ preferences: [{ name: 'alerts', enabled: true }, { name: 'alerts', enabled: false }] }).success).toBe(false);
  });
  it('rejects a missing preference array, blank names and non-boolean enabled values', () => {
    expect(SuperadminTeamAlertPreferencesUpdateRequestSchema.safeParse({}).success).toBe(false);
    expect(SuperadminTeamAlertPreferencesUpdateRequestSchema.safeParse({ preferences: [{ name: ' ', enabled: true }] }).success).toBe(false);
    expect(SuperadminTeamAlertPreferencesUpdateRequestSchema.safeParse({ preferences: [{ name: 'alerts', enabled: 'yes' }] }).success).toBe(false);
  });
});
