import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ManagerStoreProductsCatalogEmptyState from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/components/ManagerStoreProductsCatalogEmptyState';

describe('ManagerStoreProductsCatalogEmptyState', () => {
  it('announces the feature-owned empty-state message accessibly', () => {
    render(<ManagerStoreProductsCatalogEmptyState message="Nothing to show" />);
    expect(screen.getByTestId('manager_store-store-managerstoreproductgrid-empty-state').textContent).toContain('Nothing to show');
  });
});
