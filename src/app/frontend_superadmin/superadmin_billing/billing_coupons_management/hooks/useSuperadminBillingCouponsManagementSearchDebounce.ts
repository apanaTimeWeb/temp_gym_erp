'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type SetUrlParam = (key: string, value: string) => void;

/**
 * Keeps the coupons input responsive while limiting URL/query commits to one per 300 ms.
 * The search commit and page reset remain feature-local to preserve coupon pagination behavior.
 */
export function useSuperadminBillingCouponsManagementSearchDebounce(
  committedSearch: string,
  setParam: SetUrlParam,
) {
  const [searchQuery, setSearchQueryState] = useState(committedSearch);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingCommitRef = useRef<string | null>(null);

  useEffect(() => {
    if (pendingCommitRef.current === committedSearch) {
      pendingCommitRef.current = null;
      return;
    }

    setSearchQueryState(committedSearch);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = null;
    pendingCommitRef.current = null;
  }, [committedSearch]);

  useEffect(() => () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
  }, []);

  const setSearchQuery = useCallback((value: string) => {
    setSearchQueryState(value);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = null;

    if (value === committedSearch && pendingCommitRef.current === null) return;

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      pendingCommitRef.current = value;
      setParam('search', value);
      setParam('page', '1');
    }, 300);
  }, [committedSearch, setParam]);

  return { searchQuery, setSearchQuery };
}
