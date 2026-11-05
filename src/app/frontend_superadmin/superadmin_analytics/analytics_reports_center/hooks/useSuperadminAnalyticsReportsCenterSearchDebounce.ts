'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type SetUrlParam = (key: string, value: string) => void;

/**
 * Keeps the Reports input responsive while debouncing URL/query commits by 300 ms.
 * API query normalization remains trim + 200-character truncation in the owning Reports hook.
 */
export function useSuperadminAnalyticsReportsCenterSearchDebounce(
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

  const setSearch = useCallback((value: string) => {
    setSearchQueryState(value);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = null;

    if (value === committedSearch && pendingCommitRef.current === null) return;

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      pendingCommitRef.current = value;
      setParam('search', value);
    }, 300);
  }, [committedSearch, setParam]);

  return { searchQuery, setSearch };
}
