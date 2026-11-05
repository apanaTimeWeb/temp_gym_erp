// RESPONSIBILITY: Type contract extracted from SuperadminAffiliatesTableRow.tsx; no business behavior.
import type { Affiliate, AffiliateStatus } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';

export interface SuperadminAffiliatesTableRowProps {
    affiliate: Affiliate;
    onToggleStatus: (id: string, currentStatus: AffiliateStatus) => void;
    onEdit: (affiliate: Affiliate) => void;
    onDelete: (id: string) => void;
    onPayCommission?: (affiliate: Affiliate) => void;
}
