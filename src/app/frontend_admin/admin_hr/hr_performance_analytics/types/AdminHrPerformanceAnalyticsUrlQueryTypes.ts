// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_performance_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsUrlQueryTypes.ts)

export interface AdminHrPerformanceUrlQueryBinding { key: string; value: string | number | boolean | null | undefined; defaultValue?: string | number | boolean | null; setValue?: (value: string | null) => void; }
