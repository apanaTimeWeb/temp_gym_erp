'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export function useSuperadminGymsDirectoryTableScroll(tenantsLength: number) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [scrolledLeft, setScrolledLeft] = useState(false);
  const [scrolledRight, setScrolledRight] = useState(false);

  const updateScrollMetrics = useCallback(() => {
    const el = tableContainerRef.current;
    if (!el) return;
    setScrolledLeft(el.scrollLeft > 6);
    setScrolledRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  }, []);

  const handleTableScroll = useCallback(
    (onScrollExtra?: () => void) => {
      updateScrollMetrics();
      onScrollExtra?.();
    },
    [updateScrollMetrics]
  );

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      updateScrollMetrics();
    });
    window.addEventListener('resize', updateScrollMetrics);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', updateScrollMetrics);
    };
  }, [updateScrollMetrics, tenantsLength]);

  return {
    tableContainerRef,
    scrolledLeft,
    scrolledRight,
    updateScrollMetrics,
    handleTableScroll,
  };
}

export default useSuperadminGymsDirectoryTableScroll;
