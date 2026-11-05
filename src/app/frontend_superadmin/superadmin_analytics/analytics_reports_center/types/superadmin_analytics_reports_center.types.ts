/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
import { z } from 'zod';
import { RevenueRowSchema, CancellationsRecordSchema, TenantHealthScoreSchema } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/schemas/superadmin_analytics_reports_center_contract.schemas';

// RESPONSIBILITY: Encapsulates functionality for superadmin_analytics_reports_types.ts
export type RevenueRow = z.infer<typeof RevenueRowSchema>;
export type CancellationsRecord = z.infer<typeof CancellationsRecordSchema>;
export type TenantHealthScore = z.infer<typeof TenantHealthScoreSchema>;
export type SuperadminAnalyticsReportsDateField = 'startDate' | 'endDate';
