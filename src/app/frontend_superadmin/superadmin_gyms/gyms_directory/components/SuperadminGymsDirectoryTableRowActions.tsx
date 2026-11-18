'use client';

import React from 'react';
import { Power, Pencil, MoreVertical, History, LogIn, Trash2 } from 'lucide-react';
import type { Tenant } from '../types/SuperadminGymsDirectoryTenantTypes';

export interface SuperadminGymsDirectoryTableRowActionsProps {
  gym: Tenant;
  scrolledRight: boolean;
  isKebabActive: boolean;
  openUpwards: boolean;
  kebabRef: React.RefObject<HTMLDivElement | null>;
  handleStatusButtonClick: (e: React.MouseEvent, gym: Tenant) => void;
  handleOpenEditModal: (e: React.MouseEvent, gym: Tenant) => void;
  handleOpenHistoryAction: (e: React.MouseEvent, gym: Tenant) => void;
  handleLoginAs: (e: React.MouseEvent, gym: Tenant) => void;
  handleDeleteClick: (e: React.MouseEvent, gym: Tenant) => void;
  setActiveKebabId: React.Dispatch<React.SetStateAction<string | null>>;
  activeKebabId: string | null;
}

export function SuperadminGymsDirectoryTableRowActions({
  gym,
  scrolledRight,
  isKebabActive,
  openUpwards,
  kebabRef,
  handleStatusButtonClick,
  handleOpenEditModal,
  handleOpenHistoryAction,
  handleLoginAs,
  handleDeleteClick,
  setActiveKebabId,
  activeKebabId,
}: SuperadminGymsDirectoryTableRowActionsProps) {
  const gymDisplayName =
    gym.gymName || (gym as unknown as { name?: string }).name || 'Unnamed Gym';
  const isReactivation =
    gym.accessStatus === 'INACTIVE' &&
    gym.subscriptionState !== 'CANCELLED' &&
    gym.subscriptionState !== 'EXPIRED';

  return (
    <td
      className={`sticky-right-cell ${
        isKebabActive ? '!z-40' : 'z-10'
      } p-3.5 text-center w-[140px] min-w-[140px] max-w-[140px] border-b border-s border-border transition-shadow ${
        scrolledRight
          ? 'shadow-[-4px_0_12px_-2px_rgba(0,0,0,0.18)] dark:shadow-[-4px_0_12px_-2px_rgba(0,0,0,0.5)]'
          : ''
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        {/* Activate/Deactivate Toggle Button */}
        {gym.accessStatus === 'ACTIVE' ? (
          <button
            type="button"
            onClick={(e) => handleStatusButtonClick(e, gym)}
            aria-label={`Deactivate ${gymDisplayName}`}
            title={`Deactivate ${gymDisplayName}`}
            className="h-8 w-8 min-h-8 min-w-8 p-1.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 border border-red-500/30 rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer flex items-center justify-center shrink-0"
          >
            <Power size={14} />
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => handleStatusButtonClick(e, gym)}
            aria-label={isReactivation ? `Reactivate ${gymDisplayName}` : `Activate ${gymDisplayName}`}
            title={isReactivation ? `Reactivate ${gymDisplayName}` : `Activate ${gymDisplayName}`}
            className="h-8 w-8 min-h-8 min-w-8 p-1.5 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/30 rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer flex items-center justify-center shrink-0"
          >
            <Power size={14} />
          </button>
        )}

        {/* Edit Button */}
        <button
          type="button"
          onClick={(e) => handleOpenEditModal(e, gym)}
          aria-label={`Edit ${gymDisplayName}`}
          title={`Edit ${gymDisplayName}`}
          className="h-8 w-8 min-h-8 min-w-8 p-1.5 text-secondary hover:text-primary hover:bg-surface-hover border border-border/80 rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer flex items-center justify-center shrink-0"
        >
          <Pencil size={14} />
        </button>

        {/* Kebab Menu (...) with History, Login-As, Delete */}
        <div ref={activeKebabId === gym.id ? kebabRef : undefined} className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveKebabId((prev) => (prev === gym.id ? null : gym.id));
            }}
            aria-label={`More actions for ${gymDisplayName}`}
            aria-expanded={activeKebabId === gym.id}
            title="More actions"
            className="h-8 w-8 min-h-8 min-w-8 p-1.5 text-secondary hover:text-primary hover:bg-surface-hover border border-border/80 rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer flex items-center justify-center shrink-0"
          >
            <MoreVertical size={14} className="pointer-events-none" />
          </button>

          {activeKebabId === gym.id && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute end-0 ${
                openUpwards ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
              } w-48 bg-card border border-border rounded-xl shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95`}
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveKebabId(null);
                  handleOpenHistoryAction(e, gym);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-secondary hover:text-primary hover:bg-surface-hover rounded-lg cursor-pointer"
              >
                <History size={14} className="text-secondary" />
                <span>Audit History</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveKebabId(null);
                  handleLoginAs(e, gym);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-secondary hover:text-primary hover:bg-surface-hover rounded-lg cursor-pointer"
              >
                <LogIn size={14} className="text-secondary" />
                <span>Login as Admin</span>
              </button>

              <div className="my-1 border-t border-border" />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveKebabId(null);
                  handleDeleteClick(e, gym);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete Gym</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </td>
  );
}

export default SuperadminGymsDirectoryTableRowActions;
