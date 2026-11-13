"use client";
// RESPONSIBILITY: Renders the Staff & Manager daily attendance check-in/out logs for gym admins.
// DATA FLOW: staff fixtures & attendance state → filtered records table with shifts, check-in/out, and status.

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Building2, UserCheck, Clock, ShieldCheck, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';

interface StaffAttendanceRecord {
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
}

const MOCK_STAFF_ATTENDANCE: StaffAttendanceRecord[] = [
  { id: 'sa-01', name: 'Rohit Mehta', role: 'Manager', branchName: 'Andheri East', shift: 'Morning (06:00 - 15:00)', checkInTime: '05:55 AM', checkOutTime: '03:10 PM', duration: '9h 15m', status: 'present', date: '2026-11-13' },
  { id: 'sa-02', name: 'Sahil Joshi', role: 'Manager', branchName: 'Bandra West', shift: 'Morning (06:00 - 15:00)', checkInTime: '06:05 AM', checkOutTime: '03:00 PM', duration: '8h 55m', status: 'present', date: '2026-11-13' },
  { id: 'sa-03', name: 'Dev Malhotra', role: 'Manager', branchName: 'Powai', shift: 'Morning (06:00 - 15:00)', checkInTime: '06:20 AM', checkOutTime: null, duration: 'In Progress', status: 'late', date: '2026-11-13' },
  { id: 'sa-04', name: 'Priya Shah', role: 'Senior Trainer', branchName: 'Andheri East', shift: 'Evening (14:00 - 23:00)', checkInTime: '01:50 PM', checkOutTime: '10:30 PM', duration: '8h 40m', status: 'present', date: '2026-11-13' },
  { id: 'sa-05', name: 'Maya Singh', role: 'Trainer', branchName: 'Bandra West', shift: 'Evening (14:00 - 23:00)', checkInTime: '02:00 PM', checkOutTime: '10:00 PM', duration: '8h 00m', status: 'present', date: '2026-11-13' },
  { id: 'sa-06', name: 'Aman Khan', role: 'Front Desk', branchName: 'Andheri East', shift: 'Morning (06:00 - 15:00)', checkInTime: '06:00 AM', checkOutTime: '02:30 PM', duration: '8h 30m', status: 'present', date: '2026-11-13' },
  { id: 'sa-07', name: 'Vikas Singh', role: 'Trainer', branchName: 'Powai', shift: 'General (09:00 - 18:00)', checkInTime: '09:05 AM', checkOutTime: '06:15 PM', duration: '9h 10m', status: 'present', date: '2026-11-13' },
  { id: 'sa-08', name: 'Karan Mehra', role: 'Maintenance', branchName: 'Thane', shift: 'Morning (06:00 - 15:00)', checkInTime: '—', checkOutTime: null, duration: '—', status: 'on-leave', date: '2026-11-13' },
];

