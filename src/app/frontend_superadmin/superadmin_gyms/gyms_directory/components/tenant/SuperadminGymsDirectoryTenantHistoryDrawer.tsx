'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, History, Building2, CreditCard } from 'lucide-react';
import { usePlans } from '../../services/SuperadminGymsDirectoryTenantService';
import CopyButton from '@/components/ui/CopyButton';
import { getMrr, maskEmail } from '../../utils/SuperadminGymsDirectoryTenantUtils';
import { SuperadminGymsDirectoryTenantOverviewTab } from './SuperadminGymsDirectoryTenantOverviewTab';
import { SuperadminGymsDirectoryTenantSubscriptionTab } from './SuperadminGymsDirectoryTenantSubscriptionTab';
import { SuperadminGymsDirectoryTenantTimelineTab } from './SuperadminGymsDirectoryTenantTimelineTab';
import type { Tenant } from '../../types/SuperadminGymsDirectoryTenantTypes';

export interface SuperadminGymsDirectoryTenantHistoryDrawerProps {
  isOpen: boolean;
  tenant: Tenant | null;
  initialTab?: 'overview' | 'subscription' | 'history';
  onClose: () => void;
}

export type TenantHistoryDrawerProps = SuperadminGymsDirectoryTenantHistoryDrawerProps;

function TenantHistoryDrawerContent({
  tenant,
  initialTab = 'history',
  onClose,
}: {
  tenant: Tenant;
  initialTab?: 'overview' | 'subscription' | 'history';
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'subscription' | 'history'>(initialTab);
  const [selectedEventType, setSelectedEventType] = useState<string>('All');
  const drawerRef = useRef<HTMLDivElement>(null);
  const { data: plans = [] } = usePlans();

  // Esc key & Focus Trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const currentPlan = plans.find(
    (p) => p.id === tenant.planId || p.name.toLowerCase() === tenant.planId.toLowerCase()
  );
  const mrr = getMrr(tenant, plans);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-overlay-backdrop backdrop-blur-xs motion-safe:animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-tenant-title"
      ref={drawerRef}
    >
      <div className="absolute inset-y-0 end-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-card border-s border-border shadow-dialog flex flex-col motion-safe:animate-in motion-safe:slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-6 border-b border-border bg-page flex items-start justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-disabled bg-card px-2 py-0.5 rounded border border-border">
                  {tenant.code || tenant.id}
                </span>
                <CopyButton
                  value={tenant.code || tenant.id}
                  label="Copy gym code"
                  data-testid="drawer-copy-code"
                />
              </div>
              <h2
                id="drawer-tenant-title"
                className="text-xl font-bold text-primary mt-1 line-clamp-1"
                title={tenant.gymName}
              >
                {tenant.gymName}
              </h2>
              <p className="text-xs text-secondary mt-0.5">
                Owner: {tenant.ownerName} • {maskEmail(tenant.ownerEmail)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="min-h-11 min-w-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-border bg-card px-6 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`min-h-11 px-4 py-2 text-sm font-semibold border-b-2 flex items-center gap-2 motion-safe:transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-focus text-primary'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              <Building2 size={16} />
              <span>Overview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('subscription')}
              className={`min-h-11 px-4 py-2 text-sm font-semibold border-b-2 flex items-center gap-2 motion-safe:transition-colors cursor-pointer ${
                activeTab === 'subscription'
                  ? 'border-focus text-primary'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              <CreditCard size={16} />
              <span>Subscription</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`min-h-11 px-4 py-2 text-sm font-semibold border-b-2 flex items-center gap-2 motion-safe:transition-colors cursor-pointer ${
                activeTab === 'history'
                  ? 'border-focus text-primary'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              <History size={16} />
              <span>History</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === 'overview' && (
              <SuperadminGymsDirectoryTenantOverviewTab
                tenant={tenant}
                currentPlan={currentPlan}
              />
            )}
            {activeTab === 'subscription' && (
              <SuperadminGymsDirectoryTenantSubscriptionTab
                tenant={tenant}
                currentPlan={currentPlan}
                mrr={mrr}
              />
            )}
            {activeTab === 'history' && (
              <SuperadminGymsDirectoryTenantTimelineTab
                tenantId={tenant.id}
                selectedEventType={selectedEventType}
                setSelectedEventType={setSelectedEventType}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SuperadminGymsDirectoryTenantHistoryDrawer({
  isOpen,
  tenant,
  initialTab = 'history',
  onClose,
}: SuperadminGymsDirectoryTenantHistoryDrawerProps) {
  if (!isOpen || !tenant) return null;
  return (
    <TenantHistoryDrawerContent
      key={`${tenant.id}-${initialTab}`}
      tenant={tenant}
      initialTab={initialTab}
      onClose={onClose}
    />
  );
}

export const TenantHistoryDrawer = SuperadminGymsDirectoryTenantHistoryDrawer;
export default SuperadminGymsDirectoryTenantHistoryDrawer;
