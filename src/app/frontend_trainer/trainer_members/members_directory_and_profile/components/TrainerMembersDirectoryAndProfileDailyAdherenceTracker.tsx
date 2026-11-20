"use client";
import { Check, CheckCircle2, Droplets } from 'lucide-react';

interface DailyAdherenceTrackerProps {
  dietMeals?: (string | { name?: string; time?: string; items?: string; description?: string })[];
  consumedMeals: Record<number, boolean>;
  onToggleMeal: (index: number) => void;
  waterMl: number;
  onAddWater: (amount: number) => void;
  onResetWater: () => void;
  complianceNote: string;
  onChangeComplianceNote: (note: string) => void;
  logSaved: boolean;
  onSaveCompliance: () => void;
}

export function TrainerMembersDirectoryAndProfileDailyAdherenceTracker({
  dietMeals,
  consumedMeals,
  onToggleMeal,
  waterMl,
  onAddWater,
  onResetWater,
  complianceNote,
  onChangeComplianceNote,
  logSaved,
  onSaveCompliance,
}: DailyAdherenceTrackerProps) {
  const fallbackMeals = [
    'Breakfast: High Protein Oats',
    'Lunch: Grilled Chicken & Quinoa',
    'Dinner: Salmon with Greens',
    'Snack: Greek Yogurt & Berries',
  ];
  const mealList = dietMeals && dietMeals.length > 0 ? dietMeals : fallbackMeals;

  return (
    <div className="bg-floating border border-border rounded-xl p-5 space-y-4" data-testid="trainer_members-meal-adherence-tracker">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-success" />
          <div>
            <h4 className="text-sm font-bold text-primary">Today&apos;s Meal Adherence &amp; Hydration Log</h4>
            <p className="text-xs text-secondary">Track client meal consumption and daily water goal adherence</p>
          </div>
        </div>
        {logSaved ? (
          <span className="text-xs font-bold text-success bg-success-bg px-2.5 py-1 rounded-full flex items-center gap-1">
            <Check size={14} /> Log Saved
          </span>
        ) : (
          <button
            type="button"
            onClick={onSaveCompliance}
            className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-hover transition-colors"
          >
            Save Today&apos;s Adherence
          </button>
        )}
      </div>

      {/* Checklist of today's meals */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Meals Check-in</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {mealList.map((meal, index) => {
            const mealTitle = typeof meal === 'string' ? meal : meal.name || `Meal ${index + 1}`;
            const isChecked = !!consumedMeals[index];
            return (
              <button
                key={`compliance-meal-${index}`}
                type="button"
                onClick={() => onToggleMeal(index)}
                className={`p-3 rounded-xl border text-start flex items-center justify-between gap-2 transition-all ${
                  isChecked
                    ? 'bg-success-bg/40 border-success/40 text-primary'
                    : 'bg-card border-border text-secondary hover:border-primary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-secondary">#{index + 1}</span>
                  <span className="text-xs font-semibold text-primary">{mealTitle}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  isChecked ? 'bg-success text-on-primary' : 'bg-input text-secondary'
                }`}>
                  {isChecked ? 'Consumed' : 'Pending'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hydration Tracker */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-info-bg text-info flex items-center justify-center">
            <Droplets size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-secondary uppercase">Hydration Tracker</p>
            <p className="text-base font-bold text-primary">
              {(waterMl / 1000).toFixed(1)}L <span className="text-xs text-secondary font-normal">/ 3.5L Daily Target</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAddWater(250)}
            className="px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-primary hover:bg-input transition-colors"
          >
            +250 ml
          </button>
          <button
            type="button"
            onClick={() => onAddWater(500)}
            className="px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-primary hover:bg-input transition-colors"
          >
            +500 ml
          </button>
          <button
            type="button"
            onClick={onResetWater}
            className="px-2 py-1.5 text-xs text-secondary hover:text-danger"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Trainer Coaching Adherence Note */}
      <div className="space-y-1">
        <label htmlFor="adherence-notes" className="text-xs font-semibold text-secondary uppercase">
          Trainer Diet Feedback / Daily Note
        </label>
        <textarea
          id="adherence-notes"
          rows={2}
          value={complianceNote}
          onChange={(e) => onChangeComplianceNote(e.target.value)}
          placeholder="Log hunger cues, cravings, digestion feedback, or adherence adjustments..."
          className="w-full px-3 py-2 rounded-xl bg-card border border-border text-xs text-primary placeholder:text-secondary/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
        />
      </div>
    </div>
  );
}
