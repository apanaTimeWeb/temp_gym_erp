import type { ReactNode } from 'react';

// RESPONSIBILITY: Owns type-only contracts for Login error-boundary props and safe route error state.

export interface AuthLoginRouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface AuthLoginErrorBoundaryProps {
  children: ReactNode;
}

export interface AuthLoginErrorBoundaryState {
  hasError: boolean;
}

export interface AuthLoginErrorBoundaryFallbackProps {
  onRetry: () => void;
}
