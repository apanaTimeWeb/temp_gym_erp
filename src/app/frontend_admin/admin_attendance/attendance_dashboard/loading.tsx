"use client";
import { useTranslations } from 'next-intl';
// RESPONSIBILITY: Skeleton loading UI for Admin Attendance page — mimics KPIs + chart + toolbar + table layout.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_attendance/attendance_dashboard/loading.tsx)

/**
 * AdminAttendanceLoading renders the admin attendance loading UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminAttendanceLoading() {
  const t = useTranslations();
  return (
    <div className="p-6 space-y-5" aria-busy="true" data-testid="admin_attendance-loading-state">
      <p role="status" aria-live="polite" className="sr-only">{t('attendance.AdminAuditRepair.loadingAttendance')}</p>
      <div aria-hidden="true">
      {/* KPI skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={`attendance-skeleton-${i}`} className="h-24 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        ))}
      </div>
      {/* Chart skeleton */}
      <div className="h-64 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
      {/* Table card skeleton */}
      <div className="bg-skeleton-base rounded-xl border border-border p-4 space-y-4">
        <div className="flex gap-3 flex-wrap">
          <div className="h-10 flex-1 min-w-48 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base" />
          <div className="h-10 w-36 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base" />
          <div className="h-10 w-36 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base" />
          <div className="h-10 w-44 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={`attendance-skeleton-${i}`} className="h-12 bg-skeleton-base rounded-lg motion-safe:animate-pulse motion-safe:duration-base" />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
