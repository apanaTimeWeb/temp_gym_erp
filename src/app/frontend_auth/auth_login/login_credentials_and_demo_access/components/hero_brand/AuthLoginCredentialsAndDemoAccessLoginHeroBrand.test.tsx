import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginHeroBrand from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/hero_brand/AuthLoginCredentialsAndDemoAccessLoginHeroBrand';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { src: string; alt?: string }) => <span role="img" aria-label={alt ?? ''} />,
}));

describe('AuthLoginHeroBrand', () => {
  it('renders the hero brand identity and accessible logo', () => {
    render(<AuthLoginHeroBrand />);
    expect(screen.getByText('BRAND')).toBeInTheDocument();
    expect(screen.getByText('BRAND_TAGLINE')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'BRAND' })).toBeInTheDocument();
  });
});
