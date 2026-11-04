// RESPONSIBILITY: Mirror the frozen AuthUser cookie schema for the independent ghost-restore workflow.
import type { z } from 'zod';
import type { AuthSessionUserCookieSchema } from '@/app/frontend_auth/auth_session/session_ghost_restoration/schemas/AuthSessionGhostRestorationSchema';
export type AuthUser = z.infer<typeof AuthSessionUserCookieSchema>;
