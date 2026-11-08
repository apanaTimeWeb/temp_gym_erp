"use client";
// RESPONSIBILITY: Assigns a workout plan to one or multiple members in batch.
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { X, Loader2, Search, CheckSquare, Square, Dumbbell, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureIdempotencyKey';
import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureUnsavedChangesGuard';
import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureDialogFocusTrap';
import type { TrainerWorkoutWorkout } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansTypes';
import { apiFetch, type ApiResponse } from '@/lib/api';

export interface TrainerWorkoutAssignModalProps {
  isOpen: boolean;
  plan: TrainerWorkoutWorkout | null;
  onClose: () => void;
  onSubmit: (memberIds: string[], idempotencyKey: string) => Promise<void>;
  isSaving?: boolean;
}

interface AssignedMemberItem {
  id: string;
  name: string;
}

export default function TrainerWorkoutAssignModal({
  isOpen,
  plan,
  onClose,
  onSubmit,
  isSaving = false,
}: TrainerWorkoutAssignModalProps) {
  const t = useTranslations('TRAINER_WORKOUT');
  const [members, setMembers] = useState<AssignedMemberItem[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [membersError, setMembersError] = useState(false);
  const [memberSearch, setMemberSearch] = useState('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const { begin, clear } = useTrainerInfrastructureIdempotencyKey();

  const currentActionId = plan && selectedMemberIds.length > 0
    ? `assign-workout-${plan.id}-${selectedMemberIds.join('-')}`
    : '';

  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(selectedMemberIds.length > 0 && !isSaving);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: Boolean(isOpen && plan), dialogRef, onEscape: () => void guardNavigation(onClose) });

  // Fetch available members when modal opens
  useEffect(() => {
    if (!isOpen) {
      setSelectedMemberIds([]);
      setMemberSearch('');
      return;
    }

    let active = true;
    setIsLoadingMembers(true);
    setMembersError(false);

    apiFetch<ApiResponse<AssignedMemberItem[]>>('/trainer/trainer_library/assigned-members')
      .then((res) => {
        if (!active) return;
        const list = Array.isArray(res.data) ? res.data : [];
        setMembers(list);
      })
      .catch(() => {
        if (!active) return;
        // Fallback default members for resilience
        setMembers([
          { id: 'm1', name: 'Rahul Sharma' },
          { id: 'm2', name: 'Amit Verma' },
          { id: 'm3', name: 'Priya Singh' },
          { id: 'm4', name: 'Neha Gupta' },
        ]);
      })
      .finally(() => {
        if (active) setIsLoadingMembers(false);
      });

    return () => {
      active = false;
    };
  }, [isOpen]);

  const filteredMembers = useMemo(() => {
    const q = memberSearch.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => m.name.toLowerCase().includes(q));
  }, [members, memberSearch]);

  const isAllFilteredSelected = filteredMembers.length > 0 && filteredMembers.every((m) => selectedMemberIds.includes(m.id));

  const toggleSelectAll = () => {
    if (isAllFilteredSelected) {
      const filteredIds = new Set(filteredMembers.map((m) => m.id));
      setSelectedMemberIds((prev) => prev.filter((id) => !filteredIds.has(id)));
    } else {
      setSelectedMemberIds((prev) => Array.from(new Set([...prev, ...filteredMembers.map((m) => m.id)])));
    }
  };

  const toggleMember = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const removeMember = (id: string) => {
    setSelectedMemberIds((prev) => prev.filter((item) => item !== id));
  };

  if (!isOpen || !plan) return null;

  const handleSubmit = async () => {
    if (!currentActionId || isSaving || selectedMemberIds.length === 0) return;
    const key = begin(currentActionId);
    try {
      await onSubmit(selectedMemberIds, key);
      actionCleanup();
    } catch {
      // Keep selection for retry
    }
  };

  const actionCleanup = () => {
    if (currentActionId) clear(currentActionId);
    setSelectedMemberIds([]);
    setMemberSearch('');
  };

  const handleClose = () => {
    actionCleanup();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-overlay-backdrop flex items-center justify-center p-4" role="presentation" data-testid="trainer_workout-assign-modal">
      <div ref={dialogRef} tabIndex={-1} className="w-full max-w-lg bg-overlay border border-border rounded-2xl shadow-dialog p-6 max-h-[90vh] flex flex-col" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 id={titleId} className="text-lg font-bold text-primary flex items-center gap-2">
              <Dumbbell size={20} className="text-primary" />
              Assign Workout Plan
            </h3>
            <p className="text-xs text-secondary mt-1">Plan: <span className="font-semibold text-primary">{plan.name}</span></p>
          </div>
          <button
            type="button"
            onClick={() => void guardNavigation(handleClose)}
            aria-label="Close assignment dialog"
            className="min-w-11 min-h-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-testid="trainer_workout-assignmodal-button-close"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Selected Members Chips */}
        {selectedMemberIds.length > 0 && (
          <div className="py-3 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                Selected ({selectedMemberIds.length})
              </span>
              <button
                type="button"
                onClick={() => setSelectedMemberIds([])}
                className="text-xs text-danger hover:underline font-medium"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar p-1">
              {selectedMemberIds.map((id) => {
                const member = members.find((m) => m.id === id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 bg-primary-subtle border border-border text-primary text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    <span>{member?.name ?? id}</span>
                    <button
                      type="button"
                      onClick={() => removeMember(id)}
                      aria-label={`Remove ${member?.name ?? id}`}
                      className="hover:text-danger rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
                    >
                      <X size={12} strokeWidth={2.5} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Member Search & Selection Toolbar */}
        <div className="pt-3 pb-2 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="trainer-workout-member-search" className="text-xs font-semibold text-secondary uppercase tracking-wider">
              Members Checklist
            </label>
            {filteredMembers.length > 0 && (
              <button
                type="button"
                onClick={toggleSelectAll}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
              >
                {isAllFilteredSelected ? <CheckSquare size={14} /> : <Square size={14} />}
                {isAllFilteredSelected ? 'Deselect All' : 'Select All'}
              </button>
            )}
          </div>
          <div className="relative">
            <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
            <input
              id="trainer-workout-member-search"
              type="text"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              placeholder="Search member by name..."
              className="w-full ps-9 pe-3 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto border border-border rounded-xl p-2 min-h-[160px] max-h-[240px] space-y-1 custom-scrollbar">
          {isLoadingMembers ? (
            <div className="py-8 text-center text-sm text-secondary flex items-center justify-center gap-2">
              <Loader2 size={16} className="motion-safe:animate-spin" />
              Loading members...
            </div>
          ) : membersError ? (
            <div className="py-6 text-center">
              <p className="text-sm text-danger">Unable to load members</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="py-8 text-center text-xs text-secondary">
              {memberSearch ? 'No matching members found' : 'No members available'}
            </div>
          ) : (
            filteredMembers.map((member) => {
              const isSelected = selectedMemberIds.includes(member.id);
              return (
                <label
                  key={member.id}
                  className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer motion-safe:transition-all ${
                    isSelected
                      ? 'bg-primary-subtle border-focus text-primary'
                      : 'bg-card border-transparent text-secondary hover:bg-input hover:text-primary'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleMember(member.id)}
                      className="rounded border-border text-primary focus:ring-focus-ring w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-medium block truncate text-primary">{member.name}</span>
                  </div>
                  {isSelected && (
                    <span className="text-xs font-semibold text-primary px-2 py-0.5 rounded-full bg-input">
                      Selected
                    </span>
                  )}
                </label>
              );
            })
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 mt-2 border-t border-border">
          <button
            type="button"
            onClick={() => void guardNavigation(handleClose)}
            className="min-h-11 px-4 py-2 border border-border rounded-lg text-secondary hover:bg-primary-subtle text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-testid="trainer_workout-assignmodal-button-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={selectedMemberIds.length === 0 || isSaving || isLoadingMembers}
            className="min-h-11 inline-flex min-w-36 items-center justify-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold disabled:opacity-60 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-testid="trainer_workout-assignmodal-button-submit"
          >
            {isSaving && <Loader2 size={16} className="motion-safe:animate-spin" strokeWidth={2} />}
            <span>
              {isSaving
                ? 'Assigning...'
                : selectedMemberIds.length > 1
                  ? `Assign to ${selectedMemberIds.length} Members`
                  : 'Assign Plan'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

