// RESPONSIBILITY: Renders/orchestrates error within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the superadmin_affiliates route-segment error fallback and provides the documented recovery path.
import { useEffect } from 'react';

import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { logger } from '@/lib/logger';

import type { SuperadminAffiliatesManagementNextErrorProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_next_error_props.types';



/**
 * @description Renders the route-segment error boundary for the owning Superadmin route and exposes a recoverable retry action.
 * @dependencies Uses the existing module logger and approved semantic design tokens; no feature business data is owned here.
 * @edge-case Avoids exposing raw error internals while keeping retry and recovery available after render failures.
 */
export default function ErrorBoundary({ error, reset }: SuperadminAffiliatesManagementNextErrorProps) {
  const t = useTranslations('superadmin_affiliates');
// EFFECT INTENT: synchronizes this client-side side effect with the dependency list; changes to captured values intentionally re-run it.
    useEffect(() => {
        logger.error('Module Error:', error);
    }, [error]);
    return (<div className="flex flex-col items-center justify-center min-h-96 p-8 bg-card border border-border rounded-xl shadow-card" data-testid="superadmin_affiliates-error-superadmin-affiliates-error-error">
      <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mb-4">
        <AlertTriangle size={18} className="text-danger"/>
      </div>
      <h2 className="text-xl font-bold text-primary mb-2">{t('ui.failed_to_load_view_34be2c7')}</h2>
      <p className="text-secondary text-sm max-w-md text-center mb-6">
        
        {t('ui.an_unexpected_error_occurred_while_rendering_thi_3176cb3')}
      </p>
      <button type="button" onClick={reset} className="min-h-11 flex items-center gap-2 bg-primary hover:bg-primary-hover text-on-primary px-6 py-2.5 rounded-lg font-medium motion-safe:transition-colors shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_affiliates-error-affiliates-error-try-again">
        <RefreshCcw size={18}/>
        
        {t('ui.try_again_cb9ee45')}
      </button>
    </div>);
}
