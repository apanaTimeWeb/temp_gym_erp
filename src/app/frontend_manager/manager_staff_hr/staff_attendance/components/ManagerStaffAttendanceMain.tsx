// RESPONSIBILITY: Provides the staff-attendance page shell and mounts the attendance-history surface; it does not calculate payroll or own attendance API mutations.
"use client";
import { useTranslations } from 'next-intl';
import ManagerStaffPayrollAndAttendanceAttendanceHistory from '@/app/frontend_manager/manager_staff_hr/staff_attendance/components/ManagerStaffAttendanceAttendanceHistory';
export default function StaffAttendanceMain() { const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE'); return <section className="min-h-full p-6 space-y-5"><h1 className="text-2xl font-bold text-text-primary">Staff Attendance</h1><ManagerStaffPayrollAndAttendanceAttendanceHistory /></section>; }
