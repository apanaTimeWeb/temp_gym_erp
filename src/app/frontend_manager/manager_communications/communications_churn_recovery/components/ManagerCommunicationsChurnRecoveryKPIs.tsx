// RESPONSIBILITY: Renders ManagerCommunicationsChurnRecoveryKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import { MANAGER_CHURN_RECOVERY_KPI_CARDS } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_churn_recovery_kpi.constants';
import type { ManagerCommunicationsCampaignsChurnRecoveryKPIsProps } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_campaigns_churn_recovery_kpis.types';






/** @description 4 KPI stat cards for the Churn Recovery tab — Total Churned, Churned This Month, Recovery Rate, Avg Days Since Exit. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerCommunicationsCampaignsChurnRecoveryKPIs({ kpis }: ManagerCommunicationsCampaignsChurnRecoveryKPIsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {MANAGER_CHURN_RECOVERY_KPI_CARDS.map((card) => {
        const Icon = card.icon;
        const value = kpis ? (kpis[card.key] as number) : null;
        return (
          <div
            key={card.key}
            className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                <Icon size={18} className={card.iconColor} />
              </div>
            </div>
            {value === null ? (
              <div className="h-8 w-24 bg-skeleton-base rounded motion-safe:animate-pulse" />
            ) : (
              <span className="text-kpi font-bold text-text-primary">
                {card.format(value)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
