'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import SuperadminGymsTable from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryTable';
import { SUPERADMIN_GYMS_DIRECTORY_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';

/**
 * Root orchestrator for the Gyms & Tenants directory.
 * - Single heading (removes duplicate headings)
 * - Removed top status tabs and List/Calendar toggle
 * - Page container does not scroll; table body scrolls inside with sticky header & footer.
 */
export default function SuperadminGymsDirectoryMain() {
  return (
    <div
      className="h-[calc(100dvh-135px)] flex flex-col min-h-0 overflow-hidden space-y-3 px-2 sm:px-3 pb-2"
      data-testid="superadmin-gyms-main-page"
    >
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #171717 inset !important;
          -webkit-text-fill-color: #facc15 !important;
          transition: background-color 5000s ease-in-out 0s;
          caret-color: #facc15 !important;
        }
        ::placeholder {
          color: #737373 !important;
          opacity: 1;
        }
      `}</style>
      {/* Top Header Bar: Subtitle & Action (Title handled by parent secondary nav tab) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
        <div>
          <h1 className="sr-only">Gyms & Tenants</h1>
          <p className="text-secondary text-xs sm:text-sm font-normal">
            Manage your SaaS clients, subscriptions, access controls, and provisioning.
          </p>
        </div>
        <Link
          href={SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('add')}
          className="inline-flex h-9 items-center gap-1.5 bg-primary hover:bg-primary-hover text-on-primary px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold motion-safe:transition-all shadow-xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page shrink-0 cursor-pointer"
          data-testid="onboard-new-gym-button"
        >
          <Plus size={15} className="stroke-[2.5]" />
          <span>Onboard New Gym</span>
        </Link>
      </div>

      {/* Main Table Container - Full height, no page scroll */}
      <div className="bg-card border border-border rounded-xl flex-1 min-h-0 flex flex-col overflow-hidden shadow-card">
        <SuperadminGymsTable />
      </div>
    </div>
  );
}
