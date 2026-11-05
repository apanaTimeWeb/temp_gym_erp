import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { AuthRoleConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessRoleConstants';

import AuthLoginDemoActions from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/demo_actions/AuthLoginCredentialsAndDemoAccessLoginDemoActions';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    'DEMO.SUPERADMIN': 'Superadmin',
    'DEMO.ADMIN': 'Admin',
    'DEMO.MANAGER': 'Manager',
    'DEMO.TRAINER': 'Trainer',
  }[key] ?? key),
}));

vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  return {
    ...actual,
    Loader2: () => <span aria-hidden="true" />,
  };
});

describe('AuthLoginDemoActions', () => {
  it('renders nothing when development demo login is unavailable', () => {
    render(
      <AuthLoginDemoActions
        isSubmitting={false}
        isOffline={false}
        isDemoLoginAvailable={false}
        pendingDemoRole={null}
        onDemoLogin={vi.fn()}
        quickDemosLabel="Development Demo Logins"
        loadingLabel="Loading demo…"
      />,
    );

    expect(screen.queryByTestId('auth_login-demo-admin')).not.toBeInTheDocument();
  });

  it('emits the selected role and exposes a stable pending state', async () => {
    const user = userEvent.setup();
    const onDemoLogin = vi.fn();
    const { rerender } = render(
      <AuthLoginDemoActions
        isSubmitting={false}
        isOffline={false}
        isDemoLoginAvailable
        pendingDemoRole={null}
        onDemoLogin={onDemoLogin}
        quickDemosLabel="Development Demo Logins"
        loadingLabel="Loading demo…"
      />,
    );

    await user.click(screen.getByTestId('auth_login-demo-manager'));
    expect(onDemoLogin).toHaveBeenCalledWith(AuthRoleConstants.MANAGER);

    rerender(
      <AuthLoginDemoActions
        isSubmitting
        isOffline={false}
        isDemoLoginAvailable
        pendingDemoRole={AuthRoleConstants.MANAGER}
        onDemoLogin={onDemoLogin}
        quickDemosLabel="Development Demo Logins"
        loadingLabel="Loading demo…"
      />,
    );

    expect(screen.getByTestId('auth_login-demo-manager')).toBeDisabled();
    expect(screen.getByTestId('auth_login-demo-manager')).toHaveAttribute('aria-busy', 'true');
  });
});
