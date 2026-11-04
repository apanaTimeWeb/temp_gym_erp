// RESPONSIBILITY: Captures client render errors inside Login and renders the module-owned retry fallback.
'use client';

import { Component } from 'react';

import { logger } from '@/lib/logger';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';

import AuthLoginErrorBoundaryFallback from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/error_boundary/AuthLoginCredentialsAndDemoAccessLoginErrorBoundaryFallback';

import type { AuthLoginErrorBoundaryProps, AuthLoginErrorBoundaryState } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginErrorTypes';

import type { ErrorInfo } from 'react';


/**
 * Catches Login client-component render failures and exposes a user-safe retry action.
 * @description Isolates client render failures so the Login route can recover without exposing technical details.
 * @dependencies React Component, centralized logger, and AuthLoginErrorBoundaryFallback.
 * @edge-case Retry clears only this boundary's error state and does not mutate an authentication session.
 */
export default class AuthLoginErrorBoundary extends Component<AuthLoginErrorBoundaryProps, AuthLoginErrorBoundaryState> {
  public state: AuthLoginErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): AuthLoginErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Auth login component error', {
      route: AuthUrlConfig.PAGES.LOGIN,
      module: 'auth/login',
      errorName: error.name,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  public render() {
    if (!this.state.hasError) return this.props.children;
    return <AuthLoginErrorBoundaryFallback onRetry={this.handleRetry} />;
  }
}
