// RESPONSIBILITY: Renders ManagerPtAssignmentsEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { FileWarning } from 'lucide-react';
import { useTranslations } from 'next-intl';
/** @description Renders the empty state for active PT assignments. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerPtAssignmentsEmptyState() {
  const t = useTranslations('MANAGER_PT_ASSIGNMENTS');
 return <div data-testid="manager_pt-assignments-empty-state" className="flex flex-col items-center gap-2 py-10 text-center"><FileWarning size={18} strokeWidth={2} className="text-text-secondary" aria-hidden="true"/><p className="text-sm font-semibold text-text-primary">{t("COPY_NO_ACTIVE_ASSIGNMENTS")}</p><p className="text-xs text-text-secondary">{t("COPY_ASSIGN_TRAINER_MEMBER_START_TRACKING_SESSIONS")}</p></div>; }
