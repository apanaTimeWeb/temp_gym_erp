import { z } from 'zod';

import { AuthLoginConstants, AuthLoginFormTranslationKeys } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessLoginConstants';

import type { AuthLoginFormTranslator } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginTypes';



/**
 * Builds the Login credential schema using the active Login locale and centralized password length rule.
 * @param translate Translation lookup scoped to the Login feature.
 * @description Keeps validation ownership at the canonical Login schema boundary.
 * @edge-case Invalid email and short password messages always come from the active translation contract.
 */
export const AuthLoginFormSchema = (translate: AuthLoginFormTranslator) =>
  z.object({
    email: z.string().email(translate(AuthLoginFormTranslationKeys.EMAIL_INVALID)),
    password: z.string().min(
      AuthLoginConstants.PASSWORD_MIN_LENGTH,
      translate(AuthLoginFormTranslationKeys.PASSWORD_MIN_LENGTH),
    ),
  });
