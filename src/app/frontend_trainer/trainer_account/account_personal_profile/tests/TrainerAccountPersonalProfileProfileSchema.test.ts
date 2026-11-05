import { describe, expect, it } from 'vitest';

import { TrainerProfileFormSchema } from '@/app/frontend_trainer/trainer_account/account_personal_profile/schemas/TrainerAccountPersonalProfileProfileSchema';

describe('Trainer personal-profile form schema', () => {
  it('rejects an empty name and more than ten specializations', () => {
    expect(TrainerProfileFormSchema.safeParse({ name: ' ', phone: '', specialization: [] }).success).toBe(false);
    expect(TrainerProfileFormSchema.safeParse({ name: 'Trainer', phone: '', specialization: Array.from({ length: 11 }, (_, index) => `s${index}`) }).success).toBe(false);
  });
});
