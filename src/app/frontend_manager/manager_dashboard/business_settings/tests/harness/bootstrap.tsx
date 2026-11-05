// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for business_settings.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerBusinessSettingsHarness } from '@/app/frontend_manager/manager_dashboard/business_settings/tests/harness/ManagerBusinessSettingsHarness';

export function renderManagerBusinessSettings(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerBusinessSettingsHarness>{children}</ManagerBusinessSettingsHarness> });
}
