import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ManagerStoreOrderManagementEmptyState from '@/app/frontend_manager/manager_sales_billing/store_order_management/components/ManagerStoreOrderManagementEmptyState';

describe('ManagerStoreOrderManagementEmptyState', () => {
  it('announces the feature-owned empty-state message accessibly', () => {
    render(<ManagerStoreOrderManagementEmptyState message="Nothing to show" />);
    expect(screen.getByTestId('manager_store-store-managerstoreordertable-empty-state').textContent).toContain('Nothing to show');
  });
});
