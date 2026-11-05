import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { ManagerInfrastructureDataDensityProvider } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureDataDensityProvider';
import { ManagerInfrastructureTableRowActionMenu } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureTableContextMenu';

function Fixture({ onEdit, mobilePattern = 'card-stack' }: { onEdit: () => void; mobilePattern?: 'card-stack' | 'horizontal-scroll' }) {
  return <ManagerInfrastructureDataDensityProvider><ManagerInfrastructureResponsiveTable mobilePattern={mobilePattern} labels={['Name', 'Status', 'Actions']}><table><thead><tr><th>Name</th><th>Status</th><th>Actions</th></tr></thead><tbody><tr data-testid="row-1"><td>Ada</td><td>Active</td><td><button type="button" aria-label="Edit Ada" onClick={onEdit}>Edit</button></td></tr></tbody></table></ManagerInfrastructureResponsiveTable></ManagerInfrastructureDataDensityProvider>;
}

describe('ManagerInfrastructureTableContextMenu', () => {
  it('adds labelled mobile fields and an accessible overflow trigger that reuses existing actions', () => {
    const onEdit = vi.fn();
    render(<Fixture onEdit={onEdit} />);
    expect(screen.getByText('Name', { selector: 'span.sr-only' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Actions' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Edit Ada' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('opens the same action menu from a desktop row context-menu gesture', () => {
    const onEdit = vi.fn();
    render(<Fixture onEdit={onEdit} />);
    fireEvent.contextMenu(screen.getByTestId('row-1'), { clientX: 24, clientY: 30 });
    expect(screen.getByRole('menu')).toBeTruthy();
    fireEvent.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Edit Ada' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('keeps compact-column reports in horizontal-scroll mode rather than converting them to cards', () => {
    const onEdit = vi.fn();
    render(<Fixture onEdit={onEdit} mobilePattern="horizontal-scroll" />);
    const region = screen.getByRole('table').parentElement;
    expect(region?.getAttribute('data-mobile-pattern')).toBe('horizontal-scroll');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy();
  });
});


describe('ManagerInfrastructureTableRowActionMenu', () => {
  it('offers the same inline row action through the touch/keyboard overflow menu', () => {
    const onEdit = vi.fn();
    render(<ManagerInfrastructureTableRowActionMenu label="Actions" testId="manager_infrastructure-table-row-action-menu"><button type="button" aria-label="Edit member" onClick={onEdit}>Edit</button></ManagerInfrastructureTableRowActionMenu>);
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Edit member' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
