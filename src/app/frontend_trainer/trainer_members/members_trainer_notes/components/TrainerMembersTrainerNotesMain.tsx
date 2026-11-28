// RESPONSIBILITY: Composes the member-notes panel and form views; persistence and query state stay in the module hook/API.
'use client';
import type { TrainerMembersTrainerNotesFormValues, TrainerMembersTrainerNotesNavigateEvent } from '../types/TrainerMembersMembersTrainerNotesAuxiliaryTypes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight, Pencil, Search, Trash2, Check, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiFetch } from '@/lib/api';
import { TrainerMembersTrainerNotesFormSchema } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/schemas/TrainerMembersTrainerNotesSchemas';
import { TRAINER_NOTES_QUERY, TRAINER_NOTES_ROUTES, TRAINER_NOTES_PAGE_LIST } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/config/trainer_members_trainer_notes.url_config';
import { useTrainerMembersTrainerNotes } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/hooks/useTrainerMembersTrainerNotes';


export default function TrainerMembersTrainerNotesMain() {
  const t = useTranslations('TRAINER_MEMBERS');
  const params = useSearchParams();
  const router = useRouter();
  const [confirmNavigation, setConfirmNavigation] = useState(false);
  const [pendingDestination, setPendingDestination] = useState<string>(TRAINER_NOTES_ROUTES.DIRECTORY);
  const pendingNavigation = useRef<{ url: string; traversalKey?: string } | null>(null);
  const allowedDestination = useRef<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const memberId = params.get(TRAINER_NOTES_QUERY.MEMBER_ID)?.trim() ?? '';
  const [membersList, setMembersList] = useState<Array<{ id: string; name: string }>>([]);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [noteSearch, setNoteSearch] = useState('');
  const [noteSortOrder, setNoteSortOrder] = useState<'desc' | 'asc'>('desc');
  const [notesPage, setNotesPage] = useState(1);
  const notesPerPage = 10;

  useEffect(() => {
    let active = true;
    apiFetch<{ members?: Array<{ id: string; name: string }> }>('/trainer/members?limit=50')
      .then((res) => {
        if (active && res?.success && Array.isArray(res.data?.members)) {
          setMembersList(res.data.members.map((m) => ({ id: m.id, name: m.name })));
        }
      })
      .catch(() => null);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!memberId) {
      router.replace(`${TRAINER_NOTES_PAGE_LIST}?id=MEM-001`);
    }
  }, [memberId, router]);

  const { detail, addNote, updateNote, deleteNote } = useTrainerMembersTrainerNotes(memberId);
  const filteredSortedNotes = useMemo(() => {
    const rawNotes = detail.data?.trainerNotes ?? [];
    const q = noteSearch.trim().toLowerCase();
    const matched = q
      ? rawNotes.filter((n) => n.text.toLowerCase().includes(q) || n.date.toLowerCase().includes(q))
      : rawNotes;
    return [...matched].sort((a, b) => {
      const cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      return noteSortOrder === 'asc' ? cmp : -cmp;
    });
  }, [detail.data?.trainerNotes, noteSearch, noteSortOrder]);
  const totalNotesPages = Math.max(1, Math.ceil(filteredSortedNotes.length / notesPerPage));
  const safeNotesPage = Math.min(notesPage, totalNotesPages);
  const paginatedNotes = filteredSortedNotes.slice((safeNotesPage - 1) * notesPerPage, safeNotesPage * notesPerPage);
  const submission = useRef<{ memberId: string; text: string; key: string } | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<TrainerMembersTrainerNotesFormValues>({
    resolver: zodResolver(TrainerMembersTrainerNotesFormSchema), defaultValues: { text: '' },
  });
  useEffect(() => {
    if (!isDirty || addNote.isPending) return;
    const warnBeforeClose = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warnBeforeClose);
    return () => window.removeEventListener('beforeunload', warnBeforeClose);
  }, [isDirty, addNote.isPending]);
  useEffect(() => {
    if (!isDirty || addNote.isPending) { allowedDestination.current = null; return undefined; }
    const currentUrl = window.location.href;
    const currentHistoryState = window.history.state as unknown;

    const navigation = (window as Window & { navigation?: EventTarget & { traverseTo?: (key: string) => Promise<unknown> } }).navigation;
    const interceptLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.download || (anchor.target && anchor.target !== '_self')) return;
      if (anchor.origin !== window.location.origin) return;
      const destination = new URL(anchor.href);
      const current = new URL(window.location.href);
      if (destination.pathname === current.pathname && destination.search === current.search && destination.hash === current.hash) return;
      event.preventDefault(); event.stopPropagation();
      pendingNavigation.current = { url: destination.href };
      setPendingDestination(`${destination.pathname}${destination.search}${destination.hash}`);
      setConfirmNavigation(true);
    };
    const interceptNavigation = (native: Event) => {
      const event = native as TrainerMembersTrainerNotesNavigateEvent;
      if (!event.cancelable || !event.canIntercept || !event.destination?.url) return;
      const destination = new URL(event.destination.url);
      if (destination.origin !== window.location.origin || destination.href === window.location.href) return;
      if (allowedDestination.current === destination.href) { allowedDestination.current = null; return; }
      native.preventDefault();
      pendingNavigation.current = { url: destination.href, traversalKey: event.navigationType === 'traverse' ? event.destination.key : undefined };
      setPendingDestination(`${destination.pathname}${destination.search}${destination.hash}`);
      setConfirmNavigation(true);
    };
    const interceptPopState = () => {
      if (navigation || window.location.href === currentUrl) return;
      const destination = new URL(window.location.href);
      window.history.pushState(currentHistoryState, '', currentUrl);
      pendingNavigation.current = { url: destination.href };
      setPendingDestination(`${destination.pathname}${destination.search}${destination.hash}`);
      setConfirmNavigation(true);
    };
    document.addEventListener('click', interceptLink, true);
    navigation?.addEventListener('navigate', interceptNavigation);
    window.addEventListener('popstate', interceptPopState, true);
    return () => {
      document.removeEventListener('click', interceptLink, true);
      navigation?.removeEventListener('navigate', interceptNavigation);
      window.removeEventListener('popstate', interceptPopState, true);
      allowedDestination.current = null;
    };
  }, [isDirty, addNote.isPending]);
  useEffect(() => {
    if (!confirmNavigation) return undefined;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? []);
    focusable()[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault(); pendingNavigation.current = null; setConfirmNavigation(false); return;
      }
      if (event.key !== 'Tab') return;
      const buttons = focusable();
      if (buttons.length === 0) return;
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); previousFocus?.focus(); };
  }, [confirmNavigation]);
  const handleSaveNote = async (values: TrainerMembersTrainerNotesFormValues) => {
    if (!memberId || addNote.isPending) return;
    if (!submission.current || submission.current.memberId !== memberId || submission.current.text !== values.text) {
      submission.current = { memberId, text: values.text, key: crypto.randomUUID() };
    }
    try {
      await addNote.mutateAsync({ text: values.text, key: submission.current.key });
      reset({ text: '' }); submission.current = null;
    } catch { /* Inline query/mutation error states communicate failure; draft is retained. */ }
  };
  return <section className="space-y-5 p-4 sm:p-6 text-text-primary" aria-labelledby="trainer-notes-title">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 id="trainer-notes-title" className="text-page-title font-bold">{t('TEXT_TRAINER_NOTES')}</h1>
      {membersList.length > 0 && (
        <div className="flex items-center gap-2">
          <label htmlFor="trainer-notes-member-select" className="text-xs font-semibold text-secondary">Trainee:</label>
          <select
            id="trainer-notes-member-select"
            value={memberId}
            onChange={(e) => router.push(`${TRAINER_NOTES_PAGE_LIST}?id=${encodeURIComponent(e.target.value)}`)}
            className="min-h-10 rounded-xl border border-border bg-input px-3 py-1.5 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
          >
            {membersList.map((m) => (
              <option key={m.id} value={m.id}>{m.name} ({m.id})</option>
            ))}
          </select>
        </div>
      )}
    </div>
    {confirmNavigation && <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-backdrop p-4 overflow-y-auto">
      <div ref={dialogRef} role="alertdialog" aria-modal="true" aria-labelledby="trainer-notes-unsaved-title" aria-describedby="trainer-notes-unsaved-description" className="my-auto w-full max-w-md rounded-xl border border-border bg-overlay p-6 shadow-dialog">
        <h2 id="trainer-notes-unsaved-title" className="text-lg font-semibold">{t('TEXT_UNSAVED_NOTES_TITLE')}</h2>
        <p id="trainer-notes-unsaved-description" className="mt-2 text-sm text-secondary">{t('TEXT_UNSAVED_NOTES_DESCRIPTION')}</p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button type="button" className="min-h-11 rounded-lg border border-border px-4 focus-visible:ring-2 focus-visible:ring-focus-ring" autoFocus onClick={() => { pendingNavigation.current = null; setConfirmNavigation(false); }}>{t('TEXT_STAY')}</button>
          <button type="button" className="min-h-11 rounded-lg bg-danger px-4 text-on-danger focus-visible:ring-2 focus-visible:ring-focus-ring" onClick={() => {
            const pending = pendingNavigation.current;
            pendingNavigation.current = null;
            setConfirmNavigation(false);
            const target = pending?.url ?? new URL(pendingDestination, window.location.href).href;
            allowedDestination.current = target;
            const navigation = (window as Window & { navigation?: { traverseTo?: (key: string) => Promise<unknown> } }).navigation;
            if (pending?.traversalKey && navigation?.traverseTo) {
              void navigation.traverseTo(pending.traversalKey).catch(() => { allowedDestination.current = null; });
            } else router.push(pendingDestination);
          }}>{t('TEXT_DISCARD_AND_LEAVE')}</button>
        </div>
      </div>
    </div>}
    {!memberId ? <p className="rounded-xl border border-border bg-card p-5 text-secondary">{t('TEXT_NO_MEMBER_SELECTED')}</p> :
    detail.isPending ? <div role="status" className="min-h-24 rounded-xl bg-skeleton-base p-5 text-secondary motion-safe:animate-pulse">{t('TEXT_LOADING_MEMBER_PROFILE')}</div> :
    detail.isError ? <div role="alert" className="rounded-xl border border-border bg-danger-bg p-5"><p className="text-danger">{t('TEXT_GENERIC_REQUEST_ERROR')}</p><button type="button" className="mt-3 min-h-11 rounded-lg bg-primary px-4 text-on-primary" onClick={() => void detail.refetch()}>{t('TEXT_RETRY')}</button></div> :
    detail.data ? <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold">{detail.data.name}</p>
        {(detail.data.trainerNotes ?? []).length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute start-2.5 top-1/2 -translate-y-1/2 text-sky-500" aria-hidden="true" />
              <input
                type="search"
                value={noteSearch}
                onChange={(e) => { setNoteSearch(e.target.value); setNotesPage(1); }}
                placeholder="Search notes..."
                aria-label="Search trainer notes"
                className="min-h-9 w-48 rounded-lg border border-border bg-input ps-8 pe-7 py-1 text-xs text-text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
              {noteSearch && (
                <button
                  type="button"
                  onClick={() => { setNoteSearch(''); setNotesPage(1); }}
                  aria-label="Clear note search"
                  className="absolute end-2 top-1/2 -translate-y-1/2 text-secondary hover:text-text-primary p-0.5 cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => { setNoteSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc')); setNotesPage(1); }}
              className="min-h-9 inline-flex items-center gap-1.5 rounded-lg border border-border bg-input px-3 py-1 text-xs font-semibold text-text-primary hover:bg-surface-hover cursor-pointer"
            >
              <ArrowUpDown size={13} className="text-orange-500" aria-hidden="true" />
              <span>{noteSortOrder === 'desc' ? 'Newest first' : 'Oldest first'}</span>
            </button>
          </div>
        )}
      </div>
      <div className="space-y-3">
        {(detail.data.trainerNotes ?? []).length === 0 ? <p className="rounded-xl border border-border bg-card p-4 text-secondary">{t('TEXT_NO_NOTES_HAVE_BEEN_ADDED_FOR_THIS_MEMBER_YET')}</p> :
        filteredSortedNotes.length === 0 ? <p className="rounded-xl border border-border bg-card p-4 text-secondary">No matching notes found.</p> :
        paginatedNotes.map(note => (
          <article key={note.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <time className="text-xs text-secondary" dateTime={note.date}>{note.date}</time>
              <div className="flex items-center gap-1.5">
                {editingNoteId === note.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        if (!editingText.trim()) return;
                        void updateNote.mutateAsync({ noteId: note.id, text: editingText.trim() }).then(() => { setEditingNoteId(null); setEditingText(''); });
                      }}
                      disabled={updateNote.isPending}
                      aria-label="Save note changes"
                      className="p-1.5 rounded-lg border border-emerald-500/35 bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 cursor-pointer"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEditingNoteId(null); setEditingText(''); }}
                      aria-label="Cancel note edit"
                      className="p-1.5 rounded-lg border border-border bg-input text-secondary hover:text-text-primary cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => { setEditingNoteId(note.id); setEditingText(note.text); }}
                      aria-label="Edit note"
                      className="p-1.5 rounded-lg border border-amber-500/25 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 cursor-pointer"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      disabled={deleteNote.isPending}
                      onClick={() => void deleteNote.mutateAsync(note.id)}
                      aria-label="Delete note"
                      className="p-1.5 rounded-lg border border-rose-500/25 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 disabled:opacity-50 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
            {editingNoteId === note.id ? (
              <textarea
                rows={3}
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-input p-2.5 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
            ) : (
              <p className="mt-2 whitespace-pre-wrap text-sm">{note.text}</p>
            )}
          </article>
        ))}
        {totalNotesPages > 1 && (
          <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-2.5 text-xs text-secondary">
            <span>
              Showing {(safeNotesPage - 1) * notesPerPage + 1}–{Math.min(safeNotesPage * notesPerPage, filteredSortedNotes.length)} of {filteredSortedNotes.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safeNotesPage <= 1}
                onClick={() => setNotesPage((p) => Math.max(1, p - 1))}
                className="min-h-8 inline-flex items-center gap-1 rounded-lg border border-border bg-input px-2.5 py-1 text-xs font-semibold text-text-primary disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft size={13} /> Prev
              </button>
              <span className="font-medium text-text-primary">Page {safeNotesPage} / {totalNotesPages}</span>
              <button
                type="button"
                disabled={safeNotesPage >= totalNotesPages}
                onClick={() => setNotesPage((p) => Math.min(totalNotesPages, p + 1))}
                className="min-h-8 inline-flex items-center gap-1 rounded-lg border border-border bg-input px-2.5 py-1 text-xs font-semibold text-text-primary disabled:opacity-40 cursor-pointer"
              >
                Next <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
      <form className="space-y-3 rounded-xl border border-border bg-card p-5" onSubmit={(event) => void handleSubmit(handleSaveNote)(event)}>
        <label htmlFor="trainer-notes-text" className="block text-sm font-semibold">{t('TEXT_ADD_NOTE')}</label>
        <textarea id="trainer-notes-text" rows={4} disabled={addNote.isPending} aria-invalid={Boolean(errors.text)} aria-describedby={errors.text ? 'trainer-notes-validation' : undefined} {...register('text')} className="min-h-24 w-full rounded-lg border border-border bg-input p-3 text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"/>
        {errors.text && <p id="trainer-notes-validation" role="alert" className="text-sm text-danger">{t('TEXT_NOTE')} {t('TEXT_REQUIRED')}</p>}
        {addNote.isError && <p role="alert" className="text-sm text-danger">{t('TEXT_GENERIC_REQUEST_ERROR')}</p>}
        <button disabled={addNote.isPending || !isDirty} type="submit" className="min-h-11 rounded-lg bg-primary px-4 font-semibold text-on-primary disabled:cursor-not-allowed disabled:opacity-50">{t('TEXT_SAVE_NOTE')}</button>
      </form>
    </> : <p role="status" className="text-secondary">{t('TEXT_GENERIC_REQUEST_ERROR')}</p>}
  </section>;
}


export type { TrainerMembersTrainerNotesFormValues, TrainerMembersTrainerNotesNavigateEvent } from '../types/TrainerMembersMembersTrainerNotesAuxiliaryTypes';
