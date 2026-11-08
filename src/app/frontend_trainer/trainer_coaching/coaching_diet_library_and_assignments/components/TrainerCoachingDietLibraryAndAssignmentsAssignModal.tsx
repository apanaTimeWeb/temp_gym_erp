"use client";
// RESPONSIBILITY: Assigns one library diet plan to one or multiple trainer-owned members in batch.
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trainerDietAssignmentSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/schemas/TrainerCoachingDietLibraryAndAssignmentsAssignmentSchema';
import type { TrainerDietAssignmentValues } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/schemas/TrainerCoachingDietLibraryAndAssignmentsAssignmentSchema';

import { X, Loader2, Search, CheckSquare, Square, Users } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/TrainerCoachingDietLibraryAndAssignmentsuseTrainerInfrastructureIdempotencyKey';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/TrainerCoachingDietLibraryAndAssignmentsuseTrainerInfrastructureUnsavedChangesGuard';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/TrainerCoachingDietLibraryAndAssignmentsuseTrainerInfrastructureDialogFocusTrap';

import type { TrainerLibraryAssignModalProps } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsAssignModalProps';

/**
 * @description Assigns one library diet plan to one or multiple trainer-owned members in batch.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerLibraryAssignModal({
  isOpen,
  plan,
  members,
  membersLoading = false,
  membersError = false,
  onRetryMembers = () => undefined,
  isSaving,
  errorMessage,
  onClose,
  onSubmit,
  testId,
}: TrainerLibraryAssignModalProps) {
  const t = useTranslations('TRAINER_LIBRARY');
  const [memberSearch, setMemberSearch] = useState('');

  const { handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<TrainerDietAssignmentValues>({
    resolver: zodResolver(trainerDietAssignmentSchema),
    defaultValues: { memberIds: [], memberId: '' },
  });

  const selectedMemberIds = watch('memberIds') ?? [];
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const { begin, clear } = useTrainerInfrastructureIdempotencyKey();

  const currentActionId = plan && selectedMemberIds.length > 0
    ? `assign-diet-${plan.id}-${selectedMemberIds.join('-')}`
    : '';

  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(selectedMemberIds.length > 0 && !isSaving);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: Boolean(isOpen && plan), dialogRef, onEscape: () => void guardNavigation(onClose) });

  // Reset selection when modal closes or switches plan
  useEffect(() => {
    reset({ memberIds: [], memberId: '' });
    setMemberSearch('');
  }, [isOpen, plan?.id, reset]);

  const filteredMembers = useMemo(() => {
    const q = memberSearch.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => m.name.toLowerCase().includes(q));
  }, [members, memberSearch]);

  const isAllFilteredSelected = filteredMembers.length > 0 && filteredMembers.every((m) => selectedMemberIds.includes(m.id));

  const toggleSelectAll = () => {
    if (isAllFilteredSelected) {
      const filteredIds = new Set(filteredMembers.map((m) => m.id));
      const next = selectedMemberIds.filter((id) => !filteredIds.has(id));
      setValue('memberIds', next, { shouldDirty: true, shouldValidate: true });
      setValue('memberId', next[0] ?? '', { shouldDirty: true });
    } else {
      const merged = Array.from(new Set([...selectedMemberIds, ...filteredMembers.map((m) => m.id)]));
      setValue('memberIds', merged, { shouldDirty: true, shouldValidate: true });
      setValue('memberId', merged[0] ?? '', { shouldDirty: true });
    }
  };

  const toggleMember = (id: string) => {
    const next = selectedMemberIds.includes(id)
      ? selectedMemberIds.filter((item) => item !== id)
      : [...selectedMemberIds, id];
    setValue('memberIds', next, { shouldDirty: true, shouldValidate: true });
    setValue('memberId', next[0] ?? '', { shouldDirty: true });
  };

  const removeMember = (id: string) => {
    const next = selectedMemberIds.filter((item) => item !== id);
    setValue('memberIds', next, { shouldDirty: true, shouldValidate: true });
    setValue('memberId', next[0] ?? '', { shouldDirty: true });
  };

  if (!isOpen || !plan) return null;

  const submit = handleSubmit(async ({ memberIds: validatedMemberIds }) => {
    if (!currentActionId || isSaving || validatedMemberIds.length === 0) return;
    const key = begin(currentActionId);
    try {
      await onSubmit(validatedMemberIds, key);
    } catch {
      // Keep selection for retry; mutation owner renders sanitized error.
    }
  });

  const handleClose = () => {
    if (currentActionId) clear(currentActionId);
    reset({ memberIds: [], memberId: '' });
    setMemberSearch('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-overlay-backdrop flex items-center justify-center p-4" role="presentation" data-testid={testId ?? "trainer_library-assign-modal"}>
      <div ref={dialogRef} tabIndex={-1} className="w-full max-w-lg bg-overlay border border-border rounded-2xl shadow-dialog p-6 max-h-[90vh] flex flex-col" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 id={titleId} className="text-lg font-bold text-primary flex items-center gap-2">
              <Users size={20} className="text-primary" />
              {t("TEXT_ASSIGN_DIET_PLAN")}
            </h3>
            <p className="text-xs text-secondary mt-1">Plan: <span className="font-semibold text-primary">{plan.name}</span></p>
          </div>
          <button
            type="button"
            onClick={() => void guardNavigation(handleClose)}
            aria-label={t("TEXT_CLOSE_ASSIGNMENT_DIALOG")}
            className="min-w-11 min-h-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-testid="trainer_library-trainerlibraryassignmodal-button_1"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Selected Members Chips Tray */}
        {selectedMemberIds.length > 0 && (
          <div className="py-3 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                Selected ({selectedMemberIds.length})
              </span>
              <button
                type="button"
                onClick={() => { setValue('memberIds', [], { shouldDirty: true, shouldValidate: true }); setValue('memberId', ''); }}
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
            <label htmlFor="trainer-library-member-search" className="text-xs font-semibold text-secondary uppercase tracking-wider">
              {t("TEXT_MEMBER")} Checklist
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
              id="trainer-library-member-search"
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
          {membersLoading ? (
            <div className="py-8 text-center text-sm text-secondary flex items-center justify-center gap-2">
              <Loader2 size={16} className="motion-safe:animate-spin" />
              {t("TEXT_LOADING_MEMBERS")}
            </div>
          ) : membersError ? (
            <div className="py-6 text-center">
              <p className="text-sm text-danger">{t("TEXT_MEMBER_LOOKUP_FAILED")}</p>
              <button
                type="button"
                onClick={onRetryMembers}
                className="mt-2 min-h-9 px-3 rounded-lg border border-border text-xs text-primary hover:bg-primary-subtle"
              >
                {t("TEXT_RETRY")}
              </button>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="py-8 text-center text-xs text-secondary">
              {memberSearch ? 'No matching members found' : t("TEXT_NO_MEMBERS_AVAILABLE")}
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
                    <div className="truncate">
                      <span className="text-sm font-medium block truncate text-primary">{member.name}</span>
                      {member.assignedDietPlanId && (
                        <span className="text-xs text-secondary opacity-75">
                          {t("TEXT_CURRENT_PLAN_ASSIGNED")}
                        </span>
                      )}
                    </div>
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

        {errors.memberIds && (
          <p role="alert" className="mt-2 text-xs text-danger">{errors.memberIds.message ?? t('TEXT_SELECT_A_MEMBER')}</p>
        )}
        {errorMessage && (
          <p role="alert" className="text-xs text-danger bg-danger-bg px-3 py-2 rounded-lg mt-3" data-testid="trainer_library-library-assign_modal_control">{errorMessage}</p>
        )}

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 mt-2 border-t border-border">
          <button
            type="button"
            onClick={() => void guardNavigation(handleClose)}
            className="min-h-11 px-4 py-2 border border-border rounded-lg text-secondary hover:bg-primary-subtle text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-testid="trainer_library-trainerlibraryassignmodal-button_3"
          >
            {t("TEXT_CANCEL")}
          </button>
          <button
            type="button"
            onClick={() => void submit()}
            disabled={selectedMemberIds.length === 0 || isSaving || membersLoading || membersError}
            className="min-h-11 inline-flex min-w-36 items-center justify-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold disabled:opacity-60 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-testid="trainer_library-trainerlibraryassignmodal-button_4"
          >
            {isSaving && <Loader2 size={16} className="motion-safe:animate-spin" strokeWidth={2} />}
            <span>
              {isSaving
                ? t("TEXT_ASSIGNING")
                : selectedMemberIds.length > 1
                  ? `Assign to ${selectedMemberIds.length} Members`
                  : t("TEXT_ASSIGN")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
