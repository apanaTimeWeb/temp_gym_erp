import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginMain from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/main/AuthLoginCredentialsAndDemoAccessLoginMain';

import type { ReactNode } from 'react';



vi.mock('@/components/ThemeToggle', () => {
  const Comp = () => <button type="button">theme</button>;
  return { default: Comp, ThemeToggle: Comp };
});
vi.mock('@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/error_boundary/AuthLoginCredentialsAndDemoAccessLoginErrorBoundary', () => ({ default: ({ children }: { children: ReactNode }) => <>{children}</> }));
vi.mock('@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/hero_section/AuthLoginCredentialsAndDemoAccessLoginHeroSection', () => ({ default: () => <section data-testid="auth_login-main-hero-section">hero</section> }));
vi.mock('@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/mobile_header/AuthLoginCredentialsAndDemoAccessLoginMobileHeader', () => ({ default: () => <div data-testid="auth_login-main-mobile-header">mobile</div> }));
vi.mock('@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/form/AuthLoginCredentialsAndDemoAccessLoginForm', () => ({ default: () => <form data-testid="auth_login-main-form">form</form> }));


describe('AuthLoginMain', () => {
  it('composes the Login hero, mobile header, and form within the feature boundary', () => {
    render(<AuthLoginMain />);
    expect(screen.getByTestId('auth_login-main-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('auth_login-main-mobile-header')).toBeInTheDocument();
    expect(screen.getByTestId('auth_login-main-form')).toBeInTheDocument();
  });
});
