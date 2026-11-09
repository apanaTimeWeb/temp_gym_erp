// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleLocalDebounce';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/utils/ManagerTrainerScheduleLocalIdempotency';
import { MANAGER_TRAINER_SCHEDULE_VIEW_QUERY_PARAM } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_view.constants';
import { ManagerTrainerScheduleBuildViewSearchParams } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/utils/ManagerTrainerScheduleBuildViewSearchParams';
import { resolveManagerTrainerScheduleView } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/utils/ManagerTrainerScheduleResolveView';
import type { ManagerTrainerScheduleViewId } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule_view.types';

import { useManagerTrainerScheduleMutations } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleMutations';
import { useManagerTrainerScheduleQuery } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleQueries';
import { useManagerTrainerScheduleUiStore } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/state/useManagerTrainerScheduleUiStore';
import type { ManagerTrainerScheduleViewModel, TrainerShift, ShiftDay, CreateShiftDto } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule.types';

/** Manages UseScheduleLogic for the Manager module. */


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates schedule feature state and its documented UI/API boundary through useManagerTrainerScheduleLogic.
 * @dependencies Uses ManagerDebounce, ManagerInfrastructureGetErrorMessage, ManagerIdempotency, useManagerTrainerScheduleQueries.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerTrainerScheduleLogic owns the schedule feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerTrainerScheduleLogic(): ManagerTrainerScheduleViewModel {
  const t = useTranslations('MANAGER_TRAINER_SCHEDULE');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const ui = useManagerTrainerScheduleUiStore();
  const saveKeyRef = useRef<{ signature: string; key: string } | null>(null);
  const deleteKeyByIdRef = useRef(new Map<string, string>());
  const view = resolveManagerTrainerScheduleView(searchParams.get(MANAGER_TRAINER_SCHEDULE_VIEW_QUERY_PARAM));
  const setView = useCallback((nextView: ManagerTrainerScheduleViewId) => { const query = ManagerTrainerScheduleBuildViewSearchParams(searchParams.toString(), nextView); router.replace(`${pathname}?${query}`, { scroll: false }); }, [pathname, router, searchParams]);

  const search = searchParams.get('search') ?? '';
  const selectedDay = (searchParams.get('day') as ShiftDay | 'All') ?? 'All';
  const debouncedSearch = useManagerInfrastructureDebounce(search, 300);

  const setSearch = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set('search', val);
    else params.delete('search');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSelectedDay = useCallback((val: ShiftDay | 'All') => {
    const params = new URLSearchParams(searchParams.toString());
    if (val !== 'All') params.set('day', val);
    else params.delete('day');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);


  const showToast = ui.showToast;
  const hideToast = ui.hideToast;

  const filters = useMemo(() => ({ ...(debouncedSearch ? { search: debouncedSearch } : {}), ...(selectedDay !== 'All' ? { day: selectedDay } : {}) }), [debouncedSearch, selectedDay]);
  const scheduleQuery = useManagerTrainerScheduleQuery(filters);

  const openAddShift = useCallback((trainerId: string) => {
    saveKeyRef.current = null;
    ui.openAddShift(trainerId);
  }, [ui]);

  const openEditShift = useCallback((shift: TrainerShift) => {
    saveKeyRef.current = null;
    ui.openEditShift(shift);
  }, [ui]);

  const closeShiftModal = useCallback(() => {
    saveKeyRef.current = null;
    ui.closeShiftModal();
  }, [ui]);

  const scheduleMutations = useManagerTrainerScheduleMutations();
  const saving = scheduleMutations.create.isPending || scheduleMutations.update.isPending || scheduleMutations.remove.isPending;
  const trainers = scheduleQuery.data?.trainers ?? [];
  const kpis = scheduleQuery.data?.kpis ?? null;
  const status = scheduleQuery.status;
  const error = scheduleQuery.isError ? t("TEXT_GENERIC_ERROR") : '';

  const saveShift = useCallback(async (data: CreateShiftDto) => {
    const signature = JSON.stringify({ editId: ui.shiftModal.editShift?.id ?? null, data });
    const current = saveKeyRef.current;
    const idempotencyKey = current?.signature === signature ? current.key : ManagerInfrastructureIdempotency();
    saveKeyRef.current = { signature, key: idempotencyKey };
    const response = ui.shiftModal.editShift
      ? await scheduleMutations.update.mutateAsync({ id: ui.shiftModal.editShift.id, body: data, idempotencyKey })
      : await scheduleMutations.create.mutateAsync({ body: data, idempotencyKey });
    if (!response.success) throw new Error(response.message);
    saveKeyRef.current = null;
    closeShiftModal();
  }, [closeShiftModal, scheduleMutations.create, scheduleMutations.update, ui.shiftModal.editShift]);

  const deleteShift = useCallback(async (id: string) => { const idempotencyKey = deleteKeyByIdRef.current.get(id) ?? ManagerInfrastructureIdempotency(); deleteKeyByIdRef.current.set(id, idempotencyKey); const response = await scheduleMutations.remove.mutateAsync({ id, idempotencyKey }); if (!response.success) throw new Error(response.message); deleteKeyByIdRef.current.delete(id); return response; }, [scheduleMutations.remove]);


  return {
    trainers,
    kpis,
    view,
    setView,
    status,
    error,
    toast: ui.toast,
    showToast,
    hideToast,
    loadAll: async () => { await scheduleQuery.refetch(); },
    selectedDay,
    setSelectedDay,
    search,
    setSearch,
    shiftModal: ui.shiftModal,
    openAddShift,
    openEditShift,
    closeShiftModal,
    saving,
    saveShift: async (data) => { await saveShift(data); },
    deleteShift: async (id) => { await deleteShift(id); } };
}
