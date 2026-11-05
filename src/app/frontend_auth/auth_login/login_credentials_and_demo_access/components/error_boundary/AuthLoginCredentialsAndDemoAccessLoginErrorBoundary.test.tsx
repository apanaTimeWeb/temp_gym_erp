import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginErrorBoundary from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/error_boundary/AuthLoginCredentialsAndDemoAccessLoginErrorBoundary';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    'CLIENT_ERROR.TITLE': 'Login Component Failed',
    'CLIENT_ERROR.DESCRIPTION': 'The login screen could not be rendered safely. Retry to load it again.',
    'CLIENT_ERROR.RETRY': 'Try Again',
  }[key] ?? key),
}));

vi.mock('@/lib/logger', () => ({ logger: { error: vi.fn() } }));

function ThrowingChild(): React.JSX.Element {
  throw new Error('render failure');
}

function StableChild() {
  return <div data-testid="auth_login-error-boundary-stable-child">Recovered</div>;
}

describe('AuthLoginErrorBoundary', () => {
  it('renders a retryable safe fallback and recovers the child after retry', async () => {
    const user = userEvent.setup();
    let shouldThrow = true;
    function SwitchableChild() {
      if (shouldThrow) return <ThrowingChild />;
      return <StableChild />;
    }

    render(
      <AuthLoginErrorBoundary>
        <SwitchableChild />
      </AuthLoginErrorBoundary>,
    );

    expect(await screen.findByTestId('auth_login-error_boundary-root')).toBeInTheDocument();
    shouldThrow = false;
    await user.click(screen.getByTestId('auth_login-error_boundary-retry'));
    expect(screen.getByTestId('auth_login-error-boundary-stable-child')).toBeInTheDocument();
  });
});
