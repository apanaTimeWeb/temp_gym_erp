import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginFormHeaderSection from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/form_header_section/AuthLoginCredentialsAndDemoAccessLoginFormHeaderSection';

import type { ReactNode } from 'react';



vi.mock('lucide-react', () => ({ ChevronLeft: () => <span aria-hidden="true" /> }));
vi.mock('next/image', () => ({ default: ({ alt }: { alt?: string }) => <span role="img" aria-label={alt ?? ''} /> }));
vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a>,
}));

describe('AuthLoginFormHeaderSection', () => {
  it('keeps the back link on the supplied module route contract', () => {
    render(
      <AuthLoginFormHeaderSection
        backToHomeLabel="Back to Home"
        backToHomeAriaLabel="Back to landing page"
        landingRoute="/landing"
        brand="GymSmart"
        logoSource="/logo.png"
        title="Welcome Back"
        subtitle="Sign in"
      />,
    );

    expect(screen.getByTestId('auth_login-form-back_home')).toHaveAttribute('href', '/landing');
    expect(screen.getByRole('heading', { level: 1, name: 'Welcome Back' })).toBeInTheDocument();
  });
});
