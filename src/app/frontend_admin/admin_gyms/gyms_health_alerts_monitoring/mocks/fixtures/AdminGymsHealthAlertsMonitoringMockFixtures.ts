// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin gym-health-alerts feature.

// RESPONSIBILITY: Owns module-specific MSW fixture// DATA FLOW: Used by AdminGymHealthAlertsMockHandlers to provide realistic mock data.
import type { GymHealthAlert, GymHealthKPIData } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/types/AdminGymsHealthAlertsMonitoringTypes';

export const MOCK_GYM_HEALTH_ALERTS: GymHealthAlert[] = [
  { id: 'a1', gymId: 'g4', gymName: 'Thane', alertType: 'no_new_members', severity: 'critical', title: '0 New Members This Week', description: 'Thane branch has had zero new member registrations for 7 consecutive days.', metric: '0 new members', threshold: '< 3 per week', detectedAt: '2026-07-07T09:00:00', actionKey: 'view_details' },
  { id: 'a2', gymId: 'g3', gymName: 'Powai', alertType: 'revenue_drop', severity: 'critical', title: 'Revenue Drop > 25%', description: 'Powai branch revenue dropped 28% compared to the same period last month.', metric: '-28% MoM', threshold: '> 20% drop', detectedAt: '2026-07-06T10:00:00', actionKey: 'view_details' },
  { id: 'a3', gymId: 'g2', gymName: 'Bandra West', alertType: 'high_cancellations', severity: 'warning', title: 'High Member Loss Rate', description: 'Bandra West has a 18% leaving rate this month, significantly above the 10% threshold.', metric: '18% leaving', threshold: '> 10%', detectedAt: '2026-07-05T08:00:00', actionKey: 'view_details' },
  { id: 'a4', gymId: 'g4', gymName: 'Thane', alertType: 'pending_payroll', severity: 'critical', title: 'Payroll Overdue by 5 Days', description: 'Staff payroll for Thane branch is 5 days overdue. 8 staff members are affected.', metric: '5 days overdue', threshold: '> 3 days', detectedAt: '2026-07-04T07:00:00', actionKey: 'view_details' },
  { id: 'a5', gymId: 'g1', gymName: 'Andheri East', alertType: 'low_attendance', severity: 'warning', title: 'Attendance Below 40%', description: 'Average daily attendance at Andheri East has dropped to 38% of active members.', metric: '38% attendance', threshold: '< 40%', detectedAt: '2026-07-03T09:00:00', actionKey: 'view_details' },
  { id: 'a6', gymId: 'g2', gymName: 'Bandra West', alertType: 'expiring_members', severity: 'info', title: '42 Memberships Expiring This Week', description: '42 active memberships at Bandra West are expiring within the next 7 days with no renewal initiated.', metric: '42 expiring', threshold: '> 30 expiring', detectedAt: '2026-07-07T06:00:00', actionKey: 'view_details' },
  { id: 'a7', gymId: 'g3', gymName: 'Powai', alertType: 'no_new_members', severity: 'warning', title: 'Low New Member Acquisition', description: 'Powai had only 1 new member this week, below the expected minimum of 5.', metric: '1 new member', threshold: '< 5 per week', detectedAt: '2026-07-01T09:00:00', actionKey: 'view_details' },
];

export const MOCK_GYM_HEALTH_KPI: GymHealthKPIData = {
  totalAlerts: 7,
  criticalAlerts: 3,
  warningAlerts: 2,
  infoAlerts: 2,
};

export const MOCK_GYM_HEALTH_ALERTS_EXPANDED: GymHealthAlert[] = [
  ...MOCK_GYM_HEALTH_ALERTS,
  ...Array.from({ length: 8 }, (_, index) => {
    const n = index + 8;
    const unresolved = index % 4 !== 0;
    return {
      id: `a${n}`,
      gymId: ['g1', 'g2', 'g3', 'g4'][index % 4]!,
      gymName: ['Andheri East', 'Bandra West', 'Powai', 'Thane'][index % 4]!,
      alertType: ['low_attendance', 'revenue_drop', 'expiring_members', 'pending_payroll'][index % 4]!,
      severity: ['critical', 'warning', 'info'][index % 3]!,
      title: ['Attendance Below Threshold', 'Revenue Trend Alert', 'Membership Expiry Spike', 'Payroll Delay'][index % 4]!,
      description: `Development alert ${n} with realistic descriptive context for list rendering and truncation.`,
      metric: [`${30 + index}% attendance`, `-${10 + index}% MoM`, `${20 + index} expiring`, `${2 + index} days overdue`][index % 4]!,
      threshold: ['< 40%', '> 15% drop', '> 20 expiring', '> 3 days'][index % 4]!,
      detectedAt: `2026-09-${String((index % 12) + 1).padStart(2, '0')}T0${index % 9}:00:00`,
      actionKey: 'view_details',
      ...(unresolved ? {} : { resolvedAt: `2026-09-${String((index % 10) + 3).padStart(2, '0')}T11:00:00` }),
    } as GymHealthAlert;
  }),
];

export const MOCK_ADMIN_GYM_HEALTH_ALERTS = [
  { id: 'alert-1', gymId: 'g1', gymName: 'Andheri East', alertType: 'expiring_members', severity: 'critical', title: 'Memberships expiring soon', description: 'Memberships require attention before expiry.', metric: '23 members', threshold: '7 days', detectedAt: new Date('2026-09-28T08:15:00Z').toISOString(), actionKey: 'members' },
  { id: 'alert-2', gymId: 'g2', gymName: 'Bandra West', alertType: 'low_attendance', severity: 'warning', title: 'Attendance below threshold', description: 'Weekly attendance is below the configured threshold.', metric: '42%', threshold: '55%', detectedAt: new Date('2026-09-28T06:00:00Z').toISOString(), actionKey: 'attendance' },
  { id: 'alert-3', gymId: 'g3', gymName: 'Powai', alertType: 'revenue_drop', severity: 'info', title: 'Revenue trend needs review', description: 'Revenue is trending below the previous comparison period.', metric: '−8%', threshold: '−5%', detectedAt: new Date('2026-09-27T14:30:00Z').toISOString(), actionKey: 'finance' },
];
