import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginHeroSecureStatus from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/hero_secure_status/AuthLoginCredentialsAndDemoAccessLoginHeroSecureStatus';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('AuthLoginHeroSecureStatus', () => {
  it('renders the translated secure status indicator', () => {
    render(<AuthLoginHeroSecureStatus />);
    expect(screen.getByTestId('auth_login-hero_secure-status')).toBeInTheDocument();
    expect(screen.getByText('SECURE_BADGE')).toBeInTheDocument();
  });
});
