// RESPONSIBILITY: Renders ManagerReportsOverviewEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { FileBarChart } from 'lucide-react';
import { useTranslations } from 'next-intl';
/** @description Renders the empty state for a report table when its current report has no rows. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerReportsOverviewEmptyState() {
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');
 return <div data-testid="manager_reports-reports-empty-state" className="flex flex-col items-center gap-2 py-10 text-center"><FileBarChart size={18} strokeWidth={2} className="text-text-secondary" aria-hidden="true"/><p className="text-sm font-semibold text-text-primary">{t("COPY_NO_REPORT_DATA")}</p><p className="text-xs text-text-secondary">{t("COPY_NO_RECORDS_AVAILABLE_SELECTED_REPORT_RANGE")}</p></div>; }
