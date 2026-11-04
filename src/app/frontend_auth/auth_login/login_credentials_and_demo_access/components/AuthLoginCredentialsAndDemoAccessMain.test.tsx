import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthMain from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/AuthLoginCredentialsAndDemoAccessMain';



vi.mock('@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/main/AuthLoginCredentialsAndDemoAccessLoginMain', () => ({
  default: () => <div data-testid="auth-main-login">Login surface</div>,
}));

describe('AuthMain', () => {
  it('delegates to the Login sub-feature boundary', () => {
    render(<AuthMain />);

    expect(screen.getByTestId('auth-main-login')).toBeInTheDocument();
  });
});
