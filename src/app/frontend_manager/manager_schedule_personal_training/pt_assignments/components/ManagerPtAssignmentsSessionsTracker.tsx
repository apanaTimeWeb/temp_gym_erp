// RESPONSIBILITY: Renders the PT Sessions Tracker view allowing managers to monitor and manage individual personal training sessions.
'use client';
import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle, Dumbbell, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import type { PtAssignment, PtSessionLog, PtSessionStatus } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';

interface Props {
  assignments: PtAssignment[];
  onMarkSession: (assignmentId: string) => Promise<unknown>;
  markingId: string | null | undefined;
}

// Initial mock session logs derived from active assignments
const DEFAULT_SESSION_LOGS: Array<PtSessionLog & { memberName: string; trainerName: string; packageName: string; time: string }> = [
  {
    id: 'sess-1',
    assignmentId: '1',
    memberName: 'Aarav Patel',
    trainerName: 'Vikram Singh',
    packageName: 'Transformation 20',
    sessionNumber: 4,
    sessionDate: '2026-11-10',
    time: '08:00 AM',
    durationMinutes: 60,
    location: 'Main Floor - Squat Rack 2',
    status: 'COMPLETED',
    trainerNotes: 'Heavy compound leg day. Great squat depth reached.',
    memberFeedback: 'Felt strong, good workout intensity.',
  },
  {
    id: 'sess-2',
    assignmentId: '2',
    memberName: 'Pooja Reddy',
    trainerName: 'Ananya Sharma',
    packageName: 'Pilates Core 12',
    sessionNumber: 3,
    sessionDate: '2026-11-10',
    time: '11:00 AM',
    durationMinutes: 45,
    location: 'Studio B - Reformer 1',
    status: 'COMPLETED',
    trainerNotes: 'Reformer posture correction and pelvic floor drills.',
  },
  {
    id: 'sess-3',
    assignmentId: '1',
    memberName: 'Aarav Patel',
    trainerName: 'Vikram Singh',
    packageName: 'Transformation 20',
    sessionNumber: 5,
    sessionDate: '2026-11-12',
    time: '08:00 AM',
    durationMinutes: 60,
    location: 'Main Gym Floor',
    status: 'SCHEDULED',
    trainerNotes: 'Push day: Bench press & overhead shoulder work.',
  },
  {
    id: 'sess-4',
    assignmentId: '3',
    memberName: 'Rohan Mehra',
    trainerName: 'Rahul Verma',
    packageName: 'Elite Strength 30',
    sessionNumber: 8,
    sessionDate: '2026-11-11',
    time: '05:00 PM',
    durationMinutes: 60,
    location: 'Functional Rig Area',
    status: 'SCHEDULED',
    trainerNotes: 'Cardio endurance and kettlebell circuits.',
  },
  {
    id: 'sess-5',
    assignmentId: '4',
    memberName: 'Sneha Rao',
    trainerName: 'Priya Patel',
    packageName: 'Weight Loss 15',
    sessionNumber: 2,
    sessionDate: '2026-11-09',
    time: '09:30 AM',
    durationMinutes: 60,
    location: 'Cardio Deck',
    status: 'MISSED',
    trainerNotes: 'Client did not attend due to traffic delay.',
  },
];

const STATUS_BADGES: Record<PtSessionStatus, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
  COMPLETED: { bg: 'bg-success-bg', text: 'text-success-text', icon: CheckCircle2 },
  SCHEDULED: { bg: 'bg-primary-subtle', text: 'text-primary', icon: Clock },
  CANCELLED: { bg: 'bg-danger-bg', text: 'text-danger-text', icon: XCircle },
  MISSED: { bg: 'bg-warning-bg', text: 'text-warning-text', icon: AlertCircle },
};

export default function ManagerPtAssignmentsSessionsTracker({ assignments, onMarkSession, markingId }: Props) {
  const [sessions, setSessions] = useState(DEFAULT_SESSION_LOGS);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredSessions = filterStatus === 'ALL'
    ? sessions
    : sessions.filter((s) => s.status === filterStatus);

  const handleUpdateStatus = (sessionId: string, newStatus: PtSessionStatus, assignmentId: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: newStatus } : s))
    );
    if (newStatus === 'COMPLETED') {
      void onMarkSession(assignmentId);
    }
  };

  const TABLE_LABELS = ['Session & Client', 'Trainer & Package', 'Date & Time', 'Status', 'Focus Notes', 'Actions'];

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden shadow-card" data-testid="manager_pt-sessions-tracker-card">
      <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-text-primary">Personal Training Sessions Tracker</h2>
          <p className="text-xs text-text-secondary mt-0.5">Track, complete, and review individual member training sessions</p>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1 bg-input p-1 rounded-lg text-xs font-semibold overflow-x-auto">
          {['ALL', 'SCHEDULED', 'COMPLETED', 'MISSED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                filterStatus === st
                  ? 'bg-card text-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={TABLE_LABELS}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-subtle border-b border-border">
                {TABLE_LABELS.map((label) => (
                  <th key={label} className="py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSessions.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_LABELS.length} className="py-12 text-center text-sm text-text-secondary">
                    No sessions match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredSessions.map((s) => {
                  const badge = STATUS_BADGES[s.status] || STATUS_BADGES.SCHEDULED;
                  const Icon = badge.icon;
                  const isMarking = markingId === s.assignmentId;

                  return (
                    <tr key={s.id} className="hover:bg-primary-subtle/30 motion-safe:transition-all">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-subtle text-primary font-bold text-xs flex items-center justify-center shrink-0">
                            #{s.sessionNumber}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{s.memberName}</p>
                            <p className="text-xs text-text-secondary">Session #{s.sessionNumber}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-text-primary">{s.trainerName}</p>
                        <p className="text-xs text-text-secondary">{s.packageName}</p>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs text-text-primary font-medium">
                          <Calendar size={14} className="text-primary shrink-0" aria-hidden="true" />
                          <span>{s.sessionDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-0.5">
                          <Clock size={12} aria-hidden="true" />
                          <span>{s.time} ({s.durationMinutes}m)</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                          <Icon size={12} aria-hidden="true" />
                          {s.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-text-secondary max-w-xs truncate">
                        <span title={s.trainerNotes || 'No notes'}>{s.trainerNotes || '—'}</span>
                        {s.location && <p className="text-[11px] text-text-muted mt-0.5 flex items-center gap-1"><MapPin size={10} />{s.location}</p>}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {s.status === 'SCHEDULED' ? (
                            <>
                              <button
                                type="button"
                                disabled={isMarking}
                                onClick={() => handleUpdateStatus(s.id, 'COMPLETED', s.assignmentId)}
                                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-success text-on-success hover:brightness-110 active:scale-95 transition-all"
                              >
                                Mark Done
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(s.id, 'MISSED', s.assignmentId)}
                                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-input text-text-secondary hover:text-danger-text hover:bg-danger-bg transition-all"
                              >
                                Missed
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-text-muted">Recorded</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </ManagerInfrastructureResponsiveTable>
      </div>
    </div>
  );
}

