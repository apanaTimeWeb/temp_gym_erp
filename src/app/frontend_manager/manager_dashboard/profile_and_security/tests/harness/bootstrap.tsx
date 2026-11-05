// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for profile_and_security.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerProfileAndSecurityHarness } from '@/app/frontend_manager/manager_dashboard/profile_and_security/tests/harness/ManagerProfileAndSecurityHarness';

export function renderManagerProfileAndSecurity(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerProfileAndSecurityHarness>{children}</ManagerProfileAndSecurityHarness> });
}
