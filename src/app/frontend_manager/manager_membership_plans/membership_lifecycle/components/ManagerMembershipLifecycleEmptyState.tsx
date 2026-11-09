// RESPONSIBILITY: Renders ManagerMembershipLifecycleEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { ClipboardList } from 'lucide-react';
import { useTranslations } from 'next-intl';
/** @description Renders the empty state for Manager plans. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerMembershipLifecycleEmptyState({ search }: { search?: string } = {}) {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');
 return <div data-testid="manager_plans-plans-empty-state" className="flex flex-col items-center gap-2 py-16 text-center"><ClipboardList size={18} strokeWidth={2} className="text-text-secondary" aria-hidden="true"/><p className="text-sm font-semibold text-text-primary">{search ? `No plans found for "${search}"` : t("COPY_NO_PLANS_AVAILABLE")}</p><p className="text-xs text-text-secondary">{t("COPY_ADJUST_FILTERS_ADD_PLAN_POPULATE_LIST")}</p></div>; }
