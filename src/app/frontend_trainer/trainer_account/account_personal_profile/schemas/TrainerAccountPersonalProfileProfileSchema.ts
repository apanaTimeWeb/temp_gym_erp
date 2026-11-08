import { z } from "zod";

export const TrainerProfileFormSchema = z.object({
  name: z.string().trim().min(1, "ERR_FULL_NAME_REQUIRED"),
  phone: z.string().trim().max(30, "ERR_PHONE_TOO_LONG"),
  specialization: z.array(z.string().trim()).max(10, "ERR_SPECIALIZATIONS_LIMIT"),
  bankName: z.string().trim().max(100).optional(),
  accountNumber: z.string().trim().max(30).optional(),
  ifscCode: z.string().trim().max(20).optional(),
  accountHolderName: z.string().trim().max(100).optional(),
  upiId: z.string().trim().max(100).optional(),
});
