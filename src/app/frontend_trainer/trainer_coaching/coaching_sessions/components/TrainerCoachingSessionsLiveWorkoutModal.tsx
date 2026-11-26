"use client";
// RESPONSIBILITY: Live gym floor workout session logger for personal trainers tracking sets, reps, weight, RPE, and live notes in real time.
// DATA FLOW: Selected session → live timer & set-by-set exercise state → trainer completion → session marked complete.

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { TRAINER_SESSIONS_DEFAULT_LIVE_EXERCISES } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';
import type { TrainerSessionsTrainerSession, LiveWorkoutExercise, LiveWorkoutSet } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';
import { TrainerCoachingSessionsLiveWorkoutExerciseCard } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsLiveWorkoutExerciseCard';
import { TrainerCoachingSessionsLiveWorkoutHeader } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsLiveWorkoutHeader';

interface TrainerCoachingSessionsLiveWorkoutModalProps {
  session: TrainerSessionsTrainerSession;
  onClose: () => void;
  onComplete: (loggedData: { durationMinutes: number; exercises: LiveWorkoutExercise[]; notes: string }) => Promise<void>;
  testId?: string;
}

export default function TrainerCoachingSessionsLiveWorkoutModal({
  session,
  onClose,
  onComplete,
  testId = 'trainer-sessions-live-workout-modal',
}: TrainerCoachingSessionsLiveWorkoutModalProps) {
  const t = useTranslations('TRAINER_SESSIONS');
  const [exercises, setExercises] = useState<LiveWorkoutExercise[]>(TRAINER_SESSIONS_DEFAULT_LIVE_EXERCISES);
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

  const formatTimer = (totalSeconds: number) =>
    `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;

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

  const totalSetsCompleted = exercises.reduce((acc, ex) => acc + ex.sets.filter((s) => s.completed).length, 0);
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-workout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-backdrop backdrop-blur-sm p-4 overflow-y-auto"
      data-testid={testId}
    >
      <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header with Live Timer */}
        <TrainerCoachingSessionsLiveWorkoutHeader
          session={session}
          secondsElapsed={secondsElapsed}
          isTimerRunning={isTimerRunning}
          onToggleTimer={() => setIsTimerRunning((prev) => !prev)}
          onResetTimer={() => setSecondsElapsed(0)}
          onClose={onClose}
          formatTimer={formatTimer}
        />

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
            <TrainerCoachingSessionsLiveWorkoutExerciseCard
              key={exercise.id}
              exercise={exercise}
              exIndex={exIndex}
              onAddSet={addSetToExercise}
              onToggleSetCompleted={toggleSetCompleted}
              onUpdateSetValue={updateSetValue}
              onRemoveSet={removeSetFromExercise}
            />
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
              className="w-full px-3 py-2 rounded-xl bg-floating border border-border text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
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
              className="min-h-11 flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2 bg-success text-on-success rounded-xl text-sm font-bold hover:brightness-110 transition-colors shadow-sm disabled:opacity-50"
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

