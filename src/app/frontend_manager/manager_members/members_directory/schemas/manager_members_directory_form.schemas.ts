import { z } from 'zod';

import { MANAGER_MEMBERS_DIRECTORY_GENDER_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MANAGER_MEMBERS_DIRECTORY_BILLING_CYCLE_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_billing_cycle.constants';
import { MANAGER_MEMBERS_DIRECTORY_STATUS_OPTION_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, MANAGER_MEMBER_MAX_CUSTOM_DAYS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_validation.constants';


/**
 * @description Provides the ManagerMembersDirectoryFormSchema implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersDirectoryValidationConstants
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const managerMembersFormBaseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().trim().regex(/^(\+?91[\s-]?)?[0-9]{10}$/, 'Phone number must be a valid 10-digit number'),
  address: z.string().optional(),
  aadhaar: z.string().regex(/^\d{12}$/, 'Aadhaar must be exactly 12 digits').optional().or(z.literal('')),
  gender: z.enum(MANAGER_MEMBERS_DIRECTORY_GENDER_VALUES),
  billingCycle: z.enum(MANAGER_MEMBERS_DIRECTORY_BILLING_CYCLE_VALUES), customDays: z.number().min(1, 'Please enter valid days').max(MANAGER_MEMBER_MAX_CUSTOM_DAYS, 'Custom days are too high').optional().or(z.literal(0)), planId: z.string().min(1, 'Please select a plan'),
  totalAmount: z.number().min(0).max(MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large').optional(), paidAmount: z.number().min(0, 'Amount must be valid').max(MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large').optional(), pendingAmount: z.number().min(0).max(MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large').optional(), advanceAmount: z.number().min(0).max(MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large').optional(),
  joinDate: z.string().optional(), expiryDate: z.string().optional(), medicalHistory: z.string().optional(), status: z.enum(MANAGER_MEMBERS_DIRECTORY_STATUS_OPTION_VALUES).optional(),
});
export const managerMembersFormSchema = managerMembersFormBaseSchema.superRefine((value, context) => {
  if (value.billingCycle === 'CUSTOM' && (!value.customDays || value.customDays < 1)) context.addIssue({ code: z.ZodIssueCode.custom, path: ['customDays'], message: 'Custom billing cycle requires a valid number of days' });
  if (value.billingCycle !== 'CUSTOM' && value.customDays && value.customDays !== 0) context.addIssue({ code: z.ZodIssueCode.custom, path: ['customDays'], message: 'Custom days are only valid for a custom billing cycle' });
});
export type MemberFormValues = z.infer<typeof managerMembersFormSchema>;
