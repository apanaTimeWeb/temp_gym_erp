"use client";

import { useSearchParams } from 'next/navigation';

export function useDateRangeSuffix(): string {
  const searchParams = useSearchParams();
  const range = searchParams?.get('range');
  if (!range) return '';

  const labels: Record<string, string> = {
    this_month: ' (This Month)',
    last_month: ' (Last Month)',
    last_3_months: ' (Last 3 Months)',
    last_6_months: ' (Last 6 Months)',
    this_year: ' (This Year)',
    monthly: ' (Monthly)',
    yearly: ' (Yearly)',
    custom: ' (Custom)',
  };

  return labels[range] ?? ` (${range.replace(/_/g, ' ')})`;
}
