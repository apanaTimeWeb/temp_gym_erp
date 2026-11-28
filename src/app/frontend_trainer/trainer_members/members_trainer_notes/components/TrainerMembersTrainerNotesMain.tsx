// RESPONSIBILITY: Composes the member-notes panel and form views; persistence and query state stay in the module hook/API.
'use client';
import type { TrainerMembersTrainerNotesFormValues, TrainerMembersTrainerNotesNavigateEvent } from '../types/TrainerMembersMembersTrainerNotesAuxiliaryTypes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowUpDown, Check, ChevronLeft, ChevronRight, Download, ExternalLink, Loader2, Pencil, RefreshCw, Search, Trash2, Users, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiFetch } from '@/lib/api';
import { TrainerMembersTrainerNotesFormSchema } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/schemas/TrainerMembersTrainerNotesSchemas';
import { TRAINER_NOTES_QUERY, TRAINER_NOTES_ROUTES, TRAINER_NOTES_PAGE_LIST } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/config/trainer_members_trainer_notes.url_config';
import { useTrainerMembersTrainerNotes } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/hooks/useTrainerMembersTrainerNotes';

interface MemberDirectoryOption {
  id: string;
  name: string;
  status?: string;
  fitnessGoal?: string;
}

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
  const membersQuery = useQuery({
    queryKey: ['trainer', 'members', 'notes-selector'],
    queryFn: async () => {
      const res = await apiFetch<{ members?: Array<{ id: string; name: string; status?: string; fitnessGoal?: string }> }>('/trainer/members?limit=100');
      if (!res?.success || !Array.isArray(res.data?.members)) {
        throw new Error('Failed to load members');
      }
      return res.data.members.map((m) => ({
        id: m.id,
        name: m.name,
        status: m.status,
        fitnessGoal: m.fitnessGoal,
      })) satisfies MemberDirectoryOption[];
    },
  });

  const membersList = useMemo(() => membersQuery.data ?? [], [membersQuery.data]);
  const membersLoading = membersQuery.isPending;
  const membersError = membersQuery.isError;
  const loadMembers = () => membersQuery.refetch();

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [originalEditingText, setOriginalEditingText] = useState('');
  const [editingText, setEditingText] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [noteSearch, setNoteSearch] = useState('');
  const [noteSortOrder, setNoteSortOrder] = useState<'desc' | 'asc'>('desc');
  const [notesPage, setNotesPage] = useState(1);
  const notesPerPage = 10;

  useEffect(() => {
    if (!memberId && !membersLoading && membersList.length > 0) {
      router.replace(`${TRAINER_NOTES_PAGE_LIST}?id=${encodeURIComponent(membersList[0]!.id)}`);
    }
  }, [memberId, membersList, membersLoading, router]);

  const { detail, addNote, updateNote, deleteNote } = useTrainerMembersTrainerNotes(memberId);
  const submission = useRef<{ memberId: string; text: string; key: string } | null>(null);
  const { register, handleSubmit, reset, control, formState: { errors, isDirty } } = useForm<TrainerMembersTrainerNotesFormValues>({
    resolver: zodResolver(TrainerMembersTrainerNotesFormSchema),
    defaultValues: { text: '' },
  });

  const watchedDraft = useWatch({ control, name: 'text', defaultValue: '' }) ?? '';
  const hasDraftText = watchedDraft.trim().length > 0;
  const hasInlineEditChanges = editingNoteId !== null && editingText.trim() !== originalEditingText.trim();
  const hasUnsavedWork = (isDirty && hasDraftText) || hasInlineEditChanges;
  const isAnyMutationPending = addNote.isPending || updateNote.isPending || deleteNote.isPending;

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

  const selectedMemberMeta = membersList.find((m) => m.id === memberId);

  const handleExportNotesCsv = () => {
    if (!detail.data || filteredSortedNotes.length === 0) return;
    const header = ['Member ID', 'Member Name', 'Note ID', 'Date', 'Note'];
    const csvRows = [
      header.join(','),
      ...filteredSortedNotes.map((n) =>
        [
          detail.data!.id,
          `"${String(detail.data!.name ?? '').replace(/"/g, '""')}"`,
          n.id,
          n.date,
          `"${String(n.text ?? '').replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${detail.data.id}_trainer_notes.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!hasUnsavedWork || isAnyMutationPending) return;
    const warnBeforeClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeClose);
    return () => window.removeEventListener('beforeunload', warnBeforeClose);
  }, [hasUnsavedWork, isAnyMutationPending]);

  useEffect(() => {
    if (!hasUnsavedWork || isAnyMutationPending) {
      allowedDestination.current = null;
      return undefined;
    }
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
      event.preventDefault();
      event.stopPropagation();
      pendingNavigation.current = { url: destination.href };
      setPendingDestination(`${destination.pathname}${destination.search}${destination.hash}`);
      setConfirmNavigation(true);
    };

    const interceptNavigation = (native: Event) => {
      const event = native as TrainerMembersTrainerNotesNavigateEvent;
      if (!event.cancelable || !event.canIntercept || !event.destination?.url) return;
      const destination = new URL(event.destination.url);
      if (destination.origin !== window.location.origin || destination.href === window.location.href) return;
      if (allowedDestination.current === destination.href) {
        allowedDestination.current = null;
        return;
      }
      native.preventDefault();
      pendingNavigation.current = {
        url: destination.href,
        traversalKey: event.navigationType === 'traverse' ? event.destination.key : undefined,
      };
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
  }, [hasUnsavedWork, isAnyMutationPending]);

  useEffect(() => {
    if (!confirmNavigation) return undefined;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? []);
    focusable()[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        pendingNavigation.current = null;
        setConfirmNavigation(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const buttons = focusable();
      if (buttons.length === 0) return;
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
      previousFocus?.focus();
    };
  }, [confirmNavigation]);

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const handleMemberChange = (nextMemberId: string) => {
    if (!nextMemberId || nextMemberId === memberId) return;
    const nextUrl = `${TRAINER_NOTES_PAGE_LIST}?id=${encodeURIComponent(nextMemberId)}`;
    if (hasUnsavedWork) {
      pendingNavigation.current = { url: new URL(nextUrl, window.location.origin).href };
      setPendingDestination(nextUrl);
      setConfirmNavigation(true);
      return;
    }
    setEditingNoteId(null);
    setEditingText('');
    setOriginalEditingText('');
    setNoteSearch('');
    setNotesPage(1);
    router.push(nextUrl);
  };

  const handleSaveNote = async (values: TrainerMembersTrainerNotesFormValues) => {
    if (!memberId || addNote.isPending) return;
    if (!submission.current || submission.current.memberId !== memberId || submission.current.text !== values.text) {
      submission.current = { memberId, text: values.text, key: crypto.randomUUID() };
    }
    try {
      const response = await addNote.mutateAsync({ text: values.text, key: submission.current.key });
      reset({ text: '' });
      submission.current = null;
      setNotesPage(1);
      showFeedback(response.message || 'Trainer note saved successfully.');
    } catch {
      /* Inline query/mutation error states communicate failure; draft is retained. */
    }
  };

  const handleUpdateNote = async (noteId: string) => {
    const cleanText = editingText.trim();
    if (!cleanText || cleanText === originalEditingText.trim() || updateNote.isPending) return;
    try {
      const response = await updateNote.mutateAsync({ noteId, text: cleanText });
      setEditingNoteId(null);
      setEditingText('');
      setOriginalEditingText('');
      showFeedback(response.message || 'Trainer note updated.');
    } catch {
      /* Inline error banner communicates failure cleanly */
    }
  };

  const handleConfirmDeleteNote = async () => {
    if (!deleteTargetId || deleteNote.isPending) return;
    try {
      const response = await deleteNote.mutateAsync(deleteTargetId);
      if (editingNoteId === deleteTargetId) {
        setEditingNoteId(null);
        setEditingText('');
        setOriginalEditingText('');
      }
      setDeleteTargetId(null);
      showFeedback(response.message || 'Trainer note deleted.');
    } catch {
      /* Inline error banner communicates failure cleanly */
    }
  };

  return (
    <section className="space-y-5 p-4 sm:p-6 text-text-primary max-w-5xl mx-auto w-full" aria-labelledby="trainer-notes-title">
      {/* Header + Member Selector */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 id="trainer-notes-title" className="text-page-title font-bold">{t('TEXT_TRAINER_NOTES')}</h1>
          <p className="text-xs text-secondary mt-0.5">Select a member to view, edit, or record private coaching notes.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <label htmlFor="trainer-notes-member-select" className="text-xs font-semibold text-secondary inline-flex items-center gap-1.5">
            <Users size={14} className="text-primary" aria-hidden="true" />
            Member:
          </label>
          {membersLoading ? (
            <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-input px-3 py-2 text-xs text-secondary">
              <Loader2 size={14} className="motion-safe:animate-spin" /> Loading members...
            </span>
          ) : membersError ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-danger">Failed to load members</span>
              <button
                type="button"
                onClick={() => void loadMembers()}
                className="min-h-9 rounded-lg border border-border bg-input px-3 text-xs font-semibold text-text-primary hover:bg-surface-hover cursor-pointer"
              >
                {t('TEXT_RETRY')}
              </button>
            </div>
          ) : membersList.length === 0 ? (
            <span className="text-xs text-secondary rounded-xl border border-border bg-input px-3 py-2">No members assigned</span>
          ) : (
            <select
              id="trainer-notes-member-select"
              value={memberId}
              onChange={(e) => handleMemberChange(e.target.value)}
              className="min-h-10 min-w-[230px] flex-1 sm:flex-initial rounded-xl border border-border bg-white dark:bg-[#0F172A] dark:[color-scheme:dark] px-3 py-2 text-sm font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
              data-testid="trainer_notes-member-select"
            >
              {!memberId && <option value="">Select a member...</option>}
              {membersList.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.id}){m.status ? ` — ${m.status}` : ''}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMessage && (
        <div role="status" className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-300 flex items-center justify-between gap-2">
          <span>{feedbackMessage}</span>
          <button type="button" onClick={() => setFeedbackMessage(null)} aria-label="Dismiss message" className="p-1 rounded hover:bg-emerald-500/20 cursor-pointer">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Unsaved Changes Confirmation Modal */}
      {confirmNavigation && (
        <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-backdrop p-4 overflow-y-auto">
          <div ref={dialogRef} role="alertdialog" aria-modal="true" aria-labelledby="trainer-notes-unsaved-title" aria-describedby="trainer-notes-unsaved-description" className="my-auto w-full max-w-md rounded-xl border border-border bg-white dark:bg-[#0F172A] p-6 shadow-dialog">
            <h2 id="trainer-notes-unsaved-title" className="text-lg font-semibold text-text-primary">{t('TEXT_UNSAVED_NOTES_TITLE')}</h2>
            <p id="trainer-notes-unsaved-description" className="mt-2 text-sm text-secondary">{t('TEXT_UNSAVED_NOTES_DESCRIPTION')}</p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                className="min-h-11 rounded-lg border border-border bg-input px-4 text-sm font-semibold text-text-primary hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                autoFocus
                onClick={() => { pendingNavigation.current = null; setConfirmNavigation(false); }}
              >
                {t('TEXT_STAY')}
              </button>
              <button
                type="button"
                className="min-h-11 rounded-lg bg-danger px-4 text-sm font-semibold text-on-danger hover:opacity-90 focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                onClick={() => {
                  const pending = pendingNavigation.current;
                  pendingNavigation.current = null;
                  setConfirmNavigation(false);
                  setEditingNoteId(null);
                  setEditingText('');
                  setOriginalEditingText('');
                  reset({ text: '' });
                  const target = pending?.url ?? new URL(pendingDestination, window.location.href).href;
                  allowedDestination.current = target;
                  const navigation = (window as Window & { navigation?: { traverseTo?: (key: string) => Promise<unknown> } }).navigation;
                  if (pending?.traversalKey && navigation?.traverseTo) {
                    void navigation.traverseTo(pending.traversalKey).catch(() => { allowedDestination.current = null; });
                  } else {
                    router.push(pendingDestination);
                  }
                }}
              >
                {t('TEXT_DISCARD_AND_LEAVE')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Note Confirmation Modal */}
      {deleteTargetId && (
        <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-backdrop p-4 overflow-y-auto">
          <div role="alertdialog" aria-modal="true" aria-labelledby="trainer-notes-delete-title" aria-describedby="trainer-notes-delete-desc" className="my-auto w-full max-w-md rounded-xl border border-border bg-white dark:bg-[#0F172A] p-6 shadow-dialog">
            <h2 id="trainer-notes-delete-title" className="text-lg font-semibold text-text-primary">{t('TEXT_DELETE_NOTE_CONFIRM_TITLE')}</h2>
            <p id="trainer-notes-delete-desc" className="mt-2 text-sm text-secondary">{t('TEXT_DELETE_NOTE_CONFIRM_DESC')}</p>
            {deleteNote.isError && <p role="alert" className="mt-3 text-xs text-danger">{t('TEXT_GENERIC_REQUEST_ERROR')}</p>}
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                disabled={deleteNote.isPending}
                onClick={() => setDeleteTargetId(null)}
                className="min-h-11 rounded-lg border border-border bg-input px-4 text-sm font-semibold text-text-primary hover:bg-surface-hover cursor-pointer"
              >
                {t('TEXT_CANCEL')}
              </button>
              <button
                type="button"
                disabled={deleteNote.isPending}
                onClick={() => void handleConfirmDeleteNote()}
                className="min-h-11 inline-flex items-center gap-2 rounded-lg bg-danger px-4 text-sm font-semibold text-on-danger disabled:opacity-60 cursor-pointer"
              >
                {deleteNote.isPending ? <><Loader2 size={15} className="motion-safe:animate-spin" /> {t('TEXT_DELETING')}</> : t('TEXT_DELETE')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content States */}
      {!memberId ? (
        membersLoading ? (
          <div role="status" className="min-h-24 rounded-xl bg-skeleton-base p-5 text-secondary motion-safe:animate-pulse">{t('TEXT_LOADING_MEMBER_PROFILE')}</div>
        ) : (
          <p className="rounded-xl border border-border bg-card p-5 text-secondary">{t('TEXT_NO_MEMBER_SELECTED')}</p>
        )
      ) : detail.isPending ? (
        <div role="status" className="min-h-24 rounded-xl bg-skeleton-base p-5 text-secondary motion-safe:animate-pulse">{t('TEXT_LOADING_MEMBER_PROFILE')}</div>
      ) : detail.isError ? (
        <div role="alert" className="rounded-xl border border-border bg-danger-bg p-5 space-y-3">
          <p className="text-danger font-medium">{t('TEXT_GENERIC_REQUEST_ERROR')}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary cursor-pointer" onClick={() => void detail.refetch()}>{t('TEXT_RETRY')}</button>
            {membersList.length > 0 && membersList[0]!.id !== memberId && (
              <button
                type="button"
                className="min-h-11 rounded-lg border border-border bg-card px-4 text-sm font-semibold text-text-primary cursor-pointer"
                onClick={() => handleMemberChange(membersList[0]!.id)}
              >
                Select {membersList[0]!.name}
              </button>
            )}
          </div>
        </div>
      ) : detail.data ? (
        <>
          {/* Selected Member Summary + Notes Search/Sort */}
          <div className="rounded-xl border border-border bg-card p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 min-w-0">
              <p className="font-bold text-base text-text-primary">{detail.data.name}</p>
              <span className="px-2 py-0.5 rounded-md bg-input border border-border text-xs font-mono text-secondary">{detail.data.id}</span>
              {selectedMemberMeta?.status && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                  {selectedMemberMeta.status}
                </span>
              )}
              {selectedMemberMeta?.fitnessGoal && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300">
                  {selectedMemberMeta.fitnessGoal}
                </span>
              )}
              <Link
                href={`${TRAINER_NOTES_ROUTES.DIRECTORY}?id=${encodeURIComponent(detail.data.id)}&view=notes`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                View Profile <ExternalLink size={12} />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(detail.data.trainerNotes ?? []).length > 0 && (
                <>
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
                  {filteredSortedNotes.length > 0 && (
                    <button
                      type="button"
                      onClick={handleExportNotesCsv}
                      className="min-h-9 inline-flex items-center gap-1.5 rounded-lg border border-teal-500/35 bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-600 dark:text-teal-300 hover:bg-teal-500/25 cursor-pointer"
                      data-testid="trainer_notes-export-csv"
                    >
                      <Download size={13} aria-hidden="true" />
                      <span>Export</span>
                    </button>
                  )}
                </>
              )}
              <button
                type="button"
                onClick={() => void detail.refetch()}
                disabled={detail.isFetching}
                aria-label="Refresh notes"
                title="Refresh notes"
                className="min-h-9 inline-flex items-center gap-1.5 rounded-lg border border-sky-500/35 bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-300 hover:bg-sky-500/25 disabled:opacity-60 cursor-pointer"
                data-testid="trainer_notes-refresh"
              >
                <RefreshCw size={13} className={detail.isFetching ? 'motion-safe:animate-spin' : ''} aria-hidden="true" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {updateNote.isError && (
            <p role="alert" className="rounded-xl border border-danger/30 bg-danger-bg px-4 py-2.5 text-sm text-danger">
              {t('TEXT_GENERIC_REQUEST_ERROR')}
            </p>
          )}

          {/* Notes List */}
          <div className="space-y-3">
            {(detail.data.trainerNotes ?? []).length === 0 ? (
              <p className="rounded-xl border border-border bg-card p-5 text-sm text-secondary">{t('TEXT_NO_NOTES_HAVE_BEEN_ADDED_FOR_THIS_MEMBER_YET')}</p>
            ) : filteredSortedNotes.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-5 flex items-center justify-between gap-3">
                <p className="text-sm text-secondary">No matching notes found.</p>
                <button
                  type="button"
                  onClick={() => { setNoteSearch(''); setNotesPage(1); }}
                  className="min-h-9 rounded-lg border border-border bg-input px-3 text-xs font-semibold text-text-primary cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              paginatedNotes.map((note) => (
                <article key={note.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <time className="text-xs font-medium text-secondary" dateTime={note.date}>{note.date}</time>
                    <div className="flex items-center gap-2">
                      {editingNoteId === note.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => void handleUpdateNote(note.id)}
                            disabled={updateNote.isPending || !editingText.trim() || editingText.trim() === originalEditingText.trim()}
                            className="min-h-8 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-emerald-500/35 bg-emerald-500/15 text-xs font-semibold text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/25 disabled:opacity-50 cursor-pointer"
                          >
                            {updateNote.isPending ? <Loader2 size={13} className="motion-safe:animate-spin" /> : <Check size={13} />}
                            <span>{updateNote.isPending ? t('TEXT_SAVING_CHANGES') : t('TEXT_SAVE_CHANGES')}</span>
                          </button>
                          <button
                            type="button"
                            disabled={updateNote.isPending}
                            onClick={() => { setEditingNoteId(null); setEditingText(''); setOriginalEditingText(''); }}
                            className="min-h-8 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border bg-input text-xs font-semibold text-secondary hover:text-text-primary cursor-pointer"
                          >
                            <X size={13} />
                            <span>{t('TEXT_CANCEL')}</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            disabled={isAnyMutationPending}
                            onClick={() => { setEditingNoteId(note.id); setEditingText(note.text); setOriginalEditingText(note.text); }}
                            className="min-h-8 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs font-semibold text-amber-600 dark:text-amber-300 hover:bg-amber-500/20 disabled:opacity-50 cursor-pointer"
                          >
                            <Pencil size={13} />
                            <span>{t('TEXT_EDIT')}</span>
                          </button>
                          <button
                            type="button"
                            disabled={isAnyMutationPending}
                            onClick={() => setDeleteTargetId(note.id)}
                            className="min-h-8 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 text-xs font-semibold text-rose-500 hover:bg-rose-500/20 disabled:opacity-50 cursor-pointer"
                          >
                            <Trash2 size={13} />
                            <span>{t('TEXT_DELETE')}</span>
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
                      className="mt-2.5 w-full rounded-lg border border-border bg-input p-2.5 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                    />
                  ) : (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-text-primary">{note.text}</p>
                  )}
                </article>
              ))
            )}

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

          {/* Add Note Form */}
          <form className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-card" onSubmit={(event) => void handleSubmit(handleSaveNote)(event)}>
            <label htmlFor="trainer-notes-text" className="block text-sm font-semibold">{t('TEXT_ADD_NOTE')}</label>
            <textarea
              id="trainer-notes-text"
              rows={4}
              disabled={addNote.isPending}
              placeholder="Write observation, form cue, injury update, or follow-up reminder..."
              aria-invalid={Boolean(errors.text)}
              aria-describedby={errors.text ? 'trainer-notes-validation' : undefined}
              {...register('text')}
              className="min-h-24 w-full rounded-lg border border-border bg-input p-3 text-sm text-text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
            {errors.text && <p id="trainer-notes-validation" role="alert" className="text-sm text-danger">{t('TEXT_NOTE')} {t('TEXT_REQUIRED')}</p>}
            {addNote.isError && <p role="alert" className="text-sm text-danger">{t('TEXT_GENERIC_REQUEST_ERROR')}</p>}
            <div className="flex flex-wrap items-center gap-3">
              <button
                disabled={addNote.isPending || !hasDraftText}
                type="submit"
                className="min-h-11 inline-flex items-center gap-2 rounded-lg bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                data-testid="trainer_notes-save-button"
              >
                {addNote.isPending ? <><Loader2 size={16} className="motion-safe:animate-spin" /> {t('TEXT_SAVING_NOTE')}</> : t('TEXT_SAVE_NOTE')}
              </button>
              {hasDraftText && !addNote.isPending && (
                <button
                  type="button"
                  onClick={() => reset({ text: '' })}
                  className="min-h-11 rounded-lg border border-border bg-input px-4 text-sm font-semibold text-secondary hover:text-text-primary cursor-pointer"
                >
                  {t('TEXT_CLEAR_DRAFT')}
                </button>
              )}
            </div>
          </form>
        </>
      ) : (
        <p role="status" className="text-secondary">{t('TEXT_GENERIC_REQUEST_ERROR')}</p>
      )}
    </section>
  );
}

export type { TrainerMembersTrainerNotesFormValues, TrainerMembersTrainerNotesNavigateEvent } from '../types/TrainerMembersMembersTrainerNotesAuxiliaryTypes';
