// RESPONSIBILITY: Renders the Schedule PT Session dialog with React Hook Form + Zod validation; mutation remains in module-owned hooks.
'use client';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Calendar, Clock, MapPin, FileText, Loader2, Dumbbell } from 'lucide-react';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { managerPtScheduleSessionSchema, type ManagerPtScheduleSessionFormValues } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/schemas/manager_pt_assignments_assignment.schemas';
import type { PtAssignment } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';

interface Props {
  open: boolean;
  assignments: PtAssignment[];
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: ManagerPtScheduleSessionFormValues) => Promise<void>;
}

export default function ManagerPtAssignmentsScheduleSessionModal({ open, assignments, saving, onClose, onSubmit }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: open, onClose });

  const activeAssignments = assignments.filter((a) => a.completedSessions < a.totalSessions);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ManagerPtScheduleSessionFormValues>({
    resolver: zodResolver(managerPtScheduleSessionSchema),
    defaultValues: {
      assignmentId: activeAssignments[0]?.id || '',
      sessionDate: new Date().toISOString().split('T')[0],
      sessionTime: '10:00',
      durationMinutes: 60,
      location: 'Main Gym Floor',
      trainerNotes: '',
    },
  });

  if (!open) return null;

  const handleFormSubmit = async (data: ManagerPtScheduleSessionFormValues) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-backdrop p-4 backdrop-blur-xs overflow-y-auto" role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-pt-session-title"
        data-testid="manager_pt-schedule-session-dialog"
        className="my-auto flex max-h-dialog-desktop w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border p-6 pb-4 shrink-0 bg-card">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary-subtle text-primary">
              <Dumbbell size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <h2 id="schedule-pt-session-title" className="text-lg font-bold text-text-primary">Schedule PT Session</h2>
              <p className="text-xs text-text-secondary">Book a personal training session for an active client</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6 pt-4 custom-scrollbar">
          {/* Assignment selection */}
          <div>
            <label htmlFor="pt-session-assignment" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
              Select Client & Package *
            </label>
            <select
              id="pt-session-assignment"
              {...register('assignmentId')}
              data-testid="manager_pt-schedule-select-assignment"
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {activeAssignments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.memberName} — Trainer: {a.trainerName} ({a.completedSessions}/{a.totalSessions} done)
                </option>
              ))}
            </select>
            {errors.assignmentId && <p className="mt-1 text-xs text-danger-text">{errors.assignmentId.message}</p>}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pt-session-date" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Date *
              </label>
              <div className="relative">
                <input
                  id="pt-session-date"
                  type="date"
                  {...register('sessionDate')}
                  data-testid="manager_pt-schedule-input-date"
                  className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
              </div>
              {errors.sessionDate && <p className="mt-1 text-xs text-danger-text">{errors.sessionDate.message}</p>}
            </div>

            <div>
              <label htmlFor="pt-session-time" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Time *
              </label>
              <input
                id="pt-session-time"
                type="time"
                {...register('sessionTime')}
                data-testid="manager_pt-schedule-input-time"
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
              {errors.sessionTime && <p className="mt-1 text-xs text-danger-text">{errors.sessionTime.message}</p>}
            </div>
          </div>

          {/* Duration & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pt-session-duration" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Duration (minutes)
              </label>
              <input
                id="pt-session-duration"
                type="number"
                min={15}
                max={180}
                step={15}
                {...register('durationMinutes', { valueAsNumber: true })}
                data-testid="manager_pt-schedule-input-duration"
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
              {errors.durationMinutes && <p className="mt-1 text-xs text-danger-text">{errors.durationMinutes.message}</p>}
            </div>

            <div>
              <label htmlFor="pt-session-location" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Floor / Studio Location
              </label>
              <input
                id="pt-session-location"
                type="text"
                placeholder="e.g. Studio A, Functional Area"
                {...register('location')}
                data-testid="manager_pt-schedule-input-location"
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
            </div>
          </div>

          {/* Trainer Notes / Workout Focus */}
          <div>
            <label htmlFor="pt-session-notes" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
              Session Focus & Trainer Notes (Optional)
            </label>
            <textarea
              id="pt-session-notes"
              rows={2}
              placeholder="e.g. Upper body hypertrophy, bench press form check"
              {...register('trainerNotes')}
              data-testid="manager_pt-schedule-input-notes"
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>

          <div className="sticky bottom-0 bg-card flex justify-end gap-3 border-t border-border pt-4 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border text-sm font-semibold text-text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              data-testid="manager_pt-schedule-button-submit"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-sm font-bold text-on-primary hover:bg-primary-hover active:scale-95 transition-all disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {saving && <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden="true" />}
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

