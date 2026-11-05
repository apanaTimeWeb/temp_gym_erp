// RESPONSIBILITY: Type contract extracted from SuperadminAnalyticsReportsCenterDatePresetDropdown.tsx; no business behavior.

export type DatePreset = 'THIS_MONTH' | 'LAST_MONTH' | 'LAST_3_MONTHS' | 'LAST_6_MONTHS' | 'THIS_YEAR' | 'CUSTOM';

export interface SuperadminAnalyticsReportsDatePresetDropdownProps {
    value: DatePreset;
    onChange: (preset: DatePreset, dateFrom: string, dateTo: string) => void;
}
