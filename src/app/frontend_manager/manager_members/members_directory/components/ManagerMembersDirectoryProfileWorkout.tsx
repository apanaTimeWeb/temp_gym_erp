// RESPONSIBILITY: Renders ManagerMembersDirectoryProfileWorkout's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { MANAGER_MEMBERS_DIRECTORY_API } from '@/app/frontend_manager/manager_members/members_directory/config/manager_members_directory.url_config';
import { useState } from 'react';

import { Dumbbell, Plus, Check, MessageCircle, Edit2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';



import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';
import { useManagerMembersDirectoryWorkoutPlansQuery } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryWorkoutPlansQuery';


/** @description Renders the ManagerMembersDirectoryProfileWorkout component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerMembersDirectoryProfileWorkout() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');

  const { selectedMember, assignWorkout } = useManagerMembersDirectoryLogic();
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('');

  const { data: workoutResponse, isPending: workoutsLoading } = useManagerMembersDirectoryWorkoutPlansQuery(isAssigning);
  const availableWorkouts = workoutResponse?.data || [];


  if (!selectedMember) return null;

  const hasWorkoutPlan = !!selectedMember.assignedWorkout;
  const workout = selectedMember.assignedWorkout;

  const handleAssign = async () => {
    if (!selectedWorkoutId) return;
  const selected = availableWorkouts.find(w => String(w.id) === selectedWorkoutId) || null;
    await assignWorkout(selectedMember.id, selected);
    setIsAssigning(false);
  };

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">{t("COPY_WORKOUT_PLAN")}</h3>
          <p className="text-sm text-text-secondary">{t("COPY_MANAGE_TRACK_2")}{selectedMember.name}{t("COPY_APOSS_DAILY_WORKOUTS")}</p>
        </div>
        {(() => { if (hasWorkoutPlan) { return (
          <div className="flex items-center gap-2">
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2 bg-success text-on-success rounded-xl text-sm font-semibold hover:shadow-card hover:shadow-card motion-safe:transition-all motion-safe:active:scale-95 motion-safe:duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-workout-button-assign" 
              onClick={() => {
                const text = `*WORKOUT PLAN: ${workout?.name || 'Assigned'}*\nLevel: ${workout?.level || 'N/A'}\n\n*Routine:*\n${(workout?.days || []).map(d => `*Day ${d.day}: ${d.focus}*\n${(d.exercises || []).length === 0 ? 'Rest Day' : (d.exercises || []).map(e => `- ${e.name} (${e.sets}x${e.reps})`).join('\n')}`).join('\n\n')}`;
                window.open(`${MANAGER_MEMBERS_DIRECTORY_API.INTEGRATIONS.WHATSAPP_WEB_BASE}/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              
             type="button">
              <MessageCircle size={18} strokeWidth={2}/>{t("COPY_SEND_VIA_WHATSAPP_1")}</button>
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2 bg-input text-primary border border-border rounded-xl text-sm font-semibold hover:bg-primary-subtle motion-safe:transition-all motion-safe:active:scale-95 motion-safe:duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-workout-button-remove" 
              onClick={() => setIsAssigning(true)}
              
             type="button">
              <Edit2 size={18} strokeWidth={2}/>{t("COPY_CHANGE_1")}</button>
          </div>
        ); } return !isAssigning && (
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:shadow-card hover:shadow-card motion-safe:transition-all motion-safe:active:scale-95 motion-safe:duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-workout-button-edit" 
            onClick={() => setIsAssigning(true)}
            
           type="button">
            <Plus size={18} strokeWidth={2}/>{t("COPY_ASSIGN_WORKOUT")}</button>
        ); })()}
      </div>

      {isAssigning && (
        <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
          <h4 className="font-semibold text-text-primary">{t("COPY_ASSIGN_WORKOUT_PLAN_LIBRARY")}</h4>
          {workoutsLoading ? (
            <p className="text-sm text-text-secondary">{t("COPY_LOADING_WORKOUT_PLANS")}</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <ManagerSearchableDropdown dataTestId="manager_members-managermembersprofileworkout-managersearchabledropdown-1"
                value={selectedWorkoutId}
                onChange={(value) => setSelectedWorkoutId(String(value))}
                options={availableWorkouts.map((workoutPlan) => ({ value: workoutPlan.id, label: `${workoutPlan.name} (${workoutPlan.level})` }))}
                placeholder={t("COPY_SELECT_WORKOUT_PLAN")}
                className="flex-1"
               data-testid="manager_members-managermembersprofileworkout-searchable-dropdown-1"/>
              <div className="flex gap-2">
                <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-4 py-2 bg-input text-text-secondary hover:text-primary rounded-xl text-sm font-semibold motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-workout-button-cancel" 
                  onClick={() => setIsAssigning(false)}
                  
                 type="button">{t("COPY_CANCEL_6")}</button>
                <button data-testid="manager_members-member-profile-workout-status-assign" 
                  onClick={handleAssign}
                  disabled={!selectedWorkoutId}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
                 type="button">
                  <Check size={18} strokeWidth={2}/>{t("COPY_CONFIRM_ASSIGN_1")}</button>
              </div>
            </div>
          )}
        </div>
      )}

      {(() => { if (!hasWorkoutPlan && !isAssigning) { return (
        <div className="bg-input border border-border rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary-subtle flex items-center justify-center text-primary mb-4">
            <Dumbbell size={18} strokeWidth={2} />
          </div>
          <h4 className="text-lg font-semibold text-text-primary mb-2">{t("COPY_NO_WORKOUT_PLAN_ASSIGNED")}</h4>
          <p className="text-text-secondary text-sm max-w-sm mb-6">
            {selectedMember.name}{t("COPY_CURRENTLY_DOES_NOT_HAVE_ACTIVE_WORKOUT_PLAN_ASSIGN_PLAN")}</p>
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-6 py-2.5 bg-primary-subtle text-primary border border-border rounded-xl font-semibold hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-workout-button-view" 
            onClick={() => setIsAssigning(true)}
            
           type="button">{t("COPY_BROWSE_WORKOUT_LIBRARY")}</button>
        </div>
      ); } return (() => { if (workout) { return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
              <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-1">{t("COPY_DAYS_1")}</p>
              <p className="text-lg font-bold text-text-primary">{workout.days?.length || 0}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
              <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-1">{t("COPY_FOCUS")}</p>
              <p className="text-lg font-bold text-text-primary">{workout.goal || t('COPY_GENERAL')}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center shadow-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
              <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-1">{t("COPY_DAYS_PER_WEEK")}</p>
              <p className="text-lg font-bold text-text-primary">{workout.daysPerWeek || t('COPY_VARIED')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(() => { if (workout.days && workout.days.length > 0) { return (
              workout.days.map((day, idx) => (
                <div key={`actual-day-${day.day ?? `focus-${day.focus}`}-${day.focus}`} className="bg-card border border-border p-4 rounded-xl shadow-card hover:shadow-card motion-safe:transition-all motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
                  <h5 className="font-semibold text-text-primary mb-3 pb-2 border-b border-border text-sm">{t("COPY_DAY")}{day.day || idx + 1}: {day.focus}</h5>
                  {(!day.exercises || day.exercises.length === 0) ? (
                    <p className="text-sm text-text-secondary italic">{t("COPY_REST_DAY_NO_WORKOUT_ASSIGNED")}</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-text-secondary">
                      {day.exercises.map((ex, i) => (
                        <li key={`act-ex-${ex.name}-${ex.sets}-${ex.reps}`} className="flex justify-between items-center bg-input px-3 py-2 rounded-lg motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                          <span>{ex.name}</span> <span className="font-medium text-text-primary text-xs">{ex.sets}{t("COPY_X_1")}{ex.reps}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ); } return (
              <div className="col-span-full bg-input border border-border rounded-xl p-6 text-center">
                <Dumbbell size={18} strokeWidth={2} className="mx-auto text-text-secondary mb-3" />
                <p className="text-lg text-text-primary font-bold">{workout.name}</p>
                <p className="text-text-secondary text-sm mt-2 max-w-md mx-auto">{t("COPY_PLAN_1")}{workout.level}{t("COPY_LEVEL_ROUTINE_FOCUSED")}{workout.goal}{t("COPY_SPANNING")}{workout.days?.length || 0}{t("COPY_DAYS_PER_CYCLE")}</p>
              </div>
            ); })()}
          </div>
        </div>
      ); } return null; })(); })()}
    </div>
  );
}
