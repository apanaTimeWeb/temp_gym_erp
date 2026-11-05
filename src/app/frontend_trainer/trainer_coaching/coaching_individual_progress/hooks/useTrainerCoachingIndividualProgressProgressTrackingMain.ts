"use client";
// RESPONSIBILITY: Owns Trainer Progress Tracking route orchestration state and action handlers; the Main component remains a view compositor.
// DATA FLOW: URL filters + feature queries + module store → useTrainerProgressTrackingMain → Main view and child components.
import { useMemo, useCallback, useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureConfirm } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureConfirm';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureIdempotencyKey';

import { useTrainerProgressTrackingComparisonQueries } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingComparisonQueries';

import { useTrainerProgressTrackingFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingFilters';

import { useTrainerProgressTrackingMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingMutations';

import { useTrainerProgressTrackingMembersQuery, useTrainerProgressTrackingEntriesQuery, useTrainerProgressTrackingSummaryQuery, useTrainerProgressTrackingCompleteHistoryQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingQuery';

import { useTrainerProgressTrackingStore } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/state/useTrainerCoachingIndividualProgressProgressTrackingStore';

import { TrainerProgressTrackingComparisonSnapshotBuilder } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingComparisonSnapshotBuilder';

import type { TrainerProgressTrackingCreateProgressEntryDto } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';

/**
 * @description Manages TrainerProgressTrackingMain state and data flow for the progress tracking feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const EMPTY_COMPARISON_MEMBER_IDS: string[] = [];

export function useTrainerProgressTrackingMain({ enableComparison = true }: { enableComparison?: boolean } = {}) {
  const { selectedMemberId, setSelectedMemberId, activeTab, setActiveTab, currentPage, setCurrentPage, sortBy, sortDirection, setSort } = useTrainerProgressTrackingFilters();
  const membersQuery = useTrainerProgressTrackingMembersQuery();

  // Auto-select first member if none selected so charts and tables are immediately visible
  useEffect(() => {
    if (!selectedMemberId && membersQuery.data && membersQuery.data.length > 0) {
      setSelectedMemberId(membersQuery.data[0].id);
    }
  }, [selectedMemberId, membersQuery.data, setSelectedMemberId]);

  const progressQuery = useTrainerProgressTrackingEntriesQuery({ memberId: selectedMemberId, page: currentPage, limit: 10, sortBy, sortDirection });
  const chartQuery = useTrainerProgressTrackingCompleteHistoryQuery(selectedMemberId);
  const summaryQuery = useTrainerProgressTrackingSummaryQuery(selectedMemberId);
  const comparisonQueries = useTrainerProgressTrackingComparisonQueries(useTrainerProgressTrackingStore(s => enableComparison ? s.selectedComparisonIds : EMPTY_COMPARISON_MEMBER_IDS));
  const { deleteEntry, createEntry, updateEntry } = useTrainerProgressTrackingMutations();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const { confirm } = useTrainerInfrastructureConfirm();
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const idempotency = useTrainerInfrastructureIdempotencyKey();

  const activeMetric = useTrainerProgressTrackingStore(s => s.activeMetric);
  const setActiveMetric = useTrainerProgressTrackingStore(s => s.setActiveMetric);
  const showModal = useTrainerProgressTrackingStore(s => s.showModal);
  const setShowModal = useTrainerProgressTrackingStore(s => s.setShowModal);
  const editingEntryId = useTrainerProgressTrackingStore(s => s.editingEntryId);
  const setEditingEntryId = useTrainerProgressTrackingStore(s => s.setEditingEntryId);
  const editingEntry = progressQuery.data?.entries.find((entry) => entry.id === editingEntryId) ?? null;
  const activeComparisonMetric = useTrainerProgressTrackingStore(s => s.activeComparisonMetric);
  const setActiveComparisonMetric = useTrainerProgressTrackingStore(s => s.setActiveComparisonMetric);
  const selectedComparisonIds = useTrainerProgressTrackingStore(s => s.selectedComparisonIds);
  const toggleComparisonMember = useTrainerProgressTrackingStore(s => s.toggleComparisonMember);

  const openAddModal = useCallback(() => { setEditingEntryId(null); setShowModal(true); }, [setEditingEntryId, setShowModal]);
  const openEditModal = useCallback((entry: { id: string }) => { setEditingEntryId(entry.id); setShowModal(true); }, [setEditingEntryId, setShowModal]);
  const closeModal = useCallback(() => { setShowModal(false); setEditingEntryId(null); }, [setEditingEntryId, setShowModal]);

  const handleDelete = useCallback(async (entryId: string) => {
    const confirmed = await confirm({
      title: t('TEXT_DELETE_ENTRY_TITLE'),
      message: t('TEXT_DELETE_ENTRY_MESSAGE'),
      type: 'danger',
      confirmText: t('TEXT_DELETE_ENTRY'),
      requireTypedConfirmation: true,
      confirmationPhrase: t('TEXT_DELETE_ENTRY_CONFIRMATION'),
    });
    if (!confirmed) return;

    const actionId = `delete-${entryId}`;
    const key = idempotency.begin(actionId);
    try {
      const response = await deleteEntry({ memberId: selectedMemberId, entryId, idempotencyKey: key });
      showSuccess(response.message, `progress-delete-${entryId}`);
      idempotency.clear(actionId);
    } catch (error) {
      showError(error, `progress-delete-${entryId}`);
    }
  }, [confirm, deleteEntry, idempotency, selectedMemberId, showError, showSuccess, t]);

  const handleSave = useCallback(async (data: TrainerProgressTrackingCreateProgressEntryDto): Promise<boolean> => {
    const actionId = editingEntry ? `update-${editingEntry.id}` : `create-${selectedMemberId}`;
    const key = idempotency.begin(actionId);
    try {
      if (editingEntry) {
        const response = await updateEntry({ memberId: selectedMemberId, entryId: editingEntry.id, dto: data, idempotencyKey: key });
        showSuccess(response.message, `progress-update-${editingEntry.id}`);
      } else {
        const response = await createEntry({ memberId: selectedMemberId, dto: data, idempotencyKey: key });
        showSuccess(response.message, `progress-create-${selectedMemberId}`);
      }
      idempotency.clear(actionId);
      closeModal();
      return true;
    } catch (error) {
      showError(error, editingEntry ? `progress-update-${editingEntry.id}` : `progress-create-${selectedMemberId}`);
      return false;
    }
  }, [closeModal, createEntry, editingEntry, idempotency, selectedMemberId, showError, showSuccess, updateEntry]);

  const comparisonSnapshots = useMemo(() => selectedComparisonIds.map((id, index) => {
    const name = membersQuery.data?.find(member => member.id === id)?.name ?? id;
    const entries = comparisonQueries[index]?.data?.entries ?? [];
    return TrainerProgressTrackingComparisonSnapshotBuilder(id, name, entries);
  }), [comparisonQueries, membersQuery.data, selectedComparisonIds]);
  const comparisonIsPending = comparisonQueries.some(query => query.isPending);
  const comparisonIsError = comparisonQueries.some(query => query.isError);
  const retryComparisonQueries = useCallback(() => {
    comparisonQueries.filter(query => query.isError).forEach(query => { void query.refetch(); });
  }, [comparisonQueries]);

  return {
    tData: { members: membersQuery.data ?? [] },
    membersQuery,
    comparisonIsPending,
    comparisonIsError,
    retryMembers: () => { void membersQuery.refetch(); },
    retryComparisonQueries,
    selectedMemberId, setSelectedMemberId, activeTab, setActiveTab, currentPage, setCurrentPage, sortBy, sortDirection, setSort,
    activeMetric, setActiveMetric, showModal, editingEntry, activeComparisonMetric, setActiveComparisonMetric, selectedComparisonIds, toggleComparisonMember,
    progressQuery, chartQuery, summaryQuery, comparisonSnapshots,
    openAddModal, openEditModal, closeModal, handleDelete, handleSave,
  };
}
