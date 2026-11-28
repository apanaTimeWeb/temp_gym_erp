'use client';

import React from 'react';
import CopyButton from '@/components/ui/CopyButton';
import { SuperadminGymsDirectoryStatusBadge as StatusBadge } from './tenant/SuperadminGymsDirectoryStatusBadge';
import { SuperadminGymsDirectoryPlanBadge as PlanBadge } from './tenant/SuperadminGymsDirectoryPlanBadge';
import { SuperadminGymsDirectoryDaysLeftBadge as DaysLeftBadge } from './tenant/SuperadminGymsDirectoryDaysLeftBadge';
import {
  getMrr,
  formatIstDate,
  formatIstFullDateTime,
  formatCurrency,
  maskEmail,
} from '../utils/SuperadminGymsDirectoryTenantUtils';
import { PLANS_MASTER, findPlan } from '../constants/SuperadminGymsDirectoryPlans';
import { SuperadminGymsDirectoryTableRowActions } from './SuperadminGymsDirectoryTableRowActions';
import type { Tenant } from '../types/SuperadminGymsDirectoryTenantTypes';

export interface SuperadminGymsDirectoryTableRowProps {
  gym: Tenant;
  scrolledLeft: boolean;
  scrolledRight: boolean;
  isKebabActive: boolean;
  openUpwards: boolean;
  kebabRef: React.RefObject<HTMLDivElement | null>;
  isColVisible: (colKey: string) => boolean;
  handleRowClickAction: (gym: Tenant) => void;
  handleStatusButtonClick: (e: React.MouseEvent, gym: Tenant) => void;
  handleOpenEditModal: (e: React.MouseEvent, gym: Tenant) => void;
  handleOpenHistoryAction: (e: React.MouseEvent, gym: Tenant) => void;
  handleLoginAs: (e: React.MouseEvent, gym: Tenant) => void;
  handleDeleteClick: (e: React.MouseEvent, gym: Tenant) => void;
  setActiveKebabId: React.Dispatch<React.SetStateAction<string | null>>;
  activeKebabId: string | null;
}

