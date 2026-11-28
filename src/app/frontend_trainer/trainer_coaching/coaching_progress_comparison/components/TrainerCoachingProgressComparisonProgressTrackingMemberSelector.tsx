"use client";
// RESPONSIBILITY: Multi-member checkbox selector for the progress comparison view.
// DATA FLOW: useTrainerProgressTrackingLogic → TrainerProgressTrackingMemberSelector
// Max TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS members can be selected at once.

import { useState, useMemo } from 'react';
import { Users, Search, X, Check, CheckSquare, Square } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingConstants';
import type { TrainerProgressTrackingMemberSelectorProps } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingMemberSelectorProps';

export default function TrainerProgressTrackingMemberSelector({
  allMembers,
  selectedIds,
  onToggle,
}: TrainerProgressTrackingMemberSelectorProps) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedMembers = useMemo(() => {
    return allMembers.filter((m) => selectedIds.includes(m.id));
  }, [allMembers, selectedIds]);

  const filteredMembers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allMembers;
    return allMembers.filter((m) => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q));
  }, [allMembers, searchQuery]);

  const isMaxReached = selectedIds.length >= TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS;

  // Quick multi-select action: Select first N available
  const handleSelectTopN = () => {
    const targetMembers = filteredMembers.slice(0, TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS);
    targetMembers.forEach((m) => {
      if (!selectedIds.includes(m.id)) {
        onToggle(m.id);
      }
    });
  };

  const handleClearAll = () => {
    selectedIds.forEach((id) => onToggle(id));
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-4 sm:p-5 space-y-4 shadow-card">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary-subtle text-primary border border-border">
            <Users size={18} strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <span>{t("TEXT_SELECT_MEMBERS_TO_COMPARE")}</span>
              <span className="text-xs font-normal text-secondary">(Multi-Checkbox Selection)</span>
            </h2>
            <p className="text-xs text-secondary">
              Select multiple client checkboxes to benchmark side-by-side (max {TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS})
            </p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
            isMaxReached
              ? 'bg-warning-bg text-warning border-warning'
              : 'bg-input text-secondary border-border'
          }`}>
            {selectedIds.length} / {TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {selectedIds.length < TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS && filteredMembers.length > 0 && (
            <button
              type="button"
              onClick={handleSelectTopN}
              className="min-h-9 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-surface-highlight border border-border hover:bg-surface-hover text-text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <CheckSquare size={14} className="text-text-primary" />
              <span>Select First {TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS}</span>
            </button>
          )}
          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="min-h-9 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-secondary hover:text-danger rounded-lg border border-border hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              data-testid="trainer_progress_tracking-trainerprogresstrackingmemberselector-button_1"
            >
              <X size={14} strokeWidth={2} />
              {t("TEXT_CLEAR_ALL")}
            </button>
          )}
        </div>
      </div>

      {/* Selected Members Active Chips Bar */}
      {selectedMembers.length > 0 && (
        <div className="rounded-xl bg-surface-highlight border border-border p-3 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-secondary">
            <span>{t("TEXT_SELECTED_MEMBERS")} ({selectedMembers.length}):</span>
            {isMaxReached && (
              <span className="text-warning text-xs font-medium">
                {t("TEXT_MAX_MEMBERS_SELECTED", { max: TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS })}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedMembers.map((m) => (
              <div
                key={`selected-${m.id}`}
                className="inline-flex items-center gap-1.5 bg-primary text-on-primary pl-3 pr-1.5 py-1 rounded-full text-xs font-semibold shadow-sm"
                data-testid={`trainer_progress_tracking-selected-chip-${m.id}`}
              >
                <Check size={12} strokeWidth={2.5} />
                <span>{m.name}</span>
                <button
                  type="button"
                  onClick={() => onToggle(m.id)}
                  aria-label={`Remove ${m.name}`}
                  className="rounded-full p-0.5 hover:bg-overlay-backdrop focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring motion-safe:transition-colors"
                >
                  <X size={13} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Input Filter */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("TEXT_SEARCH_MEMBERS")}
          data-testid="trainer_progress_tracking-member-search-input"
          className="w-full pl-8 pr-8 py-2 bg-input border border-border rounded-xl text-xs text-text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-0.5"
          >
            <X size={14} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Scrollable Member Checkbox Grid */}
      <div className="max-h-56 overflow-y-auto custom-scrollbar border border-border rounded-xl p-3 bg-input">
        {filteredMembers.length === 0 ? (
          <div className="py-6 text-center space-y-2">
            <p className="text-xs text-secondary">
              {t("TEXT_NO_MEMBERS_MATCH_SEARCH", { query: searchQuery })}
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-primary hover:underline font-semibold"
            >
              {t("TEXT_CLEAR_SEARCH")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {filteredMembers.map((m) => {
              const isSelected = selectedIds.includes(m.id);
              const isDisabled = !isSelected && isMaxReached;
              return (
                <label
                  key={m.id}
                  htmlFor={`compare-member-checkbox-${m.id}`}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border motion-safe:transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary-subtle border-primary text-primary shadow-xs'
                      : isDisabled
                      ? 'bg-input text-disabled border-border cursor-not-allowed opacity-60'
                      : 'bg-card text-primary border-border hover:border-primary hover:bg-surface-hover'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`compare-member-checkbox-${m.id}`}
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => !isDisabled && onToggle(m.id)}
                    aria-label={`Select ${m.name} for comparison`}
                    className="w-4 h-4 rounded border-border text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                    data-testid={`trainer_progress_tracking-progress-member-selector-${m.id}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{m.name}</p>
                    <p className="text-[10px] text-secondary">ID: {m.id}</p>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] shrink-0 font-bold">
                      ✓
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Helper text footer */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
        {selectedIds.length < 2 ? (
          <p className="text-secondary italic">{t("TEXT_SELECT_AT_LEAST_2_MEMBERS_TO_COMPARE")}</p>
        ) : (
          <span className="text-success font-semibold flex items-center gap-1">
            <Check size={14} /> {selectedIds.length} members selected for benchmark matrix
          </span>
        )}
        <span className="text-secondary">
          {filteredMembers.length} {filteredMembers.length === 1 ? 'client' : 'clients'} listed
        </span>
      </div>
    </div>
  );
}
