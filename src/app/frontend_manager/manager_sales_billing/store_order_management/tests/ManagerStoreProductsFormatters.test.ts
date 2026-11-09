import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_sales_billing/store_order_management/utils/ManagerStoreProductsFormatters';

describe('ManagerStoreProductsFormatters behavioral contract', () => {
  it('ManagerStoreProductsFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerStoreProductsFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerStoreProductsFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerStoreProductsFormatNumber(123456, 'en-IN')).toBe('1,23,456');
  });
  it('ManagerStoreProductsFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerStoreProductsFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerStoreProductsFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerStoreProductsFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerStoreProductsDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerStoreProductsDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerStoreProductsDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerStoreProductsMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerStoreProductsMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerStoreProductsFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerStoreProductsFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerStoreProductsFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerStoreProductsFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
