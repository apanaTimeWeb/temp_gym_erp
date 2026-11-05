// RESPONSIBILITY: Owns the display-ready KPI value contract derived from Trainer Sessions records.
export interface TrainerSessionsKpiValues {
  todayCount: number;
  completedThisWeek: number;
  noShowsThisMonth: number;
  avgAttendanceRate: number;
}
