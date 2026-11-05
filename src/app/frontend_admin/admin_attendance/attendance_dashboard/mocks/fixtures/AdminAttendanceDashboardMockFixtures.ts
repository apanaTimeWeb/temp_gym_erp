// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_attendance/attendance_dashboard/mocks/fixtures/AdminAttendanceDashboardMockFixtures.ts)
import { ATTENDANCE_STATUS_VALUES } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/constants/AdminAttendanceDashboardConstants';
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin attendance feature.
import type { AdminAttendanceSummary } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin attendance feature.

export const MOCK_ADMIN_ATTENDANCE_SUMMARY: AdminAttendanceSummary = {
  todayTotal: 1250,
  todayPresent: 1100,
  todayLate: 150,
  weeklyAverage: 1150,
  peakHour: '18:00',
  trendVsLastWeek: 5.2,
  uniqueMembersThisMonth: 8500,
};

import type { AdminAttendanceRecord, AdminAttendanceTrendPoint } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';

export const MOCK_ADMIN_ATTENDANCE_RECORDS = [
  {
    id: 'a1', memberId: 'm1', memberName: 'Rahul Sharma', memberPhone: '9876543210',
    branchId: 'b1', branchName: 'Andheri East', checkInTime: '2026-10-06T06:30:00Z',
    checkOutTime: '2026-10-06T08:00:00Z', date: '2026-10-06', status: ATTENDANCE_STATUS_VALUES.PRESENT, planName: 'Annual Pro',
    sessionType: 'General'
  },
  {
    id: 'a2', memberId: 'm2', memberName: 'Priya Singh', memberPhone: '9876543211',
    branchId: 'b1', branchName: 'Andheri East', checkInTime: '2026-10-06T07:15:00Z',
    checkOutTime: '2026-10-06T08:45:00Z', date: '2026-10-06', status: ATTENDANCE_STATUS_VALUES.PRESENT, planName: 'Gold Plan',
    sessionType: 'PT', trainerId: 't1', trainerName: 'Vikram'
  },
  {
    id: 'a3', memberId: 'm3', memberName: 'Amit Patel', memberPhone: '9876543212',
    branchId: 'b2', branchName: 'Bandra West', checkInTime: '2026-10-06T18:00:00Z',
    checkOutTime: null, date: '2026-10-06', status: ATTENDANCE_STATUS_VALUES.PRESENT, planName: 'Monthly Flex',
    sessionType: 'General'
  },
  {
    id: 'a4', memberId: 'm4', memberName: 'Sneha Joshi', memberPhone: '9876543213',
    branchId: 'b1', branchName: 'Andheri East', checkInTime: '2026-10-05T09:30:00Z',
    checkOutTime: '2026-10-05T10:30:00Z', date: '2026-10-05', status: ATTENDANCE_STATUS_VALUES.LATE, planName: 'Silver Plan',
    sessionType: 'Class'
  },
  {
    id: 'a5', memberId: 'm5', memberName: 'Kiran Kumar', memberPhone: '9876543214',
    branchId: 'b3', branchName: 'Powai', checkInTime: '2026-10-04T05:45:00Z',
    checkOutTime: '2026-10-04T07:00:00Z', date: '2026-10-04', status: ATTENDANCE_STATUS_VALUES.PRESENT, planName: 'Annual Pro',
    sessionType: 'General'
  }
];

export const MOCK_ADMIN_ATTENDANCE_TREND: AdminAttendanceTrendPoint[] = [
  { date: '2026-10-09', count: 1100 },
  { date: '2026-10-10', count: 1150 },
  { date: '2026-10-11', count: 1180 },
  { date: '2026-10-12', count: 1200 },
  { date: '2026-10-13', count: 1250 },
  { date: '2026-10-14', count: 1050 },
  { date: '2026-10-15', count: 1250 },
];


// --- From AdminDashboardMockData.ts ---

export const MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED: AdminAttendanceRecord[] = [
  ...MOCK_ADMIN_ATTENDANCE_RECORDS,
  ...Array.from({ length: 16 }, (_, index) => {
    // IDs continue after the five base records to keep fixture identity unique.
    const n = index + MOCK_ADMIN_ATTENDANCE_RECORDS.length + 1;
    return {
      id: `a${n}`,
      memberId: `m${n}`,
      memberName: ['Neha Kapoor', 'Vikram Patel', 'Sana Khan', 'Arjun Nair'][index % 4]!,
      memberPhone: `987654${(3210 + n).toString().slice(-4)}`,
      branchId: ['b1', 'b2', 'b3', 'b4'][index % 4]!,
      branchName: ['Andheri East', 'Bandra West', 'Powai', 'Thane'][index % 4]!,
      checkInTime: `2026-10-${String(Math.max(1, 6 - (index % 5))).padStart(2, '0')}T${String(6 + (index % 8)).padStart(2, '0')}:15:00Z`,
      checkOutTime: index % 3 === 0 ? null : `2026-10-${String(Math.max(1, 6 - (index % 5))).padStart(2, '0')}T${String(7 + (index % 8)).padStart(2, '0')}:30:00Z`,
      date: `2026-10-${String(Math.max(1, 6 - (index % 5))).padStart(2, '0')}`,
      status: ['present', 'late', 'absent'][index % 3] as AdminAttendanceRecord['status'],
      planName: ['Annual Pro', 'Quarterly Classic', 'Monthly Basic'][index % 3]!,
      sessionType: index % 3 === 0 ? 'PT' : 'General',
      trainerName: index % 3 === 0 ? ['Amit Kumar', 'Priya Singh'][index % 2]! : undefined,
    };
  }),
] as AdminAttendanceRecord[];
