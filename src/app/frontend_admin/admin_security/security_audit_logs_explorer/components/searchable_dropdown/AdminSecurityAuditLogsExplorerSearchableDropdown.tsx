"use client";
// RESPONSIBILITY: Renders an accessible searchable popover selector for Admin feature filters and entity selectors.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/searchable_dropdown/AdminNavigationLayoutSearchableDropdown.tsx)

import { useTranslations } from 'next-intl';
import React, { useEffect, useId, useRef, useState } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import type { AdminSearchableDropdownOption, AdminSearchableDropdownProps } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerSearchableDropdownTypes';

/**
 * AdminNavigationLayoutSearchableDropdown renders the admin searchable dropdown UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export const AdminNavigationLayoutSearchableDropdown: React.FC<AdminSearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  ariaLabel,
  className = '',
  disabled = false,
  testId,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const accessibleName = ariaLabel?.trim() || placeholder?.trim() || t('admin_layout.components/searchable_dropdown.text_5616c87222');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.trim().toLowerCase()));

// EFFECT: Synchronizes this component effect with its declared React dependencies in admin_navigation/components/components/searchable_dropdown/AdminNavigationLayoutSearchableDropdown.tsx.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

// EFFECT: Synchronizes this component effect with its declared React dependencies in admin_navigation/components/components/searchable_dropdown/AdminNavigationLayoutSearchableDropdown.tsx.
  useEffect(() => {
    if (activeIndex >= filteredOptions.length) setActiveIndex(Math.max(0, filteredOptions.length - 1));
  }, [activeIndex, filteredOptions.length]);

  useEffect(() => {
    if (disabled) { setIsOpen(false); setSearchTerm(''); setActiveIndex(0); }
  }, [disabled]);

  useEffect(() => {
    if (!isOpen || disabled) return;
    listboxRef.current?.querySelector<HTMLElement>(`[id="${listboxId}-option-${activeIndex}"]`)?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex, disabled, filteredOptions.length, isOpen, listboxId]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) { setIsOpen(false); setSearchTerm(''); setActiveIndex(0); triggerRef.current?.focus(); }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
    setActiveIndex(0);
    triggerRef.current?.focus();
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95 motion-safe:transition-all motion-safe:duration-base ease-in-out w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2.5 flex items-center justify-between text-left ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        onClick={() => { if (!disabled) { setIsOpen((open) => !open); setSearchTerm(''); setActiveIndex(Math.max(0, filteredOptions.findIndex((option) => option.value === value))); } }}
        aria-label={accessibleName}
        aria-haspopup="listbox"
        aria-expanded={isOpen && !disabled}
        aria-controls={isOpen && !disabled ? listboxId : undefined}
        disabled={disabled}
       data-testid={testId}>
        <span className={`text-sm ${!selectedOption ? 'text-secondary' : 'text-primary'} truncate`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-30 w-full mt-1 bg-popover border border-border rounded-lg shadow-popover overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-base">
          <div className="p-2 border-b border-border relative">
            <span className="absolute inset-y-0 left-4 flex items-center"><Search size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/></span>
            <label htmlFor={`${listboxId}-search`} className="sr-only">{t('admin_layout.components/searchable_dropdown.text_5616c87222')}</label>
            <input
              id={`${listboxId}-search`}
              type="text"
              role="combobox"
              aria-label={accessibleName}
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls={listboxId}
              aria-activedescendant={filteredOptions[activeIndex] ? `${listboxId}-option-${activeIndex}` : undefined}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, Math.max(0, filteredOptions.length - 1))); }
                else if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(0, index - 1)); }
                else if (event.key === 'Home') { event.preventDefault(); setActiveIndex(0); }
                else if (event.key === 'End') { event.preventDefault(); setActiveIndex(Math.max(0, filteredOptions.length - 1)); }
                else if (event.key === 'Enter') { event.preventDefault(); const option = filteredOptions[activeIndex]; if (option) handleSelect(option.value); }
              }}
              className="w-full min-h-11 pl-8 pr-4 py-1.5 text-sm bg-input border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary placeholder:text-secondary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              placeholder={t('admin_layout.components/searchable_dropdown.text_6d7a30a931')}
              data-testid={testId ? `${testId}-search` : undefined}
              value={searchTerm}
              onChange={(event) => { setSearchTerm(event.target.value); setActiveIndex(0); }}
              autoFocus
            />
          </div>

          <div ref={listboxRef} id={listboxId} className="max-h-60 overflow-y-auto p-1 custom-scrollbar" role="listbox" aria-label={accessibleName} data-testid="admin_navigation-admin-searchable-dropdown-search-3">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option: AdminSearchableDropdownOption , __testIdIndex95) => (
                <div
                  key={option.value}
                  id={`${listboxId}-option-${__testIdIndex95}`}
                  onMouseEnter={() => setActiveIndex(__testIdIndex95)}
                  className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95 motion-safe:transition-all motion-safe:duration-base ease-in-out w-full min-h-11 flex items-center justify-between px-3 py-2 text-sm rounded-md text-left cursor-pointer hover:bg-surface-hover ${option.value === value ? 'text-primary font-medium' : 'text-primary'} ${__testIdIndex95 === activeIndex ? 'bg-surface-hover' : ''}`}
                  onClick={() => handleSelect(option.value)}
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  role="option"
                  aria-selected={option.value === value}
                 data-testid={`admin_navigation-admin-searchable-dropdown-search-4-map95-${__testIdIndex95}-1`}>
                  <span className="truncate">{option.label}</span>
                  {option.value === value && <Check size={18} className="text-primary" aria-hidden="true"  strokeWidth={2}/>}
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-secondary" role="status" data-testid="admin_navigation-admin-searchable-dropdown-search-5">
                {t('admin_layout.components/searchable_dropdown.text_658e79f9dc')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
