"use client";
// RESPONSIBILITY: Renders the useAdminSalesAnalyticsToolbarSearch UI surface for sales_analytics; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → useAdminSalesAnalyticsToolbarSearch → accessible UI/events routed to owning hooks (admin_sales/sales_store_sales/hooks/useAdminSalesAnalyticsToolbarSearch.ts)

import { useEffect, useState } from 'react';

/**
 * @description Owns the Sales toolbar local search buffer and 300ms server-search debounce.
 * @dependencies React state/effect primitives and the module-owned search setter.
 * @edge-case Cancels pending searches and mirrors external URL-backed search changes.
 */
export function useAdminSalesToolbarSearch(search: string, setSearch: (value: string) => void) {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (localSearch !== search) setSearch(localSearch);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [localSearch, search, setSearch]);

  return { localSearch, setLocalSearch };
}
