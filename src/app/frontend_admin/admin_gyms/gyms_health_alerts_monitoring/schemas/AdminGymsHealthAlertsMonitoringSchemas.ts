// RESPONSIBILITY: Defines runtime validation schemas for gym_health_alerts_monitoring; it does not determine server-owned business rules without a verified contract.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_gym_health_alerts/gym_health_alerts_monitoring/schemas/AdminGymsHealthAlertsMonitoringSchemas.ts)

import { z } from 'zod';
export const alertSeveritySchema = z.enum(['critical', 'warning', 'info']);
export const gymHealthAlertSchema = z.object({
  id: z.string(), gymId: z.string(), gymName: z.string(), alertType: z.string(), severity: alertSeveritySchema,
  title: z.string(), description: z.string(), metric: z.string(), threshold: z.string(), detectedAt: z.string(), actionKey: z.string(),
});
export const gymHealthKpiDataSchema = z.object({ totalAlerts: z.number(), criticalAlerts: z.number(), warningAlerts: z.number(), infoAlerts: z.number() });
