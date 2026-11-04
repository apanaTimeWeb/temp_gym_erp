/**
 * RESPONSIBILITY: Defines the Auth-supported ERP role identifiers used by redirect and development-demo logic.
 * DATA FLOW: Role values -> server redirect map and development-only mock selection.
 */
export const AuthRoleConstants = {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  TRAINER: 'TRAINER',
} as const;

