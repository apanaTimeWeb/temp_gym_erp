import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import AuthLoginLoadingFormSkeleton from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/loading_skeleton/AuthLoginCredentialsAndDemoAccessLoginLoadingFormSkeleton';



describe('AuthLoginLoadingFormSkeleton', () => {
  it('renders the form placeholder boundary', () => {
    render(<AuthLoginLoadingFormSkeleton />);
    expect(screen.getByTestId('auth_login-loading_form-skeleton')).toBeInTheDocument();
  });
});
