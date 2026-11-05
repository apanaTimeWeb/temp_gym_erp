// RESPONSIBILITY: Feature-owned demo data for diet plans and trainer-to-member assignment relationships.
import type { TrainerLibraryDietPlan } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';

export const TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS: TrainerLibraryDietPlan[] = [
  { id: 'diet-001', name: 'Lean Protein Plan', goal: 'Weight Loss', calories: 1800, protein: 150, carbs: 140, fats: 55, description: 'High-protein plan for gradual fat loss.', meals: ['Protein oats', 'Chicken rice bowl', 'Greek yogurt + fruit', 'Grilled fish + vegetables'], isActive: true },
  { id: 'diet-002', name: 'Muscle Builder', goal: 'Muscle Gain', calories: 2600, protein: 190, carbs: 300, fats: 70, description: 'Balanced calorie surplus for muscle growth.', meals: ['Egg oats', 'Chicken quinoa', 'Paneer wrap', 'Salmon rice bowl'], isActive: true },
  { id: 'diet-003', name: 'Balanced Performance', goal: 'General Fitness', calories: 2200, protein: 145, carbs: 240, fats: 65, description: 'Balanced nutrition for training consistency.', meals: ['Fruit yogurt bowl', 'Dal rice + salad', 'Paneer sandwich', 'Chicken roti + vegetables'], isActive: true },
];

export const TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS = [
  { id: 'member-001', name: 'John Doe', assignedDietPlanId: 'diet-001' },
  { id: 'member-002', name: 'Sarah Smith', assignedDietPlanId: null },
  { id: 'member-003', name: 'Alex Johnson', assignedDietPlanId: 'diet-002' },
];
