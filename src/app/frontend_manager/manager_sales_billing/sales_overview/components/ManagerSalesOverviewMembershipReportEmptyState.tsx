// RESPONSIBILITY: Renders ManagerSalesOverviewMembershipReportEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { FileSearch } from 'lucide-react';
import { useTranslations } from 'next-intl';
/** @description Renders the empty state for the sales membership report. Contains no API calls. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerSalesOverviewMembershipReportEmptyState() {
  const t = useTranslations('MANAGER_SALES_OVERVIEW');
 return <div data-testid="manager_sales-membership-report-empty-state" className="flex flex-col items-center gap-2 py-10 text-center"><FileSearch size={18} strokeWidth={2} className="text-text-secondary" aria-hidden="true"/><p className="text-sm font-semibold text-text-primary">{t("COPY_NO_MEMBERSHIP_REPORT_DATA")}</p><p className="text-xs text-text-secondary">{t("COPY_NO_MEMBERSHIP_REPORT_RECORDS_MATCH_CURRENT_FILTERS")}</p></div>; }
