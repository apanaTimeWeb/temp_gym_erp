import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginErrorBoundaryFallback from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/error_boundary/AuthLoginCredentialsAndDemoAccessLoginErrorBoundaryFallback';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    'CLIENT_ERROR.TITLE': 'Login Component Failed',
    'CLIENT_ERROR.DESCRIPTION': 'The Login section could not be rendered safely.',
    'CLIENT_ERROR.RETRY': 'Try Again',
  }[key] ?? key),
}));

describe('AuthLoginErrorBoundaryFallback', () => {
  it('provides an accessible retry action with the required AI-testable identifier', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<AuthLoginErrorBoundaryFallback onRetry={onRetry} />);

    const retry = screen.getByTestId('auth_login-error_boundary-retry');
    expect(retry).toHaveAccessibleName('Try Again');
    await user.click(retry);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
