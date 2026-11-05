// RESPONSIBILITY: Defines validation rules for creating and editing inquiry leads.
import { z } from 'zod';

import { MANAGER_INQUIRIES_PIPELINE_STATUS_OPTION_VALUES } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline.constants';
/**
 * @description Provides the ManagerInquiriesPipelineFormSchema implementation for the inquiries module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerInquiriesFormSchema = z.object({ name: z.string().min(2, 'Name is required'), phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'), email: z.string().email('Invalid email address').optional().or(z.literal('')), interest: z.string().min(2, 'Interest is required'), status: z.enum(MANAGER_INQUIRIES_PIPELINE_STATUS_OPTION_VALUES), source: z.string(), notes: z.string().optional(), followUpLogs: z.array(z.object({ date: z.string(), note: z.string() })).optional() });
