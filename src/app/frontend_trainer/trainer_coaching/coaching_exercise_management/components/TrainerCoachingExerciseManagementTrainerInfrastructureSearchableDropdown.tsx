// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Renders a clean opaque popover dropdown for filter and record selectors with keyboard navigation and zero overlap/bleed-through.
import { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TrainerInfrastructureSearchableDropdownProps } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementTrainerInfrastructureSearchableDropdownProps';

/**
 * @description Renders an accessible, solid-background selection dropdown without an embedded filter search box.
 */
export default function TrainerInfrastructureSearchableDropdown({
  options,
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  ariaLabel,
  ariaInvalid = false,
  ariaDescribedBy,
  testId,
  id,
}: TrainerInfrastructureSearchableDropdownProps) {
  const t = useTranslations('TRAINER_INFRASTRUCTURE');
  const resolvedPlaceholder = placeholder ?? t('TEXT_SELECT_AN_OPTION');
  const [isOpen, setIsOpen] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = `trainer-infrastructure-searchable-dropdown-${useId().replace(/:/g, '')}`;
  const resolvedTestId = testId ?? 'trainer-infrastructure-searchable-dropdown-trigger';

  const selectedOption = options.find((opt) => opt.value === value);
  const effectiveOpen = isOpen && !disabled;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveOptionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
    setActiveOptionIndex(-1);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.key === 'Escape') {
      if (isOpen) {
        event.preventDefault();
        setIsOpen(false);
        setActiveOptionIndex(-1);
      }
      return;
    }
    if (!isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      setIsOpen(true);
      const selectedIdx = options.findIndex((o) => o.value === value);
      setActiveOptionIndex(selectedIdx >= 0 ? selectedIdx : 0);
      return;
    }
    if (!isOpen) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveOptionIndex((index) => (options.length ? Math.min(index + 1, options.length - 1) : -1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveOptionIndex((index) => (options.length ? Math.max(index <= 0 ? 0 : index - 1, 0) : -1));
    } else if (event.key === 'Home' && options.length) {
      event.preventDefault();
      setActiveOptionIndex(0);
    } else if (event.key === 'End' && options.length) {
      event.preventDefault();
      setActiveOptionIndex(options.length - 1);
    } else if (event.key === 'Enter' && options.length && activeOptionIndex >= 0) {
      event.preventDefault();
      handleSelect(options[Math.max(0, Math.min(activeOptionIndex, options.length - 1))]!.value);
    }
  };

  const hasWidthClass = /(?:^|\s)w-/.test(className);
  return (
    <div className={`relative ${effectiveOpen ? 'z-[75]' : 'z-10'} ${hasWidthClass ? '' : 'w-full'} ${className}`.trim()} ref={dropdownRef}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={effectiveOpen}
        aria-controls={listboxId}
        disabled={disabled}
        aria-label={selectedOption ? (ariaLabel ? `${ariaLabel}: ${selectedOption.label}` : selectedOption.label) : (ariaLabel ?? resolvedPlaceholder)}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        aria-activedescendant={effectiveOpen && activeOptionIndex >= 0 && activeOptionIndex < options.length ? `${listboxId}-option-${activeOptionIndex}` : undefined}
        className={`w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2.5 flex items-center justify-between gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors motion-safe:duration-base`}
        onClick={() => { if (!disabled) { setIsOpen((current) => !current); setActiveOptionIndex(-1); } }}
        onKeyDown={handleTriggerKeyDown}
        data-testid={resolvedTestId}>
        <span className={`text-sm ${!selectedOption ? 'text-secondary' : 'text-text-primary'} truncate`}>
          {selectedOption ? selectedOption.label : resolvedPlaceholder}
        </span>
        <ChevronDown size={18} className={`text-secondary shrink-0 motion-safe:transition-transform ${effectiveOpen ? 'rotate-180' : ''}`} strokeWidth={2} />
      </button>

      {effectiveOpen && (
        <div className="absolute left-0 right-0 z-[80] w-full min-w-[180px] mt-1.5 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-xl shadow-[0_18px_44px_rgba(15,23,42,0.22)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
          <div id={listboxId} role="listbox" aria-label={ariaLabel ?? t('TEXT_SEARCH_OPTIONS')} className="max-h-60 overflow-y-auto p-1.5 space-y-0.5 bg-white dark:bg-[#0F172A] custom-scrollbar" data-testid={listboxId}>
            {options.length > 0 ? (
              options.map((option, index) => (
                <button
                  id={`${listboxId}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  key={option.value}
                  tabIndex={-1}
                  className={`flex min-h-10 w-full items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/90 motion-safe:transition-colors ${
                    option.value === value ? 'bg-orange-500/10 text-orange-600 dark:text-orange-300 font-semibold' : 'text-slate-800 dark:text-slate-100'
                  } ${activeOptionIndex === index ? 'bg-slate-100 dark:bg-slate-800' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`}
                  onMouseEnter={() => setActiveOptionIndex(index)}
                  onClick={() => handleSelect(option.value)}
                  data-testid={`${testId ?? listboxId}-option-${String(option.value).replace(/[^A-Za-z0-9]+/g, '_').toLowerCase()}`}>
                  <span className="truncate text-start">{option.label}</span>
                  {option.value === value && <Check size={16} className="text-orange-500 shrink-0" aria-hidden="true" strokeWidth={2.2} />}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-secondary">{t('TEXT_NO_RESULTS_FOUND')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
