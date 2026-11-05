'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

export interface ManagerSearchableDropdownOption {
  value: string;
  label: string;
  [key: string]: any;
}

export interface ManagerSearchableDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: ManagerSearchableDropdownOption[];
  placeholder?: string;
  ariaLabel?: string;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  dataTestId?: string;
  'data-testid'?: string;
  disabled?: boolean;
  className?: string;
}

export default function ManagerSearchableDropdown({
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  ariaLabel,
  ariaInvalid,
  ariaDescribedBy,
  dataTestId,
  'data-testid': testIdProp,
  disabled = false,
  className = '',
}: ManagerSearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

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

  const effectiveTestId = dataTestId || testIdProp;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} data-testid={effectiveTestId}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || (selectedOption ? selectedOption.label : placeholder)}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className="flex min-h-11 w-full items-center justify-between rounded-xl border border-border bg-input px-3.5 py-2.5 text-left text-sm text-primary transition-all hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
      >
        <span className={selectedOption ? 'font-medium text-primary' : 'text-secondary'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={16} className={`shrink-0 text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {options.length > 5 && (
            <div className="border-b border-border p-2">
              <div className="flex items-center gap-2 rounded-lg bg-input px-2.5 py-1.5 text-xs text-secondary">
                <Search size={14} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search options..."
                  className="w-full bg-transparent text-primary outline-none placeholder:text-secondary"
                  autoFocus
                />
              </div>
            </div>
          )}
          <ul role="listbox" className="max-h-48 overflow-y-auto p-1 text-sm">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-xs text-secondary">No options found</li>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange?.(opt.value);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${
                      isSelected
                        ? 'bg-primary text-on-primary font-medium'
                        : 'text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={14} className="shrink-0" />}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

