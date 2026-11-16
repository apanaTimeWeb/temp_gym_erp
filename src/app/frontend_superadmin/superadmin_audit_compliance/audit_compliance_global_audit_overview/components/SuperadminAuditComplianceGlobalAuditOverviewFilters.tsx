// RESPONSIBILITY: Renders Superadmin Audit Compliance Global Audit Overview Filters using its declared props and feature-local hooks.
'use client';
import { Search, X } from 'lucide-react';
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
  const isFiltered = Boolean(props.search || props.severityFilter !== 'ALL' || props.actorTypeFilter !== 'ALL');

  return <div className="flex flex-col items-stretch justify-between gap-4 border-b border-border bg-surface-hover p-4 sm:flex-row sm:items-center">
    <div className="relative w-full max-w-md">
      <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" aria-hidden="true"/>
      <input aria-label={t('ui.search_audit_logs_abc6cb83')} type="search" placeholder={t('ui.search_by_action_actor_or_resource_0f20fc52')} className="min-h-11 w-full rounded-lg border border-border bg-input py-2 ps-9 pe-8 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" value={props.search} onChange={(event) => props.setSearch(event.target.value)} data-testid="superadmin-global-audit-search"/>
      {props.search && (
        <button
          type="button"
          onClick={() => props.setSearch('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-1 rounded-md cursor-pointer"
          aria-label="Clear search query"
        >
          <X size={14} />
        </button>
      )}
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <div role="group" aria-label={t('ui.severity_007cc954')} className="w-48 rounded-lg bg-input"><SearchableDropdown data-testid="superadmin-global-audit-severity-filter" options={props.severityOptions} value={props.severityFilter} onChange={(value) => props.setSeverityFilter(value as AuditSeverityFilter)} className="border-transparent bg-transparent"/></div>
      <div role="group" aria-label={t('ui.actor_origin_ip_ba2d92b2')} className="w-48 rounded-lg bg-input"><SearchableDropdown data-testid="superadmin-global-audit-actor-filter" options={props.actorTypeOptions} value={props.actorTypeFilter} onChange={(value) => props.setActorTypeFilter(value as AuditActorFilter)} className="border-transparent bg-transparent"/></div>
      {isFiltered && (
        <button
          type="button"
          onClick={() => {
            props.setSearch('');
            props.setSeverityFilter('ALL');
            props.setActorTypeFilter('ALL');
          }}
          className="text-xs text-secondary hover:text-danger font-semibold px-2.5 py-1.5 rounded-lg border border-border hover:bg-input transition-colors cursor-pointer"
        >
          Reset Filters
        </button>
      )}
    </div>
  </div>;
}
