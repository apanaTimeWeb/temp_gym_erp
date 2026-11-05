// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsReportsCenterDatePresetDropdown within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminAnalyticsReportsCenterDatePresetDropdown owned by the superadmin_analytics_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: @/components/ui/SearchableDropdown, next-intl, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/constants/superadmin_analytics_reports_center.constants, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterDateRangeUtils, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_date_preset_dropdown.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Reports date preset selector and emits the selected preset plus calculated range to its parent.


import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_ANALYTICS_REPORTS_DATE_PRESET_OPTIONS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/constants/superadmin_analytics_reports_center.constants';
import { getSuperadminAnalyticsReportsPresetRange } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterDateRangeUtils';

import type { DatePreset, SuperadminAnalyticsReportsDatePresetDropdownProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_date_preset_dropdown.types';

/**
 * Responsibility: Renders the SuperadminAnalyticsReportsCenterDatePresetDropdown UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminAnalyticsReportsCenterDatePresetDropdown({ value, onChange }: SuperadminAnalyticsReportsDatePresetDropdownProps) {
  const t = useTranslations('superadmin_analytics_reports');
  const handlePresetChange = (presetValue: string) => {
    const preset = presetValue as DatePreset;
    const { from, to } = getSuperadminAnalyticsReportsPresetRange(preset);
    onChange(preset, from, to);
  };

  return (
    <div className="w-48 rounded-lg border border-border bg-input shadow-card">
      <SearchableDropdown
        options={SUPERADMIN_ANALYTICS_REPORTS_DATE_PRESET_OPTIONS.map((option) => ({ label: t(`ui.date_preset_${option.value.toLowerCase()}`), value: option.value }))}
        data-testid="superadmin_analytics_reports-superadmin-reports-date-preset-dropdown-preset" value={value}
        onChange={(nextValue) => handlePresetChange(String(nextValue))}
        className="border-transparent bg-transparent"
      />
    </div>
  );
}



