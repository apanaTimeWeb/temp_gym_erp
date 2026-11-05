"use client";
// RESPONSIBILITY: Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: Admin module UI → local UI state / feature hooks → approved global infrastructure or module-owned APIs.

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ADMIN_MEMBERS_ROUTES } from '@/app/frontend_admin/admin_members/members_directory/config/admin_members_directory.url_config';
import { useAdminMembersHeaderSearch } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryHeaderSearch';

/**
 * AdminMembersDirectoryHeaderSearch renders the admin members header search UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersDirectoryHeaderSearch: Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
 * @dependencies Consumes admin_members_url_config, useAdminMembersHeaderSearch.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminMembersDirectoryHeaderSearch() {
  const t = useTranslations();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  // RATIONALE: Required by architecture to sync state/lifecycle based on dependencies.
// EFFECT: Synchronizes this component effect with its declared React dependencies in members/admin_members_components/admin_members_header_search/AdminMembersHeaderSearch.tsx.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) { setShowSearch(false); setActiveOptionIndex(-1); }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { data: searchResults = [] } = useAdminMembersHeaderSearch(searchQuery);

  return (
    <div className="relative hidden md:block" ref={searchRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-secondary"  strokeWidth={2}/>
      </div>
      <input
        type="text"
        placeholder={t('members.admin_members_header_search.text_c698311c9b')}
        className="w-56 pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary placeholder:text-secondary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
        value={searchQuery}
        onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); setActiveOptionIndex(-1); }}
        onFocus={() => setShowSearch(true)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setShowSearch(true);
            setActiveOptionIndex((current) => searchResults.length ? (current + 1) % searchResults.length : -1);
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setShowSearch(true);
            setActiveOptionIndex((current) => searchResults.length ? (current <= 0 ? searchResults.length - 1 : current - 1) : -1);
          } else if (event.key === 'Escape') {
            setShowSearch(false);
            setActiveOptionIndex(-1);
          } else if (event.key === 'Enter' && showSearch && activeOptionIndex >= 0 && searchResults[activeOptionIndex]) {
            event.preventDefault();
            router.push(ADMIN_MEMBERS_ROUTES.detail(searchResults[activeOptionIndex].id));
            setSearchQuery('');
            setShowSearch(false);
            setActiveOptionIndex(-1);
          }
        }}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={Boolean(showSearch && searchQuery)}
        aria-controls={showSearch && searchQuery ? 'admin-members-global-search-results' : undefined}
        aria-activedescendant={showSearch && activeOptionIndex >= 0 ? `admin-members-global-search-option-${activeOptionIndex}` : undefined}
        aria-label={t('members.admin_members_header_search.text_84abda0656')}
       data-testid="admin_members-admin_members-header-search-search"/>
      {showSearch && searchQuery && (
        <div id="admin-members-global-search-results" role="listbox" aria-label={t('members.admin_members_header_search.text_84abda0656')} className="absolute top-full mt-2 w-72 bg-popover border border-border rounded-xl shadow-popover z-30 overflow-hidden">
          <div className="flex justify-between items-center px-3 py-2 border-b border-border">
            <p className="text-xs text-secondary uppercase font-bold tracking-wider">
              {searchResults.length > 0 ? t('members.admin_members_header_search.resultsCount', { count: searchResults.length }) : t('members.admin_members_header_search.auto_6fee0f145a')}
            </p>
            <button type="button" onClick={() => { setSearchQuery(''); setShowSearch(false); setActiveOptionIndex(-1); }} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" aria-label={t('members.admin_members_header_search.text_67300d0fed')} data-testid="admin_members-admin_members-header-search-search-2">
              <X size={18}  strokeWidth={2}/>
            </button>
          </div>
          {searchResults.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-secondary">{t('members.admin_members_header_search.text_1333fd5129')}{searchQuery}{t('members.admin_members_header_search.text_e2bbf209ae')}</div>
          ) : (
            <>
              {searchResults.map((m , __testIdIndex65) => (
                <Link
                  id={`admin-members-global-search-option-${__testIdIndex65}`}
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  role="option"
                  aria-selected={activeOptionIndex === __testIdIndex65}
                  onMouseEnter={() => setActiveOptionIndex(__testIdIndex65)}
                  key={m.id}
                  href={ADMIN_MEMBERS_ROUTES.detail(m.id)}
                  onClick={() => { setSearchQuery(''); setShowSearch(false); setActiveOptionIndex(-1); }}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-input motion-safe:transition-colors border-b border-border last:border-0 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                 data-testid={`admin_members-admin_members-header-search-search-3-map65-${__testIdIndex65}-1`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-primary truncate">{m.name}</p>
                      <p className="text-xs text-secondary truncate">{m.branchName}</p>
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href={ADMIN_MEMBERS_ROUTES.root}
                onClick={() => { setSearchQuery(''); setShowSearch(false); setActiveOptionIndex(-1); }}
                className="block px-3 py-2.5 text-center text-xs font-bold text-primary hover:bg-input motion-safe:transition-colors border-t border-border motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
               data-testid="admin_members-admin_members-header-search-search-4">
                {t('members.admin_members_header_search.text_bf33f2c023')}</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
