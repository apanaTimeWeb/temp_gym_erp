"use client";

import type { TrainerCoachingCoachingExerciseManagementScenarioSelectorProps, TrainerCoachingCoachingExerciseManagementScenarioKey } from '../../types/TrainerCoachingCoachingExerciseManagementMockScenarioTypes';

const SCENARIOS: readonly { value: TrainerCoachingCoachingExerciseManagementScenarioKey; label: string }[] = [
  { value: 'ACTIVE_RECORDS', label: 'Active records' },
  { value: 'EMPTY_DATA', label: 'Empty data' },
  { value: 'SERVER_500_ERROR', label: 'Server error (500)' },
  { value: 'NETWORK_TIMEOUT', label: 'Network timeout (15s)' },
  { value: 'UNAUTHORIZED_401', label: 'Unauthorized (401)' },
  { value: 'FORBIDDEN_403', label: 'Forbidden (403)' },
];

/** Accessible development-only selector for the module-owned MSW scenario registry. */
export default function TrainerCoachingCoachingExerciseManagementScenarioSelector({ value, onChange }: TrainerCoachingCoachingExerciseManagementScenarioSelectorProps) {
  return (
    <label className="inline-flex items-center gap-2 text-sm" data-testid="trainer_coaching_coaching_exercise_management-scenario-selector">
      <span>Mock scenario</span>
      <select
        aria-label="Mock scenario"
        className="min-h-10 rounded-md border border-border bg-card px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        value={value}
        onChange={(event) => onChange(event.currentTarget.value as TrainerCoachingCoachingExerciseManagementScenarioKey)}
      >
        {SCENARIOS.map((scenario) => <option key={scenario.value} value={scenario.value}>{scenario.label}</option>)}
      </select>
    </label>
  );
}
