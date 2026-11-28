// RESPONSIBILITY: Renders Superadmin Platform Configuration Release Notes Main using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import NotesPanel from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/components/features_management_release_notes_panel/SuperadminPlatformConfigurationReleaseNotesPanel';
import { SUPERADMIN_PLATFORM_CONFIGURATION_RELEASE_NOTES_ROUTES as SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/config/superadmin_platform_configuration_release_notes.url_config';
import { useSuperadminPlatformConfigurationReleaseNotesPage } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/hooks/useSuperadminPlatformConfigurationReleaseNotesPage';

export function SuperadminPlatformConfigurationReleaseNotesMain() {
  const t = useTranslations('superadmin_platform_configuration_features');
  const { form, query, isPublishing, deletingNoteId, publishNote, deleteNote } = useSuperadminPlatformConfigurationReleaseNotesPage();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <section className="space-y-5">
      <header className="relative overflow-hidden rounded-2xl border border-orange-500/35 bg-card dark:bg-gradient-to-br dark:from-[#291514] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FB923C] via-[#FF5A1F] to-[#38BDF8]" />
        <h1 className="superadmin-page-title text-primary">{t('ui.release_notes_6cba0c4')}</h1>
        <Link href={SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES.DESTINATION_1} className="inline-flex min-h-10 items-center rounded-xl border border-border dark:border-white/15 bg-card/80 px-4 text-xs sm:text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary shrink-0">
          {t('ui.feature_flags_5ba305a')}
        </Link>
      </header>
      {(() => {
        if (query.isPending) return <div role="status" aria-busy="true" className="h-64 rounded-2xl border border-border bg-skeleton-base motion-safe:animate-pulse" />;
        if (query.isError) return <div role="alert" className="rounded-2xl border border-danger/35 bg-danger-bg p-6 text-danger"><p>{t('ui.feature_data_could_not_be_loaded_2c1bc05')}</p><button type="button" className="mt-2 min-h-10 underline cursor-pointer" onClick={() => void query.refetch()}>{t('ui.try_again_94b8c58')}</button></div>;
        return <NotesPanel notes={query.data ?? []} isPublishing={isPublishing} register={register} handleSubmit={handleSubmit} errors={errors} onPublishNote={publishNote} onDeleteNote={deleteNote} deletingNoteId={deletingNoteId} />;
      })()}
    </section>
  );
}
