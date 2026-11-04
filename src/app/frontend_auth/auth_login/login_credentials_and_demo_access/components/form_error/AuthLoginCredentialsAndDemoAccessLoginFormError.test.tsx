import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import AuthLoginFormError from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/form_error/AuthLoginCredentialsAndDemoAccessLoginFormError';



describe('AuthLoginFormError', () => {
  it('renders a user-safe error when a message exists', () => {
    render(<AuthLoginFormError message="Invalid email or password." />);
    expect(screen.getByTestId('auth_login-form-error')).toHaveTextContent('Invalid email or password.');
  });

  it('renders nothing when no message exists', () => {
    const { container } = render(<AuthLoginFormError message={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });
});
