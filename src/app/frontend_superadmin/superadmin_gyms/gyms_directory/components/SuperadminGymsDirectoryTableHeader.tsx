'use client';

import React from 'react';

export interface SuperadminGymsDirectoryTableHeaderProps {
  effectiveSortBy: string;
  effectiveSortOrder: 'asc' | 'desc';
  handleSort: (col: string) => void;
  renderSortIndicator: (col: string) => React.ReactNode;
  isColVisible: (col: string) => boolean;
  scrolledLeft: boolean;
  scrolledRight: boolean;
}

export function SuperadminGymsDirectoryTableHeader({
  effectiveSortBy,
  effectiveSortOrder,
  handleSort,
  renderSortIndicator,
  isColVisible,
  scrolledLeft,
  scrolledRight,
}: SuperadminGymsDirectoryTableHeaderProps) {
  return (
    <thead
      className="sticky top-0 z-20 bg-primary-subtle border-b border-border shadow-xs text-xs font-semibold uppercase tracking-wider"
      style={{ backgroundColor: 'var(--table-header-bg)', color: 'var(--table-header-text)' }}
    >
      <tr>
        <th
          scope="col"
          aria-sort={
            effectiveSortBy === 'gymName' || effectiveSortBy === 'name'
              ? effectiveSortOrder === 'asc'
                ? 'ascending'
                : 'descending'
              : 'none'
          }
          className={`sticky-header-corner-left z-30 p-3.5 text-center w-[260px] min-w-[250px] max-w-[270px] border-b border-e border-border transition-shadow whitespace-nowrap ${
            scrolledLeft
              ? 'shadow-[4px_0_12px_-2px_rgba(0,0,0,0.18)] dark:shadow-[4px_0_12px_-2px_rgba(0,0,0,0.5)]'
              : ''
          }`}
        >
          <button
            type="button"
            onClick={() => handleSort('gymName')}
            aria-label="Sort gyms by name"
            className="inline-flex items-center justify-center gap-1.5 mx-auto hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded cursor-pointer"
          >
            <span>Gym Name</span>
            {renderSortIndicator('gymName')}
          </button>
        </th>
        {isColVisible('owner') && (
          <th
            scope="col"
            aria-sort={
              effectiveSortBy === 'ownerName' || effectiveSortBy === 'owner'
                ? effectiveSortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
            className="sticky-header-cell z-20 p-3.5 text-start w-[210px] min-w-[200px] border-b border-border whitespace-nowrap hidden md:table-cell"
          >
            <button
              type="button"
              onClick={() => handleSort('ownerName')}
              aria-label="Sort gyms by owner name"
              className="inline-flex items-center gap-1.5 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded cursor-pointer"
            >
              <span>Owner</span>
              {renderSortIndicator('ownerName')}
            </button>
          </th>
        )}
        {isColVisible('plan') && (
          <th scope="col" className="sticky-header-cell z-20 p-3.5 text-start w-[110px] min-w-[110px] border-b border-border whitespace-nowrap hidden md:table-cell">
            Plan
          </th>
        )}
        {isColVisible('status') && (
          <th scope="col" className="sticky-header-cell z-20 p-3.5 text-start w-[130px] min-w-[125px] border-b border-border whitespace-nowrap">
            Status
          </th>
        )}
        {isColVisible('members') && (
          <th
            scope="col"
            aria-sort={effectiveSortBy === 'memberCount' ? (effectiveSortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
            className="sticky-header-cell z-20 p-3.5 text-end w-[110px] min-w-[105px] border-b border-border whitespace-nowrap hidden md:table-cell"
          >
            <button
              type="button"
              onClick={() => handleSort('memberCount')}
              aria-label="Sort gyms by member count"
              className="inline-flex items-center justify-end gap-1.5 ms-auto hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded cursor-pointer"
            >
              <span>Members</span>
              {renderSortIndicator('memberCount')}
            </button>
          </th>
        )}
        {isColVisible('mrr') && (
          <th
            scope="col"
            aria-sort={effectiveSortBy === 'monthlyRevenue' ? (effectiveSortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
            className="sticky-header-cell z-20 p-3.5 text-end w-[120px] min-w-[115px] border-b border-border whitespace-nowrap hidden md:table-cell"
          >
            <button
              type="button"
              onClick={() => handleSort('monthlyRevenue')}
              aria-label="Sort gyms by monthly revenue"
              className="inline-flex items-center justify-end gap-1.5 ms-auto hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded cursor-pointer"
            >
              <span>MRR</span>
              {renderSortIndicator('monthlyRevenue')}
            </button>
          </th>
        )}
        {isColVisible('expiry') && (
          <th
            scope="col"
            aria-sort={effectiveSortBy === 'planExpiresAt' ? (effectiveSortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
            className="sticky-header-cell z-20 p-3.5 text-start w-[180px] min-w-[175px] border-b border-border whitespace-nowrap hidden md:table-cell"
          >
            <button
              type="button"
              onClick={() => handleSort('planExpiresAt')}
              aria-label="Sort gyms by expiry date"
              className="inline-flex items-center gap-1.5 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded cursor-pointer"
            >
              <span>Expiry Date</span>
              {renderSortIndicator('planExpiresAt')}
            </button>
          </th>
        )}
        {isColVisible('planActivatedAt') && (
          <th scope="col" className="sticky-header-cell z-20 p-3.5 text-start w-[150px] min-w-[150px] border-b border-border whitespace-nowrap hidden md:table-cell">
            Activated On
          </th>
        )}
        {isColVisible('lastStatusChange') && (
          <th
            scope="col"
            aria-sort={effectiveSortBy === 'lastActiveAt' ? (effectiveSortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
            className="sticky-header-cell z-20 p-3.5 text-start w-[190px] min-w-[190px] border-b border-border whitespace-nowrap hidden md:table-cell"
          >
            <button
              type="button"
              onClick={() => handleSort('lastActiveAt')}
              aria-label="Sort gyms by last active date"
              className="inline-flex items-center gap-1.5 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded cursor-pointer"
            >
              <span>Last Active</span>
              {renderSortIndicator('lastActiveAt')}
            </button>
          </th>
        )}
        {isColVisible('separateSubscription') && (
          <th scope="col" className="sticky-header-cell z-20 p-3.5 text-start w-[130px] min-w-[130px] border-b border-border whitespace-nowrap hidden md:table-cell">
            Subscription
          </th>
        )}
        {isColVisible('separateAccess') && (
          <th scope="col" className="sticky-header-cell z-20 p-3.5 text-start w-[120px] min-w-[120px] border-b border-border whitespace-nowrap hidden md:table-cell">
            Access
          </th>
        )}
        <th
          scope="col"
          className={`sticky-header-corner-right z-30 p-3.5 text-center w-[140px] min-w-[140px] max-w-[140px] border-b border-s border-border transition-shadow whitespace-nowrap ${
            scrolledRight
              ? 'shadow-[-4px_0_12px_-2px_rgba(0,0,0,0.18)] dark:shadow-[-4px_0_12px_-2px_rgba(0,0,0,0.5)]'
              : ''
          }`}
        >
          Actions
        </th>
      </tr>
    </thead>
  );
}

export default SuperadminGymsDirectoryTableHeader;
