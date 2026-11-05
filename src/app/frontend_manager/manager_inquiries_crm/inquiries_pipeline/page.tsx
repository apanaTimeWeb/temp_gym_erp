// Autonomous leaf route for manager_inquiries.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineMain';
import Loading from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/loading';


export default function ManagerInquiriesPipelinePage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
