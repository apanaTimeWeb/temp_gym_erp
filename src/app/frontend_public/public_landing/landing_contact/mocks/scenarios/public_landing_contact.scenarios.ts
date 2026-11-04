// RESPONSIBILITY: Isolated Contact mock scenarios; changes do not affect sibling modules.
// EMPTY is an empty starting record set; a valid POST still creates a record.
import { resetPublicLandingMockState } from '@/app/frontend_public/public_landing/landing_contact/mocks/fixtures/PublicLandingContactMockFixtures';

export const PUBLIC_LANDING_CONTACT_MOCK_SCENARIOS = {
  ACTIVE: 'ACTIVE',
  EMPTY: 'EMPTY',
  SERVER_500: 'SERVER_500',
  TIMEOUT: 'TIMEOUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
} as const;

export type PublicLandingContactMockScenario = typeof PUBLIC_LANDING_CONTACT_MOCK_SCENARIOS[keyof typeof PUBLIC_LANDING_CONTACT_MOCK_SCENARIOS];
let activeScenario: PublicLandingContactMockScenario = PUBLIC_LANDING_CONTACT_MOCK_SCENARIOS.ACTIVE;

/** Switching mock scenarios clears records and replay history, preventing cross-test leaks. */
export function setPublicLandingContactMockScenario(scenario: PublicLandingContactMockScenario): void {
  resetPublicLandingMockState();
  activeScenario = scenario;
}

export function getPublicLandingContactMockScenario(): PublicLandingContactMockScenario {
  return activeScenario;
}

export function resetPublicLandingContactMockScenario(): void {
  activeScenario = PUBLIC_LANDING_CONTACT_MOCK_SCENARIOS.ACTIVE;
  resetPublicLandingMockState();
}
