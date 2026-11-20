"use client";
import { Dumbbell, Pause, Play, RotateCcw, X } from 'lucide-react';
import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

interface LiveWorkoutHeaderProps {
  session: TrainerSessionsTrainerSession;
  secondsElapsed: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onClose: () => void;
  formatTimer: (totalSeconds: number) => string;
}

export function TrainerCoachingSessionsLiveWorkoutHeader({
  session,
  secondsElapsed,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onClose,
  formatTimer,
}: LiveWorkoutHeaderProps) {
  return (
    <div className="p-5 border-b border-border bg-floating flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Dumbbell size={22} strokeWidth={2} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-danger-bg text-danger motion-safe:animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-danger inline-block" /> Live Floor Tracker
            </span>
            <span className="text-xs text-secondary">{session.member || 'Client PT Session'}</span>
          </div>
          <h2 id="live-workout-modal-title" className="text-lg font-bold text-primary">
            {session.title}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Stopwatch Badge */}
        <div className="flex items-center gap-2 bg-card border border-border px-3.5 py-1.5 rounded-xl font-mono text-base font-bold text-primary shadow-sm">
          <span className="text-secondary text-xs font-sans uppercase">Elapsed</span>
          <span>{formatTimer(secondsElapsed)}</span>
          <button
            type="button"
            onClick={onToggleTimer}
            className="p-1 rounded-md text-secondary hover:text-primary hover:bg-input transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
            title={isTimerRunning ? 'Pause Stopwatch' : 'Resume Stopwatch'}
          >
            {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            type="button"
            onClick={onResetTimer}
            className="p-1 rounded-md text-secondary hover:text-primary hover:bg-input transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
            title="Reset Stopwatch"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-secondary hover:text-primary rounded-lg hover:bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
