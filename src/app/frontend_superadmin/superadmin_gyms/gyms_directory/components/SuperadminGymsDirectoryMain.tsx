'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import SuperadminGymsTable from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryTable';
import { SUPERADMIN_GYMS_DIRECTORY_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';

/**
 * Root orchestrator for the Gyms & Tenants directory matching Trainer Obsidian Table UI.
 */
export default function SuperadminGymsDirectoryMain() {
  return (
    <div
      className="min-h-[540px] lg:h-[calc(100dvh-185px)] flex flex-col min-w-0 overflow-hidden space-y-4"
      data-testid="superadmin-gyms-main-page"
    >
      {/* Executive Header Bar */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#12192B] dark:to-[#0C1322] p-4 sm:p-5 shadow-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#38BDF8] to-[#FF5A1F]" />
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-extrabold text-primary">Gyms &amp; Tenants</h1>
          <p className="text-secondary text-xs sm:text-sm font-normal mt-0.5">
            Manage your SaaS clients, subscriptions, access controls, and provisioning.
          </p>
        </div>
        <Link
          href={SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('add')}
          className="inline-flex min-h-10 items-center gap-1.5 bg-gradient-to-r from-[#FF5A1F] to-[#F97316] hover:brightness-110 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold motion-safe:transition-all shadow-[0_4px_14px_rgba(255,90,31,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page shrink-0 cursor-pointer"
          data-testid="onboard-new-gym-button"
        >
          <Plus size={15} className="stroke-[2.5]" />
          <span>Onboard New Gym</span>
        </Link>
      </div>

      {/* Main Table Container */}
      <div className="relative bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] border border-border dark:border-emerald-500/30 rounded-2xl flex-1 min-h-0 flex flex-col overflow-hidden shadow-card">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#38BDF8] to-[#FF5A1F] z-30" />
        <SuperadminGymsTable />
      </div>
    </div>
  );
}
