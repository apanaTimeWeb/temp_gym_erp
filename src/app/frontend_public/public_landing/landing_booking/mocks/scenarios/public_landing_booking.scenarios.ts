// RESPONSIBILITY: Isolated Booking mock scenarios; changes do not affect sibling modules.
// EMPTY is an empty starting record set; a valid POST still creates a record.
import { resetPublicLandingMockState } from '@/app/frontend_public/public_landing/landing_booking/mocks/fixtures/PublicLandingBookingMockFixtures';

export const PUBLIC_LANDING_BOOKING_MOCK_SCENARIOS = {
  ACTIVE: 'ACTIVE',
  EMPTY: 'EMPTY',
  SERVER_500: 'SERVER_500',
  TIMEOUT: 'TIMEOUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
} as const;

export type PublicLandingBookingMockScenario = typeof PUBLIC_LANDING_BOOKING_MOCK_SCENARIOS[keyof typeof PUBLIC_LANDING_BOOKING_MOCK_SCENARIOS];
let activeScenario: PublicLandingBookingMockScenario = PUBLIC_LANDING_BOOKING_MOCK_SCENARIOS.ACTIVE;

/** Switching mock scenarios clears records and replay history, preventing cross-test leaks. */
export function setPublicLandingBookingMockScenario(scenario: PublicLandingBookingMockScenario): void {
  resetPublicLandingMockState();
  activeScenario = scenario;
}

export function getPublicLandingBookingMockScenario(): PublicLandingBookingMockScenario {
  return activeScenario;
}

export function resetPublicLandingBookingMockScenario(): void {
  activeScenario = PUBLIC_LANDING_BOOKING_MOCK_SCENARIOS.ACTIVE;
  resetPublicLandingMockState();
}
