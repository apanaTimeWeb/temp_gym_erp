// RESPONSIBILITY: API type for assigned workout-plan rows shown in the Manager Workout module.
export interface ManagerWorkoutPlansAssignment {
  id: string;
  memberName: string;
  planName: string;
  assignedBy: string;
  startDate: string;
}
