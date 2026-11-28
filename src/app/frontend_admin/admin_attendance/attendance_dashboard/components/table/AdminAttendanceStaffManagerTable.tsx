"use client";
// RESPONSIBILITY: Renders and manages the Staff & Manager daily attendance check-in/out logs for gym admins,
// including manual punch recording, timestamp overrides, and real-time status management.
// DATA FLOW: staff fixtures & attendance state → filtered records table with shifts, check-in/out, manual punch modal, and status.

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Calendar,
  PlusCircle,
  Edit3,
  X
} from 'lucide-react';
import { StaffAttendanceRecord, INITIAL_STAFF_ATTENDANCE } from '../../types/AdminAttendanceStaffManagerTypes';
import AdminAttendanceStaffManagerModal from '../modal/AdminAttendanceStaffManagerModal';
import { CopyButton } from '@/components/ui/CopyButton';

const TABLE_COLUMN_COUNT = 9;

export default function AdminAttendanceStaffManagerTable() {
  const t = useTranslations();
  const [records, setRecords] = useState<StaffAttendanceRecord[]>(INITIAL_STAFF_ATTENDANCE);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Manual Punch Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<StaffAttendanceRecord | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    if (!successToast) return;
    const timer = setTimeout(() => setSuccessToast(null), 4000);
    return () => clearTimeout(timer);
  }, [successToast]);

  const handleOpenNewModal = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (rec: StaffAttendanceRecord) => {
    setEditingRecord(rec);
    setIsModalOpen(true);
  };

  const handleSaveAttendance = (data: Omit<StaffAttendanceRecord, 'id' | 'duration'> & { id?: string }) => {
    let duration = '—';
    if (data.status !== 'on-leave') {
      duration = data.checkOutTime ? '8h 30m' : 'In Progress';
    }

    if (data.id) {
      setRecords(prev => prev.map(item => item.id === data.id ? {
        ...item,
        ...data,
        duration,
      } : item));
      setSuccessToast(`Attendance punch updated successfully for ${data.name} (${data.role})!`);
    } else {
      const newRecord: StaffAttendanceRecord = {
        ...data,
        id: `sa-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        duration,
      };
      setRecords(prev => [newRecord, ...prev]);
      setSuccessToast(`Manual attendance marked successfully for ${data.name} (${data.role})!`);
    }
    setIsModalOpen(false);
  };

  const filtered = useMemo(() => {
    return records.filter((rec) => {
      const matchSearch = !search || rec.name.toLowerCase().includes(search.toLowerCase()) || rec.role.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || (roleFilter === 'Manager' ? rec.role === 'Manager' : rec.role !== 'Manager');
      const matchBranch = branchFilter === 'all' || rec.branchName === branchFilter;
      const matchStatus = statusFilter === 'all' || rec.status === statusFilter;
      return matchSearch && matchRole && matchBranch && matchStatus;
    });
  }, [records, search, roleFilter, branchFilter, statusFilter]);

  const presentCount = records.filter(r => r.status === 'present').length;
  const lateCount = records.filter(r => r.status === 'late').length;
  const onLeaveCount = records.filter(r => r.status === 'on-leave').length;

  return (
    <div className="space-y-4">
      {successToast && (
        <div role="status" className="flex items-center justify-between gap-3 p-3.5 bg-success-bg border border-success rounded-xl text-success-text text-xs sm:text-sm font-semibold shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="shrink-0 text-success-text" />
            <span>{successToast}</span>
          </div>
          <button type="button" onClick={() => setSuccessToast(null)} className="text-success-text hover:opacity-80 p-1" aria-label="Dismiss message">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Quick Staff KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-surface-highlight p-3">
          <div className="text-xs font-semibold text-secondary">Total Staff Logged</div>
          <div className="text-lg font-bold text-text-primary mt-0.5">{records.length} Staff</div>
        </div>
        <div className="rounded-xl border border-success bg-success-bg p-3">
          <div className="text-xs font-semibold text-success-text">Present Today</div>
          <div className="text-lg font-bold text-success-text mt-0.5">{presentCount} On Duty</div>
        </div>
        <div className="rounded-xl border border-warning bg-warning-bg p-3">
          <div className="text-xs font-semibold text-warning">Late Arrivals</div>
          <div className="text-lg font-bold text-warning mt-0.5">{lateCount} Flagged</div>
        </div>
        <div className="rounded-xl border border-border bg-surface-highlight p-3">
          <div className="text-xs font-semibold text-secondary">Approved Leaves</div>
          <div className="text-lg font-bold text-text-primary mt-0.5">{onLeaveCount} Staff</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-highlight p-3 rounded-xl border border-border">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search staff or manager..."
              className="w-full min-h-11 rounded-xl border border-border bg-input pl-9 pr-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Filter by role"
          >
            <option value="all">All Roles (Staff & Managers)</option>
            <option value="Manager">Managers Only</option>
            <option value="Staff">Trainers & Desk Staff Only</option>
          </select>

          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Filter by branch"
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
            className="min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Filter by attendance status"
          >
            <option value="all">All Statuses</option>
            <option value="present">Present</option>
            <option value="late">Late</option>
            <option value="on-leave">On Leave</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleOpenNewModal}
          className="inline-flex items-center gap-1.5 px-4 min-h-11 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-sm hover:opacity-90 motion-safe:transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
        >
          <PlusCircle size={15} />
          <span>Mark Manual Attendance</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="max-h-[640px] overflow-auto">
          <table data-admin-responsive-table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="sticky top-0 z-20 bg-slate-100 dark:bg-[#152038] border-b border-border shadow-xs">
              <tr className="border-b border-border bg-surface-highlight text-secondary">
                <th className="sticky start-0 z-30 bg-slate-100 dark:bg-[#152038] border-e border-border p-3.5 font-bold uppercase tracking-wider text-xs whitespace-nowrap">Staff / Manager Name</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-xs whitespace-nowrap">Role</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-xs whitespace-nowrap">Branch</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-xs whitespace-nowrap">Assigned Shift</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-xs whitespace-nowrap">Check-In</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-xs whitespace-nowrap">Check-Out</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-xs whitespace-nowrap">Total Duration</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-xs whitespace-nowrap">Attendance Status</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-xs text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-white/[0.07]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_COLUMN_COUNT} className="p-8 text-center text-secondary">
                    No staff or manager attendance records match the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-surface-hover motion-safe:transition-colors group">
                    <td className="sticky start-0 z-10 bg-card dark:bg-[#0F172A] group-hover:bg-orange-50 dark:group-hover:bg-[#18243E] border-e border-border p-3.5 font-semibold text-text-primary">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-primary-subtle text-primary font-bold flex items-center justify-center text-xs shrink-0">
                          {record.name.charAt(0)}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Link href={`/frontend_admin/admin_hr/hr_staff_management?search=${encodeURIComponent(record.name)}`} className="hover:underline hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded" title="View staff profile">
                              {record.name}
                            </Link>
                            <CopyButton value={record.name} label="Copy staff name" className="opacity-0 group-hover:opacity-100" />
                          </div>
                          {record.adminNotes && (
                            <p className="text-[10px] text-secondary font-normal italic truncate max-w-[140px]">
                              {record.adminNotes}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                        record.role === 'Manager' ? 'bg-primary text-on-primary' : 'bg-surface-highlight text-text-primary border border-border'
                      }`}>
                        {record.role}
                      </span>
                    </td>
                    <td className="p-3.5 text-secondary">
                      <Link href={`/frontend_admin/admin_gyms/gyms_branches_directory?search=${encodeURIComponent(record.branchName)}`} className="hover:underline hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded" title="View branch">
                        {record.branchName}
                      </Link>
                    </td>
                    <td className="p-3.5 text-secondary text-xs">{record.shift}</td>
                    <td className="p-3.5 font-medium text-text-primary">{record.checkInTime}</td>
                    <td className="p-3.5 text-secondary">{record.checkOutTime || '—'}</td>
                    <td className="p-3.5 text-text-primary font-medium">{record.duration}</td>
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
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(record)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-card hover:bg-surface-highlight text-text-primary text-xs font-semibold shadow-xs motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Adjust attendance punch for ${record.name}`}
                      >
                        <Edit3 size={12} className="text-secondary" />
                        <span>Adjust Punch</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminAttendanceStaffManagerModal
        isOpen={isModalOpen}
        editingRecord={editingRecord}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAttendance}
      />
    </div>
  );
}
