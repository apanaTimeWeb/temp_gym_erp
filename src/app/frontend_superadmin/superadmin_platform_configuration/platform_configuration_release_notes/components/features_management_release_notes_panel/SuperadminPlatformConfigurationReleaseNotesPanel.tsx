// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationFeaturesReleaseNotesPanel within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the feature-owned release-note history and publication form using parent-owned form state and mutation handlers.
import { Loader2, Send, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { formatDate } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/utils/SuperadminPlatformConfigurationReleaseNotesFormatters';

import type { SuperadminPlatformConfigurationFeaturesReleaseNotesPanelProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/types/superadmin_platform_configuration_release_notes_release_notes_panel.types';



/**
 * @description Renders release-note history and the RHF publication form; validation and submission orchestration remain in the parent view model.
 * @dependencies Uses feature-local translations and date formatting; receives React Hook Form bindings and mutation intent through props.
 * @edge-case Failed submissions preserve the form values, while successful publication is controlled by the parent mutation lifecycle.
 */
export default function SuperadminPlatformConfigurationReleaseNotesPanel({ notes, isPublishing, register, handleSubmit, errors, onPublishNote, onDeleteNote, deletingNoteId }: SuperadminPlatformConfigurationFeaturesReleaseNotesPanelProps) {
  const t = useTranslations('superadmin_platform_configuration_features');

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {notes.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center rounded-xl border border-border bg-card px-6 text-center text-sm text-secondary" data-testid="superadmin_platform_configuration_features-superadmin-features-release-notes-panel-notes-panel-empty-state">
            {t('ui.no_release_notes_found')}
          </div>
        ) : notes.map((note) => (
          <article key={note.id} className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md border border-border bg-primary-subtle px-2.5 py-1 text-xs font-bold text-primary">{note.version}</span>
                <h3 className="text-lg font-bold text-primary">{note.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${note.isPublished ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>
                  {note.isPublished ? t('ui.release_status_published') : t('ui.release_status_draft')}
                </span>
                <button type="button" onClick={() => void onDeleteNote(note)} disabled={Boolean(deletingNoteId)} aria-label={t('ui.delete_release_note_for', { title: note.title })} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-danger hover:bg-danger-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50" data-testid={`superadmin_platform_configuration_features-release-note-delete-${note.id}`}>
                  {deletingNoteId === note.id ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <Trash2 size={18} aria-hidden="true" />}
                </button>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-secondary">{note.content}</p>
            <div className="text-xs font-medium text-disabled">
              {note.isPublished ? t('ui.published_on_date', { date: formatDate(note.date) }) : t('ui.not_visible_to_superadmin_gyms_yet_4b6fc17')}
            </div>
          </article>
        ))}
      </div>

      <div>
        <form onSubmit={handleSubmit(onPublishNote)} className="sticky top-24 rounded-xl border border-border bg-card p-6" data-testid="superadmin_platform_configuration_features-superadmin-features-release-notes-panel-release-notes-panel-form">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-primary">
            <Send size={18} strokeWidth={2} aria-hidden="true" className="text-primary" />
            {t('ui.compose_release_note_8c451b9')}
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="superadmin-release-version" className="mb-1 block text-xs font-medium text-secondary">{t('ui.version_tag_ce4bc82')}</label>
              <input id="superadmin-release-version" type="text" placeholder={t('ui.e_g_v2_6_1_19998c0')} {...register('version')} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base" data-testid="superadmin_platform_configuration_features-superadmin-features-release-notes-panel-notes-panel-version-input" aria-invalid={Boolean(errors.version)} aria-describedby="superadmin-release-version-error" />
              {errors.version ? <p id="superadmin-release-version-error" className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_platform_configuration_features-superadmin-features-release-notes-panel-release-notes-version-error">{errors.version.message}</p> : null}
            </div>
            <div>
              <label htmlFor="superadmin-release-title" className="mb-1 block text-xs font-medium text-secondary">{t('ui.title_862bb27')}</label>
              <input id="superadmin-release-title" type="text" placeholder={t('ui.feature_announcement_544de72')} {...register('title')} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base" data-testid="superadmin_platform_configuration_features-superadmin-features-release-notes-panel-notes-panel-title-input" aria-invalid={Boolean(errors.title)} aria-describedby="superadmin-release-title-error" />
              {errors.title ? <p id="superadmin-release-title-error" className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_platform_configuration_features-superadmin-features-release-notes-panel-release-notes-title-error">{errors.title.message}</p> : null}
            </div>
            <div>
              <label htmlFor="superadmin-release-content" className="mb-1 block text-xs font-medium text-secondary">{t('ui.content_markdown_supported_bec3530')}</label>
              <textarea id="superadmin-release-content" rows={5} {...register('content')} className="min-h-28 w-full resize-none rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base min-h-11" placeholder={t('ui.we_just_shipped_ea0e8f3')} data-testid="superadmin_platform_configuration_features-superadmin-features-release-notes-panel-notes-panel-content-input" aria-invalid={Boolean(errors.content)} aria-describedby="superadmin-release-content-error" />
              {errors.content ? <p id="superadmin-release-content-error" className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_platform_configuration_features-superadmin-features-release-notes-panel-release-notes-content-error">{errors.content.message}</p> : null}
            </div>
            <button type="submit" disabled={isPublishing} className="flex min-h-11 min-w-40 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_platform_configuration_features-superadmin-features-release-notes-panel-release-notes-panel-submit">
              {isPublishing ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" /> {t('ui.publishing_a440a8b')}</> : t('ui.publish_to_all_superadmin_gyms_74b0357')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
