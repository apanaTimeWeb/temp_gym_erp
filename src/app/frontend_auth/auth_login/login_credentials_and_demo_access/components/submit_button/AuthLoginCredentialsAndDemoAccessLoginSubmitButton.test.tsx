import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginSubmitButton from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/submit_button/AuthLoginCredentialsAndDemoAccessLoginSubmitButton';



vi.mock('lucide-react', () => ({
  ArrowRight: () => <span aria-hidden="true" />,
  Loader2: () => <span aria-hidden="true" />,
}));

describe('AuthLoginSubmitButton', () => {
  it('retains its stable control identity and shows the submitting state', () => {
    render(
      <AuthLoginSubmitButton
        isSubmitting
        isDisabled
        label="Sign In"
        submittingLabel="Signing in…"
      />,
    );

    const button = screen.getByTestId('auth_login-form-submit');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveTextContent('Signing in…');
  });

  it('renders the primary action when idle', () => {
    render(
      <AuthLoginSubmitButton
        isSubmitting={false}
        isDisabled={false}
        label="Sign In"
        submittingLabel="Signing in…"
      />,
    );

    expect(screen.getByTestId('auth_login-form-submit')).toHaveTextContent('Sign In');
  });
});
