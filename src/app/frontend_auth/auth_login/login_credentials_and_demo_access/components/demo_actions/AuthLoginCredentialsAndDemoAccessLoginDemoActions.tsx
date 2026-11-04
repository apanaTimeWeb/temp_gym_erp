// RESPONSIBILITY: Renders development-only Login demo role actions and their pending state.
'use client';

import { Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { AuthLoginConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessLoginConstants';

import type { AuthLoginDemoActionsProps } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginTypes';



/**
 * Renders the four documented role-only demo actions when public demo mode is enabled.
 * @description Credentials remain server-only; this component renders only role metadata.
 * @dependencies Login constants, next-intl, and the demo action callback.
 * @edge-case All demo actions are disabled during any active submission or when browser connectivity is unavailable.
 */
export default function AuthLoginDemoActions({ isSubmitting, isOffline, isDemoLoginAvailable, pendingDemoRole, onDemoLogin, quickDemosLabel, loadingLabel }: AuthLoginDemoActionsProps) {
  const t = useTranslations('AUTH_LOGIN');
  if (!isDemoLoginAvailable) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 py-2">
        <div className="h-0 flex-1 border-t border-border" />
        <span className="text-xs font-semibold uppercase tracking-wide text-secondary">{quickDemosLabel}</span>
        <div className="h-0 flex-1 border-t border-border" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {AuthLoginConstants.DEMO_BUTTONS.map((demo) => (
          <button
            key={demo.role}
            type="button"
            data-testid={`auth_login-demo-${demo.role.toLowerCase()}`}
            disabled={isSubmitting || isOffline}
            aria-busy={pendingDemoRole === demo.role}
            onClick={() => { void onDemoLogin(demo.role); }}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-transparent px-3 py-2 text-sm font-semibold text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-subtle disabled:hover:bg-transparent motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pendingDemoRole === demo.role ? <><Loader2 size={18} strokeWidth={2} aria-hidden="true" className="motion-safe:animate-spin" /><span>{loadingLabel}</span></> : t(demo.labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
}
