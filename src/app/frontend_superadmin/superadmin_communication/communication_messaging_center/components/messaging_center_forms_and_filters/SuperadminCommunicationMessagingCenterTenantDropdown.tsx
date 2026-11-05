// RESPONSIBILITY: Renders Superadmin Communication Messaging Center Tenant Dropdown using its declared props and feature-local hooks.
'use client';


import { useEffect, useRef, useState } from 'react';

import { Search, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminCommunicationMessagingTenantDropdownProps } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center_tenant_dropdown.types';
import type { KeyboardEvent } from 'react';

/**
 * @description Renders the Superadmin messaging tenant dropdown interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export function SuperadminCommunicationMessagingCenterTenantDropdown({ value, onChange, tenants }: SuperadminCommunicationMessagingTenantDropdownProps) {
  const t = useTranslations('superadmin_communication_messaging');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = tenants.find((tenant) => tenant.id === value);
  const filtered = tenants.filter((tenant) => tenant.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function closeAndRestoreFocus() {
    setOpen(false);
    setQuery('');
    triggerRef.current?.focus();
  }
  function handleSelect(id: string) {
    onChange(id);
    closeAndRestoreFocus();
  }
  function handleKeyboard(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      if (open) { event.preventDefault(); event.stopPropagation(); closeAndRestoreFocus(); }
      return;
    }
    if (!open || filtered.length === 0) return;
    const currentIndex = optionRefs.current.findIndex((option) => option === document.activeElement);
    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown') nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % filtered.length;
    if (event.key === 'ArrowUp') nextIndex = currentIndex < 0 ? filtered.length - 1 : (currentIndex - 1 + filtered.length) % filtered.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = filtered.length - 1;
    if (nextIndex !== null) {
      event.preventDefault();
      optionRefs.current[nextIndex]?.focus();
    }
  }

  return (<div ref={ref} className="relative" onKeyDown={handleKeyboard}>
    <button id="superadmin_communication_messaging-tenant-trigger" ref={triggerRef} type="button" onClick={() => setOpen((current) => !current)} aria-haspopup="listbox" aria-expanded={open} aria-controls="superadmin_communication_messaging-tenant-listbox" className="min-h-11 w-full flex items-center justify-between px-3 py-2 bg-floating border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:active:scale-95" data-testid="superadmin_communication_messaging-superadmin-messaging-tenant-dropdown-messaging-tenant-dropdown-select">
      <span className={selected ? 'text-primary' : 'text-secondary'}>{selected ? `${selected.name} — ${selected.plan}` : t('ui.select_tenant_9946c98')}</span>
      <ChevronDown size={18} className="text-secondary shrink-0" strokeWidth={2}/>
    </button>
    {open && <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-popover">
      <div className="p-2 border-b border-border"><div className="relative">
        <label htmlFor="superadmin_communication_messaging-tenant-search" className="sr-only">{t('ui.search_tenants')}</label>
        <Search size={18} className="absolute start-2.5 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/>
        <input ref={searchRef} id="superadmin_communication_messaging-tenant-search" type="text" autoFocus placeholder={t('ui.search_tenants')} value={query} onChange={(event) => setQuery(event.target.value)} className="min-h-11 w-full ps-8 pe-3 py-1.5 bg-input border border-border rounded-md text-sm text-primary focus:outline-none focus:border-focus focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out" data-testid="superadmin_communication_messaging-superadmin-messaging-tenant-dropdown-messaging-tenant-dropdown-filter"/>
      </div></div>
      <div id="superadmin_communication_messaging-tenant-listbox" role="listbox" aria-label={t('ui.tenant_recipients_8634318')} className="max-h-48 overflow-y-auto" data-testid="superadmin_communication_messaging-superadmin-messaging-tenant-dropdown-tenant-dropdown-action-1">
        {filtered.length === 0 && <div className="px-3 py-2 text-sm text-secondary">{t('ui.no_tenants_found_b97e94e')}</div>}
        {filtered.map((tenant, index) => <button ref={(node) => { optionRefs.current[index] = node; }} key={tenant.id} type="button" role="option" aria-selected={tenant.id === value} tabIndex={index === 0 ? 0 : -1} onClick={() => handleSelect(tenant.id)} className={`min-h-11 block w-full px-3 py-2 text-start text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${tenant.id === value ? 'bg-primary-subtle text-primary' : 'text-primary hover:bg-surface-hover'} motion-safe:active:scale-95`} data-testid={`superadmin_communication_messaging-messaging-messaging-tenant-dropdown-action2-${index}`}>
          {tenant.name} {t('ui.text_26aeabd0')}{tenant.plan}
        </button>)}
      </div>
    </div>}
  </div>);
}
