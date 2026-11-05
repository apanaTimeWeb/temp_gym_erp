// RESPONSIBILITY: Type contract extracted from SuperadminAffiliatesHeader.tsx; no business behavior.

import { SUPERADMIN_AFFILIATE_STATUS_FILTERS } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management_filter.constants';

export type SuperadminAffiliateStatusFilter = typeof SUPERADMIN_AFFILIATE_STATUS_FILTERS[number];

export interface SuperadminAffiliatesHeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    statusFilter: SuperadminAffiliateStatusFilter;
    onStatusFilterChange: (value: SuperadminAffiliateStatusFilter) => void;
    onAddClick: () => void;
    /** ISO date string for commission period start filter */
    startDate: string;
    onStartDateChange: (value: string) => void;
    /** ISO date string for commission period end filter */
    endDate: string;
    onEndDateChange: (value: string) => void;
}
