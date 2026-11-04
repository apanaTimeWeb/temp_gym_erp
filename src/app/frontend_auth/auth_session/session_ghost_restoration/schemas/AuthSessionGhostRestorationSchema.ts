// RESPONSIBILITY: Validate restored identity-cookie data without trusting it for authorization.
import { z } from 'zod';
import { AuthRoleConstants } from '@/app/frontend_auth/auth_session/session_ghost_restoration/constants/AuthSessionGhostRestorationRoleConstants';

export const AuthGhostRestorationRoleSchema = z.enum([
  AuthRoleConstants.SUPERADMIN,
  AuthRoleConstants.ADMIN,
  AuthRoleConstants.MANAGER,
  AuthRoleConstants.TRAINER,
]);
export const AuthSessionUserCookieSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  role: AuthGhostRestorationRoleSchema,
  tenantId: z.string().min(1).optional(),
});
