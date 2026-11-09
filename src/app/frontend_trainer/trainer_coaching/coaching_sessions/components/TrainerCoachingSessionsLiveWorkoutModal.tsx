"use client";
// RESPONSIBILITY: Live gym floor workout session logger for personal trainers tracking sets, reps, weight, RPE, and live notes in real time.
// DATA FLOW: Selected session → live timer & set-by-set exercise state → trainer completion → session marked complete.

import { useEffect, useRef, useState } from 'react';
import { Check, CheckCircle2, Dumbbell, Flame, Loader2, Pause, Play, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

interface LiveWorkoutSet {
  id: string;
  setNumber: number;
  targetWeightKg: number;
  actualWeightKg: number;
  targetReps: number;
  actualReps: number;
  rpe: number; // 1 to 10
  completed: boolean;
}

interface LiveWorkoutExercise {
  id: string;
  name: string;
  targetSets: number;
  sets: LiveWorkoutSet[];
}

interface TrainerCoachingSessionsLiveWorkoutModalProps {
  session: TrainerSessionsTrainerSession;
  onClose: () => void;
  onComplete: (loggedData: { durationMinutes: number; exercises: LiveWorkoutExercise[]; notes: string }) => Promise<void>;
  testId?: string;
}

const DEFAULT_EXERCISES: LiveWorkoutExercise[] = [
  {
    id: 'ex-1',
    name: 'Barbell Bench Press',
    targetSets: 3,
    sets: [
      { id: 's-1-1', setNumber: 1, targetWeightKg: 60, actualWeightKg: 60, targetReps: 10, actualReps: 10, rpe: 7, completed: true },
      { id: 's-1-2', setNumber: 2, targetWeightKg: 65, actualWeightKg: 65, targetReps: 8, actualReps: 8, rpe: 8, completed: true },
      { id: 's-1-3', setNumber: 3, targetWeightKg: 70, actualWeightKg: 70, targetReps: 6, actualReps: 6, rpe: 9, completed: false },
    ],
  },
  {
    id: 'ex-2',
    name: 'Incline Dumbbell Press',
    targetSets: 3,
    sets: [
      { id: 's-2-1', setNumber: 1, targetWeightKg: 22, actualWeightKg: 22, targetReps: 12, actualReps: 12, rpe: 7, completed: false },
      { id: 's-2-2', setNumber: 2, targetWeightKg: 24, actualWeightKg: 24, targetReps: 10, actualReps: 10, rpe: 8, completed: false },
      { id: 's-2-3', setNumber: 3, targetWeightKg: 24, actualWeightKg: 24, targetReps: 10, actualReps: 10, rpe: 9, completed: false },
    ],
  },
];

export default function TrainerCoachingSessionsLiveWorkoutModal({
  session,
  onClose,
  onComplete,
  testId = 'trainer-sessions-live-workout-modal',
}: TrainerCoachingSessionsLiveWorkoutModalProps) {
  const t = useTranslations('TRAINER_SESSIONS');
  const [exercises, setExercises] = useState<LiveWorkoutExercise[]>(DEFAULT_EXERCISES);
  const [notes, setNotes] = useState('');
  const [newExerciseName, setNewExerciseName] = useState('');
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Live session stopwatch timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleSetCompleted = (exerciseId: string, setId: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s) => (s.id === setId ? { ...s, completed: !s.completed } : s)),
        };
      })
    );
  };

  const updateSetValue = (
    exerciseId: string,
    setId: string,
    field: 'actualWeightKg' | 'actualReps' | 'rpe',
    value: number
  ) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s) => (s.id === setId ? { ...s, [field]: value } : s)),
        };
      })
    );
  };

  const addSetToExercise = (exerciseId: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSetNumber = ex.sets.length + 1;
        const newSet: LiveWorkoutSet = {
          id: `s-${ex.id}-${newSetNumber}-${Date.now()}`,
          setNumber: newSetNumber,
          targetWeightKg: lastSet ? lastSet.targetWeightKg : 20,
          actualWeightKg: lastSet ? lastSet.actualWeightKg : 20,
          targetReps: lastSet ? lastSet.targetReps : 10,
          actualReps: lastSet ? lastSet.actualReps : 10,
          rpe: 8,
          completed: false,
        };
        return {
          ...ex,
          sets: [...ex.sets, newSet],
        };
      })
    );
  };

  const removeSetFromExercise = (exerciseId: string, setId: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.filter((s) => s.id !== setId),
        };
      })
    );
  };

  const handleAddNewExercise = () => {
    if (!newExerciseName.trim()) return;
    const newEx: LiveWorkoutExercise = {
      id: `ex-${Date.now()}`,
      name: newExerciseName.trim(),
      targetSets: 3,
      sets: [
        { id: `s-${Date.now()}-1`, setNumber: 1, targetWeightKg: 20, actualWeightKg: 20, targetReps: 10, actualReps: 10, rpe: 7, completed: false },
        { id: `s-${Date.now()}-2`, setNumber: 2, targetWeightKg: 20, actualWeightKg: 20, targetReps: 10, actualReps: 10, rpe: 8, completed: false },
        { id: `s-${Date.now()}-3`, setNumber: 3, targetWeightKg: 20, actualWeightKg: 20, targetReps: 10, actualReps: 10, rpe: 8, completed: false },
      ],
    };
    setExercises((prev) => [...prev, newEx]);
    setNewExerciseName('');
    setIsAddingExercise(false);
  };

  const handleCompleteWorkout = async () => {
    setIsSaving(true);
    try {
      await onComplete({
        durationMinutes: Math.max(1, Math.round(secondsElapsed / 60)),
        exercises,
        notes,
      });
      onClose();
    } catch {
      // Handled by parent notification
    } finally {
      setIsSaving(false);
    }
  };

  const totalSetsCompleted = exercises.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
    0
  );
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-workout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      data-testid={testId}
    >
      <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header with Live Timer */}
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
                onClick={() => setIsTimerRunning((prev) => !prev)}
                className="p-1 rounded-md text-secondary hover:text-primary hover:bg-input transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
                title={isTimerRunning ? 'Pause Stopwatch' : 'Resume Stopwatch'}
              >
                {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                type="button"
                onClick={() => setSecondsElapsed(0)}
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

        {/* Progress Bar Banner */}
        <div className="px-6 py-2.5 bg-input/50 border-b border-border flex items-center justify-between text-xs text-secondary">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary">Sets Progress:</span>
            <span>
              {totalSetsCompleted} of {totalSets} sets logged ({totalSets > 0 ? Math.round((totalSetsCompleted / totalSets) * 100) : 0}%)
            </span>
          </div>
          <div className="w-32 h-2 bg-input rounded-full overflow-hidden">
            <div
              className="h-full bg-success transition-all duration-300"
              style={{ width: `${totalSets > 0 ? (totalSetsCompleted / totalSets) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Exercises Scroll Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {exercises.map((exercise, exIndex) => (
            <div key={exercise.id} className="bg-floating border border-border rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-primary-subtle text-primary text-xs font-bold flex items-center justify-center">
                    {exIndex + 1}
                  </span>
                  <h3 className="font-bold text-primary text-base">{exercise.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => addSetToExercise(exercise.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
                >
                  <Plus size={14} /> Add Set
                </button>
              </div>

              {/* Sets Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-secondary uppercase border-b border-border text-[11px]">
                    <tr>
                      <th className="py-2 px-2 text-center w-12">Set</th>
                      <th className="py-2 px-3">Target Wt (kg)</th>
                      <th className="py-2 px-3">Actual Wt (kg)</th>
                      <th className="py-2 px-3">Target Reps</th>
                      <th className="py-2 px-3">Actual Reps</th>
                      <th className="py-2 px-3">RPE (1-10)</th>
                      <th className="py-2 px-3 text-center w-16">Done</th>
                      <th className="py-2 px-1 text-center w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {exercise.sets.map((set) => (
                      <tr
                        key={set.id}
                        className={`transition-colors ${set.completed ? 'bg-success-bg/30 text-primary font-medium' : 'text-primary'}`}
                      >
                        <td className="py-2 px-2 text-center font-bold text-secondary">
                          {set.setNumber}
                        </td>
                        <td className="py-2 px-3 text-secondary">
                          {set.targetWeightKg} kg
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={set.actualWeightKg}
                            onChange={(e) => updateSetValue(exercise.id, set.id, 'actualWeightKg', Number(e.target.value))}
                            className="w-16 px-2 py-1 rounded bg-card border border-border text-center text-primary font-semibold focus-visible:ring-1 focus-visible:ring-focus-ring"
                          />
                        </td>
                        <td className="py-2 px-3 text-secondary">
                          {set.targetReps}
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="number"
                            min="1"
                            value={set.actualReps}
                            onChange={(e) => updateSetValue(exercise.id, set.id, 'actualReps', Number(e.target.value))}
                            className="w-14 px-2 py-1 rounded bg-card border border-border text-center text-primary font-semibold focus-visible:ring-1 focus-visible:ring-focus-ring"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={set.rpe}
                            onChange={(e) => updateSetValue(exercise.id, set.id, 'rpe', Number(e.target.value))}
                            className="w-12 px-2 py-1 rounded bg-card border border-border text-center text-primary font-semibold focus-visible:ring-1 focus-visible:ring-focus-ring"
                          />
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => toggleSetCompleted(exercise.id, set.id)}
                            className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors ${
                              set.completed
                                ? 'bg-success text-on-primary'
                                : 'bg-card border border-border text-secondary hover:border-primary'
                            }`}
                            aria-label={`Toggle set ${set.setNumber} completion`}
                          >
                            <Check size={16} strokeWidth={set.completed ? 3 : 2} />
                          </button>
                        </td>
                        <td className="py-2 px-1 text-center">
                          {exercise.sets.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSetFromExercise(exercise.id, set.id)}
                              className="text-secondary hover:text-danger p-1 rounded"
                              aria-label={`Remove set ${set.setNumber}`}
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Add Exercise Inline Form */}
          {isAddingExercise ? (
            <div className="bg-floating border border-dashed border-border rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="text"
                placeholder="Enter exercise name (e.g. Lat Pulldown, Cable Fly)"
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
                className="flex-1 px-3 py-2 bg-card border border-border rounded-lg text-sm text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
                autoFocus
              />
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleAddNewExercise}
                  className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-hover"
                >
                  Add Exercise
                </button>
                <button
                  type="button"
                  onClick={() => { setIsAddingExercise(false); setNewExerciseName(''); }}
                  className="px-3 py-2 border border-border rounded-lg text-xs font-medium text-secondary hover:bg-input"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingExercise(true)}
              className="w-full py-3 border border-dashed border-border rounded-xl text-sm font-semibold text-secondary hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Exercise to Live Session
            </button>
          )}

          {/* Live Trainer Notes */}
          <div className="space-y-1.5">
            <label htmlFor="live-session-notes" className="text-xs font-semibold text-secondary uppercase tracking-wider">
              Live Floor Coaching Notes
            </label>
            <textarea
              id="live-session-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record cues, fatigue observations, client feedback or next session recommendations..."
              className="w-full px-3 py-2 rounded-xl bg-floating border border-border text-sm text-primary placeholder:text-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-floating flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-secondary">
            Completing records actual sets, reps, and elapsed time into client history.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="min-h-11 flex-1 sm:flex-initial px-4 py-2 border border-border text-secondary hover:text-primary rounded-xl text-sm font-semibold hover:bg-input transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCompleteWorkout}
              disabled={isSaving}
              className="min-h-11 flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2 bg-success text-on-primary rounded-xl text-sm font-bold hover:bg-success/90 transition-colors shadow-sm disabled:opacity-50"
              data-testid="complete-live-workout-button"
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="motion-safe:animate-spin" /> Completing...
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} /> Complete &amp; Log Workout
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

