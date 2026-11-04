import { z } from 'zod';

const AuthServerRuntimeEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  AUTH_DEMO_MODE: z.enum(['true', 'false']).default('false'),
});

/**
 * Reads the private server Auth runtime environment without consulting any public client flag.
 * @description Applies the Auth-specific Zod constraints before server-only behavior consumes the values.
 * @dependencies Zod and the private process environment.
 * @edge-case Missing demo configuration defaults to disabled; malformed values fail validation.
 */
function readAuthServerRuntimeEnv() {
  return AuthServerRuntimeEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV || 'production',
    AUTH_DEMO_MODE: process.env.AUTH_DEMO_MODE || 'false',
  });
}

export const AuthServerRuntimeConfig = {
  isProduction(): boolean {
    return readAuthServerRuntimeEnv().NODE_ENV === 'production';
  },

  isLoginDemoEnabled(): boolean {
    const runtime = readAuthServerRuntimeEnv();
    return runtime.NODE_ENV !== 'production' && runtime.AUTH_DEMO_MODE === 'true';
  },
} as const;
