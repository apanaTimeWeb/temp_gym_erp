// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for members_directory.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerMembersDirectoryHarness } from '@/app/frontend_manager/manager_members/members_directory/tests/harness/ManagerMembersDirectoryHarness';

export function renderManagerMembersDirectory(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerMembersDirectoryHarness>{children}</ManagerMembersDirectoryHarness> });
}
