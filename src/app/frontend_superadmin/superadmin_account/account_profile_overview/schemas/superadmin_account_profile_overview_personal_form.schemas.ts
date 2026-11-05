import { z } from 'zod';
const formattedPhonePattern = /^[+().\s\-\d]+$/;
export const personalSchema = z.object({
  name: z.string().trim().min(2, 'ui.profile_name_min_length'),
  phone: z.string().trim().refine((value) => formattedPhonePattern.test(value) && value.replace(/\D/g, '').length >= 10 && value.replace(/\D/g, '').length <= 15, 'ui.profile_phone_invalid'),
  timezone: z.string().optional(),
  language: z.string().optional(),
});
