import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ManagerInfrastructureNavigationDestinationsProvider from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureNavigationDestinationsProvider';
import { useManagerInfrastructureNavigationDestination } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureNavigationDestination';

function DestinationProbe({ destinationKey }: { destinationKey: string }) {
  const href = useManagerInfrastructureNavigationDestination(destinationKey);
  return <a href={href}>destination</a>;
}

describe('Manager infrastructure navigation destinations', () => {
  it('provides shell-owned route values to feature components without sibling URL imports', () => {
    render(
      <ManagerInfrastructureNavigationDestinationsProvider destinations={{ FINANCE: '/frontend_manager/manager_finance_expenses', MEMBERS: '/frontend_manager/manager_members' }}>
        <DestinationProbe destinationKey="FINANCE" />
      </ManagerInfrastructureNavigationDestinationsProvider>,
    );
    expect(screen.getByRole('link', { name: 'destination' })).toHaveAttribute('href', '/frontend_manager/manager_finance_expenses');
  });

  it('fails loudly when a destination key is not registered', () => {
    expect(() => render(
      <ManagerInfrastructureNavigationDestinationsProvider destinations={{ FINANCE: '/frontend_manager/manager_finance_expenses' }}>
        <DestinationProbe destinationKey="MEMBERS" />
      </ManagerInfrastructureNavigationDestinationsProvider>,
    )).toThrow('Manager navigation destination "MEMBERS" is not registered by the role shell.');
  });
});
