import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginHeroContent from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/hero_content/AuthLoginCredentialsAndDemoAccessLoginHeroContent';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('AuthLoginHeroContent', () => {
  it('renders the documented hero copy, benefits, and statistics', () => {
    render(<AuthLoginHeroContent />);
    expect(screen.getByText('TITLE')).toBeInTheDocument();
    expect(screen.getByText('SUBTITLE')).toBeInTheDocument();
    expect(screen.getByText('HERO_DESCRIPTION')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('2L+')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
  });
});
