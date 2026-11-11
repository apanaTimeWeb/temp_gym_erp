// RESPONSIBILITY: Validates the HR staff-directory API and staff form boundary only.
// DATA FLOW: staff API/form input → Zod validation → typed staff directory data/errors.

import { z } from 'zod';

export const statusSchema = z.union([z.literal('idle'), z.literal('loading'), z.literal('success'), z.literal('error')]);

export const staffSchema = z.object({
  id: z.string(),
  employeeId: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  salary: z.number().int().nonnegative(),
  branch: z.string(),
  gender: z.string(),
  address: z.string().optional(),
  aadhaar: z.string().optional(),
  upiId: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  advanceSalary: z.number().int().nonnegative().optional(),
  joinDate: z.string(),
  joiningDate: z.string().optional(),
  isActive: z.boolean(),
  salaryType: z.union([z.literal('Monthly'), z.literal('Daily')]).optional(),
  paymentCycle: z.string().optional(),
  currentDue: z.number().int().nonnegative().optional(),
  assignedBranches: z.array(z.string()).optional(),
  primaryBranchId: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  department: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  contractType: z.string().optional(),
  terminationDate: z.string().optional(),
});

export const staffFormSchema = z.object({
  name: z.string().min(2, '__i18n:hr.validation.nameRequired').regex(/^[\p{L}\s.'-]+$/u, '__i18n:hr.validation.alphabetsOnly'),
  email: z.string().email('__i18n:hr.validation.emailInvalid'),
  phone: z.string().regex(/^\d{10}$/, '__i18n:hr.validation.phoneInvalid'),
  role: z.string().min(2, '__i18n:hr.validation.roleRequired'),
  salary: z.number().int().nonnegative().min(0, '__i18n:hr.validation.salaryPositive'),
  branch: z.string().min(1, '__i18n:hr.validation.branchRequired'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  address: z.string().optional(),
  joinDate: z.string(),
  temporaryPassword: z.string().optional().refine((value) => !value || value.length >= 8, { message: '__i18n:hr.validation.passwordMin' }),
  isActive: z.boolean().default(true),
  aadhaar: z.string().regex(/^\d{12}$/, '__i18n:hr.validation.aadhaarDigits').optional().or(z.literal('')),
  upiId: z.string().regex(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, '__i18n:hr.validation.upiInvalid').optional().or(z.literal('')),
  bankAccountNumber: z.string().optional().or(z.literal('')),
  emergencyContactName: z.string().optional().or(z.literal('')),
  emergencyContactPhone: z.string().optional().or(z.literal('')),
  certifications: z.array(z.string()).optional(),
  contractType: z.string().optional().or(z.literal('')),
  department: z.string().optional().or(z.literal('')),
  assignedBranches: z.array(z.string()).optional(),
  primaryBranchId: z.string().optional(),
});
