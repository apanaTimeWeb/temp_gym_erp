"use client";
// RESPONSIBILITY: Renders the AdminProfileOverviewMain UI surface for profile_overview; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → AdminProfileOverviewMain → accessible UI/events routed to owning hooks (admin_profile/profile_overview/components/main_view/AdminProfileOverviewMain.tsx)

import { useTranslations } from 'next-intl';
import { useAdminProfileLogic } from '@/app/frontend_admin/admin_profile/profile_overview/hooks/useAdminProfileOverviewLogic';
import { useAdminProfilePasswordVisibility } from '@/app/frontend_admin/admin_profile/profile_overview/hooks/useAdminProfileOverviewPasswordVisibility';
import AdminProfileSummaryCard from '@/app/frontend_admin/admin_profile/profile_overview/components/summary_card/AdminProfileOverviewSummaryCard';
import AdminProfileTabsNavigation from '@/app/frontend_admin/admin_profile/profile_overview/components/tabs_navigation/AdminProfileOverviewTabsNavigation';
import AdminProfilePersonalForm from '@/app/frontend_admin/admin_profile/profile_overview/components/personal_form/AdminProfileOverviewPersonalForm';
import AdminProfileSecurityForm from '@/app/frontend_admin/admin_profile/profile_overview/components/security_form/AdminProfileOverviewSecurityForm';

/** Coordinates the Admin Profile surface and delegates each major visual section to a feature-owned component. 
 * @description AdminProfileOverviewMain renders the ProfileOverviewMain interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminProfileOverviewMain() {
  const t = useTranslations();
  const {
    activeTab, setActiveTab, profile, profileQuery, profileForm, passwordForm,
    savingProfile, savingPassword, displayInitial, handleSaveProfile, handleChangePassword,
  } = useAdminProfileLogic();
  const passwordVisibility = useAdminProfilePasswordVisibility();

  if (profileQuery.isPending) {
    return (
      <div className="p-6 space-y-6 w-full max-w-4xl" aria-busy="true" aria-label={t('profile.admin_profile_main.text_9ba8d391c5')} data-testid="admin_profile-loading-state">
        <div className="h-8 w-48 rounded-lg bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
        <div className="h-24 rounded-xl bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
        <div className="h-64 rounded-xl bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
      </div>
    );
  }

  if (profileQuery.isError) {
    return (
      <section className="m-6 max-w-4xl rounded-xl border border-border bg-card p-8 text-center" role="alert" data-testid="admin_profile-load-error">
        <p className="text-sm text-danger">{t('profile.admin_profile_main.auto_a9257207f9')}</p>
        <button type="button" onClick={() => profileQuery.refetch()} className="mt-4 min-h-11 min-w-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors motion-safe:duration-base" data-testid="admin_profile-retry-load">{t('profile.admin_profile_main.text_9f5cd8a2e8')}</button>
      </section>
    );
  }

  return (
    <div className="p-6 space-y-6 w-full max-w-4xl" data-testid="admin_profile-main">
      <AdminProfileSummaryCard profile={profile} displayInitial={displayInitial} />
      <AdminProfileTabsNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'personal' ? (
        <AdminProfilePersonalForm profile={profile} form={profileForm} isSaving={savingProfile} onSubmit={handleSaveProfile} />
      ) : (
        <AdminProfileSecurityForm
          form={passwordForm}
          isSaving={savingPassword}
          showCurrent={passwordVisibility.showCurrent}
          showNew={passwordVisibility.showNew}
          showConfirm={passwordVisibility.showConfirm}
          onToggleCurrent={passwordVisibility.toggleCurrent}
          onToggleNew={passwordVisibility.toggleNew}
          onToggleConfirm={passwordVisibility.toggleConfirm}
          onSubmit={handleChangePassword}
        />
      )}
    </div>
  );
}
