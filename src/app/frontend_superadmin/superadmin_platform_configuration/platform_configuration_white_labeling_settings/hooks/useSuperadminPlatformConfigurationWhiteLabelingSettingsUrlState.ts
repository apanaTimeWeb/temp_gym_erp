// DATA FLOW: Feature API/query state → custom hook → owning component/store → UI result.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { normalizeWhiteLabelSearch } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';

import type { SuperadminPlatformConfigurationWhiteLabelingStatusFilter } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';

/**
 * @description Owns canonical URL synchronization for white-labeling list search and status filters.
 * @dependencies Uses only Next.js navigation primitives and the module status filter type.
 * @edge-case Removes default values from the URL so equivalent states do not create duplicate query identities.
 */
export function useSuperadminPlatformConfigurationWhiteLabelingSettingsUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = normalizeWhiteLabelSearch(searchParams.get('search'));
  const rawStatus = searchParams.get('status') ?? 'all';
  const status: SuperadminPlatformConfigurationWhiteLabelingStatusFilter = rawStatus === 'pending' || rawStatus === 'active' || rawStatus === 'failed' ? rawStatus : 'all';

  const setState = (next: { search?: string; status?: SuperadminPlatformConfigurationWhiteLabelingStatusFilter }) => {
    const params = new URLSearchParams(searchParams.toString());
    const nextSearch = normalizeWhiteLabelSearch(next.search ?? search);
    const nextStatus = next.status ?? status;
    nextSearch ? params.set('search', nextSearch) : params.delete('search');
    nextStatus !== 'all' ? params.set('status', nextStatus) : params.delete('status');
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return { search, status, setState };
}
