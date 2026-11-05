"use client";
// RESPONSIBILITY: Owns Admin profile server state, React Hook Form setup, password/profile mutations, and unsaved-change protection.
// DATA FLOW: AdminProfileApi → TanStack Query / React Hook Form → useAdminProfileLogic → AdminProfileMain

import { ADMIN_PASSWORD_EMPTY_FORM, ADMIN_PROFILE_EMPTY_FORM } from '@/app/frontend_admin/admin_profile/profile_overview/constants/AdminProfileOverviewConstants';
import { ADMIN_PROFILE_QUERY_KEYS } from '@/app/frontend_admin/admin_profile/profile_overview/constants/AdminProfileOverviewQueryKeys';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminProfileApi } from '@/app/frontend_admin/admin_profile/profile_overview/api/admin_profile_overview_api';
import {
  updateAdminProfilePayloadSchema,
  updateAdminPasswordPayloadSchema,
} from '@/app/frontend_admin/admin_profile/profile_overview/schemas/AdminProfileOverviewSchemas';
import type {
  AdminProfileData,
  UpdateAdminProfilePayload,
  UpdateAdminPasswordPayload,
  ProfileTab,
} from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewTypes';
import { useAdminProfileUnsavedChangesGuard } from '@/app/frontend_admin/admin_profile/profile_overview/hooks/useAdminProfileOverviewUnsavedChangesGuard';
import { useAdminProfileMutations } from '@/app/frontend_admin/admin_profile/profile_overview/hooks/useAdminProfileOverviewMutations';
import { applyAdminProfileOverviewApiValidationErrors } from '@/app/frontend_admin/admin_profile/profile_overview/utils/AdminProfileOverviewApiResponse';
/** @description useAdminProfileLogic: Owns Admin profile server state, React Hook Form setup, password/profile mutations, and unsaved-change protection. @dependencies Consumes AdminProfileQueryKeys, AdminProfileApi, AdminProfileSchemas, AdminProfileTypes, feature-local unsaved-change guard, useAdminProfileMutations. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminProfileLogic() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const profileQuery = useQuery({
    queryKey: ADMIN_PROFILE_QUERY_KEYS.key('detail'),
    queryFn: () => AdminProfileApi.fetchProfile(),
    staleTime: 1000 * 60 * 5,
  });

  const profile = profileQuery.data?.data ?? null;
  const profileForm = useForm<UpdateAdminProfilePayload>({
    resolver: zodResolver(updateAdminProfilePayloadSchema),
    defaultValues: ADMIN_PROFILE_EMPTY_FORM,
    mode: 'onBlur',
  });
  useEffect(() => {
    if (!profile) return;
    profileForm.reset(
      { name: profile.name, phone: profile.phone },
      { keepDirtyValues: true },
    );
  }, [profile?.id, profile?.name, profile?.phone, profileForm.reset]);
  const passwordForm = useForm<UpdateAdminPasswordPayload>({
    resolver: zodResolver(updateAdminPasswordPayloadSchema),
    defaultValues: ADMIN_PASSWORD_EMPTY_FORM,
    mode: 'onBlur',
  });

  const { profileMutation, passwordMutation, updateProfile, updatePassword } = useAdminProfileMutations();

  const profileDirty = profileForm.formState.isDirty || passwordForm.formState.isDirty;
  useAdminProfileUnsavedChangesGuard(profileDirty);

  const displayInitial = (profile?.name ?? 'A').charAt(0).toUpperCase();

  return {
    activeTab,
    setActiveTab,
    profile,
    profileQuery,
    profileForm,
    passwordForm,
    savingProfile: profileMutation.isPending,
    savingPassword: passwordMutation.isPending,
    displayInitial,
    handleSaveProfile: profileForm.handleSubmit(async (values) => { try { const response = await updateProfile(values); profileForm.reset({ name: response.data?.name ?? values.name, phone: response.data?.phone ?? values.phone }); } catch (error) { applyAdminProfileOverviewApiValidationErrors(error, profileForm.getValues(), profileForm.setError); } }),
    handleChangePassword: passwordForm.handleSubmit(async (values) => { try { await updatePassword(values); passwordForm.reset(ADMIN_PASSWORD_EMPTY_FORM); } catch (error) { applyAdminProfileOverviewApiValidationErrors(error, passwordForm.getValues(), passwordForm.setError); } }),
  };
}

