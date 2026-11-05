"use client";
// RESPONSIBILITY: Provides a feature-local calendar range picker for the Finance Revenue report; URL state remains owned by its parent.

import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { parseAdminFinanceRevenueReportDateKey, toAdminFinanceRevenueReportDateKey } from '@/app/frontend_admin/admin_finance/finance_revenue_report/utils/AdminFinanceRevenueReportDateRangeUtils';

interface AdminFinanceRevenueReportDateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
}

const toDateKey = toAdminFinanceRevenueReportDateKey;
const fromDateKey = parseAdminFinanceRevenueReportDateKey;

/** One trigger opens a keyboard-operable calendar; the user chooses start then end to form an inclusive range. */
export default function AdminFinanceRevenueReportDateRangePicker({ startDate, endDate, onChange }: AdminFinanceRevenueReportDateRangePickerProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => fromDateKey(startDate) ?? new Date());
  const [focusedDate, setFocusedDate] = useState(() => startDate || toDateKey(new Date()));
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  // Preserve a first click while the Next.js URL replacement is still pending.
  const pendingStartRef = useRef<string | null>(null);
  // Move focus only on open or keyboard navigation; month buttons retain focus on click.
  const focusCalendarDayRef = useRef(false);
  const monthLabel = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate), [locale, viewDate]);
  const weekdayLabels = useMemo(() => {
    const monday = new Date(2024, 0, 1); // Monday, used only to produce localized weekday labels.
    return Array.from({ length: 7 }, (_, index) => new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index)));
  }, [locale]);
  const calendarDays = useMemo(() => {
    const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
    return Array.from({ length: 42 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
  }, [viewDate]);
  const calendarWeeks = useMemo(() => Array.from({ length: 6 }, (_, week) => calendarDays.slice(week * 7, week * 7 + 7)), [calendarDays]);

  // Document listeners are tied to dialog visibility, never to the displayed month.
  // Re-centering in this effect made Previous/Next Month and cross-month arrow keys unusable.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handleOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node) && !triggerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutside);
    return () => { document.removeEventListener('keydown', handleKeyDown); document.removeEventListener('mousedown', handleOutside); };
  }, [open]);

  // Focus after the new month's buttons have committed, not in a pre-commit animation frame.
  useEffect(() => {
    if (!open || !focusCalendarDayRef.current) return;
    const target = dialogRef.current?.querySelector<HTMLButtonElement>(`[data-testid="admin-finance-revenue-calendar-day-${focusedDate}"]`);
    if (target) {
      focusCalendarDayRef.current = false;
      target.focus();
    }
  }, [focusedDate, open, viewDate]);

  const toggleOpen = () => {
    if (!open) {
      const initialDate = fromDateKey(startDate) ?? new Date();
      setViewDate(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
      setFocusedDate(toDateKey(initialDate));
      pendingStartRef.current = null;
      focusCalendarDayRef.current = true;
    }
    setOpen(!open);
  };

  const navigateMonth = (amount: number) => {
    const target = new Date(viewDate.getFullYear(), viewDate.getMonth() + amount, 1);
    setViewDate(target);
    setFocusedDate(toDateKey(target));
    // Intentionally leave focus on the Previous/Next Month button for repeated clicks.
  };

  const moveFocus = (event: ReactKeyboardEvent<HTMLButtonElement>, day: Date) => {
    const weekdayIndex = (day.getDay() + 6) % 7; // Monday is the first column.
    let next: Date | null = null;
    if (event.key === 'ArrowLeft') next = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
    if (event.key === 'ArrowRight') next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    if (event.key === 'ArrowUp') next = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 7);
    if (event.key === 'ArrowDown') next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 7);
    if (event.key === 'Home') next = new Date(day.getFullYear(), day.getMonth(), day.getDate() - weekdayIndex);
    if (event.key === 'End') next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 6 - weekdayIndex);
    if (event.key === 'PageUp' || event.key === 'PageDown') {
      const amount = (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1);
      const targetMonth = new Date(day.getFullYear(), day.getMonth() + amount, 1);
      const lastDay = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
      next = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), Math.min(day.getDate(), lastDay));
    }
    if (!next) return;
    event.preventDefault();
    focusCalendarDayRef.current = true;
    setFocusedDate(toDateKey(next));
    if (next.getFullYear() !== viewDate.getFullYear() || next.getMonth() !== viewDate.getMonth()) {
      setViewDate(new Date(next.getFullYear(), next.getMonth(), 1));
    }
  };

  const chooseDay = (day: Date) => {
    const key = toDateKey(day);
    const pendingStart = pendingStartRef.current;
    const activeStart = pendingStart ?? (fromDateKey(startDate) ? startDate : '');
    if (!activeStart || (pendingStart === null && endDate) || key < activeStart) {
      pendingStartRef.current = key;
      onChange(key, '');
      setFocusedDate(key);
      setViewDate(new Date(day.getFullYear(), day.getMonth(), 1));
      return;
    }
    pendingStartRef.current = null;
    onChange(activeStart, key);
    setOpen(false);
    triggerRef.current?.focus();
  };
  const displayDate = (key: string) => {
    const date = fromDateKey(key);
    return date ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date) : '';
  };
  const validStartDate = fromDateKey(startDate) ? startDate : '';
  const validEndDate = fromDateKey(endDate) ? endDate : '';
  const triggerText = validStartDate && validEndDate ? `${displayDate(validStartDate)} – ${displayDate(validEndDate)}` : validStartDate ? `${displayDate(validStartDate)} – ${t('reports.admin_reports_main.selectEndDate')}` : t('reports.admin_reports_main.chooseDateRange');

  return (
    <div className="relative w-full" data-testid="admin-finance-revenue-date-range-picker">
      <button ref={triggerRef} type="button" className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-border bg-input px-3 py-2.5 text-left text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('reports.admin_reports_main.chooseDateRange')} aria-haspopup="dialog" aria-expanded={open} onClick={toggleOpen} data-testid="admin-finance-revenue-date-range-trigger">
        <span>{triggerText}</span><CalendarDays size={18} aria-hidden="true" className="shrink-0 text-secondary" />
      </button>
      {open && <div ref={dialogRef} role="dialog" aria-label={t('reports.admin_reports_main.calendarDialogLabel')} className="absolute left-0 top-full z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-border bg-popover p-3 shadow-dialog" data-testid="admin-finance-revenue-date-range-calendar">
        <div className="mb-3 flex items-center justify-between gap-2">
          <button type="button" className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('reports.admin_reports_main.previousMonth')} onClick={() => navigateMonth(-1)}><ChevronLeft size={18} aria-hidden="true" /></button>
          <h3 className="text-sm font-semibold text-primary" aria-live="polite">{monthLabel}</h3>
          <button type="button" className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('reports.admin_reports_main.nextMonth')} onClick={() => navigateMonth(1)}><ChevronRight size={18} aria-hidden="true" /></button>
        </div>
        <div role="grid" aria-label={monthLabel} className="space-y-1">
          <div role="row" className="grid grid-cols-7 gap-1">
            {weekdayLabels.map((label, index) => <div key={`${label}-${index}`} role="columnheader" className="py-1 text-center text-xs font-medium text-secondary">{label}</div>)}
          </div>
          {calendarWeeks.map((week, weekIndex) => <div key={`week-${weekIndex}`} role="row" className="grid grid-cols-7 gap-1">
            {week.map((day) => {
              const key = toDateKey(day);
              const inMonth = day.getMonth() === viewDate.getMonth();
              const inRange = Boolean(startDate && endDate && key >= startDate && key <= endDate);
              const selected = key === startDate || key === endDate;
              return <div key={key} role="gridcell" aria-selected={selected} className="min-w-0"><button type="button" tabIndex={key === focusedDate ? 0 : -1} aria-label={new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(day)} aria-pressed={selected} onFocus={() => setFocusedDate(key)} onKeyDown={(event: ReactKeyboardEvent<HTMLButtonElement>) => moveFocus(event, day)} onClick={() => chooseDay(day)} className={`min-h-11 w-full rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? 'bg-primary text-on-primary' : inRange ? 'bg-primary-subtle text-primary' : inMonth ? 'text-primary hover:bg-surface-hover' : 'text-disabled hover:bg-surface-hover'}`} data-testid={`admin-finance-revenue-calendar-day-${key}`}>{day.getDate()}</button></div>;
            })}
          </div>)}
        </div>
        <p className="mt-3 text-xs text-secondary" role="status">{(pendingStartRef.current || (validStartDate && !validEndDate)) ? t('reports.admin_reports_main.selectEndDate') : t('reports.admin_reports_main.customRangeHelp')}</p>
      </div>}
    </div>
  );
}
