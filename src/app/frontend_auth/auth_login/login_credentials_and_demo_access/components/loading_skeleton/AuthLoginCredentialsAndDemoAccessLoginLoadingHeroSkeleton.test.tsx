import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import AuthLoginLoadingHeroSkeleton from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/loading_skeleton/AuthLoginCredentialsAndDemoAccessLoginLoadingHeroSkeleton';



describe('AuthLoginLoadingHeroSkeleton', () => {
  it('renders the desktop hero placeholder boundary', () => {
    render(<AuthLoginLoadingHeroSkeleton />);
    expect(screen.getByTestId('auth_login-loading_hero-skeleton')).toBeInTheDocument();
  });
});
