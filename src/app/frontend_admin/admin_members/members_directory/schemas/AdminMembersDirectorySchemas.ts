// RESPONSIBILITY: Owns Zod runtime validation schemas for the Admin Members module.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_members/members_directory/schemas/AdminMembersDirectorySchemas.ts)

import { z } from 'zod';

export const memberSearchSchema = z.object({
  search: z.string().optional(),
});

export const memberStatusSchema = z.enum(['active', 'expired', 'pending', 'frozen']);
export const adminMemberGenderSchema = z.enum(['Male', 'Female', 'Other']);

export const adminMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  branchId: z.string(),
  branchName: z.string(),
  planName: z.string(),
  status: memberStatusSchema,
  joinDate: z.string(),
  expiryDate: z.string(),
  pendingAmount: z.number(),
  gender: adminMemberGenderSchema,
  referralSource: z.string().optional(),
  photo: z.string().optional(),
  lastCheckIn: z.string().optional(),
  totalVisits: z.number().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
});

export const adminMembersBranchReferenceSchema = z.object({
  items: z.array(z.object({ id: z.string(), name: z.string() })),
});

export const adminMembersSummarySchema = z.object({
  totalMembers: z.number(),
  activeMembers: z.number(),
  expiredMembers: z.number(),
  pendingMembers: z.number(),
  expiringThisWeek: z.number(),
  expiringThisMonth: z.number(),
  totalOutstanding: z.number(),
  newThisMonth: z.number(),
});
