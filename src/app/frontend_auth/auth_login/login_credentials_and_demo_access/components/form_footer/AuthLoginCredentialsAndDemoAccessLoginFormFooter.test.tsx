import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import AuthLoginFormFooter from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/form_footer/AuthLoginCredentialsAndDemoAccessLoginFormFooter';



describe('AuthLoginFormFooter', () => {
  it('renders the supplied footer copy without changing it', () => {
    render(<AuthLoginFormFooter label="Protected by Smart Gym 360 security controls." />);
    expect(screen.getByText('Protected by Smart Gym 360 security controls.')).toBeInTheDocument();
  });
});
