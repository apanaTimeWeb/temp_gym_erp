import { z } from 'zod';

import { MANAGER_INQUIRIES_PIPELINE_GENDER_VALUES } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline.constants';
import { MANAGER_INQUIRY_MAX_AMOUNT_MAJOR_UNITS, MANAGER_INQUIRY_MAX_CUSTOM_DAYS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_convert.constants';

/**
 * @description Provides the ManagerInquiriesPipelineConvertLeadFormSchema implementation for the inquiries module.
 * @dependencies @/app/frontend_manager/manager_inquiries_crm/manager_inquiries_constants/ManagerInquiriesPipelineConvertConstants
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const INQUIRIES_BILLING_CYCLE_VALUES = ['ONE_MONTH', 'THREE_MONTHS', 'SIX_MONTHS', 'TWELVE_MONTHS', 'CUSTOM'] as const;
export const managerConvertLeadFormSchema = z.object({ name: z.string().trim().min(2, 'Name is required').max(120), email: z.string().trim().email('Invalid email').optional().or(z.literal('')), phone: z.string().trim().regex(/^\+?[0-9]{10,15}$/, 'Valid phone is required'), address: z.string().trim().max(500).optional(), aadhaar: z.string().regex(/^\d{12}$/, 'Aadhaar must contain exactly 12 digits').optional().or(z.literal('')).or(z.literal('')), gender: z.enum(MANAGER_INQUIRIES_PIPELINE_GENDER_VALUES), billingCycle: z.enum(INQUIRIES_BILLING_CYCLE_VALUES), customDays: z.number().int().min(1).max(MANAGER_INQUIRY_MAX_CUSTOM_DAYS).optional(), planId: z.string().trim().min(1, 'Plan is required'), joinDate: z.string().date(), expiryDate: z.string().date().optional(), totalAmount: z.number().finite().min(0).max(MANAGER_INQUIRY_MAX_AMOUNT_MAJOR_UNITS).optional(), paidAmount: z.number().finite().min(0).max(MANAGER_INQUIRY_MAX_AMOUNT_MAJOR_UNITS).optional(), pendingAmount: z.number().finite().min(0).max(MANAGER_INQUIRY_MAX_AMOUNT_MAJOR_UNITS).optional(), medicalHistory: z.string().trim().max(4000).optional() }).superRefine((value, context) => {
  if (value.billingCycle === 'CUSTOM' && !value.customDays) context.addIssue({ code: z.ZodIssueCode.custom, path: ['customDays'], message: 'Custom billing cycle requires custom days' });
  if (value.billingCycle !== 'CUSTOM' && value.customDays !== undefined) context.addIssue({ code: z.ZodIssueCode.custom, path: ['customDays'], message: 'Custom days are only valid for a custom billing cycle' });
  if (value.totalAmount !== undefined && value.paidAmount !== undefined && value.paidAmount > value.totalAmount) context.addIssue({ code: z.ZodIssueCode.custom, path: ['paidAmount'], message: 'Paid amount cannot exceed total amount' });
  if (value.totalAmount !== undefined && value.pendingAmount !== undefined && value.pendingAmount > value.totalAmount) context.addIssue({ code: z.ZodIssueCode.custom, path: ['pendingAmount'], message: 'Pending amount cannot exceed total amount' });
});
