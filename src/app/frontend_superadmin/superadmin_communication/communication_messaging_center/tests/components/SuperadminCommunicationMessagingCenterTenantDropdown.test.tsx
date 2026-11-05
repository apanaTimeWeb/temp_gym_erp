import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperadminCommunicationMessagingCenterTenantDropdown } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/components/messaging_center_forms_and_filters/SuperadminCommunicationMessagingCenterTenantDropdown';
import type { MessagingTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const tenants: MessagingTenant[] = [{ id: 'tenant-a', name: 'Alpha Gym', plan: 'Pro' }, { id: 'tenant-b', name: 'Beta Gym', plan: 'Basic' }];

describe('SuperadminCommunicationMessagingCenterTenantDropdown', () => {
  it('filters tenant options and selects an option', () => {
    const onChange = vi.fn();
    render(<SuperadminCommunicationMessagingCenterTenantDropdown tenants={tenants} value="" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('superadmin_communication_messaging-superadmin-messaging-tenant-dropdown-messaging-tenant-dropdown-select'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Beta' } });
    expect(screen.getByRole('option', { name: /Beta Gym/ })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /Alpha Gym/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('option', { name: /Beta Gym/ }));
    expect(onChange).toHaveBeenCalledWith('tenant-b');
  });
  it('closes on Escape and restores focus to the trigger', () => {
    render(<SuperadminCommunicationMessagingCenterTenantDropdown tenants={tenants} value="" onChange={vi.fn()} />);
    const trigger = screen.getByTestId('superadmin_communication_messaging-superadmin-messaging-tenant-dropdown-messaging-tenant-dropdown-select');
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
