/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationWhiteLabelingMockFixtures owned by the superadmin_platform_configuration_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import type { WhiteLabelDomain } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types';

export const mockWhiteLabelDomains: WhiteLabelDomain[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    gymId: '223e4567-e89b-12d3-a456-426614174000',
    gymName: 'Titan Fitness Elite',
    domain: 'titanelite.com',
    status: 'active',
    sslStatus: 'issued',
    logoUrl: 'https://placehold.co/100x100/png?text=Titan',
    primaryColor: '#D32F2F',
    createdAt: '2026-08-01T10:00:00Z',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    gymId: '223e4567-e89b-12d3-a456-426614174001',
    gymName: 'CrossFit Pioneers',
    domain: 'pioneers-app.com',
    status: 'pending',
    sslStatus: 'pending',
    logoUrl: 'https://placehold.co/100x100/png?text=CrossFit',
    primaryColor: '#F57C00',
    createdAt: '2026-09-18T14:30:00Z',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    gymId: '223e4567-e89b-12d3-a456-426614174002',
    gymName: 'Yoga Zen Studio',
    domain: 'zenyoga.me',
    status: 'failed',
    sslStatus: 'failed',
    logoUrl: null,
    primaryColor: null,
    createdAt: '2026-09-19T09:15:00Z',
  }
];

/** Deterministic feature-local domain fixtures for scale and pagination tests. */
export const createWhiteLabelDomainsScale = (count: number): WhiteLabelDomain[] =>
  Array.from({ length: Math.max(0, Math.floor(count)) }, (_, index) => {
    const ordinal = index + 1;
    const base = mockWhiteLabelDomains[index % mockWhiteLabelDomains.length]!;
    if (!base) throw new Error('Fixture seed must not be empty');
    const suffix = String(ordinal).padStart(12, '0');
    return { ...base, id: `123e4567-e89b-12d3-a456-${suffix}`, gymId: `223e4567-e89b-12d3-a456-${suffix}`, gymName: `Scale Gym ${ordinal}`, domain: `scale-gym-${ordinal}.example.test` };
  });
export const MOCK_WHITE_LABEL_DOMAINS_TIER_1_SMALL = createWhiteLabelDomainsScale(10);
export const MOCK_WHITE_LABEL_DOMAINS_TIER_2_MEDIUM = createWhiteLabelDomainsScale(100);
export const MOCK_WHITE_LABEL_DOMAINS_TIER_3_STRESS = createWhiteLabelDomainsScale(500);

