// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for membership_lifecycle.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerMembershipLifecycleHarness } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/tests/harness/ManagerMembershipLifecycleHarness';

export function renderManagerMembershipLifecycle(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerMembershipLifecycleHarness>{children}</ManagerMembershipLifecycleHarness> });
}
