import { z } from 'zod';

export const TrainerLibraryDietPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  goal: z.string(),
  calories: z.number().optional(),
  protein: z.number().optional(),
  carbs: z.number().optional(),
  fats: z.number().optional(),
  description: z.string().optional(),
  meals: z.array(
    z.union([
      z.string(),
      z.object({
        name: z.string().optional(),
        time: z.string().optional(),
        items: z.string().optional(),
        description: z.string().optional(),
      }),
    ])
  ),
  isActive: z.boolean(),
});
