'use client';

import React from 'react';
import {
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
import { useTenantEvents } from '../../services/SuperadminGymsDirectoryTenantService';
import { ErrorState } from './SuperadminGymsDirectoryErrorState';
import { EmptyState } from './SuperadminGymsDirectoryEmptyState';
import { formatIstFullDateTime } from '../../utils/SuperadminGymsDirectoryTenantUtils';
import type { TenantEvent } from '../../types/SuperadminGymsDirectoryTenantTypes';

export interface SuperadminGymsDirectoryTenantTimelineTabProps {
  tenantId: string;
  selectedEventType: string;
  setSelectedEventType: (type: string) => void;
}

export function SuperadminGymsDirectoryTenantTimelineTab({
  tenantId,
  selectedEventType,
  setSelectedEventType,
}: SuperadminGymsDirectoryTenantTimelineTabProps) {
  const {
    data: events = [],
    isLoading: eventsLoading,
    isError: eventsError,
    refetch: refetchEvents,
  } = useTenantEvents(tenantId, selectedEventType);

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
  );
}

export default SuperadminGymsDirectoryTenantTimelineTab;
