'use client';

import React from 'react';
import type { Tenant } from '../types/SuperadminGymsDirectoryTenantTypes';
import { SuperadminGymsDirectoryConfirmDialog as ConfirmDialog } from './tenant/SuperadminGymsDirectoryConfirmDialog';
import { SuperadminGymsDirectoryTenantHistoryDrawer as TenantHistoryDrawer } from './tenant/SuperadminGymsDirectoryTenantHistoryDrawer';
import { SuperadminGymsDirectoryTenantEditModal as TenantEditModal } from './tenant/SuperadminGymsDirectoryTenantEditModal';

export interface SuperadminGymsDirectoryTableModalsProps {
  selectedTenantForDrawer: Tenant | null;
  isDrawerOpen: boolean;
  drawerTab: 'overview' | 'subscription' | 'history';
  onCloseDrawer: () => void;
  selectedTenantForEdit: Tenant | null;
  isEditModalOpen: boolean;
  onCloseEditModal: () => void;
  onSuccessEditModal: () => void;
  confirmStatusTenant: Tenant | null;
  targetStatus: 'ACTIVE' | 'INACTIVE';
  onCloseStatusDialog: () => void;
  onConfirmStatusDialog: (data: { reason: string; note: string }) => void | Promise<void>;
  isStatusLoading: boolean;
  confirmDeleteTenant: Tenant | null;
  onCloseDeleteDialog: () => void;
  onConfirmDeleteDialog: (data: { reason: string; note: string }) => void | Promise<void>;
  isDeleteLoading: boolean;
}

export function SuperadminGymsDirectoryTableModals({
  selectedTenantForDrawer,
  isDrawerOpen,
  drawerTab,
  onCloseDrawer,
  selectedTenantForEdit,
  isEditModalOpen,
  onCloseEditModal,
  onSuccessEditModal,
  confirmStatusTenant,
  targetStatus,
  onCloseStatusDialog,
  onConfirmStatusDialog,
  isStatusLoading,
  confirmDeleteTenant,
  onCloseDeleteDialog,
  onConfirmDeleteDialog,
  isDeleteLoading,
}: SuperadminGymsDirectoryTableModalsProps) {
  return (
    <>
      {selectedTenantForDrawer && (
        <TenantHistoryDrawer
          isOpen={isDrawerOpen}
          tenant={selectedTenantForDrawer}
          initialTab={drawerTab}
          onClose={onCloseDrawer}
        />
      )}
      {selectedTenantForEdit && (
        <TenantEditModal
          isOpen={isEditModalOpen}
          tenant={selectedTenantForEdit}
          onClose={onCloseEditModal}
          onSuccess={onSuccessEditModal}
        />
      )}
      {confirmStatusTenant && (
        <ConfirmDialog
          isOpen={Boolean(confirmStatusTenant)}
          title={targetStatus === 'ACTIVE' ? 'Activate Gym Account' : 'Deactivate Gym Account'}
          description={
            targetStatus === 'ACTIVE'
              ? `Restore active system access and member privileges for "${confirmStatusTenant.gymName}".`
              : `Revoke administrative access and freeze active operations for "${confirmStatusTenant.gymName}".`
          }
          confirmLabel={targetStatus === 'ACTIVE' ? 'Activate Gym' : 'Deactivate Gym'}
          isDanger={targetStatus === 'INACTIVE'}
          requireReason={true}
          onConfirm={onConfirmStatusDialog}
          onClose={onCloseStatusDialog}
          isLoading={isStatusLoading}
        />
      )}
      {confirmDeleteTenant && (
        <ConfirmDialog
          isOpen={Boolean(confirmDeleteTenant)}
          title="Permanently Delete Gym"
          description={`You are about to permanently delete "${confirmDeleteTenant.gymName}". All tenant database partitions, user data, and history will be archived.`}
          confirmLabel="Permanently Delete"
          isDanger={true}
          requireReason={true}
          confirmationMatchText={confirmDeleteTenant.gymName}
          confirmationPrompt={`Type "${confirmDeleteTenant.gymName}" to confirm permanent deletion:`}
          onConfirm={onConfirmDeleteDialog}
          onClose={onCloseDeleteDialog}
          isLoading={isDeleteLoading}
        />
      )}
    </>
  );
}

export default SuperadminGymsDirectoryTableModals;
