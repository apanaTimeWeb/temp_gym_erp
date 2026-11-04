// RESPONSIBILITY: Renders a user-safe authentication-level error message associated with the Login form.
'use client';

import type { AuthLoginFormErrorProps } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginTypes';



/**
 * Renders the Login authentication error region when the mutation boundary reports a failure.
 * @description Keeps form-level server feedback separate from field validation and presents only the message supplied by the Login form hook.
 * @dependencies AuthLoginFormErrorProps and the Login semantic danger surface.
 * @edge-case Returns no DOM when there is no current form-level message, preventing stale errors from surviving a successful reset.
 */
export default function AuthLoginFormError({ message }: AuthLoginFormErrorProps) {
  if (!message) return null;
  return (
    <div id="login-form-error" data-testid="auth_login-form-error" className="rounded-md border border-border bg-danger-bg p-3 text-sm text-danger" role="alert" aria-live="polite">
      {message}
    </div>
  );
}
