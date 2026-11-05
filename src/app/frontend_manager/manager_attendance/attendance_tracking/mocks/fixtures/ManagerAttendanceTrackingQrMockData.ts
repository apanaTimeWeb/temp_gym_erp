import { MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';
import type { MemberSnapshot, StaffSnapshot } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_snapshot.types';

/**
 * @description Provides the ManagerAttendanceTrackingQrMockData implementation for the attendance module.
 * @dependencies @/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_snapshot.types
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_ATTENDANCE_TRACKING_MEMBER_SNAPSHOTS: MemberSnapshot[] = [
  { id: 'M-0045', name: 'Rahul Sharma', phone: '9876543210', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE, planName: 'Premium Annual', joinDate: '2026-01-14' },
  { id: 'M-0102', name: 'Priya Singh', phone: '9876501020', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE, planName: 'Standard Monthly', joinDate: '2026-02-08' },
  { id: 'M-0137', name: 'Neha Gupta', phone: '9876500137', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE, planName: 'Premium Quarterly', joinDate: '2025-12-18' },
  { id: 'M-0214', name: 'Vikram Singh', phone: '9876500214', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.EXPIRED, planName: 'Standard Monthly', joinDate: '2025-09-05' },
  { id: 'M-0318', name: 'Rohit Mehta', phone: '9876500318', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE, planName: 'Premium Annual', joinDate: '2026-03-02' },
  { id: 'M-0421', name: 'Kavya Singh', phone: '9876500421', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.FROZEN, planName: 'Standard Quarterly', joinDate: '2025-11-21' },
  { id: 'M-0520', name: 'Arjun Rao', phone: '9876500520', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.SUSPENDED, planName: 'Premium Monthly', joinDate: '2026-01-23' },
  { id: 'M-0611', name: 'Simran Kaur', phone: '9876500611', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE, planName: 'Standard Monthly', joinDate: '2026-02-14' },
  { id: 'M-0744', name: 'Manish Kumar', phone: '9876500744', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PENDING, planName: 'Premium Annual', joinDate: '2026-03-11' },
  { id: 'M-0835', name: 'Pooja Verma', phone: '9876500835', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE, planName: 'Standard Quarterly', joinDate: '2025-10-30' },
  { id: 'M-0936', name: 'Yash Tiwari', phone: '9876500936', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE, planName: 'Premium Annual', joinDate: '2026-01-31' },
];

export const MANAGER_ATTENDANCE_TRACKING_STAFF_SNAPSHOTS: StaffSnapshot[] = [
  { id: 'S-0001', name: 'Amit Kumar', role: 'Trainer', phone: '9876510001', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE },
  { id: 'S-0002', name: 'Anjali Desai', role: 'Front Desk', phone: '9876510002', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE },
  { id: 'S-0003', name: 'Karan Mehta', role: 'Trainer', phone: '9876510003', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ON_LEAVE },
  { id: 'S-0004', name: 'Anita Shah', role: 'Manager', phone: '9876510004', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE },
];
