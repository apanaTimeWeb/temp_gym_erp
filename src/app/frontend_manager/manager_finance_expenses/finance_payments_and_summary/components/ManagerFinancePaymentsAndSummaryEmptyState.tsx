// RESPONSIBILITY: Renders ManagerFinancePaymentsAndSummaryEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
/** @description Renders the empty state for Manager finance payments. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerFinancePaymentsAndSummaryEmptyState() {
  const t = useTranslations('MANAGER_FINANCE_PAYMENTS_AND_SUMMARY');
 return <div data-testid="manager_finance-finance-empty-state" className="flex flex-col items-center gap-2 py-10 text-center"><Wallet size={18} strokeWidth={2} className="text-text-secondary" aria-hidden="true"/><p className="text-sm font-semibold text-text-primary">{t("COPY_NO_PAYMENTS_FOUND_2")}</p><p className="text-xs text-text-secondary">{t("COPY_NO_FINANCE_PAYMENTS_MATCH_CURRENT_FILTERS")}</p></div>; }
