"use client";
import { X } from 'lucide-react';

interface AssignedMemberItem {
  id: string;
  name: string;
}

interface TrainerCoachingWorkoutPlansSelectedChipsProps {
  selectedMemberIds: string[];
  members: AssignedMemberItem[];
  onRemoveMember: (id: string) => void;
  onClearAll: () => void;
}

export function TrainerCoachingWorkoutPlansSelectedChips({
  selectedMemberIds,
  members,
  onRemoveMember,
  onClearAll,
}: TrainerCoachingWorkoutPlansSelectedChipsProps) {
  if (selectedMemberIds.length === 0) return null;

  return (
    <div className="py-2 border-b border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
          Selected ({selectedMemberIds.length})
        </span>
        <button
          type="button"
          onClick={onClearAll}
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
                onClick={() => onRemoveMember(id)}
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
  );
}
