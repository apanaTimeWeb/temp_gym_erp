import { AuthRoleConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreRoleConstants';

import type { AuthRole } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreContracts';

import type { AuthUser } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreContracts';

// RESPONSIBILITY: Owns the browser-safe sanitized Auth demo identities used by Login mock flows.

export const AuthMockPublicFixtures = {
  USERS: {
    [AuthRoleConstants.SUPERADMIN]: {
      id: 'mock-superadmin',
      name: 'Demo Superadmin',
      email: 'demo_admin@gym.com',
      role: AuthRoleConstants.SUPERADMIN,
      tenantId: 'tenant-global',
    },
    [AuthRoleConstants.ADMIN]: {
      id: 'mock-admin',
      name: 'Demo Admin',
      email: 'admin@gymsmart.com',
      role: AuthRoleConstants.ADMIN,
      tenantId: 'tenant-demo',
    },
    [AuthRoleConstants.MANAGER]: {
      id: 'mock-manager',
      name: 'Demo Manager',
      email: 'manager@gymsmart.com',
      role: AuthRoleConstants.MANAGER,
      tenantId: 'tenant-demo',
    },
    [AuthRoleConstants.TRAINER]: {
      id: 'mock-trainer',
      name: 'Demo Trainer',
      email: 'trainer@gymsmart.com',
      role: AuthRoleConstants.TRAINER,
      tenantId: 'tenant-demo',
    },
  } satisfies Record<AuthRole, AuthUser>,
} as const;
