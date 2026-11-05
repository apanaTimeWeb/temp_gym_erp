'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getDateRange, serializeSuperadminCustomDateRange } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/utils/SuperadminCommunicationMessagingCenterDateRangeUtils';
import type { DateRangeOption } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center_date_range.types';

/**
 * @description Coordinates the use Superadmin messaging date range picker concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminCommunicationMessagingCenterDateRangePicker(onRangeChange: (start: string, end: string) => void) {
  const searchParams = useSearchParams();
  const urlStart = searchParams.get('startDate') ?? '';
  const urlEnd = searchParams.get('endDate') ?? '';
  const hasUrlBounds = Boolean(urlStart || urlEnd);
  const [range, setRange] = useState<DateRangeOption>(hasUrlBounds ? 'custom' : 'this_month');
  const [customStart, setCustomStart] = useState(urlStart);
  const [customEnd, setCustomEnd] = useState(urlEnd);
  const onRangeChangeRef = useRef(onRangeChange);
  useEffect(() => { onRangeChangeRef.current = onRangeChange; }, [onRangeChange]);
  useEffect(() => {
    if (hasUrlBounds) {
      setRange('custom');
      setCustomStart(urlStart);
      setCustomEnd(urlEnd);
      onRangeChangeRef.current(urlStart, urlEnd);
      return;
    }
    setRange('this_month');
    setCustomStart('');
    setCustomEnd('');
    const initialRange = getDateRange('this_month');
    onRangeChangeRef.current(initialRange.start, initialRange.end);
  }, [hasUrlBounds, urlStart, urlEnd]);

  function handleRangeChange(value: string | number) {
    const next = String(value) as DateRangeOption;
    setRange(next);
    if (next === 'custom') {
      setCustomStart('');
      setCustomEnd('');
      onRangeChange('', '');
      return;
    }
    if (!['today', 'this_week', 'this_month', 'this_year'].includes(next)) return;
    const nextRange = getDateRange(next);
    onRangeChange(nextRange.start, nextRange.end);
  }
  function handleCustomStartChange(value: string) {
    setCustomStart(value);
    const nextRange = serializeSuperadminCustomDateRange(value, customEnd);
    onRangeChange(nextRange.start, nextRange.end);
  }
  function handleCustomEndChange(value: string) {
    setCustomEnd(value);
    const nextRange = serializeSuperadminCustomDateRange(customStart, value);
    onRangeChange(nextRange.start, nextRange.end);
  }
  return { range, customStart, customEnd, handleRangeChange, handleCustomStartChange, handleCustomEndChange };
}
