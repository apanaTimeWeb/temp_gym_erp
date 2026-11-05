// RESPONSIBILITY: Standalone mock-server lifecycle for the read-only Reports catalog.
// No business API handlers are registered because this leaf only renders verified owning-domain links.
import { setupServer } from 'msw/node';

export const adminFeatureMockServer = setupServer();
export function startAdminFeatureMockServer(): void { adminFeatureMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetAdminFeatureMockServer(): void { adminFeatureMockServer.resetHandlers(); }
export function stopAdminFeatureMockServer(): void { adminFeatureMockServer.close(); }
export const adminFeatureScenarioHandlerCount = 0;