export default function AdminAttendanceStaffManagerTable() {
  const t = useTranslations();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() => {
    return MOCK_STAFF_ATTENDANCE.filter((rec) => {
      const matchSearch = !search || rec.name.toLowerCase().includes(search.toLowerCase()) || rec.role.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || (roleFilter === 'Manager' ? rec.role === 'Manager' : rec.role !== 'Manager');
      const matchBranch = branchFilter === 'all' || rec.branchName === branchFilter;
      const matchStatus = statusFilter === 'all' || rec.status === statusFilter;
      return matchSearch && matchRole && matchBranch && matchStatus;
    });
  }, [search, roleFilter, branchFilter, statusFilter]);

  const presentCount = MOCK_STAFF_ATTENDANCE.filter(r => r.status === 'present').length;
  const lateCount = MOCK_STAFF_ATTENDANCE.filter(r => r.status === 'late').length;
  const onLeaveCount = MOCK_STAFF_ATTENDANCE.filter(r => r.status === 'on-leave').length;

  return (
    <div className="space-y-4">
      {/* Quick Staff KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-surface-highlight p-3">
          <div className="text-xs font-semibold text-secondary">Total Staff Logged</div>
          <div className="text-lg font-bold text-primary mt-0.5">{MOCK_STAFF_ATTENDANCE.length} Staff</div>
        </div>
        <div className="rounded-xl border border-success/30 bg-success-bg p-3">
          <div className="text-xs font-semibold text-success-text">Present Today</div>
          <div className="text-lg font-bold text-success-text mt-0.5">{presentCount} On Duty</div>
        </div>
        <div className="rounded-xl border border-warning/30 bg-warning-bg p-3">
          <div className="text-xs font-semibold text-warning">Late Arrivals</div>
          <div className="text-lg font-bold text-warning mt-0.5">{lateCount} Flagged</div>
        </div>
        <div className="rounded-xl border border-border bg-surface-highlight p-3">
          <div className="text-xs font-semibold text-secondary">Approved Leaves</div>
          <div className="text-lg font-bold text-primary mt-0.5">{onLeaveCount} Staff</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-highlight/50 p-3 rounded-xl border border-border">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative min-w-[220px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search staff or manager..."
              className="w-full min-h-11 rounded-xl border border-border bg-input pl-9 pr-3 text-xs text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">All Roles (Staff & Managers)</option>
            <option value="Manager">Managers Only</option>
            <option value="Staff">Trainers & Desk Staff Only</option>
          </select>

          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">All Branches</option>
            <option value="Andheri East">Andheri East</option>
            <option value="Bandra West">Bandra West</option>
            <option value="Powai">Powai</option>
            <option value="Thane">Thane</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="present">Present</option>
            <option value="late">Late</option>
            <option value="on-leave">On Leave</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-highlight text-secondary">
              <th className="p-3.5 font-bold uppercase tracking-wider text-xs">Staff / Manager Name</th>
              <th className="p-3.5 font-bold uppercase tracking-wider text-xs">Role</th>
              <th className="p-3.5 font-bold uppercase tracking-wider text-xs">Branch</th>
              <th className="p-3.5 font-bold uppercase tracking-wider text-xs">Assigned Shift</th>
              <th className="p-3.5 font-bold uppercase tracking-wider text-xs">Check-In</th>
              <th className="p-3.5 font-bold uppercase tracking-wider text-xs">Check-Out</th>
              <th className="p-3.5 font-bold uppercase tracking-wider text-xs">Total Duration</th>
              <th className="p-3.5 font-bold uppercase tracking-wider text-xs">Attendance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-secondary">
                  No staff or manager attendance records match the selected filters.
                </td>
              </tr>
            ) : (
              filtered.map((record) => (
                <tr key={record.id} className="hover:bg-surface-hover motion-safe:transition-colors">
                  <td className="p-3.5 font-semibold text-primary">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-primary-subtle text-primary font-bold flex items-center justify-center text-xs">
                        {record.name.charAt(0)}
                      </span>
                      <span>{record.name}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                      record.role === 'Manager' ? 'bg-primary text-on-primary' : 'bg-surface-highlight text-primary border border-border'
                    }`}>
                      {record.role}
                    </span>
                  </td>
                  <td className="p-3.5 text-secondary">{record.branchName}</td>
                  <td className="p-3.5 text-secondary text-xs">{record.shift}</td>
                  <td className="p-3.5 font-medium text-primary">{record.checkInTime}</td>
                  <td className="p-3.5 text-secondary">{record.checkOutTime || '—'}</td>
                  <td className="p-3.5 text-primary font-medium">{record.duration}</td>
                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      record.status === 'present'
                        ? 'bg-success-bg text-success-text'
                        : record.status === 'late'
                        ? 'bg-warning-bg text-warning'
                        : 'bg-surface-highlight text-secondary border border-border'
                    }`}>
                      {record.status === 'present' && <CheckCircle2 size={12} />}
                      {record.status === 'late' && <AlertCircle size={12} />}
                      {record.status === 'on-leave' && <Calendar size={12} />}
                      <span className="capitalize">{record.status}</span>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

