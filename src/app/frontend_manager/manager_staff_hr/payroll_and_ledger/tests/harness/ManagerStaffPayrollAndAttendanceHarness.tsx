// RESPONSIBILITY: Supplies isolated Query, i18n and confirmation providers plus an explicit MSW scenario for payroll/ledger tests.
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useState, type ReactNode } from 'react';

import { ManagerConfirmProvider } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import {
  setManagerPayrollAndLedgerMockScenario,
  type ManagerPayrollAndLedgerMockScenario,
} from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/scenarios/ManagerPayrollAndLedgerMockScenarios';

export interface ManagerStaffPayrollAndAttendanceHarnessProps {
  children: ReactNode;
  locale?: string;
  messages?: Record<string, unknown>;
  scenario?: ManagerPayrollAndLedgerMockScenario;
}

export function ManagerStaffPayrollAndAttendanceHarness({
  children,
  locale = 'en',
  messages = {},
  scenario = 'ACTIVE',
}: ManagerStaffPayrollAndAttendanceHarnessProps) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false, staleTime: 0 },
      mutations: { retry: false },
    },
  }));

  useEffect(() => {
    setManagerPayrollAndLedgerMockScenario(scenario);
    return () => setManagerPayrollAndLedgerMockScenario('ACTIVE');
  }, [scenario]);

  return (
    <QueryClientProvider client={client}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ManagerConfirmProvider>{children}</ManagerConfirmProvider>
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}
