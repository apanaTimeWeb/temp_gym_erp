import { describe, expect, it } from 'vitest';
import { getSuperadminTeamAlertTranslationKeys } from '@/app/frontend_superadmin/superadmin_team/team_management/constants/superadmin_team_management_alert_translation_keys.constants';

describe('getSuperadminTeamAlertTranslationKeys', () => {
  it('maps documented alert values to existing translation keys', () => {
    expect(getSuperadminTeamAlertTranslationKeys('in-app', 'critical only')).toEqual({ channel: 'ui.channel_in_app', threshold: 'ui.threshold_critical_only' });
  });
  it('uses safe fallback keys for unexpected server values', () => {
    expect(getSuperadminTeamAlertTranslationKeys('new-provider', 'future-threshold')).toEqual({ channel: 'ui.channel_unknown', threshold: 'ui.threshold_unknown' });
  });
});
