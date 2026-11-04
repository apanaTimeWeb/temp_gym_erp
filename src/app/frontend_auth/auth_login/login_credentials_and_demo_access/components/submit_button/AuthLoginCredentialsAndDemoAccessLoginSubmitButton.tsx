// RESPONSIBILITY: Renders the Login form submit control and its asynchronous loading state.
'use client';

import { ArrowRight, Loader2 } from 'lucide-react';

import type { AuthLoginSubmitButtonProps } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginTypes';



/**
 * Renders the primary Login action with documented loading and disabled behavior.
 * @description Contains no authentication logic; state is supplied by the form hook.
 * @dependencies Lucide icons and semantic button tokens.
 * @edge-case Disabled state prevents duplicate submission while the mutation is pending or browser connectivity is unavailable.
 */
export default function AuthLoginSubmitButton({ isSubmitting, isDisabled, label, submittingLabel }: AuthLoginSubmitButtonProps) {
  return (
    <button
      type="submit"
      data-testid="auth_login-form-submit"
      disabled={isDisabled}
      aria-busy={isSubmitting}
      className="group flex min-h-11 w-full items-center justify-center gap-2 sm:w-32 sm:self-end rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover disabled:hover:bg-primary motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isSubmitting ? (
        <><Loader2 size={18} strokeWidth={2} aria-hidden="true" className="motion-safe:animate-spin" /><span>{submittingLabel}</span></>
      ) : (
        <><span>{label}</span><ArrowRight size={18} strokeWidth={2} aria-hidden="true" className="motion-safe:transition-transform motion-safe:duration-base ease-in-out motion-safe:group-hover:translate-x-0.5" /></>
      )}
    </button>
  );
}
