// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Renders a custom searchable popover dropdown for large datasets (Rule 20). Replaces native select controls for all gyms/plans/user selectors.
import { useState, useRef, useEffect, useId } from 'react';

import { Search, ChevronDown, Check } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { TrainerInfrastructureSearchableDropdownProps } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressTrainerInfrastructureSearchableDropdownProps';









/**
 * @description Renders a custom searchable popover dropdown for large datasets (Rule 20). Replaces native select controls for all gyms/plans/user selectors.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Provides a zero-business searchable selection primitive with keyboard navigation and auto-close behavior.
 * @dependencies Global design primitives and caller-supplied labels/options.
 * @edge-case Selection must remain touch accessible and close after a committed choice.
 */
/**
 * @description Renders an accessible selection control for the infrastructure feature while keeping option values and business labels module-owned.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxId = `trainer-infrastructure-searchable-dropdown-${useId().replace(/:/g, '')}`;
  const resolvedTestId = testId ?? 'trainer-infrastructure-searchable-dropdown-trigger';

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (!disabled) return;
    setIsOpen(false);
    setSearchTerm('');
    setActiveOptionIndex(-1);
  }, [disabled]);

  const filteredOptions = options.filter((opt) =>
    opt.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

// Effect contract: synchronize the open popover with outside-click/keyboard dismissal and preserve selection focus.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setActiveOptionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
    setActiveOptionIndex(-1);
    triggerRef.current?.focus();
  };

  return (
    <div className={`relative w-full ${className} `} ref={dropdownRef}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        disabled={disabled}
        aria-label={ariaLabel ?? resolvedPlaceholder}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className={`w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95`}
        onClick={() => { if (!disabled) { setIsOpen((current) => !current); setActiveOptionIndex(-1); } }}
       data-testid={resolvedTestId}>
        <span className={`text-sm ${!selectedOption ? 'text-secondary' : 'text-primary'} truncate `}>
          {selectedOption ? selectedOption.label : resolvedPlaceholder}
        </span>
        <ChevronDown size={18} className="text-secondary "  strokeWidth={2}/>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-30 w-full mt-1 bg-popover border border-border rounded-lg shadow-card overflow-hidden motion-safe:transition-opacity motion-safe:duration-fast">
          <div className="p-2 border-b border-border relative ">
            <Search size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-secondary " aria-hidden="true" strokeWidth={2}/>
            <input
              ref={searchInputRef}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={isOpen}
              aria-controls={listboxId}
              aria-activedescendant={activeOptionIndex >= 0 && activeOptionIndex < filteredOptions.length ? `${listboxId}-option-${activeOptionIndex}` : undefined}
              className="w-full min-h-11 ps-8 pe-4 py-1.5 text-sm bg-input border border-border rounded-md focus-visible:outline-none focus-visible:border-focus text-primary placeholder:text-secondary motion-safe:transition-colors motion-safe:duration-base"
              aria-label={t("TEXT_SEARCH_OPTIONS")}
              placeholder={t("TEXT_SEARCH")}
              value={searchTerm}
              onChange={(event) => { setSearchTerm(event.target.value); setActiveOptionIndex(0); }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') { event.preventDefault(); setIsOpen(false); setSearchTerm(''); setActiveOptionIndex(-1); triggerRef.current?.focus(); }
                else if (event.key === 'ArrowDown') { event.preventDefault(); setActiveOptionIndex((index) => filteredOptions.length ? Math.min(index + 1, filteredOptions.length - 1) : -1); }
                else if (event.key === 'ArrowUp') { event.preventDefault(); setActiveOptionIndex((index) => filteredOptions.length ? Math.max(index <= 0 ? 0 : index - 1, 0) : -1); }
                else if (event.key === 'Home' && filteredOptions.length) { event.preventDefault(); setActiveOptionIndex(0); }
                else if (event.key === 'End' && filteredOptions.length) { event.preventDefault(); setActiveOptionIndex(filteredOptions.length - 1); }
                else if (event.key === 'Enter' && filteredOptions.length) { event.preventDefault(); handleSelect(filteredOptions[Math.max(0, Math.min(activeOptionIndex, filteredOptions.length - 1))]!.value); }
              }}
              autoFocus
              data-testid="trainer_infrastructure-trainerinfrastructuresearchabledropdown-input_2"/>
          </div>

          <div id={listboxId} role="listbox" aria-label={t("TEXT_SEARCH_OPTIONS")} className="max-h-60 overflow-y-auto p-1 custom-scrollbar" data-testid={listboxId}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  id={`${listboxId}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  key={option.value}
                  tabIndex={-1}
                  className={`flex min-h-11 w-full items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-input motion-safe:transition-colors motion-safe:duration-base ${
                    option.value === value ? 'text-primary font-medium' : 'text-primary'
                  } ${activeOptionIndex === index ? 'bg-primary-subtle' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
                  onMouseEnter={() => setActiveOptionIndex(index)}
                  onClick={() => handleSelect(option.value)}
                  data-testid={`${testId ?? listboxId}-option-${String(option.value).replace(/[^A-Za-z0-9]+/g, '_').toLowerCase()}`}>
                  <span className="truncate ">{option.label}</span>
                  {option.value === value && <Check size={18} className="text-primary " aria-hidden="true" strokeWidth={2}/>}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-secondary ">{t("TEXT_NO_RESULTS_FOUND")}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

