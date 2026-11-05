"use client";
// RESPONSIBILITY: Provides a feature-local calendar range picker for the Attendance Reports report; URL state remains owned by its parent.

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface AdminAttendanceReportsDateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
}

const toDateKey = (date: Date) => `${String(date.getFullYear()).padStart(4, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
// The multi-argument Date constructor converts years 0..99 into 1900..1999.
// setFullYear preserves the requested civil year and still normalizes month/day overflow.
const civilDate = (year: number, month: number, day: number): Date => {
  const result = new Date(0);
  result.setHours(12, 0, 0, 0);
  result.setFullYear(year, month, day);
  return result;
};
const supportedDate = (date: Date) => date.getFullYear() >= 1 && date.getFullYear() <= 9999;
const shiftMonth = (date: Date, offset: number): Date | null => {
  const next = civilDate(date.getFullYear(), date.getMonth() + offset, 1);
  return supportedDate(next) ? next : null;
};
const fromDateKey = (key: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!match) return null;
  const date = civilDate(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return supportedDate(date) && toDateKey(date) === key ? date : null;
};

/** One trigger opens a keyboard-operable calendar; the user chooses start then end to form an inclusive range. */
export default function AdminAttendanceReportsDateRangePicker({ startDate, endDate, onChange }: AdminAttendanceReportsDateRangePickerProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => fromDateKey(startDate) ?? new Date());
  const pendingStartRef = useRef<string | null>(null);
  const [focusedDate, setFocusedDate] = useState(() => startDate || toDateKey(new Date()));
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const monthLabel = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate), [locale, viewDate]);
  const weekdayLabels = useMemo(() => {
    const monday = new Date(2024, 0, 1); // Monday, used only to produce localized weekday labels.
    return Array.from({ length: 7 }, (_, index) => new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index)));
  }, [locale]);
  const calendarDays = useMemo(() => {
    const first = civilDate(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    return Array.from({ length: 42 }, (_, index) => civilDate(first.getFullYear(), first.getMonth(), 1 - offset + index));
  }, [viewDate]);
  const calendarWeeks = useMemo(() => Array.from({ length: 6 }, (_, week) => calendarDays.slice(week * 7, week * 7 + 7)), [calendarDays]);

  useEffect(() => {
    if (endDate || !startDate) pendingStartRef.current = null;
  }, [startDate, endDate]);

  useEffect(() => {
    if (!open) return;
    const focusDate = fromDateKey(startDate) ?? new Date();
    if (viewDate.getFullYear() !== focusDate.getFullYear() || viewDate.getMonth() !== focusDate.getMonth()) {
      setViewDate(civilDate(focusDate.getFullYear(), focusDate.getMonth(), 1));
      return;
    }
    const focusKey = toDateKey(focusDate);
    setFocusedDate(focusKey);
    const focusTarget = dialogRef.current?.querySelector<HTMLButtonElement>(`[data-testid="admin-attendance-reports-calendar-day-${focusKey}"]`)
      ?? dialogRef.current?.querySelector<HTMLButtonElement>('button[data-testid^="admin-attendance-reports-calendar-day-"]');
    focusTarget?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      } else if (event.key === 'Tab') {
        const buttons = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
        if (!buttons.length) return;
        if (event.shiftKey && document.activeElement === buttons[0]) {
          event.preventDefault();
          buttons[buttons.length - 1]?.focus();
        } else if (!event.shiftKey && document.activeElement === buttons[buttons.length - 1]) {
          event.preventDefault();
          buttons[0]?.focus();
        }
      }
    };
    const handleOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node) && !triggerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutside);
    return () => { document.removeEventListener('keydown', handleKeyDown); document.removeEventListener('mousedown', handleOutside); };
  }, [open, startDate, viewDate]);

  const chooseDay = (day: Date) => {
    const key = toDateKey(day);
    if (!supportedDate(day)) return;
    const activeStart = pendingStartRef.current ?? startDate;
    if (!activeStart || endDate || key < activeStart) {
      pendingStartRef.current = key;
      onChange(key, '');
      setViewDate(civilDate(day.getFullYear(), day.getMonth(), 1));
      return;
    }
    onChange(activeStart, key);
    pendingStartRef.current = null;
    setOpen(false);
    triggerRef.current?.focus();
  };
  const displayDate = (key: string) => {
    const date = fromDateKey(key);
    return date ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date) : '';
  };
  const triggerText = startDate && endDate ? `${displayDate(startDate)} – ${displayDate(endDate)}` : startDate ? `${displayDate(startDate)} – ${t('reports.admin_reports_main.selectEndDate')}` : t('reports.admin_reports_main.chooseDateRange');

  return (
    <div className="relative w-full" data-testid="admin-attendance-reports-date-range-picker">
      <button ref={triggerRef} type="button" className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-border bg-input px-3 py-2.5 text-left text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('reports.admin_reports_main.chooseDateRange')} aria-haspopup="dialog" aria-expanded={open} onClick={() => { pendingStartRef.current = null; setOpen((current) => !current); }} data-testid="admin-attendance-reports-date-range-trigger">
        <span>{triggerText}</span><CalendarDays size={18} aria-hidden="true" className="shrink-0 text-secondary" />
      </button>
      {open && <div ref={dialogRef} role="dialog" aria-label={t('reports.admin_reports_main.calendarDialogLabel')} className="absolute left-0 top-full z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-border bg-popover p-3 shadow-dialog" data-testid="admin-attendance-reports-date-range-calendar">
        <div className="mb-3 flex items-center justify-between gap-2">
          <button type="button" className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('reports.admin_reports_main.previousMonth')} disabled={!shiftMonth(viewDate, -1)} onClick={() => setViewDate((date) => shiftMonth(date, -1) ?? date)}><ChevronLeft size={18} aria-hidden="true" /></button>
          <h3 className="text-sm font-semibold text-primary" aria-live="polite">{monthLabel}</h3>
          <button type="button" className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('reports.admin_reports_main.nextMonth')} disabled={!shiftMonth(viewDate, 1)} onClick={() => setViewDate((date) => shiftMonth(date, 1) ?? date)}><ChevronRight size={18} aria-hidden="true" /></button>
        </div>
        <div role="grid" aria-label={monthLabel} className="space-y-1 overflow-x-auto">
          <div role="row" className="grid grid-cols-7 gap-1 min-w-84">
            {weekdayLabels.map((label, index) => <div key={`${label}-${index}`} role="columnheader" className="py-1 text-center text-xs font-medium text-secondary">{label}</div>)}
          </div>
          {calendarWeeks.map((week, weekIndex) => <div key={`week-${weekIndex}`} role="row" className="grid grid-cols-7 gap-1 min-w-84">
            {week.map((day) => {
              const key = toDateKey(day);
              const inMonth = day.getMonth() === viewDate.getMonth() && day.getFullYear() === viewDate.getFullYear();
              const inRange = Boolean(startDate && endDate && key >= startDate && key <= endDate);
              const selected = key === startDate || key === endDate;
              return <div key={key} role="gridcell" aria-selected={selected} className="min-w-11"><button type="button" tabIndex={key === focusedDate ? 0 : -1} aria-label={new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(day)} aria-pressed={selected} onFocus={() => setFocusedDate(key)} onKeyDown={(event) => {
                const offset = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' ? -7 : event.key === 'ArrowDown' ? 7 : 0;
                if (!offset) return;
                event.preventDefault();
                const next = civilDate(day.getFullYear(), day.getMonth(), day.getDate() + offset);
                if (!supportedDate(next)) return;
                const nextKey = toDateKey(next);
                setFocusedDate(nextKey);
                setViewDate(civilDate(next.getFullYear(), next.getMonth(), 1));
                window.requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLButtonElement>(`[data-testid="admin-attendance-reports-calendar-day-${nextKey}"]`)?.focus());
              }} onClick={() => chooseDay(day)} disabled={!supportedDate(day)} className={`min-h-11 min-w-11 w-full rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? 'bg-primary text-on-primary' : inRange ? 'bg-primary-subtle text-primary' : inMonth ? 'text-primary hover:bg-surface-hover' : 'text-disabled hover:bg-surface-hover'}`} data-testid={`admin-attendance-reports-calendar-day-${key}`}>{day.getDate()}</button></div>;
            })}
          </div>)}
        </div>
        <p className="mt-3 text-xs text-secondary" role="status">{startDate && !endDate ? t('reports.admin_reports_main.selectEndDate') : t('reports.admin_reports_main.customRangeHelp')}</p>
      </div>}
    </div>
  );
}
