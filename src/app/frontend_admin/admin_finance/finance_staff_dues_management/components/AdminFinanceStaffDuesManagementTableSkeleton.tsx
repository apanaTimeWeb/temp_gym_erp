"use client";
// RESPONSIBILITY: Renders zero-business table skeleton rows that mirror data tables during loading.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutTableSkeleton.tsx)

import { useTranslations } from 'next-intl';
import type { AdminTableSkeletonProps } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementTableSkeletonTypes';

export default function AdminNavigationLayoutTableSkeleton({ rows = 6, columns = 5, cols }: AdminTableSkeletonProps) {
  const t = useTranslations();
  const visibleColumns = Math.max(1, cols ?? columns);
  return (
    <div className="w-full bg-card border border-border rounded-lg overflow-hidden mt-4" role="status" aria-live="polite" aria-busy="true" data-testid="layout-components-layout-table-skeleton-status-region">
      <span className="sr-only">{t('admin_layout.AdminNavigationLayoutTableSkeleton.text_loading_table')}</span>
      <div aria-hidden="true">
        <div className="w-full h-12 bg-surface-highlight border-b border-border" />
        <div className="flex flex-col">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={`skeleton-row-${rowIndex + 1}`} className="flex items-center gap-4 px-6 h-12 border-b border-border motion-safe:animate-pulse motion-safe:duration-base">
              {Array.from({ length: visibleColumns }, (_, columnIndex) => (
                <div key={`skeleton-cell-${rowIndex + 1}-${columnIndex + 1}`} className="h-4 bg-skeleton-base rounded flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
