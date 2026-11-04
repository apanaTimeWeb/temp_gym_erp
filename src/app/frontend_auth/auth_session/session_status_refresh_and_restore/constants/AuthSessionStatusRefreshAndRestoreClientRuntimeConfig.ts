import { z } from 'zod';

import { env } from '@/config/env';



const AuthClientRuntimeEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  NEXT_PUBLIC_AUTH_DEMO_MODE: z.enum(['true', 'false']).default('false'),
});

/**
 * Reads the public Auth runtime environment through the approved central environment contract.
 * @description Applies the client-safe Auth demo configuration schema before Login presentation consumes it.
 * @dependencies Central `env` configuration and Zod.
 * @edge-case Production never enables demo presentation even if a public flag is accidentally true.
 */
function readAuthClientRuntimeEnv() {
  return AuthClientRuntimeEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV || 'development',
    NEXT_PUBLIC_AUTH_DEMO_MODE: String(env.NEXT_PUBLIC_AUTH_DEMO_MODE).toLowerCase() === 'true' ? 'true' : 'false',
  });
}

export const AuthClientRuntimeConfig = {
  isLoginDemoEnabled(): boolean {
    const env = readAuthClientRuntimeEnv();
    return env.NODE_ENV !== 'production' && env.NEXT_PUBLIC_AUTH_DEMO_MODE === 'true';
  },
} as const;
