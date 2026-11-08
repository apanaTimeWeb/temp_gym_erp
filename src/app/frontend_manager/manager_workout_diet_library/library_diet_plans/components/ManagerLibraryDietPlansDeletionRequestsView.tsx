// RESPONSIBILITY: Renders the Trainer Deletion Requests approval queue for Manager Library.
'use client';
import { AlertCircle, CheckCircle2, Flame, ThumbsDown, Trash2, Utensils } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useManagerLibraryDietPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansLogic';
import { ManagerLibraryDietPlansDisplayValue } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/utils/ManagerLibraryDietPlansFormatters';

export default function ManagerLibraryDietPlansDeletionRequestsView() {
  const t = useTranslations('MANAGER_LIBRARY_DIET_PLANS');
  const { pendingDeletions, approveDeletion, rejectDeletion, isPending, saving } = useManagerLibraryDietPlansLogic();

  if (isPending) {
    return (
      <div className="space-y-4" aria-label="Loading deletion requests">
        {[1, 2].map((i) => (
          <div key={i} className="h-36 rounded-xl border border-border bg-skeleton-base p-5 motion-safe:animate-pulse">
            <div className="h-5 w-1/3 rounded bg-skeleton-highlight" />
            <div className="mt-3 h-4 w-1/2 rounded bg-skeleton-highlight" />
            <div className="mt-4 h-8 w-1/4 rounded bg-skeleton-highlight" />
          </div>
        ))}
      </div>
    );
  }

  if (pendingDeletions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-card border border-border">
        <div className="w-14 h-14 rounded-2xl bg-success-bg text-success-text flex items-center justify-center mb-4">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-base font-bold text-text-primary">No Pending Deletion Requests</h3>
        <p className="mt-1 text-sm text-text-secondary max-w-md">
          All trainer diet plan deletion requests have been reviewed and resolved. When trainers request plan retirements, they will appear here for manager authorization.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span>Trainer Deletion Requests</span>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-warning-bg text-warning-text border border-warning/40">
              {pendingDeletions.length} {pendingDeletions.length === 1 ? 'Pending' : 'Pending'}
            </span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Review retirement requests submitted by trainers before permanently deleting plans from the system.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pendingDeletions.map((diet) => (
          <article
            key={diet.id}
            data-testid={`manager-diet-deletion-request-${diet.id}`}
            className="rounded-xl border border-warning/40 bg-card p-5 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-bold text-sm text-text-primary">{diet.name}</h3>
                  <p className="text-xs text-text-secondary">{diet.goal} · {diet.createdBy || 'Trainer Request'}</p>
                </div>
                <span className="px-2 py-0.5 text-2xs font-semibold rounded-md bg-warning-bg text-warning-text border border-warning/30">
                  Approval Needed
                </span>
              </div>

              {/* Deletion Reason Banner */}
              <div className="p-3 bg-warning-bg/60 border border-warning/30 rounded-lg flex items-start gap-2 text-xs text-warning-text mb-3">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Trainer Reason:</span>{' '}
                  <span>{diet.deletionReason || 'Retirement requested by trainer'}</span>
                </div>
              </div>

              {/* Nutrition details */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  <Flame size={14} className="text-warning-text" />
                  <span>{ManagerLibraryDietPlansDisplayValue(diet.calories)} kcal</span>
                </div>
                <span>·</span>
                <span>P: {ManagerLibraryDietPlansDisplayValue(diet.protein)}g</span>
                <span>·</span>
                <span>C: {ManagerLibraryDietPlansDisplayValue(diet.carbs)}g</span>
                <span>·</span>
                <span>F: {ManagerLibraryDietPlansDisplayValue(diet.fats)}g</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Utensils size={13} />
                  <span>{diet.meals?.length ?? 0} meals</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => void rejectDeletion(diet.id)}
                className="min-h-10 px-3.5 py-1.5 border border-border rounded-lg text-xs font-semibold text-text-secondary hover:bg-surface-hover hover:text-text-primary flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                data-testid={`manager-reject-deletion-${diet.id}`}
              >
                <ThumbsDown size={14} /> Reject Request
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => void approveDeletion(diet.id)}
                className="min-h-10 px-3.5 py-1.5 bg-danger-bg text-danger-text border border-danger/40 hover:bg-danger/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                data-testid={`manager-approve-deletion-${diet.id}`}
              >
                <Trash2 size={14} /> Approve Deletion
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

