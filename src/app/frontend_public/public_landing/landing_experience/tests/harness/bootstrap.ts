// OWNERSHIP: Landing experience has no own HTTP mutations; route content can be tested without API interception.
// The booking/contact APIs and mutable MSW scenarios belong to their autonomous sibling modules.
import { setupServer } from 'msw/node';
export const mockServer = setupServer();
export function installMockServer(): void { mockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetMockServer(): void { mockServer.resetHandlers(); }
export function closeMockServer(): void { mockServer.close(); }
