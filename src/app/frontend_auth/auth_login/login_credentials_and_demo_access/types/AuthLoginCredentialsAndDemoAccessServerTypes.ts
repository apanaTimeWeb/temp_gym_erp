// RESPONSIBILITY: Login server data types derived directly from submodule-owned schemas.
import type { z } from 'zod';
import type { AuthLoginUserSchema, AuthLoginCredentialsSchema, AuthLoginRoleSchema } from '../schemas/AuthLoginCredentialsAndDemoAccessServerSchemas';
export type AuthLoginServerUser = z.infer<typeof AuthLoginUserSchema>;
export type AuthLoginServerCredentials = z.infer<typeof AuthLoginCredentialsSchema>;
export type AuthLoginServerRole = z.infer<typeof AuthLoginRoleSchema>;
