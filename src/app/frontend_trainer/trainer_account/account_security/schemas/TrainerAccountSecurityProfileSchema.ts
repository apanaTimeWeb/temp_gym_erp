import { z } from "zod";

export const TrainerAccountSecurityFormSchema = z.object({
  name: z.string().trim().min(1, "ERR_FULL_NAME_REQUIRED"),
  phone: z.string().trim().max(30, "ERR_PHONE_TOO_LONG"),
  specialization: z.array(z.string().trim()).max(10, "ERR_SPECIALIZATIONS_LIMIT"),
});

export const TrainerAccountSecurityTrainerPasswordFormSchema = z.object({
  currentPassword: z.string().min(1, "ERR_CURRENT_PASSWORD_REQUIRED"),
  newPassword: z.string().min(8, "ERR_NEW_PASSWORD_MIN"),
  confirmPassword: z.string().min(8, "ERR_CONFIRM_PASSWORD_MIN"),
}).refine((value) => value.newPassword === value.confirmPassword, {
  path: ["confirmPassword"],
  message: "ERR_PASSWORD_MISMATCH",
});
