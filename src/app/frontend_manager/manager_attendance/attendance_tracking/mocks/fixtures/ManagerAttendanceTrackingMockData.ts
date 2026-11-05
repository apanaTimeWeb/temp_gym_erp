import { MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';
import type { Attendance, AttendanceStatsResponse } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';

/**
 * @description Provides the ManagerAttendanceTrackingMockData implementation for the attendance module.
 * @dependencies @/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceTrackingTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_ATTENDANCE_STATS: AttendanceStatsResponse = {
  totalCheckIns: 120,
  memberCheckIns: 105,
  staffCheckIns: 15 };

export const MOCK_ATTENDANCE_RECORDS: Attendance[] = [
  {
    id: '1',
    memberId: 1,
    date: new Date().toISOString().split('T')[0] || '',
    checkIn: '06:00',
    checkOut: '07:30',
    type: 'MEMBER',
    status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY,
    member: { name: 'Rahul Sharma' },
    checkInMethod: 'Biometric',
    durationMinutes: 90 },
  {
    id: '2',
    memberId: 2,
    date: new Date().toISOString().split('T')[0] || '',
    checkIn: '06:15',
    checkOut: '07:45',
    type: 'MEMBER',
    status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY,
    member: { name: 'Priya Singh' },
    checkInMethod: 'QR',
    durationMinutes: 90 },
  {
    id: '3',
    staffId: 1,
    date: new Date().toISOString().split('T')[0] || '',
    checkIn: '05:30',
    checkOut: '14:30',
    type: 'STAFF',
    status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY,
    staff: { name: 'Amit Kumar' },
    checkInMethod: 'Biometric',
    durationMinutes: 540 },
  {
    id: '4',
    memberId: 3,
    date: new Date().toISOString().split('T')[0] || '',
    checkIn: '07:00',
    type: 'MEMBER',
    status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY,
    member: { name: 'Neha Gupta' },
    checkInMethod: 'Manual' },
  {
    id: '5',
    memberId: 4,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0] || '',
    checkIn: '17:00',
    checkOut: '19:00',
    type: 'MEMBER',
    status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY,
    member: { name: 'Vikram Singh' },
    checkInMethod: 'QR',
    durationMinutes: 120 },
  { id: '6', memberId: 5, date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0] || '', checkIn: '06:45', checkOut: '08:00', type: 'MEMBER', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY, member: { name: 'Rohit Mehta' }, checkInMethod: 'QR', durationMinutes: 75 },
  { id: '7', memberId: 6, date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0] || '', checkIn: '07:15', type: 'MEMBER', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LATE, member: { name: 'Kavya Singh' }, checkInMethod: 'Manual', lateMinutes: 15 },
  { id: '8', staffId: 2, date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0] || '', checkIn: '06:00', checkOut: '15:00', type: 'STAFF', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY, staff: { name: 'Anjali Desai' }, checkInMethod: 'Biometric', durationMinutes: 540 },
  { id: '9', memberId: 7, date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0] || '', type: 'MEMBER', status: 'Absent', member: { name: 'Arjun Rao' } },
  { id: '10', memberId: 8, date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0] || '', checkIn: '18:00', checkOut: '19:20', type: 'MEMBER', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY, member: { name: 'Simran Kaur' }, checkInMethod: 'QR', durationMinutes: 80 },
  { id: '11', staffId: 3, date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0] || '', checkIn: '08:00', type: 'STAFF', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LATE, staff: { name: 'Karan Mehta' }, checkInMethod: 'Manual', lateMinutes: 10 },
  { id: '12', memberId: 9, date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0] || '', checkIn: '09:00', checkOut: '10:10', type: 'MEMBER', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY, member: { name: 'Manish Kumar' }, checkInMethod: 'Biometric', durationMinutes: 70 },
  { id: '13', memberId: 10, date: new Date(Date.now() - 8 * 86400000).toISOString().split('T')[0] || '', type: 'MEMBER', status: 'Absent', member: { name: 'Pooja Verma' } },
  { id: '14', staffId: 4, date: new Date(Date.now() - 9 * 86400000).toISOString().split('T')[0] || '', checkIn: '07:30', checkOut: '16:30', type: 'STAFF', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY, staff: { name: 'Anita Shah' }, checkInMethod: 'Biometric', durationMinutes: 540 },
  { id: '15', memberId: 11, date: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0] || '', checkIn: '06:30', checkOut: '07:45', type: 'MEMBER', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY, member: { name: 'Yash Tiwari' }, checkInMethod: 'QR', durationMinutes: 75 }

];
