// RESPONSIBILITY: Feature-local recoverable render error boundary for system_ops_migrations.
'use client';
import { Component } from 'react';

import { useTranslations } from 'next-intl';

import type { ReactNode } from 'react';


type BoundaryProps = { children: ReactNode; variant?: 'default' | 'inline'; testId?: string };
type LocalizedBoundaryProps = BoundaryProps & { title: string; retry: string };
type BoundaryState = { failed: boolean };

class SuperadminSystemOpsMigrationsErrorBoundaryInternal extends Component<LocalizedBoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };
  static getDerivedStateFromError(): BoundaryState { return { failed: true }; }
  handleRetry = (): void => { this.setState({ failed: false }); };
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section role="alert" data-testid={this.props.testId ?? 'system_ops_migrations-render-error'} className={this.props.variant === 'inline' ? 'rounded-xl border border-border bg-card p-6 text-center' : 'min-h-64 rounded-xl border border-border bg-card p-8 text-center'}>
        <h2 className="text-base font-semibold text-primary">{this.props.title}</h2>
        <button type="button" onClick={this.handleRetry} className="mt-4 min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:active:scale-95">{this.props.retry}</button>
      </section>
    );
  }
}

export function SuperadminSystemOpsMigrationsErrorBoundary({ children, variant = 'default', testId }: BoundaryProps) {
  const t = useTranslations('superadmin_system_ops_migrations');
  return <SuperadminSystemOpsMigrationsErrorBoundaryInternal variant={variant} testId={testId} title={t('ui.boundary_title')} retry={t('ui.boundary_retry')}>{children}</SuperadminSystemOpsMigrationsErrorBoundaryInternal>;
}
