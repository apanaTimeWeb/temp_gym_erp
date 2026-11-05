import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ManagerInfrastructureDataDensityProvider } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureDataDensityProvider';
import { useManagerInfrastructureDataDensity } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDataDensity';

function DensityProbe() {
  const { density, toggleDensity } = useManagerInfrastructureDataDensity();
  return <button type="button" onClick={toggleDensity}>{density}</button>;
}

describe('ManagerInfrastructureDataDensityProvider', () => {
  it('defaults to Comfortable and toggles to Compact in-session', () => {
    render(<ManagerInfrastructureDataDensityProvider><DensityProbe /></ManagerInfrastructureDataDensityProvider>);
    expect(screen.getByRole('button').textContent).toBe('comfortable');
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button').textContent).toBe('compact');
  });
});
