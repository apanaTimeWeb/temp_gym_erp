// RESPONSIBILITY: Start/seed/reset an owner-local MSW server for standalone Login tests.
// HOST: Requires MSW v2, the module's own fixtures and the standard host test environment.
import { setupServer } from 'msw/node';
import type { RequestHandler } from 'msw';
import { AuthMockBrowserHandlers } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/mocks/handlers/AuthLoginCredentialsAndDemoAccessMockBrowserHandlers';
import { AuthMockBrowserScenarioHandlers } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/mocks/handlers/AuthLoginCredentialsAndDemoAccessMockBrowserScenarioHandlers';

// The normal browser proxy is handled by Next route files; only the verified
// unavailable-login response is intercepted in the standalone error scenario.
export const mockServer = setupServer(AuthMockBrowserScenarioHandlers.unavailableLogin, ...AuthMockBrowserHandlers);
export function installMockServer(): void { mockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetMockServer(): void { mockServer.resetHandlers(); }
export function closeMockServer(): void { mockServer.close(); }
export function useLoginMockHandlers(...handlers: RequestHandler[]): void { mockServer.use(...handlers); }

// A test can call useLoginMockHandlers() to select any explicitly defined
// module-local response. Never substitute a fake production Auth backend.
export const AuthLoginCredentialsAndDemoAccessHarness = {
  server: mockServer,
  start: installMockServer,
  reset: resetMockServer,
  stop: closeMockServer,
  override: useLoginMockHandlers,
} as const;
