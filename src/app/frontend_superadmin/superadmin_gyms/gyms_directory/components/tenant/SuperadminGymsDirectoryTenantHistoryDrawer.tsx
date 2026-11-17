'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  History,
  Building2,
  CreditCard,
  User,
  Mail,
  Phone,
  Shield,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  KeyRound,
  FileEdit,
  Trash2,
  Calendar,
} from 'lucide-react';
import { useTenantEvents, usePlans } from '../../services/tenantService';
import { StatusBadge } from './SuperadminGymsDirectoryStatusBadge';
import { PlanBadge } from './SuperadminGymsDirectoryPlanBadge';
import { DaysLeftBadge } from './SuperadminGymsDirectoryDaysLeftBadge';
import { ErrorState } from './SuperadminGymsDirectoryErrorState';
import { EmptyState } from './SuperadminGymsDirectoryEmptyState';
import CopyButton from '@/components/ui/CopyButton';
import {
  getMrr,
  formatIstDate,
  formatIstFullDateTime,
  formatCurrency,
  maskEmail,
} from '../../utils/tenant';
import type { Tenant, TenantEvent } from '../../types/tenant';

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
  const {
    data: events = [],
    isLoading: eventsLoading,
    isError: eventsError,
    refetch: refetchEvents,
  } = useTenantEvents(tenant.id, selectedEventType);

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

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'ACCESS_CHANGE':
      case 'STATUS_CHANGE':
        return <Shield size={14} className="text-warning" />;
      case 'PLAN_CHANGE':
        return <Layers size={14} className="text-info" />;
      case 'PROVISIONED':
        return <CheckCircle2 size={14} className="text-success" />;
      case 'PASSWORD_RESET':
        return <KeyRound size={14} className="text-warning" />;
      case 'EXPIRY_CHANGE':
        return <Calendar size={14} className="text-purple-text" />;
      case 'DELETED':
        return <Trash2 size={14} className="text-danger" />;
      default:
        return <FileEdit size={14} className="text-secondary" />;
    }
  };

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
              className={`min-h-11 px-4 py-2 text-sm font-semibold border-b-2 flex items-center gap-2 motion-safe:transition-colors cursor-pointer ${activeTab === 'overview'
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
              className={`min-h-11 px-4 py-2 text-sm font-semibold border-b-2 flex items-center gap-2 motion-safe:transition-colors cursor-pointer ${activeTab === 'subscription'
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
              className={`min-h-11 px-4 py-2 text-sm font-semibold border-b-2 flex items-center gap-2 motion-safe:transition-colors cursor-pointer ${activeTab === 'history'
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
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 motion-safe:animate-fade-in">
                <div className="bg-page border border-border rounded-xl p-4 space-y-3">
                  <h3 className="text-xs font-bold text-disabled uppercase tracking-wider">
                    Basic Facility Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-secondary text-xs block">Gym Name</span>
                      <span className="font-semibold text-primary">{tenant.gymName}</span>
                    </div>
                    <div>
                      <span className="text-secondary text-xs block">Facility Code</span>
                      <span className="font-mono font-semibold text-primary">{tenant.code}</span>
                    </div>
                    <div>
                      <span className="text-secondary text-xs block">Location</span>
                      <span className="text-primary">
                        {tenant.city ? `${tenant.city}, ${tenant.state || 'India'}` : 'Not provided'}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary text-xs block">GST Number</span>
                      <span className="font-mono text-primary">{tenant.gstNumber || 'Unregistered'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-page border border-border rounded-xl p-4 space-y-3">
                  <h3 className="text-xs font-bold text-disabled uppercase tracking-wider">
                    Administrative Contact
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <User size={16} className="text-secondary" />
                      <div>
                        <span className="text-xs text-secondary block">Owner / Signatory</span>
                        <span className="font-medium text-primary">{tenant.ownerName}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-secondary" />
                      <div>
                        <span className="text-xs text-secondary block">Official Email</span>
                        <span className="font-medium text-primary">{tenant.ownerEmail}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-secondary" />
                      <div>
                        <span className="text-xs text-secondary block">Contact Number</span>
                        <span className="font-medium text-primary">{tenant.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-page border border-border rounded-xl p-4 space-y-3">
                  <h3 className="text-xs font-bold text-disabled uppercase tracking-wider">
                    Capacity & Timestamps
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-secondary text-xs block">Member Enrolled / Limit</span>
                      <span className="font-bold text-primary">
                        {tenant.memberCount} / {currentPlan?.memberLimit || '—'}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary text-xs block">Onboarding Date</span>
                      <span className="text-primary" title={formatIstFullDateTime(tenant.createdAt)}>
                        {formatIstDate(tenant.createdAt)}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary text-xs block">Last Status Change</span>
                      <span
                        className="text-primary"
                        title={formatIstFullDateTime(tenant.lastStatusChangedAt)}
                      >
                        {formatIstDate(tenant.lastStatusChangedAt)}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary text-xs block">Changed By</span>
                      <span className="text-primary">{tenant.lastStatusChangedBy}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SUBSCRIPTION TAB */}
            {activeTab === 'subscription' && (
              <div className="space-y-6 motion-safe:animate-fade-in">
                {/* Active Plan Card */}
                <div className="bg-page border border-border rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-secondary uppercase">
                        Current Plan
                      </span>
                      <div className="mt-1 flex items-center gap-2">
                        <PlanBadge planIdOrName={tenant.planId} />
                        <span className="text-lg font-bold text-primary">
                          {currentPlan?.name || tenant.planId}
                        </span>
                      </div>
                    </div>
                    <div className="text-end">
                      <span className="text-xs font-semibold text-secondary uppercase">
                        Plan Price
                      </span>
                      <p className="text-lg font-extrabold text-primary">
                        {currentPlan ? `${formatCurrency(currentPlan.price)}/mo` : '—'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border text-sm">
                    <div>
                      <span className="text-secondary text-xs block">Subscription State</span>
                      <div className="mt-1">
                        <StatusBadge type="subscription" status={tenant.subscriptionState} />
                      </div>
                    </div>
                    <div>
                      <span className="text-secondary text-xs block">Access Status</span>
                      <div className="mt-1">
                        <StatusBadge type="access" status={tenant.accessStatus} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* MRR & Financial Summary */}
                <div className="bg-page border border-border rounded-xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-disabled uppercase tracking-wider">
                    Revenue & Renewal Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-secondary text-xs block">Recognized MRR</span>
                      <span className="text-xl font-bold text-success">{formatCurrency(mrr)}</span>
                      <p className="text-[11px] text-disabled mt-0.5">
                        {tenant.accessStatus === 'INACTIVE'
                          ? 'Zeroed (Access is Inactive)'
                          : ['TRIAL', 'EXPIRED', 'CANCELLED'].includes(tenant.subscriptionState)
                            ? `Zeroed (${tenant.subscriptionState})`
                            : 'Active billing contribution'}
                      </p>
                    </div>
                    <div>
                      <span className="text-secondary text-xs block">Member Capacity</span>
                      <span className="text-xl font-bold text-primary">
                        {tenant.memberCount}
                        <span className="text-sm font-normal text-secondary">
                          {' '}
                          / {currentPlan?.memberLimit || 0}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border text-sm">
                    <div>
                      <span className="text-secondary text-xs block">Activated On</span>
                      <span
                        className="font-medium text-primary"
                        title={formatIstFullDateTime(tenant.planActivatedAt)}
                      >
                        {formatIstDate(tenant.planActivatedAt)}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary text-xs block">Expires On</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="font-medium text-primary"
                          title={formatIstFullDateTime(tenant.planExpiresAt)}
                        >
                          {formatIstDate(tenant.planExpiresAt)}
                        </span>
                        <DaysLeftBadge expiryDateStr={tenant.planExpiresAt} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. HISTORY TIMELINE TAB */}
            {activeTab === 'history' && (
              <div className="space-y-4 motion-safe:animate-fade-in">
                {/* Event Type Filter */}
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
                    <Filter size={14} />
                    <span>Filter Timeline</span>
                  </div>
                  <select
                    value={selectedEventType}
                    onChange={(e) => setSelectedEventType(e.target.value)}
                    className="min-h-11 text-xs bg-page border border-border rounded-lg ps-3 pe-8.5 py-1.5 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                  >
                    <option value="All">All Events</option>
                    <option value="ACCESS_CHANGE">Access Status Changes</option>
                    <option value="STATUS_CHANGE">Subscription State Changes</option>
                    <option value="PLAN_CHANGE">Plan Upgrades/Downgrades</option>
                    <option value="EXPIRY_CHANGE">Expiry Adjustments</option>
                    <option value="PASSWORD_RESET">Password Resets</option>
                    <option value="PROVISIONED">Provisioning</option>
                    <option value="DETAILS_UPDATED">Details Updated</option>
                  </select>
                </div>

                {/* Timeline Content */}
                {eventsLoading && (
                  <div className="space-y-4 py-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-skeleton-base animate-pulse shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-skeleton-base rounded w-1/3 animate-pulse" />
                          <div className="h-3 bg-skeleton-base rounded w-2/3 animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {eventsError && (
                  <ErrorState
                    title="Failed to load history"
                    message="Unable to fetch audit events for this gym."
                    onRetry={() => void refetchEvents()}
                  />
                )}

                {!eventsLoading && !eventsError && events.length === 0 && (
                  <EmptyState
                    title="No events recorded"
                    description={
                      selectedEventType !== 'All'
                        ? 'No events match the selected event type filter.'
                        : 'No lifecycle changes recorded for this tenant yet.'
                    }
                    onClearFilters={
                      selectedEventType !== 'All' ? () => setSelectedEventType('All') : undefined
                    }
                    actionText="Show all events"
                  />
                )}

                {!eventsLoading && !eventsError && events.length > 0 && (
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border">
                    {events.map((evt: TenantEvent) => (
                      <div key={evt.id} className="relative group">
                        {/* Node marker */}
                        <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center shadow-xs">
                          {getEventIcon(evt.eventType)}
                        </div>

                        {/* Content box */}
                        <div className="bg-page border border-border rounded-xl p-4 text-xs space-y-2 hover:border-border-focus motion-safe:transition-colors">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-primary uppercase tracking-wider text-[11px]">
                              {evt.eventType.replace(/_/g, ' ')}
                            </span>
                            <span
                              className="text-disabled font-mono text-[11px]"
                              title={formatIstFullDateTime(evt.createdAt)}
                            >
                              {formatIstFullDateTime(evt.createdAt)}
                            </span>
                          </div>

                          {/* Value change preview */}
                          {evt.fromValue && (
                            <div className="flex items-center gap-2 p-2 bg-card rounded-md font-mono text-xs">
                              <span className="text-secondary line-through">{evt.fromValue}</span>
                              <ArrowRight size={12} className="text-disabled shrink-0" />
                              <span className="text-primary font-bold">{evt.toValue}</span>
                            </div>
                          )}

                          {evt.reason && (
                            <p className="text-primary font-medium">
                              <strong className="text-secondary font-semibold">Reason:</strong>{' '}
                              {evt.reason}
                            </p>
                          )}

                          {evt.note && <p className="text-secondary italic">{evt.note}</p>}

                          <div className="pt-2 border-t border-border flex items-center justify-between text-disabled text-[11px]">
                            <span>Actor: {evt.actorName}</span>
                            <span className="font-mono">ID: {evt.id.slice(0, 10)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
