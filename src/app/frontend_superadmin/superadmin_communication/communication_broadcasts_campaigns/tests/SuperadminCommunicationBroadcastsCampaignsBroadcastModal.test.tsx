import { zodResolver } from '@hookform/resolvers/zod';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { SuperadminCommunicationBroadcastsBroadcastModal } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastModal';
import { BroadcastSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_contract.schemas';

import type { BroadcastFormData } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';


const originalTimezone = process.env.TZ;
beforeAll(() => { process.env.TZ = 'America/Los_Angeles'; });
afterAll(() => { if (originalTimezone === undefined) delete process.env.TZ; else process.env.TZ = originalTimezone; });

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: Record<string, string | number>) => values ? `${key} ${JSON.stringify(values)}` : key,
}));

vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData', () => ({
  useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData: () => ({
    gyms: [{ id: 'gym-1', name: 'Test Gym', plan: 'Pro', ownerName: 'Test Owner' }],
    isPendingGyms: false,
    recipientCount: 8,
    gymsError: null,
    retryGyms: vi.fn(),
    isRecipientCountLoading: false,
    recipientCountError: null,
    retryRecipientCount: vi.fn(),
  }),
}));

vi.mock('@/components/ui/SearchableDropdown', () => ({
  SearchableDropdown: ({ value, onChange, options, 'data-testid': testId }: {
    value: string;
    onChange: (value: string) => void;
    options: Array<{ label: string; value: string }>;
    'data-testid'?: string;
  }) => (
    <select aria-label={testId ?? 'Searchable dropdown'} data-testid={testId} value={value} onChange={(event) => onChange(event.target.value)} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  ),
}));

function BroadcastModalHarness({ onSubmit }: { onSubmit: (data: BroadcastFormData) => void }) {
  const form = useForm<BroadcastFormData>({
    resolver: zodResolver(BroadcastSchema),
    defaultValues: {
      title: 'Important update',
      content: 'System maintenance starts tonight.',
      targetGymIds: [],
      status: 'SENT',
    },
  });

  return <SuperadminCommunicationBroadcastsBroadcastModal isOpen onClose={vi.fn()} form={form} onSubmit={onSubmit} />;
}

describe('SuperadminCommunicationBroadcastsBroadcastModal immediate-send guard', () => {
  it('does not submit until the user types the exact SEND phrase', async () => {
    const onSubmit = vi.fn();
    render(<BroadcastModalHarness onSubmit={onSubmit} />);

    const submit = screen.getByTestId('superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-submit');
    const phrase = screen.getByTestId('superadmin_communication_broadcasts-send-confirm-phrase');
    expect(submit).toBeDisabled();
    fireEvent.click(submit);
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(phrase, { target: { value: 'send' } });
    expect(submit).toBeDisabled();
    fireEvent.click(submit);
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(phrase, { target: { value: 'SEND' } });
    await waitFor(() => expect(submit).toBeEnabled());
    fireEvent.click(submit);
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ status: 'SENT', targetGymIds: [] }));
  });

  it('lets the user move from all gyms into explicit specific-gym selection', () => {
    render(<BroadcastModalHarness onSubmit={vi.fn()} />);
    const modeButton = screen.getByTestId('superadmin_communication_broadcasts-broadcast-modal-select-all');
    expect(modeButton).toHaveTextContent('ui.choose_specific_gyms');
    fireEvent.click(modeButton);
    expect(modeButton).toHaveTextContent('ui.use_all_gyms');
    expect(screen.getByTestId('superadmin_communication_broadcasts-target-gym-checkbox')).toBeChecked();
  });
});


describe('SuperadminCommunicationBroadcastsBroadcastModal browser-local DST validation', () => {
  async function openScheduledForm(onSubmit: (data: BroadcastFormData) => void) {
    render(<BroadcastModalHarness onSubmit={onSubmit} />);
    fireEvent.change(screen.getByTestId('superadmin_communication_broadcasts-broadcast-modal-status-dropdown'), { target: { value: 'SCHEDULED' } });
    await waitFor(() => expect(screen.getByTestId('superadmin_communication_broadcasts-scheduled-date')).toBeInTheDocument());
  }

  it('preserves a nonexistent spring-forward date/time and prevents submission', async () => {
    const onSubmit = vi.fn();
    await openScheduledForm(onSubmit);
    const date = screen.getByTestId('superadmin_communication_broadcasts-scheduled-date');
    const time = screen.getByTestId('superadmin_communication_broadcasts-scheduled-time');
    fireEvent.change(date, { target: { value: '2026-03-08' } });
    fireEvent.change(time, { target: { value: '02:30' } });

    expect(date).toHaveValue('2026-03-08');
    expect(time).toHaveValue('02:30');
    expect(screen.getByRole('alert')).toHaveTextContent('ui.scheduled_date_time_nonexistent_error');
    fireEvent.click(screen.getByTestId('superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-submit'));
    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
  });

  it('preserves a repeated fall-back time and explains the ambiguity', async () => {
    const onSubmit = vi.fn();
    await openScheduledForm(onSubmit);
    const date = screen.getByTestId('superadmin_communication_broadcasts-scheduled-date');
    const time = screen.getByTestId('superadmin_communication_broadcasts-scheduled-time');
    fireEvent.change(date, { target: { value: '2026-11-01' } });
    fireEvent.change(time, { target: { value: '01:30' } });

    expect(date).toHaveValue('2026-11-01');
    expect(time).toHaveValue('01:30');
    expect(screen.getByRole('alert')).toHaveTextContent('ui.scheduled_date_time_ambiguous_error');
    fireEvent.click(screen.getByTestId('superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-submit'));
    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
  });
});
