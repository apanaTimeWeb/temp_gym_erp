'use client';

import React from 'react';
import { Search, SlidersHorizontal, Download } from 'lucide-react';
import type { Plan } from '../types/SuperadminGymsDirectoryTenantTypes';

export interface SuperadminGymsDirectoryTableToolbarProps {
  searchInput: string;
  handleSearchChange: (value: string) => void;
  statusParam: string;
  handleStatusChange: (status: string) => void;
  planParam: string;
  handlePlanChange: (plan: string) => void;
  plansMaster: Plan[];
  isColumnDropdownOpen: boolean;
  setIsColumnDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  columnDropdownRef: React.RefObject<HTMLDivElement | null>;
  visibleColumns: Record<string, boolean>;
  toggleColumn: (columnKey: string) => void;
  toggleableColumns: Array<{ key: string; label: string }>;
  handleExportCsv: () => void;
}

export function SuperadminGymsDirectoryTableToolbar({
  searchInput,
  handleSearchChange,
  statusParam,
  handleStatusChange,
  planParam,
  handlePlanChange,
  plansMaster,
  isColumnDropdownOpen,
  setIsColumnDropdownOpen,
  columnDropdownRef,
  visibleColumns,
  toggleColumn,
  toggleableColumns,
  handleExportCsv,
}: SuperadminGymsDirectoryTableToolbarProps) {
  return (
    <div className="p-3.5 border-b border-border dark:border-white/10 flex items-center justify-between gap-3 flex-wrap shrink-0 bg-card dark:bg-white/[0.02]">
      <div className="flex items-center gap-2.5 flex-1 w-full sm:w-auto min-w-0 max-w-2xl flex-wrap">
        {/* Search with debounce */}
        <div className="relative w-full sm:flex-1 sm:min-w-[200px]">
          <Search
            size={16}
            className="absolute start-3 top-1/2 -translate-y-1/2 text-disabled"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search gyms by name, owner, code, email, phone..."
            aria-label="Search gyms"
            className="h-9.5 min-h-9.5 w-full bg-input dark:bg-[#0F172A]/80 border border-border dark:border-white/10 text-primary rounded-lg ps-9 pe-3.5 py-1.5 text-xs sm:text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          />
        </div>

        {/* Status Dropdown */}
        <select
          aria-label="Filter by Status"
          value={statusParam}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="h-9.5 min-h-9.5 w-full sm:w-auto ps-3.5 pe-8.5 py-1.5 border border-border dark:border-white/10 rounded-lg text-xs sm:text-sm bg-input dark:bg-[#0F172A] dark:[color-scheme:dark] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="TRIAL">Trial</option>
          <option value="EXPIRED">Expired</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        {/* Plan Dropdown */}
        <select
          aria-label="Filter by Plan"
          value={planParam}
          onChange={(e) => handlePlanChange(e.target.value)}
          className="h-9.5 min-h-9.5 w-full sm:w-auto ps-3.5 pe-8.5 py-1.5 border border-border dark:border-white/10 rounded-lg text-xs sm:text-sm bg-input dark:bg-[#0F172A] dark:[color-scheme:dark] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        >
          <option value="All">All Plans</option>
          {plansMaster.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Toolbar Right: Column Visibility + Export CSV */}
      <div className="flex items-center gap-2">
        {/* Column Visibility Toggle */}
        <div className="relative" ref={columnDropdownRef}>
          <button
            type="button"
            onClick={() => setIsColumnDropdownOpen((prev) => !prev)}
            aria-label="Toggle column visibility"
            className="h-9.5 min-h-9.5 px-3 py-1.5 border border-border rounded-lg text-xs sm:text-sm text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex items-center gap-1.5 cursor-pointer"
          >
            <SlidersHorizontal size={15} />
            <span>Columns</span>
          </button>

          {isColumnDropdownOpen && (
            <div
              className="absolute end-0 top-full mt-1.5 w-60 bg-card border border-border rounded-xl shadow-2xl p-2 z-50 space-y-1"
            >
              <p className="text-xs font-semibold text-disabled px-2 py-1 uppercase tracking-wider">
                Show / Hide Columns
              </p>
              <div className="max-h-64 overflow-y-auto space-y-0.5">
                {toggleableColumns.map((col) => (
                  <label
                    key={col.key}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-secondary hover:bg-surface-hover hover:text-primary cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns[col.key]}
                      onChange={() => toggleColumn(col.key)}
                      className="rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span>{col.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Export CSV */}
        <button
          type="button"
          onClick={handleExportCsv}
          aria-label="Export Gyms CSV"
          className="flex h-9.5 min-h-9.5 items-center gap-1.5 px-3.5 py-1.5 border border-border rounded-lg text-xs sm:text-sm font-medium text-primary bg-input hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        >
          <Download size={15} />
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
}

export default SuperadminGymsDirectoryTableToolbar;
