'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

export interface SearchableDropdownOption<T extends string | number = string> {
  label: string;
  value: T;
  description?: string;
  disabled?: boolean;
  badge?: string;
}

export type SearchableDropdownProps<T extends string | number = string> = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  options: readonly SearchableDropdownOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
  'aria-describedby'?: string;
  'data-testid'?: string;
  className?: string;
};

export function SearchableDropdown<T extends string | number = string>({
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
  'data-testid': testId,
  className = '',
  ...rest
}: SearchableDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    } else if (!isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  const handleSelect = (opt: SearchableDropdownOption<T>) => {
    if (opt.disabled) return;
    onChange(opt.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block w-full min-w-36 text-start ${className}`}
      data-testid={testId}
      {...rest}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className={`flex min-h-10 w-full items-center justify-between gap-2 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary motion-safe:transition-colors hover:border-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <span className={`truncate ${selectedOption ? 'text-primary font-medium' : 'text-secondary'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-secondary motion-safe:transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel || placeholder}
          className="absolute start-0 top-full z-50 mt-1 max-h-60 w-full min-w-44 overflow-hidden rounded-xl border border-border bg-card shadow-lg motion-safe:animate-in motion-safe:fade-in-50 motion-safe:zoom-in-95"
        >
          {options.length > 5 && (
            <div className="border-b border-border p-2">
              <div className="relative">
                <Search size={14} className="absolute start-2.5 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-md border border-border bg-input py-1.5 pe-3 ps-8 text-xs text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
            </div>
          )}

          <div className="max-h-48 overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-xs text-secondary">No options found</div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <div
                    key={String(opt.value)}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt)}
                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs motion-safe:transition-colors ${
                      opt.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-surface-hover'
                    } ${isSelected ? 'bg-primary-subtle font-semibold text-primary' : 'text-primary'}`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check size={14} className="shrink-0 text-primary" aria-hidden="true" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchableDropdown;

