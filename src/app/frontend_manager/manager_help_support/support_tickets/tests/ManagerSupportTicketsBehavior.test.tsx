import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ManagerInfrastructureDataDensityProvider } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureDataDensityProvider';
import ManagerSupportTicketsTable from '@/app/frontend_manager/manager_help_support/support_tickets/components/ManagerSupportTicketsTable';
import ManagerSupportTicketsKPIs from '@/app/frontend_manager/manager_help_support/support_tickets/components/ManagerSupportTicketsKPIs';
import { MOCK_SUPPORT_TICKETS, MOCK_SUPPORT_KPIS } from '@/app/frontend_manager/manager_help_support/support_tickets/mocks/fixtures/ManagerSupportTicketsMockData';

describe('ManagerSupportTicketsBehavior', () => {
  it('renders ticket table rows and triggers selection on click', () => {
    let selected: typeof MOCK_SUPPORT_TICKETS[0] | null = null;
    render(
      <ManagerInfrastructureDataDensityProvider>
        <ManagerSupportTicketsTable
          tickets={MOCK_SUPPORT_TICKETS}
          onSelectTicket={(t) => {
            selected = t;
          }}
        />
      </ManagerInfrastructureDataDensityProvider>
    );

    expect(screen.getByText('TICK-8021')).toBeDefined();
    expect(screen.getByText('Additional Biometric Fingerprint Scanner Request for Studio 2')).toBeDefined();

    const row = screen.getByTestId(`manager_support-ticket-row-${MOCK_SUPPORT_TICKETS[0]!.id}`);
    fireEvent.click(row);
    expect(selected).toEqual(MOCK_SUPPORT_TICKETS[0]);
  });

  it('renders KPI values correctly', () => {
    render(<ManagerSupportTicketsKPIs kpis={MOCK_SUPPORT_KPIS} />);
    expect(screen.getByText('Total Tickets')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
  });
});
