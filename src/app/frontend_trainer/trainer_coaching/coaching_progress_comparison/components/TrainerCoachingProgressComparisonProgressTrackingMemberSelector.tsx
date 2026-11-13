"use client";
// RESPONSIBILITY: Multi-member selector for the comparison view.
// DATA FLOW: useTrainerProgressTrackingLogic → TrainerProgressTrackingMemberSelector
// Max TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS members can be selected at once.
// Scalable layout: handles large member counts via instant search, scrollable container, and active selection chips.

import { useState, useMemo } from 'react';
import { Users, Search, X, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingConstants';
import type { TrainerProgressTrackingMemberSelectorProps } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingMemberSelectorProps';

/**
 * @description Multi-member selector for the comparison view with searchable and scrollable controls for scalable rosters.
 * @dependencies useTrainerProgressTrackingLogic → TrainerProgressTrackingMemberSelector
 */
export default function TrainerProgressTrackingMemberSelector({ allMembers, selectedIds, onToggle }: TrainerProgressTrackingMemberSelectorProps) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected members list
  const selectedMembers = useMemo(() => {
    return allMembers.filter((m) => selectedIds.includes(m.id));
  }, [allMembers, selectedIds]);

  // Filtered members according to search query
  const filteredMembers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allMembers;
    return allMembers.filter((m) => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q));
  }, [allMembers, searchQuery]);

  const isMaxReached = selectedIds.length >= TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS;

  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-5 space-y-4 shadow-card">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-primary-subtle text-primary">
            <Users size={18} strokeWidth={2} />
          </div>
          <div>
            <span className="text-sm font-bold text-primary">{t("TEXT_SELECT_MEMBERS_TO_COMPARE")}</span>
            <p className="text-xs text-secondary">
              {t("TEXT_SHOWING_MEMBERS_COUNT", { count: filteredMembers.length, total: allMembers.length })}
            </p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
            isMaxReached
              ? 'bg-warning-bg text-warning border-warning/30'
              : 'bg-input text-secondary border-border'
          }`}>
            {selectedIds.length} / {TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS}
          </span>
        </div>

        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={() => selectedIds.forEach(id => onToggle(id))}
            className="min-h-11 inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95"
            data-testid="trainer_progress_tracking-trainerprogresstrackingmemberselector-button_1"
          >
            <X size={14} strokeWidth={2} />
            {t("TEXT_CLEAR_ALL")}
          </button>
        )}
      </div>

      {/* Selected Members Chips Bar */}
      {selectedMembers.length > 0 && (
        <div className="rounded-lg bg-surface-highlight border border-border p-3 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-secondary">
            <span>{t("TEXT_SELECTED_MEMBERS")} ({selectedMembers.length}):</span>
            {isMaxReached && (
              <span className="text-warning text-xs">
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
                  className="rounded-full p-0.5 hover:bg-black/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring motion-safe:transition-colors"
                >
                  <X size={13} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Input Filter for large numbers of students */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("TEXT_SEARCH_MEMBERS")}
          data-testid="trainer_progress_tracking-member-search-input"
          className="w-full pl-9 pr-9 py-2 bg-input border border-border rounded-lg text-xs text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:border-focus motion-safe:transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
          >
            <X size={14} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Scrollable Member Roster */}
      <div className="max-h-48 overflow-y-auto custom-scrollbar border border-border/60 rounded-lg p-2 bg-input/20">
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
          <div className="flex flex-wrap gap-2">
            {filteredMembers.map((m) => {
              const isSelected = selectedIds.includes(m.id);
              const isDisabled = !isSelected && isMaxReached;
              return (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => !isDisabled && onToggle(m.id)}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border motion-safe:transition-all ${
                    isSelected
                      ? 'bg-primary text-on-primary border-focus shadow-card'
                      : isDisabled
                      ? 'bg-input text-disabled border-border/50 cursor-not-allowed opacity-60'
                      : 'bg-input text-secondary border-border hover:border-focus hover:text-primary'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`}
                  data-testid={`trainer_progress_tracking-progress-member-selector-${m.id}`}
                >
                  {m.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Helper text footer */}
      <div className="flex items-center justify-between text-xs">
        {selectedIds.length < 2 ? (
          <p className="text-secondary italic">{t("TEXT_SELECT_AT_LEAST_2_MEMBERS_TO_COMPARE")}</p>
        ) : (
          <span className="text-success font-medium">✓ {selectedIds.length} members ready for comparison</span>
        )}
      </div>
    </div>
  );
}
