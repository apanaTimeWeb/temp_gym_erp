// RESPONSIBILITY: Renders ManagerInquiriesPipelineMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerInquiriesPipelineContent } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineContent';

/** @description Entry point for the Inquiries module. Sets up the module hook orchestration and composes all sub-components. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerInquiriesPipelineMain() {
  return <ManagerInquiriesPipelineContent />;
}
