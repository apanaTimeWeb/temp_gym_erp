import type { z } from 'zod';

import type { managerConvertLeadFormSchema } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/schemas/manager_inquiries_pipeline_convert_lead_form.schemas';
import type { managerInquiriesFormSchema } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/schemas/manager_inquiries_pipeline_form.schemas';

export type InquiryFormValues = z.infer<typeof managerInquiriesFormSchema>;
export type ConvertLeadFormValues = z.infer<typeof managerConvertLeadFormSchema>;
/**
 * @description Provides the ManagerInquiriesPipelineFormTypes implementation for the inquiries module.
 * @dependencies @/app/frontend_manager/manager_inquiries_crm/manager_inquiries_schemas/ManagerInquiriesPipelineConvertLeadFormSchema; @/app/frontend_manager/manager_inquiries_crm/manager_inquiries_schemas/ManagerInquiriesPipelineFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
