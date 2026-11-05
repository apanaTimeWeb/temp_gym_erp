// RESPONSIBILITY: Defines request DTO types sent by Manager attendance API functions.
export interface ManagerMarkAttendanceRequest {
  memberId?: string;
  staffId?: string;
  date: string;
  checkIn?: string | Date;
  type: string;
  status?: string;
}
