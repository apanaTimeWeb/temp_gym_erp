import { z } from 'zod';

export const TrainerLibraryDietPlanMealItemSchema = z.object({
  name: z.string().trim().min(1, 'Meal name is required'),
  time: z.string().optional(),
  items: z.string().optional(),
  description: z.string().optional(),
});

export const TrainerLibraryDietPlanFormSchema = z.object({
  name: z.string().trim().min(2, 'Plan name must be at least 2 characters'),
  goal: z.string().trim().min(1, 'Goal is required'),
  calories: z.number().min(100, 'Calories must be at least 100').max(15000, 'Calories cannot exceed 15,000'),
  protein: z.number().min(0, 'Protein cannot be negative').max(1000, 'Protein value too high'),
  carbs: z.number().min(0, 'Carbs cannot be negative').max(2000, 'Carbs value too high'),
  fats: z.number().min(0, 'Fats cannot be negative').max(1000, 'Fats value too high'),
  description: z.string().trim().optional(),
  meals: z.array(TrainerLibraryDietPlanMealItemSchema).min(1, 'Add at least one meal to the diet plan'),
});

export type TrainerLibraryDietPlanFormValues = z.infer<typeof TrainerLibraryDietPlanFormSchema>;
