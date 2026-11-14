// RESPONSIBILITY: Type definitions and constants for staff & manager daily attendance.

export interface StaffAttendanceRecord {
  id: string;
  name: string;
  role: 'Manager' | 'Senior Trainer' | 'Trainer' | 'Front Desk' | 'Maintenance';
  branchName: string;
  shift: 'Morning (06:00 - 15:00)' | 'Evening (14:00 - 23:00)' | 'General (09:00 - 18:00)';
  checkInTime: string;
  checkOutTime: string | null;
  duration: string;
  status: 'present' | 'late' | 'on-leave';
  date: string;
  adminNotes?: string;
}

export const PREDEFINED_STAFF_MEMBERS = [
  { name: 'Rohit Mehta', role: 'Manager' as const, branch: 'Andheri East', shift: 'Morning (06:00 - 15:00)' as const },
  { name: 'Sahil Joshi', role: 'Manager' as const, branch: 'Bandra West', shift: 'Morning (06:00 - 15:00)' as const },
  { name: 'Dev Malhotra', role: 'Manager' as const, branch: 'Powai', shift: 'Morning (06:00 - 15:00)' as const },
  { name: 'Ananya Deshmukh', role: 'Manager' as const, branch: 'Thane', shift: 'General (09:00 - 18:00)' as const },
  { name: 'Priya Shah', role: 'Senior Trainer' as const, branch: 'Andheri East', shift: 'Evening (14:00 - 23:00)' as const },
  { name: 'Maya Singh', role: 'Trainer' as const, branch: 'Bandra West', shift: 'Evening (14:00 - 23:00)' as const },
  { name: 'Vikas Singh', role: 'Trainer' as const, branch: 'Powai', shift: 'General (09:00 - 18:00)' as const },
  { name: 'Siddharth Roy', role: 'Trainer' as const, branch: 'Thane', shift: 'Morning (06:00 - 15:00)' as const },
  { name: 'Aman Khan', role: 'Front Desk' as const, branch: 'Andheri East', shift: 'Morning (06:00 - 15:00)' as const },
  { name: 'Karan Mehra', role: 'Maintenance' as const, branch: 'Thane', shift: 'Morning (06:00 - 15:00)' as const },
];

export const INITIAL_STAFF_ATTENDANCE: StaffAttendanceRecord[] = [
  { id: 'sa-01', name: 'Rohit Mehta', role: 'Manager', branchName: 'Andheri East', shift: 'Morning (06:00 - 15:00)', checkInTime: '05:55 AM', checkOutTime: '03:10 PM', duration: '9h 15m', status: 'present', date: '2026-11-14' },
  { id: 'sa-02', name: 'Sahil Joshi', role: 'Manager', branchName: 'Bandra West', shift: 'Morning (06:00 - 15:00)', checkInTime: '06:05 AM', checkOutTime: '03:00 PM', duration: '8h 55m', status: 'present', date: '2026-11-14' },
  { id: 'sa-03', name: 'Dev Malhotra', role: 'Manager', branchName: 'Powai', shift: 'Morning (06:00 - 15:00)', checkInTime: '06:20 AM', checkOutTime: null, duration: 'In Progress', status: 'late', date: '2026-11-14', adminNotes: 'Biometric sync delayed' },
  { id: 'sa-04', name: 'Priya Shah', role: 'Senior Trainer', branchName: 'Andheri East', shift: 'Evening (14:00 - 23:00)', checkInTime: '01:50 PM', checkOutTime: '10:30 PM', duration: '8h 40m', status: 'present', date: '2026-11-14' },
  { id: 'sa-05', name: 'Maya Singh', role: 'Trainer', branchName: 'Bandra West', shift: 'Evening (14:00 - 23:00)', checkInTime: '02:00 PM', checkOutTime: '10:00 PM', duration: '8h 00m', status: 'present', date: '2026-11-14' },
  { id: 'sa-06', name: 'Aman Khan', role: 'Front Desk', branchName: 'Andheri East', shift: 'Morning (06:00 - 15:00)', checkInTime: '06:00 AM', checkOutTime: '02:30 PM', duration: '8h 30m', status: 'present', date: '2026-11-14' },
  { id: 'sa-07', name: 'Vikas Singh', role: 'Trainer', branchName: 'Powai', shift: 'General (09:00 - 18:00)', checkInTime: '09:05 AM', checkOutTime: '06:15 PM', duration: '9h 10m', status: 'present', date: '2026-11-14' },
  { id: 'sa-08', name: 'Karan Mehra', role: 'Maintenance', branchName: 'Thane', shift: 'Morning (06:00 - 15:00)', checkInTime: '—', checkOutTime: null, duration: '—', status: 'on-leave', date: '2026-11-14', adminNotes: 'Approved sick leave' },
];
