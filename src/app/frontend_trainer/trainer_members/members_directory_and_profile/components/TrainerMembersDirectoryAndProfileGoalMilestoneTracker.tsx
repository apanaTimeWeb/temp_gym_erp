"use client";
import { useState } from 'react';
import { Target, Plus, CheckCircle2, Trophy, Flag } from 'lucide-react';
import { TrainerMembersFormatNumber } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';

export interface MemberMilestone {
  id: string;
  title: string;
  targetMetric: string;
  targetDate: string;
  status: 'achieved' | 'in_progress' | 'upcoming';
  progressPercent: number;
}

export const INITIAL_MILESTONES: MemberMilestone[] = [
  {
    id: 'm-1',
    title: 'Phase 1: Foundation & Initial Fat Loss (-3 kg)',
    targetMetric: 'Weight: 75.5 kg',
    targetDate: '15 Oct 2026',
    status: 'achieved',
    progressPercent: 100,
  },
  {
    id: 'm-2',
    title: 'Phase 2: Body Recomposition & Core Strengthening',
    targetMetric: 'Body Fat: 18.0%',
    targetDate: '15 Nov 2026',
    status: 'in_progress',
    progressPercent: 65,
  },
  {
    id: 'm-3',
    title: 'Phase 3: Peak Hypertrophy & Goal Target Weight',
    targetMetric: 'Weight: 72.0 kg & 15% BF',
    targetDate: '31 Dec 2026',
    status: 'upcoming',
    progressPercent: 0,
  },
];

interface GoalMilestoneTrackerProps {
  milestones: MemberMilestone[];
  onAddMilestone: (milestone: MemberMilestone) => void;
  latestWeightKg?: number | null;
  latestBodyFatPercent?: number | null;
  locale: string;
}

export function TrainerMembersDirectoryAndProfileGoalMilestoneTracker({
  milestones,
  onAddMilestone,
  latestWeightKg,
  latestBodyFatPercent,
  locale,
}: GoalMilestoneTrackerProps) {
  const [isAddMilestoneOpen, setIsAddMilestoneOpen] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneMetric, setNewMilestoneMetric] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');

  const handleSave = () => {
    if (!newMilestoneTitle.trim()) return;
    onAddMilestone({
      id: `m-${Date.now()}`,
      title: newMilestoneTitle.trim(),
      targetMetric: newMilestoneMetric.trim() || 'Custom Metric',
      targetDate: newMilestoneDate || 'TBD',
      status: 'upcoming',
      progressPercent: 0,
    });
    setNewMilestoneTitle('');
    setNewMilestoneMetric('');
    setNewMilestoneDate('');
    setIsAddMilestoneOpen(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4" data-testid="trainer_members-goal-milestone-tracker">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Target size={20} />
          </div>
          <div>
            <h4 className="font-bold text-primary text-base flex items-center gap-2">
              Client Goal &amp; Milestone Tracker
            </h4>
            <p className="text-xs text-secondary">
              Target: Reach 72.0 kg &amp; 15% Body Fat by 31 Dec 2026
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsAddMilestoneOpen(true)}
          className="min-h-9 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover transition-colors"
        >
          <Plus size={14} /> Add Milestone
        </button>
      </div>

      {/* Target Metrics Quick Glance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-floating border border-border rounded-xl p-3">
          <span className="text-[11px] font-semibold text-secondary uppercase">Weight Goal</span>
          <p className="text-sm font-bold text-primary mt-0.5">
            Current: {latestWeightKg != null ? `${TrainerMembersFormatNumber(latestWeightKg, locale)} kg` : '78.5 kg'} → <span className="text-success">Goal: 72.0 kg</span>
          </p>
        </div>
        <div className="bg-floating border border-border rounded-xl p-3">
          <span className="text-[11px] font-semibold text-secondary uppercase">Body Fat Goal</span>
          <p className="text-sm font-bold text-primary mt-0.5">
            Current: {latestBodyFatPercent != null ? `${latestBodyFatPercent}%` : '21.5%'} → <span className="text-success">Goal: 15.0%</span>
          </p>
        </div>
        <div className="bg-floating border border-border rounded-xl p-3">
          <span className="text-[11px] font-semibold text-secondary uppercase">Overall Completion</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-2 bg-input rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '60%' }} />
            </div>
            <span className="text-xs font-bold text-primary">60%</span>
          </div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-2.5">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="bg-floating border border-border rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {milestone.status === 'achieved' ? (
                  <CheckCircle2 size={18} className="text-success" />
                ) : milestone.status === 'in_progress' ? (
                  <Trophy size={18} className="text-warning" />
                ) : (
                  <Flag size={18} className="text-secondary" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">{milestone.title}</p>
                <p className="text-xs text-secondary mt-0.5">
                  Target: <strong className="text-primary">{milestone.targetMetric}</strong> · Target Date: {milestone.targetDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="w-24 sm:w-28 text-end">
                <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  milestone.status === 'achieved'
                    ? 'bg-success-bg text-success'
                    : milestone.status === 'in_progress'
                    ? 'bg-warning-bg text-warning'
                    : 'bg-input text-secondary'
                }`}>
                  {milestone.status === 'achieved' ? 'Achieved' : milestone.status === 'in_progress' ? `${milestone.progressPercent}% Active` : 'Upcoming'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Milestone Inline Modal */}
      {isAddMilestoneOpen && (
        <div className="bg-floating border border-dashed border-border rounded-xl p-4 space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-primary">Configure New Milestone</h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Milestone title (e.g. Phase 4: Strength Peak)"
              value={newMilestoneTitle}
              onChange={(e) => setNewMilestoneTitle(e.target.value)}
              className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-primary focus-visible:ring-1 focus-visible:ring-focus-ring"
            />
            <input
              type="text"
              placeholder="Target Metric (e.g. Bench 90kg / 70kg)"
              value={newMilestoneMetric}
              onChange={(e) => setNewMilestoneMetric(e.target.value)}
              className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-primary focus-visible:ring-1 focus-visible:ring-focus-ring"
            />
            <input
              type="date"
              value={newMilestoneDate}
              onChange={(e) => setNewMilestoneDate(e.target.value)}
              className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-primary focus-visible:ring-1 focus-visible:ring-focus-ring"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddMilestoneOpen(false)}
              className="px-3 py-1 rounded-lg border border-border text-xs text-secondary hover:text-primary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover"
            >
              Save Milestone
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
