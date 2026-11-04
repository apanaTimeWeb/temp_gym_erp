import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useForm } from 'react-hook-form';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginCredentialFields from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/credential_fields/AuthLoginCredentialsAndDemoAccessLoginCredentialFields';

import type { AuthLoginFormData } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginTypes';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    FORM_EMAIL_LABEL: 'Email Address',
    FORM_EMAIL_PLACEHOLDER: 'admin@gymsmart.com',
    FORM_PASSWORD_LABEL: 'Password',
    FORM_PASSWORD_PLACEHOLDER: '••••••••',
    SHOW_PASSWORD: 'Show password',
    HIDE_PASSWORD: 'Hide password',
  }[key] ?? key),
}));

vi.mock('lucide-react', () => ({
  CheckCircle2: () => <span aria-hidden="true" />,
  Eye: () => <span aria-hidden="true" />,
  EyeOff: () => <span aria-hidden="true" />,
  Lock: () => <span aria-hidden="true" />,
  Mail: () => <span aria-hidden="true" />,
}));

function TestHarness({ isSubmitting = false, isReadOnly = false, showPassword = false, onTogglePassword = vi.fn() }) {
  const form = useForm<AuthLoginFormData>({ defaultValues: { email: '', password: '' } });
  return (
    <AuthLoginCredentialFields
      form={form}
      isSubmitting={isSubmitting}
      isReadOnly={isReadOnly}
      showPassword={showPassword}
      onTogglePassword={onTogglePassword}
    />
  );
}

describe('AuthLoginCredentialFields', () => {
  it('renders accessible email and password controls', () => {
    render(<TestHarness />);

    expect(screen.getByTestId('auth_login-form-email')).toHaveAccessibleName('Email Address');
    expect(screen.getByTestId('auth_login-form-password')).toHaveAccessibleName('Password');
    expect(screen.getByTestId('auth_login-form-password-toggle')).toHaveAccessibleName('Show password');
  });

  it('delegates password visibility changes to the parent state owner', async () => {
    const user = userEvent.setup();
    const onTogglePassword = vi.fn();
    render(<TestHarness onTogglePassword={onTogglePassword} />);

    await user.click(screen.getByTestId('auth_login-form-password-toggle'));

    expect(onTogglePassword).toHaveBeenCalledTimes(1);
  });

  it('supports explicit read-only state without disabling field semantics', () => {
    render(<TestHarness isReadOnly />);

    expect(screen.getByTestId('auth_login-form-email')).toHaveAttribute('readonly');
    expect(screen.getByTestId('auth_login-form-password')).toHaveAttribute('readonly');
    expect(screen.getByTestId('auth_login-form-password-toggle')).toBeDisabled();
  });

  it('disables credential controls while an authentication mutation is pending', () => {
    render(<TestHarness isSubmitting />);

    expect(screen.getByTestId('auth_login-form-email')).toBeDisabled();
    expect(screen.getByTestId('auth_login-form-password')).toBeDisabled();
    expect(screen.getByTestId('auth_login-form-password-toggle')).toBeDisabled();
  });
});
