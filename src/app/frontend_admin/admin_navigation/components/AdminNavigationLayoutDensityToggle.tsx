"use client";
// RESPONSIBILITY: Toggles the Admin shell table density between comfortable and compact without owning server state.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutDensityToggle.tsx)

import { useTranslations } from 'next-intl';
import { LayoutList } from 'lucide-react';
import { useAdminNavigationLayoutDensity } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutDensity';

/** Renders the zero-business compact/comfortable density toggle for the Admin shell. */
export default function AdminNavigationLayoutDensityToggle() {
  const t = useTranslations();
  const { density, toggleDensity } = useAdminNavigationLayoutDensity();
  return (
    <button
      type="button"
      onClick={toggleDensity}
      aria-pressed={density === 'compact'}
      aria-label={density === 'compact' ? t('admin_layout.AdminNavigationLayoutDensityToggle.remaining_useComfortableDensity') : t('admin_layout.AdminNavigationLayoutDensityToggle.remaining_useCompactDensity') }
      title={density === 'compact' ? t('admin_layout.AdminNavigationLayoutDensityToggle.remaining_comfortableDensity') : t('admin_layout.AdminNavigationLayoutDensityToggle.remaining_compactDensity') }
      className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95"
      data-testid="admin_navigation-admin-density-toggle-toggle"
    >
      <LayoutList size={18} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
