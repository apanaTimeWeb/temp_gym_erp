/**
 * This catalog deliberately performs no backend requests (see the feature contract).
 * Keep the standard handler registry explicit so standalone harnesses can compose it without
 * inventing endpoints or response payloads. Route error/auth/loading behavior belongs to Next.js
 * and the owning host/domain guards, not this static navigation module.
 */
export const adminReportsCrossDomainOverviewMockHandlers = [] as const;
