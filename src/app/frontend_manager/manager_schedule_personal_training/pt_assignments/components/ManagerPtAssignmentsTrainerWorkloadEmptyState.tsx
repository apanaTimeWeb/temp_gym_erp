// RESPONSIBILITY: Renders ManagerPtAssignmentsTrainerWorkloadEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
/** @description Renders the empty state for the PT trainer workload entity list. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerPtAssignmentsTrainerWorkloadEmptyState() {
  const t = useTranslations('MANAGER_PT_ASSIGNMENTS');
 return <div data-testid="manager_pt-trainer-workload-empty-state" className="flex flex-col items-center gap-2 py-10 text-center"><Users size={18} strokeWidth={2} className="text-text-secondary" aria-hidden="true"/><p className="text-sm font-semibold text-text-primary">{t("COPY_NO_TRAINER_WORKLOAD_DATA")}</p><p className="text-xs text-text-secondary">{t("COPY_TRAINER_WORKLOAD_WILL_APPEAR_WHEN_TRAINER_RECORDS_AVAILABLE")}</p></div>; }
