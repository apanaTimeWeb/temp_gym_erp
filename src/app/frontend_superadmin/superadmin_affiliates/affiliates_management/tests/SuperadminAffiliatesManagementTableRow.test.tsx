import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminAffiliatesTableRow from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_table/SuperadminAffiliatesManagementTableRow';
import { MOCK_SUPERADMIN_AFFILIATES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/mocks/fixtures/SuperadminAffiliatesManagementMockFixtures';

import type { Affiliate } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';
import type { ReactNode } from 'react';

const { confirmMock } = vi.hoisted(() => ({ confirmMock: vi.fn() }));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));
vi.mock('@/components/ui/Tooltip', () => ({ default: ({ children }: { children: ReactNode }) => <>{children}</> }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: confirmMock }) }));
vi.mock('@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_status_badge/SuperadminAffiliatesManagementAffiliateStatusBadge', () => ({ default: ({ status }: { status: string }) => <span>{status}</span> }));
vi.mock('@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementFormatCurrency', () => ({ SuperadminAffiliatesFormatCurrency: () => '₹10' }));
vi.mock('@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementFormatters', () => ({ superadminAffiliatesMaskEmail: () => 'masked@example.test', formatNumber: () => '1' }));

const affiliate = { ...MOCK_SUPERADMIN_AFFILIATES[0], id: 'affiliate-keyboard-1', status: 'ACTIVE', pendingPayout: 100 } as Affiliate;
const ids = {
  status: 'superadmin_affiliates-superadmin-affiliates-table-row-affiliates-affiliates-table-action1',
  payout: 'superadmin_affiliates-superadmin-affiliates-table-row-affiliates-affiliates-table-control',
  edit: 'superadmin_affiliates-superadmin-affiliates-table-row-affiliates-affiliates-table-edit',
  delete: 'superadmin_affiliates-superadmin-affiliates-table-row-affiliates-affiliates-table-delete',
};

beforeEach(() => { vi.clearAllMocks(); confirmMock.mockResolvedValue(true); });

function renderRow() {
  const onToggleStatus = vi.fn();
  const onEdit = vi.fn();
  const onDelete = vi.fn();
  const onPayCommission = vi.fn();
  render(<table><tbody><SuperadminAffiliatesTableRow affiliate={affiliate} onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} onPayCommission={onPayCommission}/></tbody></table>);
  return { onToggleStatus, onEdit, onDelete, onPayCommission };
}

async function activateFromKeyboard(testId: string, key: 'Enter' | ' ') {
  const control = screen.getByTestId(testId);
  fireEvent.keyDown(control, { key, code: key === ' ' ? 'Space' : 'Enter' });
  fireEvent.click(control);
  return control;
}

describe('SuperadminAffiliatesTableRow keyboard action isolation', () => {
  it('activates the status action exactly once without activating row edit', async () => {
    const { onToggleStatus, onEdit } = renderRow();
    await activateFromKeyboard(ids.status, 'Enter');
    await waitFor(() => expect(onToggleStatus).toHaveBeenCalledTimes(1));
    expect(onToggleStatus).toHaveBeenCalledWith(affiliate.id, affiliate.status);
    expect(onEdit).not.toHaveBeenCalled();
    expect(confirmMock).not.toHaveBeenCalled();
  });

  it('activates the payout action exactly once without activating row edit', async () => {
    const { onPayCommission, onEdit } = renderRow();
    await activateFromKeyboard(ids.payout, 'Enter');
    await waitFor(() => expect(onPayCommission).toHaveBeenCalledTimes(1));
    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(onEdit).not.toHaveBeenCalled();
  });

  it('activates the edit action exactly once for Space without row-handler duplication', async () => {
    const { onEdit } = renderRow();
    await activateFromKeyboard(ids.edit, ' ');
    await waitFor(() => expect(onEdit).toHaveBeenCalledTimes(1));
    expect(onEdit).toHaveBeenCalledWith(affiliate);
  });

  it('delegates delete confirmation to the mutation layer and does not trigger row edit', async () => {
    const { onDelete, onEdit } = renderRow();
    await activateFromKeyboard(ids.delete, 'Enter');
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(affiliate.id);
    expect(confirmMock).not.toHaveBeenCalled();
    expect(onEdit).not.toHaveBeenCalled();
  });
});
