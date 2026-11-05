import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { StatusCodes } from 'http-status-codes';

import { http, HttpResponse } from 'msw';

import { setupServer } from 'msw/node';

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessResponseMessages';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessSessionConstants';

import { AuthMockPublicFixtures } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/mocks/fixtures/AuthLoginCredentialsAndDemoAccessMockPublicFixtures';

import { AuthMockBrowserScenarioHandlers } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/mocks/handlers/AuthLoginCredentialsAndDemoAccessMockBrowserScenarioHandlers';

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
  NEXT_PUBLIC_API_URL: 'http://auth.test:4000',
}));
vi.mock('@/config/env', () => ({ env: authEnv }));
vi.mock('@/lib/api', () => ({
  apiFetch: (url: string, options?: RequestInit) => fetch(new URL(url, window.location.origin), options),
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
  it('allows keyboard users to toggle password visibility without submitting', async () => {
    const user = userEvent.setup();
    renderLogin();
    const password = screen.getByTestId('auth_login-form-password');
    const toggle = screen.getByTestId('auth_login-form-password-toggle');
    await user.type(password, 'demo123');
    await user.click(toggle);
    expect(password).toHaveAttribute('type', 'text');
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });
  it('uses the real AuthApi path and module MSW handler for a successful credential login', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByTestId('auth_login-form-email'), AuthMockPublicFixtures.USERS.ADMIN.email);
    await user.type(screen.getByTestId('auth_login-form-password'), 'demo123');
    await user.click(screen.getByTestId('auth_login-form-submit'));
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(AuthUrlConfig.PAGES.ADMIN_DASHBOARD));
    expect(screen.queryByTestId('auth_login-form-error')).not.toBeInTheDocument();
  });
  it('shows an observable loading state while the real AuthApi request is pending', async () => {
    let resolveLogin: ((response: Response) => void) | undefined;
    server.use(http.post(AuthUrlConfig.PROXY_API.SESSION, async () => new Promise<Response>((resolve) => { resolveLogin = resolve; })));
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByTestId('auth_login-form-email'), AuthMockPublicFixtures.USERS.ADMIN.email);
    await user.type(screen.getByTestId('auth_login-form-password'), 'demo123');
    await user.click(screen.getByTestId('auth_login-form-submit'));
    expect(await screen.findByTestId('auth_login-form-submit')).toBeDisabled();
    expect(screen.getByTestId('auth_login-form-submit')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Signing in…')).toBeInTheDocument();
    resolveLogin?.(HttpResponse.json({
      success: true,
      requestId: '9b3f161a-e3a5-41a4-9781-b33abbf4d4aa',
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: { id: 'mock-admin', name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant-demo' },
    }));
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(AuthUrlConfig.PAGES.ADMIN_DASHBOARD));
  });
  it('surfaces a module-owned MSW error scenario without exposing technical details', async () => {
    server.use(AuthMockBrowserScenarioHandlers.unavailableLogin);
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByTestId('auth_login-form-email'), 'invalid@example.com');
    await user.type(screen.getByTestId('auth_login-form-password'), 'wrong123');
    await user.click(screen.getByTestId('auth_login-form-submit'));
    expect(await screen.findByTestId('auth_login-form-error')).toHaveTextContent(AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE);
    expect(screen.getByTestId('auth_login-form-error')).not.toHaveTextContent('internal details');
  });
  it('reuses the same idempotency key when the same real user intent is retried after failure', async () => {
    let attempt = 0;
    const seenKeys: string[] = [];
    server.use(http.post(AuthUrlConfig.PROXY_API.SESSION, async ({ request }) => {
      seenKeys.push(request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY) ?? '');
      attempt += 1;
      if (attempt === 1) {
        return HttpResponse.json(
          { success: false, message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS, data: null, errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED, statusCode: StatusCodes.UNAUTHORIZED },
          { status: StatusCodes.UNAUTHORIZED },
        );
      }
      return HttpResponse.json({
        success: true,
        requestId: '9b3f161a-e3a5-41a4-9781-b33abbf4d4aa',
        message: AuthResponseMessages.LOGIN_SUCCESS,
        data: { id: 'mock-admin', name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant-demo' },
      });
    }));
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByTestId('auth_login-form-email'), AuthMockPublicFixtures.USERS.ADMIN.email);
    await user.type(screen.getByTestId('auth_login-form-password'), 'demo123');
    await user.click(screen.getByTestId('auth_login-form-submit'));
    expect(await screen.findByTestId('auth_login-form-error')).toHaveTextContent(AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS);
    await user.click(screen.getByTestId('auth_login-form-submit'));
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(AuthUrlConfig.PAGES.ADMIN_DASHBOARD));
    expect(seenKeys).toHaveLength(2);
    expect(seenKeys[0]).toBeTruthy();
    expect(seenKeys[0]).toBe(seenKeys[1]);
  });
  it('renders development demo controls only when the public demo flag is enabled', () => {
    authEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'true';
    renderLogin();
    expect(screen.getByTestId('auth_login-demo-admin')).toBeInTheDocument();
    expect(screen.getByTestId('auth_login-demo-superadmin')).toBeInTheDocument();
    expect(screen.getByTestId('auth_login-demo-manager')).toBeInTheDocument();
    expect(screen.getByTestId('auth_login-demo-trainer')).toBeInTheDocument();
  });
  it('executes a role-only demo flow through AuthApi and MSW', async () => {
    const user = userEvent.setup();
    authEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'true';
    renderLogin();
    await user.click(screen.getByTestId('auth_login-demo-manager'));
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(AuthUrlConfig.PAGES.MANAGER_DASHBOARD));
  });
  it('shows a stable loading state on the active demo button while the demo request is pending', async () => {
    let resolveDemo: ((response: Response) => void) | undefined;
    server.use(http.post(AuthUrlConfig.PROXY_API.DEMO_LOGIN, async () => new Promise<Response>((resolve) => { resolveDemo = resolve; })));
    const user = userEvent.setup();
    authEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'true';
    renderLogin();
    const demoButton = screen.getByTestId('auth_login-demo-admin');
    await user.click(demoButton);
    expect(demoButton).toBeDisabled();
    expect(demoButton).toHaveAttribute('aria-busy', 'true');
    expect(demoButton).toHaveTextContent('Loading demo…');
    resolveDemo?.(HttpResponse.json({
      success: true,
      requestId: '9b3f161a-e3a5-41a4-9781-b33abbf4d4aa',
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: { id: 'mock-admin', name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant-demo' },
    }));
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(AuthUrlConfig.PAGES.ADMIN_DASHBOARD));
  });
});

