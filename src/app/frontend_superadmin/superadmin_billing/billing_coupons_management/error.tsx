// RESPONSIBILITY: Renders/orchestrates error within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: error.tsx handles module-level rendering errors.
import { useEffect } from 'react';

import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { logger } from '@/lib/logger';


/**
 * @description Renders ErrorBoundary within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function ErrorBoundary({ error, reset }: {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}) {
  const t = useTranslations('superadmin_coupons');
// EFFECT INTENT: synchronizes this client-side side effect with the dependency list; changes to captured values intentionally re-run it.
    useEffect(() => {
        logger.error('Module Error:', error);
    }, [error]);
    return (<div className="flex flex-col items-center justify-center min-h-96 p-8 bg-card border border-border rounded-xl shadow-card" data-testid="superadmin_coupons-error-superadmin-coupons-error-error">
      <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mb-4">
        <AlertTriangle size={18} className="text-danger"/>
      </div>
      <h2 className="text-xl font-bold text-primary mb-2">{t('ui.failed_to_load_view_f0191174')}</h2>
      <p className="text-secondary text-sm max-w-md text-center mb-6">
        {t('ui.an_unexpected_error_occurred_while_rendering_1a97607b')}</p>
      <button type="button" onClick={reset} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-on-primary px-6 py-2.5 rounded-lg font-medium motion-safe:transition-colors shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_coupons-error-coupons-error-try-again">
        <RefreshCcw size={18}/>
        {t('ui.try_again_d876a9fe')}</button>
    </div>);
}
