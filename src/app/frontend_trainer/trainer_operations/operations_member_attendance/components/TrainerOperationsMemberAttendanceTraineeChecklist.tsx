"use client";
import { TrainerAttendanceMaskSensitiveData } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceDisplayFormatters';

interface TraineeItem {
  id: string;
  name: string;
  phone?: string;
}

interface TraineeChecklistProps {
  filteredMembers: TraineeItem[];
  selectedMemberIds: string[];
  memberFilterText: string;
  onFilterChange: (val: string) => void;
  onToggleMember: (id: string) => void;
  onSelectAllFiltered: (ids: string[]) => void;
  onClearAll: () => void;
}

export function TrainerOperationsMemberAttendanceTraineeChecklist({
  filteredMembers,
  selectedMemberIds,
  memberFilterText,
  onFilterChange,
  onToggleMember,
  onSelectAllFiltered,
  onClearAll,
}: TraineeChecklistProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          value={memberFilterText}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Search trainees to check off..."
          className="flex-1 px-3 py-1.5 bg-input border border-border rounded-lg text-xs text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        />
        {filteredMembers.length > 0 && (
          <button
            type="button"
            onClick={() => onSelectAllFiltered(filteredMembers.map((m) => m.id))}
            className="px-2 py-1 text-2xs font-semibold bg-input border border-border rounded text-primary hover:bg-primary-subtle shrink-0"
          >
            {filteredMembers.every((m) => selectedMemberIds.includes(m.id)) ? 'Deselect' : 'Select All'}
          </button>
        )}
      </div>

      <div className="max-h-40 overflow-y-auto custom-scrollbar border border-border rounded-xl p-2 space-y-1 bg-card">
        {filteredMembers.length === 0 ? (
          <p className="text-xs text-secondary text-center py-3">No matching trainees found</p>
        ) : (
          filteredMembers.map((m) => {
            const isChecked = selectedMemberIds.includes(m.id);
            return (
              <label
                key={m.id}
                className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer motion-safe:transition-all ${
                  isChecked
                    ? 'bg-primary-subtle border border-primary/30'
                    : 'hover:bg-input border border-transparent'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleMember(m.id)}
                  className="w-4 h-4 rounded text-primary border-border focus:ring-focus-ring"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-primary block truncate">{m.name}</span>
                  {m.phone && <span className="text-2xs text-secondary">{TrainerAttendanceMaskSensitiveData(m.phone)}</span>}
                </div>
              </label>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-primary">
          {selectedMemberIds.length} trainee(s) checked for batch check-in
        </span>
        {selectedMemberIds.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-2xs text-secondary hover:text-danger underline"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
