// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsInfrastructureErrorBoundary within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Superadmin module error fallback and exposes the documented recovery action without leaking internal error details.


import { Component } from 'react';

import { useTranslations } from 'next-intl';

import type { ReactNode } from 'react';

type LocalErrorBoundaryVariant = 'default' | 'inline';
interface LocalErrorBoundaryProps { children: ReactNode; variant?: LocalErrorBoundaryVariant; testId?: string; }
interface LocalErrorBoundaryState { hasError: boolean; }
interface LocalErrorBoundaryCopy { title: string; retry: string; }

class SuperadminSystemOpsInfrastructureErrorBoundaryInner extends Component<LocalErrorBoundaryProps & LocalErrorBoundaryCopy, LocalErrorBoundaryState> {
  state: LocalErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): LocalErrorBoundaryState {
    return { hasError: true };
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    const compact = this.props.variant === 'inline';
    return (
      <section className={compact ? 'rounded-xl border border-border bg-card p-6 text-center' : 'min-h-64 rounded-xl border border-border bg-card p-8 text-center'} role="alert" data-testid={this.props.testId ?? 'SuperadminSystemOpsOverview-error-boundary-SuperadminPlatformShellLayoutStyles-error-boundary-state'}>
        <h2 className="text-base font-semibold text-primary" data-testid="SuperadminSystemOpsInfrastructureErrorBoundary-error-message">{this.props.title}</h2>
        <button
          type="button"
          onClick={this.handleRetry}
          className="mt-4 min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95"
          data-testid="SuperadminSystemOpsInfrastructureErrorBoundary-retry"
        >
          {this.props.retry}
        </button>
      </section>
    );
  }
}

/**
 * @description Catches render-time errors at page or inline feature boundaries and exposes a safe retry state.
 * @dependencies Uses next-intl for localized fallback copy and React's class error-boundary lifecycle.
 * @edge-case Reset is local to the boundary and never exposes raw exception messages to end users.
 */
export function SuperadminSystemOpsInfrastructureErrorBoundary({ children, variant = 'default' }: LocalErrorBoundaryProps) {
  const t = useTranslations('superadmin_system_ops');
  return (
    <SuperadminSystemOpsInfrastructureErrorBoundaryInner
      variant={variant}
      testId="SuperadminSystemOpsInfrastructureErrorBoundary-state"
      title={t('ui.error_title')}
      retry={t('ui.retry')}
>
      {children}
    </SuperadminSystemOpsInfrastructureErrorBoundaryInner>
  );
}
