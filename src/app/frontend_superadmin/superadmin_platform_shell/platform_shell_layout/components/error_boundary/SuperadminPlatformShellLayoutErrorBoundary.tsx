// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellLayoutErrorBoundary within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Superadmin module error fallback and exposes the documented recovery action without leaking internal error details.
import { Component } from 'react';

import { useTranslations } from 'next-intl';

import type { SuperadminPlatformShellLayoutErrorBoundaryCopy, SuperadminPlatformShellLayoutErrorBoundaryProps, SuperadminPlatformShellLayoutErrorBoundaryState } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/types/superadmin_platform_shell_layout_infrastructure.types';



class SuperadminPlatformShellLayoutErrorBoundaryInner extends Component<SuperadminPlatformShellLayoutErrorBoundaryProps & SuperadminPlatformShellLayoutErrorBoundaryCopy, SuperadminPlatformShellLayoutErrorBoundaryState> {
  state: SuperadminPlatformShellLayoutErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SuperadminPlatformShellLayoutErrorBoundaryState {
    return { hasError: true };
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    const compact = this.props.variant === 'inline';
    return (
      <section className={compact ? 'rounded-xl border border-border bg-card p-6 text-center' : 'min-h-64 rounded-xl border border-border bg-card p-8 text-center'} role="alert" data-testid={this.props.testId ?? 'SuperadminPlatformShellLayoutStyles-superadmin-layout-error-boundary-SuperadminPlatformShellLayoutStyles-error-boundary-state'}>
        <h2 className="text-base font-semibold text-primary" data-testid="SuperadminPlatformShellLayoutStyles-superadmin-layout-error-boundary-layout-error-boundary-error">{this.props.title}</h2>
        <button
          type="button"
          onClick={this.handleRetry}
          className="mt-4 min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95"
          data-testid="SuperadminPlatformShellLayoutStyles-superadmin-layout-error-boundary-SuperadminPlatformShellLayoutStyles-error-boundary-retry"
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
export function SuperadminPlatformShellLayoutErrorBoundary({ children, variant = 'default' }: SuperadminPlatformShellLayoutErrorBoundaryProps) {
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  return (
    <SuperadminPlatformShellLayoutErrorBoundaryInner
      variant={variant}
      testId="superadmin_platform_shell_layout-layouterrorboundary-state"
      title={t('ui.error_boundary_title')}
      retry={t('ui.retry')}
>
      {children}
    </SuperadminPlatformShellLayoutErrorBoundaryInner>
  );
}
