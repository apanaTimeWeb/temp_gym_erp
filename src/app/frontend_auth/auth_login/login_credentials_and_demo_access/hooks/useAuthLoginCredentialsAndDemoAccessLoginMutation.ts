// RESPONSIBILITY: Owns the TanStack Query login mutation, including feature-local idempotency-key transport supplied by the user-intent owner.
// DATA FLOW: Login form submit/demo action -> useAuthLoginMutation -> AuthApi -> Auth route -> sanitized AuthUser result.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthApi } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApi';

import { AUTH_QUERY_KEYS } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessQueryKeys';

import { AuthLoginMutationMode } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessLoginConstants';

import type { AuthApiError } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApiError';

import type { AuthLoginMutationInput, AuthLoginMutationResult, UseAuthLoginMutationReturn } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginTypes';



/**
 * Creates the Login mutation boundary used by the Login form hook.
 * @description Keeps network orchestration independent from form presentation. The hook never invents an idempotency key; the form intent owner generates it at submission time and passes it through unchanged.
 * @dependencies TanStack Query and AuthApi.
 * @edge-case Replayed mutations receive the same caller-owned key; a changed intent must supply a newly generated key.
 */
export function useAuthLoginMutation(): UseAuthLoginMutationReturn {
  const queryClient = useQueryClient();

  const mutation = useMutation<AuthLoginMutationResult, AuthApiError, AuthLoginMutationInput>({
    mutationFn: async (input) => {
      if (input.mode === AuthLoginMutationMode.CREDENTIALS) {
        return AuthApi.login(input.credentials, input.idempotencyKey);
      }
      return AuthApi.loginDemo(input.role, input.idempotencyKey);
    },
    retry: false,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.tokenStatus(), { authenticated: true, user });
      void queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.tokenStatus() });
    },
  });

  return {
    isPending: mutation.isPending,
    variables: mutation.variables,
    mutateCredentials: (credentials, idempotencyKey) => mutation.mutateAsync({
      mode: AuthLoginMutationMode.CREDENTIALS,
      credentials,
      idempotencyKey,
    }),
    mutateDemoRole: (role, idempotencyKey) => mutation.mutateAsync({
      mode: AuthLoginMutationMode.DEMO,
      role,
      idempotencyKey,
    }),
  };
}
