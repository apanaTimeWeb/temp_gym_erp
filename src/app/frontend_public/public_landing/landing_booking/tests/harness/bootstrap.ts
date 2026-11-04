// OWNERSHIP: Isolated MSW server for the landing_booking unit and component test suite.
import { setupServer } from 'msw/node';
import { landingHandlers } from '@/app/frontend_public/public_landing/landing_booking/mocks/handlers/PublicLandingBookingMockHandlers';
import { resetPublicLandingMockState } from '@/app/frontend_public/public_landing/landing_booking/mocks/fixtures/PublicLandingBookingMockFixtures';
import { resetPublicLandingBookingMockScenario, setPublicLandingBookingMockScenario, type PublicLandingBookingMockScenario } from '@/app/frontend_public/public_landing/landing_booking/mocks/scenarios/public_landing_booking.scenarios';

export const mockServer = setupServer(...landingHandlers);
export function installMockServer(): void { mockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetMockServer(): void { mockServer.resetHandlers(); resetPublicLandingBookingMockScenario(); resetPublicLandingMockState(); }
export function useMockScenario(scenario: PublicLandingBookingMockScenario): void { setPublicLandingBookingMockScenario(scenario); }
export function closeMockServer(): void { mockServer.close(); }
