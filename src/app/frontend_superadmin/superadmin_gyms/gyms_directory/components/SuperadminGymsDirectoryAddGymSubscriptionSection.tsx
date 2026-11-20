'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/SuperadminGymsDirectoryTenantUtils';
import type { Plan } from '../types/SuperadminGymsDirectoryTenantTypes';

export interface SuperadminGymsDirectoryAddGymSubscriptionSectionProps {
  planId: string; setPlanId: (val: string) => void; planSelectRef: React.RefObject<HTMLSelectElement | null>;
  plans: Plan[]; loadingPlans: boolean; selectedPlan: Plan | undefined;
  memberCount: number; setMemberCount: (val: number) => void; memberCountInputRef: React.RefObject<HTMLInputElement | null>;
  startType: 'TRIAL' | 'PAID'; setStartType: (val: 'TRIAL' | 'PAID') => void;
  trialDays: number; setTrialDays: (val: number) => void;
  billingCycle: 'MONTHLY' | 'ANNUAL'; setBillingCycle: (val: 'MONTHLY' | 'ANNUAL') => void;
  currency: string; setCurrency: (val: string) => void;
  timezone: string; setTimezone: (val: string) => void;
  startDate: string; setStartDate: (val: string) => void;
  expiryDate: string; isProvisioning: boolean; provisioningDone: boolean;
  errors: { [key: string]: string | undefined }; touched: { [key: string]: boolean };
  handleBlur: (field: string) => void; setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string | undefined }>>;
}

export function SuperadminGymsDirectoryAddGymSubscriptionSection({
  planId, setPlanId, planSelectRef, plans, loadingPlans, selectedPlan,
  memberCount, setMemberCount, memberCountInputRef, startType, setStartType,
  trialDays, setTrialDays, billingCycle, setBillingCycle,
  currency, setCurrency, timezone, setTimezone,
  startDate, setStartDate, expiryDate, isProvisioning, provisioningDone,
  errors, touched, handleBlur, setErrors,
}: SuperadminGymsDirectoryAddGymSubscriptionSectionProps) {
  return (
    <div>
      <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
        Subscription & Plan Configuration
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* SaaS Plan (*) */}
        <div>
          <label htmlFor="provision-plan-select" className="block text-sm font-semibold text-secondary mb-1">
            SaaS Plan <span className="text-danger">*</span>
          </label>
          <select
            ref={planSelectRef}
            id="provision-plan-select"
            value={planId}
            onChange={(e) => {
              setPlanId(e.target.value);
              if (errors.planId) setErrors((prev) => ({ ...prev, planId: undefined }));
            }}
            onBlur={() => handleBlur('planId')}
            disabled={isProvisioning || provisioningDone || loadingPlans}
            className="w-full min-h-11 bg-card border border-border rounded-lg ps-3.5 pe-9 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="">Select a subscription plan...</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({formatCurrency(p.price)}/mo) — max {p.memberLimit} members
              </option>
            ))}
          </select>
          {selectedPlan && (
            <p className="text-xs text-secondary mt-1">
              Selected plan capacity: <strong className="text-primary">{selectedPlan.memberLimit} members</strong>
            </p>
          )}
          {touched.planId && errors.planId && (
            <p className="text-xs text-danger mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.planId}
            </p>
          )}
        </div>

        {/* Member Count (*) */}
        <div>
          <label htmlFor="provision-member-count" className="block text-sm font-semibold text-secondary mb-1">
            Estimated Member Count <span className="text-danger">*</span>
          </label>
          <input
            ref={memberCountInputRef}
            id="provision-member-count"
            type="number"
            min="0"
            step="1"
            value={memberCount}
            onChange={(e) => setMemberCount(parseInt(e.target.value, 10) || 0)}
            onBlur={() => handleBlur('memberCount')}
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          {selectedPlan && memberCount > selectedPlan.memberLimit && (
            <p className="text-xs text-warning mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> Member count ({memberCount}) exceeds plan limit (
              {selectedPlan.memberLimit})
            </p>
          )}
          {touched.memberCount && errors.memberCount && (
            <p className="text-xs text-danger mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.memberCount}
            </p>
          )}
        </div>

        {/* Start Type & Trial Days */}
        <div>
          <label className="block text-sm font-semibold text-secondary mb-1">
            Start Type
          </label>
          <div className="flex items-center gap-4 min-h-11">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="startType"
                value="TRIAL"
                checked={startType === 'TRIAL'}
                onChange={() => setStartType('TRIAL')}
                disabled={isProvisioning || provisioningDone}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-primary">Trial Account</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="startType"
                value="PAID"
                checked={startType === 'PAID'}
                onChange={() => setStartType('PAID')}
                disabled={isProvisioning || provisioningDone}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-primary">Paid Subscription</span>
            </label>
          </div>
        </div>

        {/* Trial Days or Billing Cycle */}
        {startType === 'TRIAL' ? (
          <div>
            <label htmlFor="provision-trial-days" className="block text-sm font-semibold text-secondary mb-1">
              Trial Days
            </label>
            <input
              id="provision-trial-days"
              type="number"
              min="1"
              max="90"
              value={trialDays}
              onChange={(e) => setTrialDays(parseInt(e.target.value, 10) || 14)}
              disabled={isProvisioning || provisioningDone}
              className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="provision-billing-cycle" className="block text-sm font-semibold text-secondary mb-1">
              Billing Cycle
            </label>
            <select
              id="provision-billing-cycle"
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value as 'MONTHLY' | 'ANNUAL')}
              disabled={isProvisioning || provisioningDone}
              className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="MONTHLY">Standard Monthly (Billed per month)</option>
              <option value="ANNUAL">Annual Billing (Billed yearly - Save 15%)</option>
            </select>
          </div>
        )}

        {/* Currency */}
        <div>
          <label htmlFor="provision-currency" className="block text-sm font-semibold text-secondary mb-1">
            Billing Currency
          </label>
          <select
            id="provision-currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono"
          >
            <option value="INR">INR (₹) - Indian Rupee</option>
            <option value="USD">USD ($) - US Dollar</option>
            <option value="AED">AED - UAE Dirham</option>
            <option value="EUR">EUR (€) - Euro</option>
            <option value="SGD">SGD (S$) - Singapore Dollar</option>
          </select>
        </div>

        {/* Timezone */}
        <div>
          <label htmlFor="provision-timezone" className="block text-sm font-semibold text-secondary mb-1">
            Facility Timezone
          </label>
          <select
            id="provision-timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono"
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST +05:30)</option>
            <option value="Asia/Dubai">Asia/Dubai (GST +04:00)</option>
            <option value="UTC">UTC (Universal Coordinated Time +00:00)</option>
            <option value="America/New_York">America/New_York (EST/EDT -05:00)</option>
            <option value="Asia/Singapore">Asia/Singapore (SGT +08:00)</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="provision-start-date" className="block text-sm font-semibold text-secondary mb-1">
            Start Date
          </label>
          <input
            id="provision-start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        {/* Auto Calculated Expiry Date (Read-Only) */}
        <div>
          <label htmlFor="provision-expiry-date" className="block text-sm font-semibold text-secondary mb-1">
            Auto-Calculated Expiry Date
          </label>
          <input
            id="provision-expiry-date"
            type="date"
            readOnly
            disabled
            value={expiryDate}
            className="w-full min-h-11 bg-input border border-border text-disabled rounded-lg px-4 py-2 text-sm cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}

export default SuperadminGymsDirectoryAddGymSubscriptionSection;
