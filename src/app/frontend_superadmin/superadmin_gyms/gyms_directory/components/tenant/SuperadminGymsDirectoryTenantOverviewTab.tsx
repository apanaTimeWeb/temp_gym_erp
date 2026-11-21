'use client';

import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { formatIstDate, formatIstFullDateTime, maskEmail } from '../../utils/SuperadminGymsDirectoryTenantUtils';
import type { Tenant, Plan } from '../../types/SuperadminGymsDirectoryTenantTypes';

export interface SuperadminGymsDirectoryTenantOverviewTabProps {
  tenant: Tenant;
  currentPlan?: Plan;
}

export function SuperadminGymsDirectoryTenantOverviewTab({
  tenant,
  currentPlan,
}: SuperadminGymsDirectoryTenantOverviewTabProps) {
  return (
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
          {tenant.aadharNumber && (
            <div>
              <span className="text-secondary text-xs block">Aadhaar (UIDAI)</span>
              <span className="font-mono text-primary">•••• •••• {tenant.aadharNumber.slice(-4)}</span>
            </div>
          )}
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
  );
}

export default SuperadminGymsDirectoryTenantOverviewTab;
