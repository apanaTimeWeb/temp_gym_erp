"use client";
// RESPONSIBILITY: Provides a feature-local calendar range picker for the Finance Payroll report; URL state remains owned by its parent.

import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface AdminFinancePayrollReportDateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
}

// Construct local civil dates without JavaScript's 1900..1999 remapping for years 0..99.
const atCivilDate = (year: number, month: number, day: number): Date => {
  const result = new Date(0);
  result.setFullYear(year, month, day);
  result.setHours(12, 0, 0, 0);
  return result;
};
const toDateKey = (date: Date) => `${String(date.getFullYear()).padStart(4, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const fromDateKey = (key: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!match) return null;
  const year = Number(match[1]);
  if (year < 1) return null;
  // Date(year, month, day) interprets 0..99 as 1900..1999; setFullYear avoids it.
  const date = atCivilDate(year, Number(match[2]) - 1, Number(match[3]));
  return toDateKey(date) === key ? date : null;
};

/** One trigger opens a keyboard-operable calendar; the user chooses start then end to form an inclusive range. */
export default function AdminFinancePayrollReportDateRangePicker({ startDate, endDate, onChange }: AdminFinancePayrollReportDateRangePickerProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => fromDateKey(startDate) ?? new Date());
  const [focusedDate, setFocusedDate] = useState(() => startDate || toDateKey(new Date()));
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const pendingStartRef = useRef<string | null>(null);
  const focusCalendarDayRef = useRef(false);
  const monthLabel = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate), [locale, viewDate]);
  const weekdayLabels = useMemo(() => {
    const monday = atCivilDate(2024, 0, 1); // Monday, used only to produce localized weekday labels.
    return Array.from({ length: 7 }, (_, index) => new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(atCivilDate(monday.getFullYear(), monday.getMonth(), monday.getDate() + index)));
  }, [locale]);
  const calendarDays = useMemo(() => {
    const first = atCivilDate(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const start = atCivilDate(first.getFullYear(), first.getMonth(), 1 - offset);
    return Array.from({ length: 42 }, (_, index) => atCivilDate(start.getFullYear(), start.getMonth(), start.getDate() + index));
  }, [viewDate]);
  const calendarWeeks = useMemo(() => Array.from({ length: 6 }, (_, week) => calendarDays.slice(week * 7, week * 7 + 7)), [calendarDays]);

  // Listen only while open. Month navigation must not steal focus from its buttons.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        pendingStartRef.current = null;
        triggerRef.current?.focus();
      }
    };
    const handleOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node) && !triggerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        pendingStartRef.current = null;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [open]);

  // Focus after the next month has actually rendered (not in a precommit animation frame).
  useEffect(() => {
    if (!open || !focusCalendarDayRef.current) return;
    const target = dialogRef.current?.querySelector<HTMLButtonElement>(
      `[data-testid="admin-finance-payroll-calendar-day-${focusedDate}"]`,
    );
    if (target) {
      focusCalendarDayRef.current = false;
      target.focus();
    }
  }, [open, focusedDate, viewDate]);

  const toggleCalendar = () => {
    if (!open) {
      const focusDate = fromDateKey(startDate) ?? new Date();
      setFocusedDate(toDateKey(focusDate));
      setViewDate(atCivilDate(focusDate.getFullYear(), focusDate.getMonth(), 1));
      pendingStartRef.current = null;
      focusCalendarDayRef.current = true;
    } else {
      pendingStartRef.current = null;
    }
    setOpen((current) => !current);
  };

  const navigateMonth = (amount: number) => {
    const target = atCivilDate(viewDate.getFullYear(), viewDate.getMonth() + amount, 1);
    if (target.getFullYear() < 1 || target.getFullYear() > 9999) return;
    setViewDate(target);
    setFocusedDate(toDateKey(target));
    // Keep focus on month buttons to support repeated clicks.
  };

  const moveFocus = (event: ReactKeyboardEvent<HTMLButtonElement>, day: Date) => {
    const weekdayIndex = (day.getDay() + 6) % 7;
    let next: Date | null = null;
    if (event.key === 'ArrowLeft') next = atCivilDate(day.getFullYear(), day.getMonth(), day.getDate() - 1);
    if (event.key === 'ArrowRight') next = atCivilDate(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    if (event.key === 'ArrowUp') next = atCivilDate(day.getFullYear(), day.getMonth(), day.getDate() - 7);
    if (event.key === 'ArrowDown') next = atCivilDate(day.getFullYear(), day.getMonth(), day.getDate() + 7);
    if (event.key === 'Home') next = atCivilDate(day.getFullYear(), day.getMonth(), day.getDate() - weekdayIndex);
    if (event.key === 'End') next = atCivilDate(day.getFullYear(), day.getMonth(), day.getDate() + 6 - weekdayIndex);
    if (event.key === 'PageUp' || event.key === 'PageDown') {
      const offset = (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1);
      const month = atCivilDate(day.getFullYear(), day.getMonth() + offset, 1);
      const lastDay = atCivilDate(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      next = atCivilDate(month.getFullYear(), month.getMonth(), Math.min(lastDay, day.getDate()));
    }
    if (!next || next.getFullYear() < 1 || next.getFullYear() > 9999) return;
    event.preventDefault();
    focusCalendarDayRef.current = true;
    setFocusedDate(toDateKey(next));
    if (next.getFullYear() !== viewDate.getFullYear() || next.getMonth() !== viewDate.getMonth()) {
      setViewDate(atCivilDate(next.getFullYear(), next.getMonth(), 1));
    }
  };

  const chooseDay = (day: Date) => {
    const key = toDateKey(day);
    const pendingStart = pendingStartRef.current;
    const activeStart = pendingStart ?? (fromDateKey(startDate) ? startDate : '');
    if (!activeStart || (pendingStart === null && endDate) || key < activeStart) {
      pendingStartRef.current = key;
      onChange(key, '');
      setViewDate(atCivilDate(day.getFullYear(), day.getMonth(), 1));
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
  const triggerText = startDate && endDate ? `${displayDate(startDate)} – ${displayDate(endDate)}` : startDate ? `${displayDate(startDate)} – ${t('reports.admin_reports_main.selectEndDate')}` : t('reports.admin_reports_main.chooseDateRange');

  return (
    <div className="relative w-full" data-testid="admin-finance-payroll-date-range-picker">
      <button ref={triggerRef} type="button" className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-border bg-input px-3 py-2.5 text-left text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('reports.admin_reports_main.chooseDateRange')} aria-haspopup="dialog" aria-expanded={open} onClick={toggleCalendar} data-testid="admin-finance-payroll-date-range-trigger">
        <span>{triggerText}</span><CalendarDays size={18} aria-hidden="true" className="shrink-0 text-secondary" />
      </button>
      {open && <div ref={dialogRef} role="dialog" aria-label={t('reports.admin_reports_main.calendarDialogLabel')} className="absolute left-0 top-full z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-border bg-popover p-3 shadow-dialog" data-testid="admin-finance-payroll-date-range-calendar">
        <div className="mb-3 flex items-center justify-between gap-2">
          <button type="button" className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('reports.admin_reports_main.previousMonth')} disabled={viewDate.getFullYear() === 1 && viewDate.getMonth() === 0} onClick={() => navigateMonth(-1)}><ChevronLeft size={18} aria-hidden="true" /></button>
          <h3 className="text-sm font-semibold text-primary" aria-live="polite">{monthLabel}</h3>
          <button type="button" className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('reports.admin_reports_main.nextMonth')} disabled={viewDate.getFullYear() === 9999 && viewDate.getMonth() === 11} onClick={() => navigateMonth(1)}><ChevronRight size={18} aria-hidden="true" /></button>
        </div>
        <div className="overflow-x-auto"><div role="grid" aria-label={monthLabel} className="min-w-[21rem] space-y-1">
          <div role="row" className="grid grid-cols-7 gap-1">
            {weekdayLabels.map((label, index) => <div key={`${label}-${index}`} role="columnheader" className="py-1 text-center text-xs font-medium text-secondary">{label}</div>)}
          </div>
          {calendarWeeks.map((week, weekIndex) => <div key={`week-${weekIndex}`} role="row" className="grid grid-cols-7 gap-1">
            {week.map((day) => {
              const key = toDateKey(day);
              const inMonth = day.getMonth() === viewDate.getMonth();
              const inRange = Boolean(startDate && endDate && key >= startDate && key <= endDate);
              const selected = key === startDate || key === endDate;
              return <div key={key} role="gridcell" aria-selected={selected} className="min-w-0"><button type="button" tabIndex={key === focusedDate ? 0 : -1} aria-label={new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(day)} aria-pressed={selected} onFocus={() => setFocusedDate(key)} onKeyDown={(event: ReactKeyboardEvent<HTMLButtonElement>) => moveFocus(event, day)} onClick={() => chooseDay(day)} className={`min-h-11 min-w-11 w-full rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? 'bg-primary text-on-primary' : inRange ? 'bg-primary-subtle text-primary' : inMonth ? 'text-primary hover:bg-surface-hover' : 'text-disabled hover:bg-surface-hover'}`} data-testid={`admin-finance-payroll-calendar-day-${key}`}>{day.getDate()}</button></div>;
            })}
          </div>)}
        </div>
        </div>
        <p className="mt-3 text-xs text-secondary" role="status">{startDate && !endDate ? t('reports.admin_reports_main.selectEndDate') : t('reports.admin_reports_main.customRangeHelp')}</p>
      </div>}
    </div>
  );
}
