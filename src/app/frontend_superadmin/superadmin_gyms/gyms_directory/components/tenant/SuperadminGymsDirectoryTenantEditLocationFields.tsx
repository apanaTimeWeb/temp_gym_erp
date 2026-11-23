'use client';

import React from 'react';

export interface SuperadminGymsDirectoryTenantEditLocationFieldsProps {
  address?: string;
  setAddress?: (val: string) => void;
  city?: string;
  setCity?: (val: string) => void;
  state?: string;
  setState?: (val: string) => void;
  postalCode?: string;
  setPostalCode?: (val: string) => void;
  gstNumber?: string;
  setGstNumber?: (val: string) => void;
}

export function SuperadminGymsDirectoryTenantEditLocationFields({
  address = '',
  setAddress,
  city = '',
  setCity,
  state = '',
  setState,
  postalCode = '',
  setPostalCode,
  gstNumber = '',
  setGstNumber,
}: SuperadminGymsDirectoryTenantEditLocationFieldsProps) {
  return (
    <>
      {/* Address & Location */}
      {setAddress && (
        <div>
          <label htmlFor="edit-address" className="block text-sm font-semibold text-secondary mb-1">
            Facility Address
          </label>
          <input
            id="edit-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. 123 Fitness Ave, Sector 4"
            className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      )}

      {/* City & State */}
      {(setCity || setState) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {setCity && (
            <div>
              <label htmlFor="edit-city" className="block text-sm font-semibold text-secondary mb-1">
                City
              </label>
              <input
                id="edit-city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          )}
          {setState && (
            <div>
              <label htmlFor="edit-state" className="block text-sm font-semibold text-secondary mb-1">
                State
              </label>
              <input
                id="edit-state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Maharashtra"
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          )}
        </div>
      )}

      {/* Postal Code & GST Number */}
      {(setPostalCode || setGstNumber) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {setPostalCode && (
            <div>
              <label htmlFor="edit-postal-code" className="block text-sm font-semibold text-secondary mb-1">
                PIN / Postal Code
              </label>
              <input
                id="edit-postal-code"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="e.g. 400001"
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          )}
          {setGstNumber && (
            <div>
              <label htmlFor="edit-gst-number" className="block text-sm font-semibold text-secondary mb-1">
                GSTIN / Tax ID
              </label>
              <input
                id="edit-gst-number"
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                placeholder="e.g. 27AAAAA0000A1Z5"
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary uppercase placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SuperadminGymsDirectoryTenantEditLocationFields;