export function SuperadminGymsDirectoryTableRow({
  gym,
  scrolledLeft,
  scrolledRight,
  isKebabActive,
  openUpwards,
  kebabRef,
  isColVisible,
  handleRowClickAction,
  handleStatusButtonClick,
  handleOpenEditModal,
  handleOpenHistoryAction,
  handleLoginAs,
  handleDeleteClick,
  setActiveKebabId,
  activeKebabId,
}: SuperadminGymsDirectoryTableRowProps) {
  const planIdentifier =
    gym.planId || (gym as unknown as { plan?: string }).plan || 'basic';
  const planObj = findPlan(planIdentifier) || PLANS_MASTER.find((p) => p.id === 'basic');
  const mrrAmount = getMrr(gym, PLANS_MASTER);
  const gymDisplayName =
    gym.gymName || (gym as unknown as { name?: string }).name || 'Unnamed Gym';
  const ownerDisplayName = gym.ownerName || '—';
  const adminEmailVal =
    gym.ownerEmail || (gym as unknown as { adminEmail?: string }).adminEmail || '';
  const maskedEmailVal = maskEmail(adminEmailVal);

  return (
    <tr
      tabIndex={0}
      aria-label={`Gym row: ${gymDisplayName}`}
      onClick={() => handleRowClickAction(gym)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRowClickAction(gym);
        }
      }}
      className={`gym-row motion-safe:transition-colors cursor-pointer group focus-visible:outline-none ${
        isKebabActive ? 'relative z-40' : ''
      }`}
    >
      {/* 1. Gym Name (Sticky Start, responsive width, Center-aligned) */}
      <td
        className={`sticky-left-cell z-10 p-3 sm:p-3.5 text-center border-b border-e border-border dark:border-white/10 w-44 sm:w-[240px] md:w-[260px] min-w-[168px] sm:min-w-[240px] max-w-[270px] bg-card dark:bg-[#0E1525] transition-shadow ${
          scrolledLeft
            ? 'shadow-[4px_0_12px_-2px_rgba(0,0,0,0.18)] dark:shadow-[4px_0_12px_-2px_rgba(0,0,0,0.5)]'
            : ''
        }`}
      >
        <p className="font-bold text-primary truncate" title={gymDisplayName}>
          {gymDisplayName}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-0.5 text-xs text-disabled">
          <span className="font-mono">{gym.code || gym.id}</span>
          <CopyButton
            value={gym.code || gym.id}
            label={`Copy gym code ${gym.code || gym.id}`}
            data-testid="table-copy-code"
          />
        </div>
      </td>

      {/* 2. Owner (width 210px) */}
      {isColVisible('owner') && (
        <td className="p-3.5 border-b border-border w-[210px] min-w-[200px] hidden md:table-cell">
          <p className="text-primary font-medium truncate" title={ownerDisplayName}>
            {ownerDisplayName}
          </p>
          <p className="text-xs text-disabled truncate mt-0.5" title={maskedEmailVal}>
            {maskedEmailVal}
          </p>
        </td>
      )}

      {/* 3. Plan (width 110px) */}
      {isColVisible('plan') && (
        <td className="p-3.5 border-b border-border w-[110px] min-w-[110px] hidden md:table-cell">
          <PlanBadge planIdOrName={planIdentifier} />
        </td>
      )}

      {/* 4. Status (Single Merged Badge, width 130px) */}
      {isColVisible('status') && (
        <td className="p-3.5 border-b border-border w-[130px] min-w-[125px]">
          {gym.accessStatus === 'INACTIVE' ? (
            <StatusBadge type="access" status="INACTIVE" />
          ) : (
            <StatusBadge
              type="subscription"
              status={gym.subscriptionState || (gym as unknown as { status?: string }).status || 'ACTIVE'}
            />
          )}
        </td>
      )}

      {/* 5. Members (Right-aligned, width 110px) */}
      {isColVisible('members') && (
        <td className="p-3.5 border-b border-border text-end w-[110px] min-w-[105px] font-mono tabular-nums hidden md:table-cell">
          <span className="font-semibold text-primary">{gym.memberCount ?? 0}</span>
          <span className="text-disabled text-xs"> / {planObj?.memberLimit ?? '∞'}</span>
        </td>
      )}

      {/* 6. MRR (Right-aligned, width 120px) */}
      {isColVisible('mrr') && (
        <td className="p-3.5 border-b border-border text-end w-[120px] min-w-[115px] font-mono tabular-nums text-success font-semibold hidden md:table-cell">
          {formatCurrency(mrrAmount)}
        </td>
      )}

      {/* 7. Expiry (Stacked Date + DaysLeft badge, width 180px) */}
      {isColVisible('expiry') && (
        <td className="p-3.5 border-b border-border w-[180px] min-w-[175px] hidden md:table-cell">
          <div className="flex flex-col items-start gap-1">
            <span
              className="text-secondary text-xs whitespace-nowrap"
              title={formatIstFullDateTime(gym.planExpiresAt)}
            >
              {formatIstDate(gym.planExpiresAt)}
            </span>
            <DaysLeftBadge expiryDateStr={gym.planExpiresAt} />
          </div>
        </td>
      )}

      {/* Optional Column: Plan Activated On */}
      {isColVisible('planActivatedAt') && (
        <td className="p-3.5 border-b border-border w-[150px] min-w-[150px] whitespace-nowrap hidden md:table-cell">
          <span className="text-secondary text-xs" title={formatIstFullDateTime(gym.planActivatedAt)}>
            {formatIstDate(gym.planActivatedAt)}
          </span>
        </td>
      )}

      {/* Optional Column: Last Status Change */}
      {isColVisible('lastStatusChange') && (
        <td className="p-3.5 border-b border-border w-[190px] min-w-[190px] whitespace-nowrap text-xs text-secondary hidden md:table-cell">
          <span title={formatIstFullDateTime(gym.lastStatusChangedAt)}>
            {formatIstDate(gym.lastStatusChangedAt)}
          </span>
          <span className="text-disabled block text-[11px] truncate max-w-[160px]">
            by {gym.lastStatusChangedBy}
          </span>
        </td>
      )}

      {/* Optional Column: Separate Subscription */}
      {isColVisible('separateSubscription') && (
        <td className="p-3.5 border-b border-border w-[130px] min-w-[130px] hidden md:table-cell">
          <StatusBadge
            type="subscription"
            status={gym.subscriptionState || (gym as unknown as { status?: string }).status || 'ACTIVE'}
          />
        </td>
      )}

      {/* Optional Column: Separate Access */}
      {isColVisible('separateAccess') && (
        <td className="p-3.5 border-b border-border w-[120px] min-w-[120px] hidden md:table-cell">
          <StatusBadge type="access" status={gym.accessStatus || 'ACTIVE'} />
        </td>
      )}

      {/* 8. Actions (Sticky End, width 140px, centered with generous padding) */}
      <SuperadminGymsDirectoryTableRowActions
        gym={gym}
        scrolledRight={scrolledRight}
        isKebabActive={isKebabActive}
        openUpwards={openUpwards}
        kebabRef={kebabRef}
        handleStatusButtonClick={handleStatusButtonClick}
        handleOpenEditModal={handleOpenEditModal}
        handleOpenHistoryAction={handleOpenHistoryAction}
        handleLoginAs={handleLoginAs}
        handleDeleteClick={handleDeleteClick}
        setActiveKebabId={setActiveKebabId}
        activeKebabId={activeKebabId}
      />
    </tr>
  );
}

export default SuperadminGymsDirectoryTableRow;
