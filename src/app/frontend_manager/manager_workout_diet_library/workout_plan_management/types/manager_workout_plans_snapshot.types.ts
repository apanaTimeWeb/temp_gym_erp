export interface ExerciseSnapshot {
  id: string;
  name: string;
  muscleGroup: string[];
  equipment: string;
  difficulty: string;
  category?: string;
}
