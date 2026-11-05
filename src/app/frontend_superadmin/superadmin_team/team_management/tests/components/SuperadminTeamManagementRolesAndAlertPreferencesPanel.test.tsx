import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SuperadminTeamRolesAndAlertPreferencesPanel from '@/app/frontend_superadmin/superadmin_team/team_management/components/team_management_dashboard_widgets/SuperadminTeamManagementRolesAndAlertPreferencesPanel';
import { useSuperadminTeamManagementAlertPreferences } from '@/app/frontend_superadmin/superadmin_team/team_management/hooks/useSuperadminTeamManagementAlertPreferences';
import { SUPERADMIN_TEAM_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_team/team_management/mocks/fixtures/SuperadminTeamManagementMockFixtures';
vi.mock('next-intl', async (importOriginal) => ({ ...(await importOriginal<typeof import('next-intl')>()), useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_team/team_management/hooks/useSuperadminTeamManagementAlertPreferences');
const mockSave = vi.mocked(useSuperadminTeamManagementAlertPreferences);
const data = SUPERADMIN_TEAM_MOCK_FIXTURE;
describe('SuperadminTeamRolesAndAlertPreferencesPanel', () => {
  beforeEach(() => { vi.clearAllMocks(); mockSave.mockReturnValue({ savePreferences: vi.fn().mockResolvedValue({ success: true, message: 'saved', data: null }), isSaving: false, error: null } as never); });
  it('preserves a dirty checkbox draft when the server alert array refetches', () => {
    const { rerender } = render(<SuperadminTeamRolesAndAlertPreferencesPanel data={data} />);
    const checkbox = screen.getByTestId('superadmin_team-superadmin-team-roles-and-alert-preferences-panel-alert-preferences-panel-checkbox-payment-recovery-failure');
    const initial = (checkbox as HTMLInputElement).checked;
    fireEvent.click(checkbox);
    expect((checkbox as HTMLInputElement).checked).toBe(!initial);
    rerender(<SuperadminTeamRolesAndAlertPreferencesPanel data={{ ...data, alerts: data.alerts.map((alert) => ({ ...alert })) }} />);
    expect((screen.getByTestId('superadmin_team-superadmin-team-roles-and-alert-preferences-panel-alert-preferences-panel-checkbox-payment-recovery-failure') as HTMLInputElement).checked).toBe(!initial);
  });
  it('preserves the submitted draft if an older cached response arrives before the refetch', async () => {
    const savePreferences = vi.fn().mockResolvedValue({ success: true, message: 'saved', data: null });
    mockSave.mockReturnValue({ savePreferences, isSaving: false, error: null } as never);
    const { rerender } = render(<SuperadminTeamRolesAndAlertPreferencesPanel data={data} />);
    const testId = 'superadmin_team-superadmin-team-roles-and-alert-preferences-panel-alert-preferences-panel-checkbox-payment-recovery-failure';
    const checkbox = screen.getByTestId(testId) as HTMLInputElement;
    const initial = checkbox.checked;
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByRole('button', { name: 'ui.save_preferences' }));
    await vi.waitFor(() => expect(savePreferences).toHaveBeenCalledTimes(1));
    rerender(<SuperadminTeamRolesAndAlertPreferencesPanel data={{ ...data, alerts: data.alerts.map((alert) => ({ ...alert })) }} />);
    expect((screen.getByTestId(testId) as HTMLInputElement).checked).toBe(!initial);
  });
  it('disables alert controls while the save mutation is in flight', () => {
    mockSave.mockReturnValue({ savePreferences: vi.fn(), isSaving: true, error: null } as never);
    render(<SuperadminTeamRolesAndAlertPreferencesPanel data={data} />);
    expect(screen.getByTestId('superadmin_team-superadmin-team-roles-and-alert-preferences-panel-alert-preferences-panel-checkbox-payment-recovery-failure')).toBeDisabled();
  });
});
