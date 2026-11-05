// RESPONSIBILITY: Renders Superadmin Audit Compliance Global Audit Overview Filters using its declared props and feature-local hooks.
'use client';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import type { AuditActorFilter, AuditSeverityFilter } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/types/superadmin_audit_compliance_global_audit_overview_filter.types';

type FilterOption = { value: string; label: string };
interface SuperadminAuditComplianceGlobalAuditFiltersProps {
  search: string; severityFilter: AuditSeverityFilter; actorTypeFilter: AuditActorFilter;
  severityOptions: FilterOption[]; actorTypeOptions: FilterOption[];
  setSearch: (value: string) => void; setSeverityFilter: (value: AuditSeverityFilter) => void; setActorTypeFilter: (value: AuditActorFilter) => void;
}
/**
 * @description Renders the Superadmin global audit filters interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminAuditComplianceGlobalAuditOverviewFilters(props: SuperadminAuditComplianceGlobalAuditFiltersProps) {
  const t = useTranslations('superadmin_audit_compliance_global_audit');
  return <div className="flex flex-col items-stretch justify-between gap-4 border-b border-border bg-surface-hover p-4 sm:flex-row sm:items-center">
    <div className="relative w-full max-w-md"><Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/><input aria-label={t('ui.search_audit_logs_abc6cb83')} type="search" placeholder={t('ui.search_by_action_actor_or_resource_0f20fc52')} className="min-h-11 w-full rounded-lg border border-border bg-input py-2 ps-9 pe-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" value={props.search} onChange={(event) => props.setSearch(event.target.value)} data-testid="superadmin-global-audit-search"/></div>
    <div className="flex flex-wrap items-center gap-3">
      <div role="group" aria-label={t('ui.severity_007cc954')} className="w-48 rounded-lg bg-input"><SearchableDropdown data-testid="superadmin-global-audit-severity-filter" options={props.severityOptions} value={props.severityFilter} onChange={(value) => props.setSeverityFilter(value as AuditSeverityFilter)} className="border-transparent bg-transparent"/></div>
      <div role="group" aria-label={t('ui.actor_origin_ip_ba2d92b2')} className="w-48 rounded-lg bg-input"><SearchableDropdown data-testid="superadmin-global-audit-actor-filter" options={props.actorTypeOptions} value={props.actorTypeFilter} onChange={(value) => props.setActorTypeFilter(value as AuditActorFilter)} className="border-transparent bg-transparent"/></div>
    </div>
  </div>;
}
