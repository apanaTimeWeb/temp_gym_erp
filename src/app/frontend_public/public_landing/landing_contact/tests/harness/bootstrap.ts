// OWNERSHIP: Isolated MSW server for the landing_contact unit and component test suite.
import { setupServer } from 'msw/node';
import { landingHandlers } from '@/app/frontend_public/public_landing/landing_contact/mocks/handlers/PublicLandingContactMockHandlers';
import { resetPublicLandingMockState } from '@/app/frontend_public/public_landing/landing_contact/mocks/fixtures/PublicLandingContactMockFixtures';
import { resetPublicLandingContactMockScenario, setPublicLandingContactMockScenario, type PublicLandingContactMockScenario } from '@/app/frontend_public/public_landing/landing_contact/mocks/scenarios/public_landing_contact.scenarios';

export const mockServer = setupServer(...landingHandlers);
export function installMockServer(): void { mockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetMockServer(): void { mockServer.resetHandlers(); resetPublicLandingContactMockScenario(); resetPublicLandingMockState(); }
export function useMockScenario(scenario: PublicLandingContactMockScenario): void { setPublicLandingContactMockScenario(scenario); }
export function closeMockServer(): void { mockServer.close(); }
