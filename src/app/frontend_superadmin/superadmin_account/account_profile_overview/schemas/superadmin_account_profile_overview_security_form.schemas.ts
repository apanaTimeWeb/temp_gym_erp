import { z } from 'zod';
export const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'ui.current_password_required'),
  newPassword: z.string().min(8, 'ui.new_password_min_length'),
  confirmPassword: z.string().min(1, 'ui.confirm_password_required'),
}).refine((values) => values.newPassword === values.confirmPassword, {
  message: 'ui.passwords_do_not_match',
  path: ['confirmPassword'],
});
