import { z } from 'zod';

import { TrainerDashboardProfileSummarySchema, TrainerDashboardRecentMemberSchema, TrainerDashboardStatsSchema } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/schemas/TrainerDashboardOverviewDomainSchemas';




// RESPONSIBILITY: Owns TypeScript domain and form contracts derived from Trainer dashboard validation schemas.
export type TrainerDashboardProfileSummary = z.infer<typeof TrainerDashboardProfileSummarySchema>;
export type TrainerDashboardRecentMember = z.infer<typeof TrainerDashboardRecentMemberSchema>;
export type TrainerDashboardStats = z.infer<typeof TrainerDashboardStatsSchema>;
