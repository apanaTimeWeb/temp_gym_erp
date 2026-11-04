import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginHeroSection from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/hero_section/AuthLoginCredentialsAndDemoAccessLoginHeroSection';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { src: string; alt?: string }) => <span role="img" aria-label={alt ?? ''} />,
}));

describe('AuthLoginHeroSection', () => {
  it('renders the documented desktop brand, feature list, statistics, and secure indicator', () => {
    render(<AuthLoginHeroSection />);
    expect(screen.getByText('BRAND')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('2L+')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('SECURE_BADGE')).toBeInTheDocument();
  });
});
