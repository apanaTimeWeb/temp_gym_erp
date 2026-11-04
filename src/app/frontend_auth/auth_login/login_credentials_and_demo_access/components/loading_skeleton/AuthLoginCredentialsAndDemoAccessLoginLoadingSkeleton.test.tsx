import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginLoadingSkeleton from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/loading_skeleton/AuthLoginCredentialsAndDemoAccessLoginLoadingSkeleton';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key === 'LOADING_SCREEN' ? 'Loading Login' : key,
}));

describe('AuthLoginLoadingSkeleton', () => {
  it('renders the complete Login loading composition with a localized accessible status name', () => {
    render(<AuthLoginLoadingSkeleton />);

    expect(screen.getByTestId('auth_login-loading-root')).toHaveAttribute('aria-label', 'Loading Login');
    expect(screen.getByTestId('auth_login-loading_hero-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('auth_login-loading_form-skeleton')).toBeInTheDocument();
  });
});
