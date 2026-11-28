"use client";
// RESPONSIBILITY: Renders the Admin sidebar brand mark and two-tone GymSmart wordmark matching Trainer UI.

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AdminNavigationBrandIcon from '@/app/frontend_admin/admin_navigation/components/AdminNavigationBrandIcon';
import type { AdminNavigationLayoutSidebarBrandProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutSidebarPropsTypes';

export default function AdminNavigationLayoutSidebarBrand({
  isCollapsed,
  isMobileOpen,
}: AdminNavigationLayoutSidebarBrandProps) {
  const t = useTranslations();
  const showBrandText = !isCollapsed || isMobileOpen;
  const brandTitle = t('admin_navigation.AdminNavigationLayoutSidebar.text_3871a45480');
  const hasGymSmartSplit = brandTitle === 'GymSmart';

  if (!showBrandText) return null;

  return (
    <Link
      href="/frontend_admin/admin_dashboard/dashboard_overview"
      className="flex items-center gap-2.5 min-w-0 flex-1 group no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
    >
      <span
        className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] border border-white/25 text-white flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(255,90,31,0.45)] motion-safe:transition-transform motion-safe:duration-base group-hover:scale-105"
        aria-hidden="true"
      >
        <AdminNavigationBrandIcon className="w-[19px] h-[19px]" />
      </span>
      <div className="whitespace-nowrap flex flex-col min-w-0 justify-center">
        <span className="flex items-center text-[17px] leading-none tracking-tight truncate">
          {hasGymSmartSplit ? (
            <>
              <span className="text-white font-extrabold">Gym</span>
              <span className="bg-gradient-to-r from-[#FF5A1F] via-[#EC4899] to-[#A78BFA] bg-clip-text text-transparent font-black">Smart</span>
            </>
          ) : (
            <span className="text-white font-extrabold">{brandTitle}</span>
          )}
        </span>
        <span
          className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-400 leading-none mt-1.5 truncate"
          data-testid="admin_navigation-adminlayout-status-1"
        >
          {t('admin_navigation.AdminNavigationLayoutSidebar.text_b31bc5e6ee')}
        </span>
      </div>
    </Link>
  );
}
