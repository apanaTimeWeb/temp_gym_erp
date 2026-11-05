'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = useCallback((key: string, fallback = ''): string => {
    return searchParams.get(key) ?? fallback;
  }, [searchParams]);

  const setParam = useCallback((key: string, value: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === '' || value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return { getParam, setParam };
}

export default useUrlState;

