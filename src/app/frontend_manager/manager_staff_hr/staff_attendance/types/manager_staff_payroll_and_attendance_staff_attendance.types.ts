// RESPONSIBILITY: Defines the typed response record for Manager HR staff attendance history.
export interface ManagerStaffPayrollAndAttendanceStaffAttendanceRecord {
  date: string;
  status: string;
  checkIn?: string;
  checkOut?: string;
}
