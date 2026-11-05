import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ManagerStorePointOfSaleEmptyState from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/components/ManagerStorePointOfSaleEmptyState';

describe('ManagerStorePointOfSaleEmptyState', () => {
  it('announces the feature-owned empty-state message accessibly', () => {
    render(<ManagerStorePointOfSaleEmptyState message="Nothing to show" />);
    expect(screen.getByTestId('manager_store-managerstoreposmodal-empty-cart-state').textContent).toContain('Nothing to show');
  });
});
