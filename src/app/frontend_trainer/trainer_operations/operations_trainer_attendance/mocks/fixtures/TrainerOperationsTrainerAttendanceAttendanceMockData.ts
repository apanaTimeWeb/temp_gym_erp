// RESPONSIBILITY: Mock fixture data for the Attendance module.
// DATA FLOW: useAttendanceQuery → this fixture (NOW) → future: real API
// Replace the import in attendanceApi.ts with a real apiFetch when the backend is ready.

import type { TrainerAttendanceRecord, TrainerAttendanceStats, TrainerAttendanceMemberBasic } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTypes';

const today = new Date().toISOString().split('T')[0] || '';
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0] || '';

export const TRAINER_ATTENDANCE_MOCK_STATS: TrainerAttendanceStats = {
  totalCheckIns: 24,
  memberCheckIns: 18,
  staffCheckIns: 6,
};

export const TRAINER_ATTENDANCE_MOCK_MEMBERS: TrainerAttendanceMemberBasic[] = [
  { id: 'm1', name: 'Rahul Sharma', phone: '9876543210' },
  { id: 'm2', name: 'Neha Gupta', phone: '9123456789' },
  { id: 'm3', name: 'Amit Kumar', phone: '9001234567' },
  { id: 'm4', name: 'Priya Singh', phone: '9812345670' },
];

export const TRAINER_ATTENDANCE_MOCK_RECORDS: TrainerAttendanceRecord[] = [
  {
    id: 'att-001',
    type: 'MEMBER',
    date: today,
    checkIn: `${today}T06:30:00Z`,
    checkOut: `${today}T08:00:00Z`,
    durationMinutes: 90,
    checkInMethod: 'Manual',
    memberId: 'm1',
    member: { id: 'm1', name: 'Rahul Sharma', phone: '9876543210' },
  },
  {
    id: 'att-002',
    type: 'MEMBER',
    date: today,
    checkIn: `${today}T07:00:00Z`,
    checkOut: `${today}T08:30:00Z`,
    durationMinutes: 90,
    checkInMethod: 'QR Code',
    memberId: 'm2',
    member: { id: 'm2', name: 'Neha Gupta', phone: '9123456789' },
  },
  {
    id: 'att-003',
    type: 'STAFF',
    date: today,
    checkIn: `${today}T08:00:00Z`,
    checkOut: `${today}T17:00:00Z`,
    durationMinutes: 540,
    checkInMethod: 'Biometric',
    staffId: 's1',
    staff: { id: 's1', name: 'Trainer Demo' },
  },
  {
    id: 'att-004',
    type: 'MEMBER',
    date: yesterday,
    checkIn: `${yesterday}T06:45:00Z`,
    checkOut: `${yesterday}T08:15:00Z`,
    durationMinutes: 90,
    checkInMethod: 'Manual',
    memberId: 'm3',
    member: { id: 'm3', name: 'Amit Kumar', phone: '9001234567' },
  },
  {
    id: 'att-005',
    type: 'MEMBER',
    date: yesterday,
    checkIn: `${yesterday}T09:00:00Z`,
    checkOut: undefined,
    durationMinutes: undefined,
    checkInMethod: 'Manual',
    memberId: 'm4',
    member: { id: 'm4', name: 'Priya Singh', phone: '9812345670' },
  },
];
