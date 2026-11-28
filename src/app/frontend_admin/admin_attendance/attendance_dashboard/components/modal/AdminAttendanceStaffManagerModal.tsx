"use client";
// RESPONSIBILITY: Modal dialog for recording or adjusting staff & manager daily attendance.
import { useState, useEffect } from 'react';
import { UserCheck, X } from 'lucide-react';
import { StaffAttendanceRecord, PREDEFINED_STAFF_MEMBERS } from '../../types/AdminAttendanceStaffManagerTypes';

interface AdminAttendanceStaffManagerModalProps {
  isOpen: boolean;
  editingRecord: StaffAttendanceRecord | null;
  onClose: () => void;
  onSave: (record: Omit<StaffAttendanceRecord, 'id' | 'duration'> & { id?: string }) => void;
}

export default function AdminAttendanceStaffManagerModal({
  isOpen,
  editingRecord,
  onClose,
  onSave,
}: AdminAttendanceStaffManagerModalProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('Rohit Mehta');
  const [name, setName] = useState('Rohit Mehta');
  const [role, setRole] = useState<'Manager' | 'Senior Trainer' | 'Trainer' | 'Front Desk' | 'Maintenance'>('Manager');
  const [branch, setBranch] = useState('Andheri East');
  const [shift, setShift] = useState<'Morning (06:00 - 15:00)' | 'Evening (14:00 - 23:00)' | 'General (09:00 - 18:00)'>('Morning (06:00 - 15:00)');
  const [date, setDate] = useState('2026-11-14');
  const [checkInTime, setCheckInTime] = useState('06:00 AM');
  const [checkOutTime, setCheckOutTime] = useState('03:00 PM');
  const [status, setStatus] = useState<'present' | 'late' | 'on-leave'>('present');
  const [adminNotes, setAdminNotes] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (editingRecord) {
      setSelectedPreset(editingRecord.name);
      setName(editingRecord.name);
      setRole(editingRecord.role);
      setBranch(editingRecord.branchName);
      setShift(editingRecord.shift);
      setDate(editingRecord.date);
      setCheckInTime(editingRecord.checkInTime === '—' ? '06:00 AM' : editingRecord.checkInTime);
      setCheckOutTime(editingRecord.checkOutTime || '');
      setStatus(editingRecord.status);
      setAdminNotes(editingRecord.adminNotes || 'Admin manual punch adjustment');
    } else {
      const defaultStaff = PREDEFINED_STAFF_MEMBERS[0];
      setSelectedPreset(defaultStaff.name);
      setName(defaultStaff.name);
      setRole(defaultStaff.role);
      setBranch(defaultStaff.branch);
      setShift(defaultStaff.shift);
      setDate(new Date().toISOString().split('T')[0] || '2026-11-14');
      setCheckInTime('06:00 AM');
      setCheckOutTime('03:00 PM');
      setStatus('present');
      setAdminNotes('Admin manual check-in entry');
    }
    setFormError('');
  }, [editingRecord, isOpen]);

  if (!isOpen) return null;

  const handlePresetChange = (staffName: string) => {
    setSelectedPreset(staffName);
    const found = PREDEFINED_STAFF_MEMBERS.find(s => s.name === staffName);
    if (found) {
      setName(found.name);
      setRole(found.role);
      setBranch(found.branch);
      setShift(found.shift);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please select or specify a staff member name.');
      return;
    }
    onSave({
      id: editingRecord?.id,
      name: name.trim(),
      role,
      branchName: branch,
      shift,
      checkInTime: status === 'on-leave' ? '—' : (checkInTime.trim() || '06:00 AM'),
      checkOutTime: status === 'on-leave' ? null : (checkOutTime.trim() || null),
      status,
      date,
      adminNotes: adminNotes.trim(),
    });
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="manual-attendance-modal-title" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm animate-in fade-in">
      <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-highlight">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-subtle text-primary flex items-center justify-center">
              <UserCheck size={18} />
            </div>
            <div>
              <h2 id="manual-attendance-modal-title" className="text-base font-bold text-text-primary">
                {editingRecord ? 'Adjust Staff / Manager Attendance' : 'Mark Manual Attendance (Admin Override)'}
              </h2>
              <p className="text-xs text-secondary mt-0.5">Record or adjust daily check-in/out timestamps and presence</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-secondary hover:text-primary p-1.5 rounded-lg hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          {formError && (
            <div role="alert" className="p-3 bg-danger-bg border border-danger rounded-xl text-danger-text text-xs font-semibold">
              {formError}
            </div>
          )}

          <div>
            <label htmlFor="staff-preset-select" className="block text-xs font-bold text-text-primary mb-1">Staff Member / Manager *</label>
            {!editingRecord ? (
              <select id="staff-preset-select" value={selectedPreset} onChange={(e) => handlePresetChange(e.target.value)} className="w-full min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {PREDEFINED_STAFF_MEMBERS.map(s => (
                  <option key={s.name} value={s.name}>{s.name} — {s.role} ({s.branch})</option>
                ))}
              </select>
            ) : (
              <input type="text" id="staff-preset-select" value={name} onChange={(e) => setName(e.target.value)} className="w-full min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="attendance-role-select" className="block text-xs font-bold text-text-primary mb-1">Role *</label>
              <select id="attendance-role-select" value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <option value="Manager">Manager</option>
                <option value="Senior Trainer">Senior Trainer</option>
                <option value="Trainer">Trainer</option>
                <option value="Front Desk">Front Desk</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label htmlFor="attendance-branch-select" className="block text-xs font-bold text-text-primary mb-1">Gym Branch *</label>
              <select id="attendance-branch-select" value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <option value="Andheri East">Andheri East</option>
                <option value="Bandra West">Bandra West</option>
                <option value="Powai">Powai</option>
                <option value="Thane">Thane</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="attendance-date-input" className="block text-xs font-bold text-text-primary mb-1">Date *</label>
              <input type="date" id="attendance-date-input" value={date} onChange={(e) => setDate(e.target.value)} className="w-full min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div>
              <label htmlFor="attendance-shift-select" className="block text-xs font-bold text-text-primary mb-1">Assigned Shift *</label>
              <select id="attendance-shift-select" value={shift} onChange={(e) => setShift(e.target.value as any)} className="w-full min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <option value="Morning (06:00 - 15:00)">Morning (06:00 - 15:00)</option>
                <option value="Evening (14:00 - 23:00)">Evening (14:00 - 23:00)</option>
                <option value="General (09:00 - 18:00)">General (09:00 - 18:00)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">Attendance Status *</label>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={() => setStatus('present')} className={`py-2 px-3 rounded-xl text-xs font-bold border motion-safe:transition-colors ${status === 'present' ? 'bg-success-bg border-success text-success-text shadow-xs' : 'bg-card border-border text-secondary hover:text-primary'}`}>Present</button>
              <button type="button" onClick={() => setStatus('late')} className={`py-2 px-3 rounded-xl text-xs font-bold border motion-safe:transition-colors ${status === 'late' ? 'bg-warning-bg border-warning text-warning shadow-xs' : 'bg-card border-border text-secondary hover:text-primary'}`}>Late Arrival</button>
              <button type="button" onClick={() => setStatus('on-leave')} className={`py-2 px-3 rounded-xl text-xs font-bold border motion-safe:transition-colors ${status === 'on-leave' ? 'bg-surface-highlight border-primary text-text-primary shadow-xs' : 'bg-card border-border text-secondary hover:text-primary'}`}>On Leave</button>
            </div>
          </div>

          {status !== 'on-leave' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="attendance-checkin-input" className="block text-xs font-bold text-text-primary mb-1">Check-In Time *</label>
                <input type="text" id="attendance-checkin-input" value={checkInTime} onChange={(e) => setCheckInTime(e.target.value)} placeholder="e.g. 06:00 AM" className="w-full min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
              </div>
              <div>
                <label htmlFor="attendance-checkout-input" className="block text-xs font-bold text-text-primary mb-1">Check-Out Time (Optional)</label>
                <input type="text" id="attendance-checkout-input" value={checkOutTime} onChange={(e) => setCheckOutTime(e.target.value)} placeholder="e.g. 03:00 PM" className="w-full min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="attendance-notes-input" className="block text-xs font-bold text-text-primary mb-1">Reason / Audit Justification</label>
            <input type="text" id="attendance-notes-input" value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} placeholder="e.g. Biometric scanner offline, on-duty approval" className="w-full min-h-11 rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-surface-highlight text-secondary hover:text-primary text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:opacity-90 motion-safe:transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {editingRecord ? 'Update Punch Record' : 'Save Attendance Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
