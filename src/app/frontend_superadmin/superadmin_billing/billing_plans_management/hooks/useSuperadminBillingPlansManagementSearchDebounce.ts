'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type SetUrlParam = (key: string, value: string) => void;

/**
 * Keeps the Plans search field responsive and delays URL/query commits by 300 ms.
 * This hook deliberately does not introduce pagination or page-reset behavior absent from the Plans contract.
 */
export function useSuperadminBillingPlansManagementSearchDebounce(
  committedSearch: string,
  setParam: SetUrlParam,
) {
  const [search, setSearchState] = useState(committedSearch);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingCommitRef = useRef<string | null>(null);

  useEffect(() => {
    if (pendingCommitRef.current === committedSearch) {
      pendingCommitRef.current = null;
      return;
    }

    setSearchState(committedSearch);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = null;
    pendingCommitRef.current = null;
  }, [committedSearch]);

  useEffect(() => () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
  }, []);

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = null;

    if (value === committedSearch && pendingCommitRef.current === null) return;

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      pendingCommitRef.current = value;
      setParam('search', value);
    }, 300);
  }, [committedSearch, setParam]);

  return { search, setSearch };
}
