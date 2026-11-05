import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { AbstractIntlMessages } from 'next-intl';
import { ManagerDashboardOverviewHarness } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/tests/harness/ManagerDashboardOverviewHarness';

export interface ManagerDashboardOverviewRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string;
  messages?: AbstractIntlMessages;
}

/** Render a leaf-owned view inside isolated query and i18n providers. */
export function renderManagerDashboardOverview(
  ui: ReactElement,
  options: ManagerDashboardOverviewRenderOptions = {},
) {
  const { locale = 'en', messages = {}, ...renderOptions } = options;
  return render(ui, {
    ...renderOptions,
    wrapper: ({ children }) => (
      <ManagerDashboardOverviewHarness locale={locale} messages={messages}>
        {children}
      </ManagerDashboardOverviewHarness>
    ),
  });
}
