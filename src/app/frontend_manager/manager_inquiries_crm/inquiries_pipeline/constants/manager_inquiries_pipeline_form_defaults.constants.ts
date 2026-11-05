// RESPONSIBILITY: Owns canonical initial/default values for module form state.
import { MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline.constants';
import type { InquiryFormValues, ConvertLeadFormValues } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_form.types';

export const EMPTY_INQUIRY_FORM: InquiryFormValues = { name: '', phone: '', email: '', interest: '', status: MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.NEW, source: 'Walk-in', notes: '' };

export const EMPTY_CONVERT_FORM: ConvertLeadFormValues = { name: '', email: '', phone: '', address: '', aadhaar: '', gender: 'MALE', billingCycle: 'ONE_MONTH', customDays: undefined, planId: '', joinDate: new Date().toISOString().split('T')[0] || '', expiryDate: '', totalAmount: 0, paidAmount: 0, pendingAmount: 0, medicalHistory: '' };
