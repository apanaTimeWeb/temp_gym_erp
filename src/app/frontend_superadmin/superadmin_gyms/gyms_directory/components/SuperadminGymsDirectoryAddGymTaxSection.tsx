'use client';

import React from 'react';

export interface SuperadminGymsDirectoryAddGymTaxSectionProps {
  city: string;
  setCity: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  gstNumber: string;
  setGstNumber: (val: string) => void;
  sendWelcomeEmail: boolean;
  setSendWelcomeEmail: (val: boolean) => void;
  isProvisioning: boolean;
  provisioningDone: boolean;
}

export function SuperadminGymsDirectoryAddGymTaxSection({
  city,
  setCity,
  state,
  setState,
  gstNumber,
  setGstNumber,
  sendWelcomeEmail,
  setSendWelcomeEmail,
  isProvisioning,
  provisioningDone,
}: SuperadminGymsDirectoryAddGymTaxSectionProps) {
  return (
    <div>
      <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
        Optional Tax & Location Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="provision-city" className="block text-sm font-semibold text-secondary mb-1">
            City
          </label>
          <input
            id="provision-city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Mumbai"
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="provision-state" className="block text-sm font-semibold text-secondary mb-1">
            State
          </label>
          <input
            id="provision-state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="e.g. Maharashtra"
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="provision-gst" className="block text-sm font-semibold text-secondary mb-1">
            GSTIN
          </label>
          <input
            id="provision-gst"
            type="text"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
            placeholder="27ABCDE1234F1Z5"
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary uppercase font-mono"
          />
        </div>
      </div>

      {/* Send Welcome Email Checkbox */}
      <div className="mt-4">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sendWelcomeEmail}
            onChange={(e) => setSendWelcomeEmail(e.target.checked)}
            disabled={isProvisioning || provisioningDone}
            className="rounded border-border text-primary focus:ring-primary"
          />
          <span className="text-sm text-secondary">
            Send welcome onboarding email with login credentials to admin email
          </span>
        </label>
      </div>
    </div>
  );
}

export default SuperadminGymsDirectoryAddGymTaxSection;
