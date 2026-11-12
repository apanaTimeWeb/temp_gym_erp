"use client";
// RESPONSIBILITY: Create / Edit modal for Announcements — RHF + Zod validation.
// DATA FLOW: feature data/state and user input → AdminCommunicationNoticesAndAnnouncementsModal → accessible UI/events routed to owning hooks (admin_communication/communication_notices_and_announcements/components/modal/AdminCommunicationNoticesAndAnnouncementsModal.tsx)

import { useTranslations } from 'next-intl';

import { Controller } from 'react-hook-form';
import { X, Loader2, Megaphone } from 'lucide-react';
import { useAdminAnnouncementsModalForm } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsModalForm';
import { ANNOUNCEMENT_PRIORITY_OPTIONS, ANNOUNCEMENT_AUDIENCE_OPTIONS, ANNOUNCEMENT_COMPOSE_GYM_OPTIONS } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/constants/AdminCommunicationNoticesAndAnnouncementsConstants';

/**
 * AdminCommunicationNoticesAndAnnouncementsModal renders the admin announcements modal UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationNoticesAndAnnouncementsModal: Create / Edit modal for Announcements — RHF + Zod validation.
 * @dependencies Consumes useAdminAnnouncementsModalForm, AdminAnnouncementsConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationNoticesAndAnnouncementsModal() {
  const t = useTranslations();

  const { showModal, saving, register, handleSubmit, control, errors, handleClose, saveAnnouncement, toggleArrayValue, isEdit } = useAdminAnnouncementsModalForm();

  if (!showModal) return null;


  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 bg-overlay backdrop-blur-sm z-40" onClick={() => void handleClose()} data-testid="admin_announcements-admin_announcements-modal-click"/>
      <div data-admin-dialog="true" role="dialog" aria-modal="true" aria-labelledby="admin-announcements-dialog-title" tabIndex={-1} onMouseDown={(event) => { if (event.target === event.currentTarget) void handleClose(); }} className="fixed inset-0 z-40 flex items-center justify-center p-4 overflow-y-auto">
        <div className="my-auto bg-overlay border border-border rounded-2xl shadow-dialog w-full max-w-md max-h-dialog-desktop flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-subtle flex items-center justify-center">
                <Megaphone size={18} className="text-primary"  strokeWidth={2}/>
              </div>
              <div>
                <h3 id="admin-announcements-dialog-title" className="font-bold text-primary">{isEdit ? t('announcements.admin_announcements_modal.auto_b07da8e396') : t('announcements.admin_announcements_modal.auto_721b86aeda')}</h3>
                <p className="text-xs text-secondary">{isEdit ? t('announcements.admin_announcements_modal.auto_20f51762b1') : t('announcements.admin_announcements_modal.auto_a2deb25a6b')}</p>
              </div>
            </div>
            <button type="button" onClick={() => void handleClose()} className="min-h-11 min-w-11 w-8 h-8 rounded-lg bg-input hover:bg-surface-hover flex items-center justify-center motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('announcements.admin_announcements_modal.text_bbfa773e5a')} data-testid="admin_announcements-admin_announcements-modal-click-2">
              <X size={18} className="text-secondary"  strokeWidth={2}/>
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit(saveAnnouncement)} className="min-h-0 flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar" data-testid="admin_announcements-admin_announcements-modal-submit">

            {/* Title */}
            <div>
              <label htmlFor="admin-announcement-title" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">{t('announcements.admin_announcements_modal.text_9616975c7a')}</label>
              <input
                {...register('title')}
                id="admin-announcement-title" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'admin-announcement-title-error' : undefined}
                placeholder={t('announcements.admin_announcements_modal.text_b6d5688f06')}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
               data-testid="admin_announcements-admin_announcements-modal-control"/>
              {errors.title && <p id="admin-announcement-title-error" role="alert" className="text-xs text-danger mt-1">{t(errors.title.message ?? 'announcements.validation.titleRequired')}</p>}
            </div>

            {/* Body */}
            <div>
              <label htmlFor="admin-announcement-body" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">{t('announcements.admin_announcements_modal.text_d0f19ecb98')}</label>
              <textarea
                {...register('body')}
                id="admin-announcement-body" aria-invalid={Boolean(errors.body)} aria-describedby={errors.body ? 'admin-announcement-body-error' : undefined}
                rows={4}
                placeholder={t('announcements.admin_announcements_modal.text_6021925ec7')}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-primary resize-none focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
               data-testid="admin_announcements-admin_announcements-modal-control-2"/>
              {errors.body && <p id="admin-announcement-body-error" role="alert" className="text-xs text-danger mt-1">{t(errors.body.message ?? 'announcements.validation.bodyRequired')}</p>}
            </div>

            {/* Priority + Pin row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="admin-announcement-priority" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">{t('announcements.admin_announcements_modal.text_7568d32184')}</label>
                <select
                  id="admin-announcement-priority"
                  {...register('priority')}
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
                 data-testid="admin_announcements-admin_announcements-modal-control-3">
                  {ANNOUNCEMENT_PRIORITY_OPTIONS.map((o, __testIdIndex81) => (
                    <option key={o.value} value={o.value} data-testid={`admin_announcements-admin_announcements-modal-control-4-map81-${__testIdIndex81}-1`}>{t(o.labelKey)}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <label htmlFor="admin-announcement-pinned" className="flex items-center gap-3 cursor-pointer p-3 bg-input border border-border rounded-xl hover:border-focus motion-safe:transition-colors motion-safe:duration-base">
                  <input id="admin-announcement-pinned" type="checkbox" {...register('isPinned')} className="w-4 h-4 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"  data-testid="admin_announcements-admin_announcements-modal-control-5"/>
                  <div>
                    <p className="text-sm font-semibold text-primary">{t('announcements.admin_announcements_modal.text_f49bd7f256')}</p>
                    <p className="text-xs text-secondary">{t('announcements.admin_announcements_modal.text_81962d4053')}</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Audience */}
            <div>
              <fieldset aria-describedby={errors.audience ? 'admin-announcement-audience-error' : undefined} className="min-w-0">
              <legend className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">{t('announcements.admin_announcements_modal.text_ed59b37623')}</legend>
              <Controller
                name="audience"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {ANNOUNCEMENT_AUDIENCE_OPTIONS.map((o, __testIdIndex105) => {
                      const selected = field.value.includes(o.value);
                      return (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => field.onChange(toggleArrayValue(field.value, o.value))}
                          aria-pressed={selected}
                          className={`motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-colors ${
                            selected
                              ? 'bg-primary text-on-primary border-focus'
                              : 'bg-input text-secondary border-border hover:border-focus hover:text-primary'
                          }`}
                         data-testid={`admin_announcements-admin_announcements-modal-click-3-map105-${__testIdIndex105}-1`}>
                          {t(o.labelKey)}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.audience && <p id="admin-announcement-audience-error" role="alert" className="text-xs text-danger mt-1">{t(errors.audience.message ?? 'announcements.validation.audienceRequired')}</p>}
              </fieldset>
            </div>

            {/* Gyms — admin can only target their own branches, never cross-tenant */}
            <div>
              <fieldset aria-describedby={errors.gymIds ? 'admin-announcement-gyms-error' : undefined} className="min-w-0">
              <legend className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">{t('announcements.admin_announcements_modal.text_5193fbc75c')}</legend>
              <Controller
                name="gymIds"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {ANNOUNCEMENT_COMPOSE_GYM_OPTIONS.map((o, __testIdIndex136) => {
                      const selected = field.value.includes(o.value);
                      return (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => field.onChange(toggleArrayValue(field.value, o.value))}
                          aria-pressed={selected}
                          className={`motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-colors ${
                            selected
                              ? 'bg-primary text-on-primary border-focus'
                              : 'bg-input text-secondary border-border hover:border-focus hover:text-primary'
                          }`}
                         data-testid={`admin_announcements-admin_announcements-modal-click-4-map136-${__testIdIndex136}-1`}>
                          {t(o.labelKey)}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.gymIds && <p id="admin-announcement-gyms-error" role="alert" className="text-xs text-danger mt-1">{t(errors.gymIds.message ?? 'announcements.validation.gymsRequired')}</p>}
              </fieldset>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="admin-announcement-published-at" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">{t('announcements.admin_announcements_modal.text_0ed4cd1e4c')}</label>
                <input
                  id="admin-announcement-published-at"
                  type="datetime-local"
                  {...register('publishedAt')}
                  aria-invalid={Boolean(errors.publishedAt)} aria-describedby={errors.publishedAt ? 'admin-announcement-published-at-error' : undefined}
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
                 data-testid="admin_announcements-admin_announcements-modal-control-6"/>
                {errors.publishedAt && <p id="admin-announcement-published-at-error" role="alert" className="text-xs text-danger mt-1">{t(errors.publishedAt.message ?? 'announcements.validation.publishedAtRequired')}</p>}
              </div>
              <div>
                <label htmlFor="admin-announcement-expires-at" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">{t('announcements.admin_announcements_modal.text_c8f7179844')}</label>
                <input
                  id="admin-announcement-expires-at"
                  type="datetime-local"
                  {...register('expiresAt')}
                  aria-invalid={Boolean(errors.expiresAt)} aria-describedby={errors.expiresAt ? 'admin-announcement-expires-at-error' : undefined}
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
                 data-testid="admin_announcements-admin_announcements-modal-control-7"/>
                {errors.expiresAt && <p id="admin-announcement-expires-at-error" role="alert" className="text-xs text-danger mt-1">{t(errors.expiresAt.message ?? 'announcements.validation.expiresAtRequired')}</p>}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-overlay border-t border-border pt-3 flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => void handleClose()}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
               data-testid="admin_announcements-admin_announcements-modal-click-5">
                {t('announcements.admin_announcements_modal.text_77dfd2135f')}</button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-on-primary rounded-xl text-sm font-semibold motion-safe:transition-colors flex items-center justify-center gap-2 disabled:opacity-60 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
               data-testid="admin_announcements-admin_announcements-modal-submit-2">
                {saving ? <Loader2 size={18} className="motion-safe:animate-spin motion-safe:duration-base"  strokeWidth={2}/> : null}
                {isEdit ? t('announcements.admin_announcements_modal.auto_ab2edcb408') : t('announcements.admin_announcements_modal.auto_0727937d60')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
