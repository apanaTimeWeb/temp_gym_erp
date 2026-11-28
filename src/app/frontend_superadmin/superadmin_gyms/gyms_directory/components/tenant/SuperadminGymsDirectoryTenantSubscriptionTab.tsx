'use client';

import React from 'react';
import { StatusBadge } from './SuperadminGymsDirectoryStatusBadge';
import { PlanBadge } from './SuperadminGymsDirectoryPlanBadge';
import { DaysLeftBadge } from './SuperadminGymsDirectoryDaysLeftBadge';
import {
  formatIstDate,
  formatIstFullDateTime,
  formatCurrency,
} from '../../utils/SuperadminGymsDirectoryTenantUtils';
import type { Tenant, Plan } from '../../types/SuperadminGymsDirectoryTenantTypes';

export interface SuperadminGymsDirectoryTenantSubscriptionTabProps {
  tenant: Tenant;
  currentPlan?: Plan;
  mrr: number;
}

export function SuperadminGymsDirectoryTenantSubscriptionTab({
  tenant,
  currentPlan,
  mrr,
}: SuperadminGymsDirectoryTenantSubscriptionTabProps) {
  return (
    <div className="space-y-6 motion-safe:animate-fade-in">
      {/* Active Plan Card */}
      <div className="bg-page border border-border rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-secondary uppercase">Current Plan</span>
            <div className="mt-1 flex items-center gap-2">
              <PlanBadge planIdOrName={tenant.planId} />
              <span className="text-lg font-bold text-primary">
                {currentPlan?.name || tenant.planId}
              </span>
            </div>
          </div>
          <div className="text-end">
            <span className="text-xs font-semibold text-secondary uppercase">Plan Price</span>
            <p className="text-lg font-extrabold text-primary">
              {currentPlan ? `${formatCurrency(currentPlan.price)}/mo` : '—'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border dark:border-white/10 text-sm">
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
      <div className="bg-page dark:bg-[#0E1525] border border-border dark:border-white/10 rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-disabled uppercase tracking-wider">
          Revenue & Renewal Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-secondary text-xs block">Recognized MRR</span>
            <span className="text-xl font-bold text-success tabular-nums">{formatCurrency(mrr)}</span>
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
            <span className="text-xl font-bold text-primary tabular-nums">
              {tenant.memberCount}
              <span className="text-sm font-normal text-secondary">
                {' '}
                / {currentPlan?.memberLimit || 0}
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border dark:border-white/10 text-sm">
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
  );
}

export default SuperadminGymsDirectoryTenantSubscriptionTab;
