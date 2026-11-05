'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags → consuming feature component.
// RESPONSIBILITY: Owns the presentation-derived feature-flag filter so the root view remains layout-only.
import { useMemo } from 'react';

import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';



/**
 * Purpose: Derives the visible feature flags from server data and the local search string.
 * Inputs: feature flags and the current search query.
 * Output: memoized feature flags matching the search query.
 * Side effects: none.
 * Invariant: does not mutate server data or own network state.
 */
/**
 * @description Derives the visible feature-flag list from validated server data and active filters.
 * @dependencies Uses feature query data and filter state only; performs no transport or mutation.
 * @edge-case Preserves empty and missing-data states without inventing flags or status values.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags → owning feature view/components.
/**
 * @description Owns the feature-local superadmin features filtered flags responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags(flags: FeatureFlag[], searchQuery: string) {
  return useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return flags;
    return flags.filter((flag) => flag.name.toLowerCase().includes(normalizedQuery) || flag.description.toLowerCase().includes(normalizedQuery));
  }, [flags, searchQuery]);
}
