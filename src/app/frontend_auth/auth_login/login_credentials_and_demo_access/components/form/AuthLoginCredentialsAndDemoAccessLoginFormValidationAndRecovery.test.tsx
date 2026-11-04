import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { StatusCodes } from 'http-status-codes';

import { http, HttpResponse } from 'msw';

import { setupServer } from 'msw/node';

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessErrorConstants';

import { AuthMockPublicFixtures } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/mocks/fixtures/AuthLoginCredentialsAndDemoAccessMockPublicFixtures';

import { AuthMockBrowserHandlers } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/mocks/handlers/AuthLoginCredentialsAndDemoAccessMockBrowserHandlers';

import { AuthTestEnvironmentConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/tests/AuthLoginCredentialsAndDemoAccessTestEnvironmentConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';

import AuthLoginForm from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/form/AuthLoginCredentialsAndDemoAccessLoginForm';

import type { ReactNode } from 'react';


const translations: Record<string, string> = {
  BACK_TO_HOME: 'Back to Home', BACK_TO_HOME_ARIA: 'Back to landing page', BRAND: 'GymSmart',
  FORM_TITLE: 'Welcome Back', FORM_SUBTITLE: 'Sign in to your admin dashboard', FORM_EMAIL_LABEL: 'Email Address', FORM_EMAIL_PLACEHOLDER: 'admin@gymsmart.com',
  FORM_PASSWORD_LABEL: 'Password', FORM_PASSWORD_PLACEHOLDER: '••••••••', FORM_SUBMIT: 'Sign In', FORM_SUBMITTING: 'Signing in…',
  OFFLINE: 'Connection unavailable. Check your internet connection and try again.', QUICK_DEMOS: 'Development Demo Logins', DEMO_LOADING: 'Loading demo…',
  SHOW_PASSWORD: 'Show password', HIDE_PASSWORD: 'Hide password', FOOTER: 'Secured with 256-bit encryption · GymSmart ERP',
  'VALIDATION.EMAIL_INVALID': 'Please enter a valid email address', 'VALIDATION.PASSWORD_MIN_LENGTH': 'Password must be at least 6 characters',
  'ERRORS.UNAVAILABLE': 'We could not sign you in. Please try again.', 'DEMO.ADMIN': 'Admin', 'DEMO.SUPERADMIN': 'Superadmin',
  'DEMO.MANAGER': 'Manager', 'DEMO.TRAINER': 'Trainer',
};
const translationsLookup = (key: string) => translations[key] ?? key;
const replaceMock = vi.fn();
const server = setupServer(...AuthMockBrowserHandlers);
vi.mock('next-intl', () => ({
  useTranslations: () => translationsLookup,
}));
vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt?: string; className?: string }) => <span role="img" aria-label={alt ?? ''} data-src={src} className={className} />,
}));
vi.mock('next/link', () => ({
  default: ({ href, children, className, 'aria-label': ariaLabel, 'data-testid': dataTestId }: { href: string; children: ReactNode; className?: string; 'aria-label'?: string; 'data-testid'?: string }) => <a href={href} className={className} aria-label={ariaLabel} data-testid={dataTestId}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
}));
const authEnv = vi.hoisted(() => ({
  NODE_ENV: 'test',
  NEXT_PUBLIC_AUTH_DEMO_MODE: 'false',
  AUTH_DEMO_MODE: 'false',
  NEXT_PUBLIC_API_URL: AuthTestEnvironmentConstants.BACKEND_ORIGIN,
}));
vi.mock('@/config/env', () => ({ env: authEnv }));
vi.mock('@/lib/api', () => ({
  apiFetch: (url: string, options?: RequestInit) => fetch(new URL(url, AuthTestEnvironmentConstants.ORIGIN), options),
}));
function renderLogin() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(<QueryClientProvider client={queryClient}><AuthLoginForm /></QueryClientProvider>);
}
describe('AuthLoginForm', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  beforeEach(() => {
    vi.clearAllMocks();
    authEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'false';
    authEnv.AUTH_DEMO_MODE = 'false';
    server.resetHandlers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    authEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'false';
    authEnv.AUTH_DEMO_MODE = 'false';
  });
  afterAll(() => server.close());
  it('shows validation errors and blocks the authentication request for invalid input', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.click(screen.getByTestId('auth_login-form-submit'));
    expect(await screen.findByTestId('auth_login-form-email-error')).toHaveTextContent('Please enter a valid email address');
    expect(await screen.findByTestId('auth_login-form-password-error')).toHaveTextContent('Password must be at least 6 characters');
  });
  it('renders the backend-provided safe message instead of replacing it with a generic error', async () => {
    const backendMessage = 'Credentials were rejected by the authentication service.';
    server.use(http.post(AuthUrlConfig.PROXY_API.SESSION, () => HttpResponse.json(
      {
        success: false,
        message: backendMessage,
        data: null,
        error: AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
        errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
        statusCode: StatusCodes.UNAUTHORIZED,
      },
      { status: StatusCodes.UNAUTHORIZED },
    )));
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByTestId('auth_login-form-email'), 'admin@example.com');
    await user.type(screen.getByTestId('auth_login-form-password'), 'wrong123');
    await user.click(screen.getByTestId('auth_login-form-submit'));
    expect(await screen.findByTestId('auth_login-form-error')).toHaveTextContent(backendMessage);
  });
  it('preserves entered credentials after a server-side authentication failure', async () => {
    server.use(http.post(AuthUrlConfig.PROXY_API.SESSION, () => HttpResponse.json(
      {
        success: false,
        message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
        data: null,
        error: AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
        errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
        statusCode: StatusCodes.UNAUTHORIZED,
      },
      { status: StatusCodes.UNAUTHORIZED },
    )));
    const user = userEvent.setup();
    renderLogin();
    const email = AuthMockPublicFixtures.USERS.ADMIN.email;
    await user.type(screen.getByTestId('auth_login-form-email'), email);
    await user.type(screen.getByTestId('auth_login-form-password'), 'wrong123');
    await user.click(screen.getByTestId('auth_login-form-submit'));
    expect(await screen.findByTestId('auth_login-form-error')).toHaveTextContent(AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS);
    expect(screen.getByTestId('auth_login-form-email')).toHaveValue(email);
    expect(screen.getByTestId('auth_login-form-password')).toHaveValue('wrong123');
  });
  it('validates fields on blur before submission', async () => {
    const user = userEvent.setup();
    renderLogin();
    const email = screen.getByTestId('auth_login-form-email');
    await user.type(email, 'not-an-email');
    await user.tab();
    expect(await screen.findByTestId('auth_login-form-email-error')).toHaveTextContent('Please enter a valid email address');
    expect(email).toHaveAttribute('aria-describedby', 'login-email-error');
  });
  it('shows a success check after a valid field has been entered and blurred', async () => {
    const user = userEvent.setup();
    renderLogin();
    const email = screen.getByTestId('auth_login-form-email');
    const password = screen.getByTestId('auth_login-form-password');
    await user.type(email, AuthMockPublicFixtures.USERS.ADMIN.email);
    await user.tab();
    expect(await screen.findByTestId('auth_login-form-email-success')).toBeInTheDocument();
    await user.type(password, 'demo123');
    await user.tab();
    expect(await screen.findByTestId('auth_login-form-password-success')).toBeInTheDocument();
  });
  it('keeps Back to Home bound to the centralized URL contract', () => {
    renderLogin();
    expect(screen.getByTestId('auth_login-form-back_home')).toHaveAttribute('href', AuthUrlConfig.PAGES.LANDING);
  });
  it('shows the documented offline state and re-enables network actions after recovery', () => {
    let online = false;
    vi.spyOn(navigator, 'onLine', 'get').mockImplementation(() => online);
    renderLogin();
    expect(screen.getByTestId('auth_login-form-offline')).toHaveTextContent('Connection unavailable. Check your internet connection and try again.');
    expect(screen.getByTestId('auth_login-form-submit')).toBeDisabled();
    online = true;
    fireEvent(window, new Event('online'));
    expect(screen.queryByTestId('auth_login-form-offline')).not.toBeInTheDocument();
    expect(screen.getByTestId('auth_login-form-submit')).not.toBeDisabled();
  });
  it('disables development demo actions while offline when demo mode is enabled', () => {
    let online = false;
    vi.spyOn(navigator, 'onLine', 'get').mockImplementation(() => online);
    authEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'true';
    renderLogin();
    expect(screen.getByTestId('auth_login-demo-admin')).toBeDisabled();
    expect(screen.getByTestId('auth_login-demo-manager')).toBeDisabled();
  });
});
