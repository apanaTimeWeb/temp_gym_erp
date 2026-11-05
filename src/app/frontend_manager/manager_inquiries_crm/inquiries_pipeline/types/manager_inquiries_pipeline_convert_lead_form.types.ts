import type { UseFormReturn } from 'react-hook-form';

import type { ConvertLeadFormValues } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_form.types';
import type { PlanSnapshot } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_plan_snapshot.types';


export interface ManagerInquiriesPipelineConvertLeadFormProps {
  useFormReturn: UseFormReturn<ConvertLeadFormValues>;
  plans: PlanSnapshot[];
  watchPlanId?: string;
  watchBillingCycle?: string;
  watchCustomDays?: number;
}
