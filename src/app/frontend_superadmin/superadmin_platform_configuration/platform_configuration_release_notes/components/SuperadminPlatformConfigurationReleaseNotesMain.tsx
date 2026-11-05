// RESPONSIBILITY: Renders Superadmin Platform Configuration Release Notes Main using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import NotesPanel from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/components/features_management_release_notes_panel/SuperadminPlatformConfigurationReleaseNotesPanel';
import { SUPERADMIN_PLATFORM_CONFIGURATION_RELEASE_NOTES_ROUTES as SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/config/superadmin_platform_configuration_release_notes.url_config';
import { useSuperadminPlatformConfigurationReleaseNotesPage } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/hooks/useSuperadminPlatformConfigurationReleaseNotesPage';


export function SuperadminPlatformConfigurationReleaseNotesMain() {
 const t=useTranslations('superadmin_platform_configuration_features');
 const {form,query,isPublishing,deletingNoteId,publishNote,deleteNote}=useSuperadminPlatformConfigurationReleaseNotesPage();
 const {register,handleSubmit,formState:{errors}}=form;
 return <section className="space-y-6"><header><h1 className="superadmin-page-title text-primary">{t('ui.release_notes_6cba0c4')}</h1>
 <Link href={SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES.DESTINATION_1} className="mt-2 inline-flex min-h-11 items-center text-secondary underline focus-visible:ring-2 focus-visible:ring-primary">{t('ui.feature_flags_5ba305a')}</Link></header>
 {(() => { if (query.isPending) { return (<div role="status" aria-busy="true" className="h-64 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>); } if (query.isError) { return (<div role="alert" className="rounded-xl bg-danger-bg p-6 text-danger"><p>{t('ui.feature_data_could_not_be_loaded_2c1bc05')}</p><button type="button" className="min-h-11 underline" onClick={()=>void query.refetch()}>{t('ui.try_again_94b8c58')}</button></div>); } return (<NotesPanel notes={query.data??[]} isPublishing={isPublishing} register={register} handleSubmit={handleSubmit} errors={errors} onPublishNote={publishNote} onDeleteNote={deleteNote} deletingNoteId={deletingNoteId}/>); })()}
 </section>;
}
