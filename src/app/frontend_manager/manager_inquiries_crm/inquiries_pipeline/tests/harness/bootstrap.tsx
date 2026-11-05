// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for inquiries_pipeline.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerInquiriesPipelineHarness } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/tests/harness/ManagerInquiriesPipelineHarness';

export function renderManagerInquiriesPipeline(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerInquiriesPipelineHarness>{children}</ManagerInquiriesPipelineHarness> });
}
