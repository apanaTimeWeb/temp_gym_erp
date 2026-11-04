// OWNERSHIP: Isolated MSW server for the auth_session_management unit and component test suite.
import { setupServer } from 'msw/node';
import { AuthMockBackendHandlers } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/handlers/AuthSessionStatusRefreshAndRestoreMockBackendHandlers';

export const mockServer = setupServer(...AuthMockBackendHandlers);
export function installMockServer(): void { mockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetMockServer(): void { mockServer.resetHandlers(); }
export function closeMockServer(): void { mockServer.close(); }
