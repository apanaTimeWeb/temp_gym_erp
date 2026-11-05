'use client';
import {useRef,useState} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

import {useConfirm} from '@/components/ui/Feedback/ConfirmProvider';

import {featuresApi} from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/api/superadmin_platform_configuration_release_notes.api';
import {SUPERADMIN_PLATFORM_CONFIGURATION_RELEASE_NOTES_QUERY_KEYS} from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/api/superadmin_platform_configuration_release_notes.query_keys';
import {releaseNoteSchema} from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/schemas/superadmin_platform_configuration_release_notes_ui.schemas';
import {createSuperadminPlatformConfigurationReleaseNotesFormApiError,applySuperadminPlatformConfigurationReleaseNotesFormApiErrors} from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/utils/SuperadminPlatformConfigurationReleaseNotesFormApiErrors';

import type {ReleaseNoteFormValues} from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/types/superadmin_platform_configuration_release_notes_ui.types';
import type {ReleaseNote} from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/types/superadmin_platform_configuration_release_notes.types';


/** Isolated release-note lifecycle: source-verified GET combined payload + notes POST/DELETE. */
export function useSuperadminPlatformConfigurationReleaseNotesPage(){
 const t=useTranslations('superadmin_platform_configuration_features');
 const {confirm}=useConfirm();
 const queryClient=useQueryClient();
 const [deletingNoteId,setDeletingNoteId]=useState<string|null>(null);
 const publishRef=useRef<{fingerprint:string,key:string}|null>(null);
 const deleteKeys=useRef(new Map<string,string>());
 const form=useForm<ReleaseNoteFormValues>({resolver:zodResolver(releaseNoteSchema)});
 const key=SUPERADMIN_PLATFORM_CONFIGURATION_RELEASE_NOTES_QUERY_KEYS.notes;
 const query=useQuery({queryKey:key,queryFn:async()=>{
   const result=await featuresApi.fetchFeatures();
   if(!result.success)throw new Error(result.message);
   return result.data.notes;
 }});
 const createMutation=useMutation({mutationFn:async(input:{data:ReleaseNoteFormValues,idempotencyKey:string})=>{
  const response=await featuresApi.createReleaseNote({...input.data,isPublished:true},input.idempotencyKey);
  if(!response.success)throw createSuperadminPlatformConfigurationReleaseNotesFormApiError(response);return response;
 },onSuccess:async()=>{await queryClient.invalidateQueries({queryKey:key});}});
 const deleteMutation=useMutation({mutationFn:async(input:{id:string,idempotencyKey:string})=>{
  const response=await featuresApi.deleteReleaseNote(input.id,input.idempotencyKey);
  if(!response.success)throw createSuperadminPlatformConfigurationReleaseNotesFormApiError(response);return response;
 },onSuccess:async()=>{await queryClient.invalidateQueries({queryKey:key});}});
 const publishNote=async(data:ReleaseNoteFormValues)=>{
  const allowed=await confirm({title:t('ui.confirm_publish_release_note_title'),message:t('ui.confirm_publish_release_note_message'),type:'warning',confirmText:t('ui.publish_action'),cancelText:t('ui.cancel_action')});
  if(!allowed)return;
  const fingerprint=JSON.stringify(data);
  if(publishRef.current?.fingerprint!==fingerprint)publishRef.current={fingerprint,key:crypto.randomUUID()};
  const intent=publishRef.current;
  try{const response=await createMutation.mutateAsync({data,idempotencyKey:intent.key});
   publishRef.current=null;form.reset();toast.success(response.message,{id:'release-note-created'});
  }catch(error:unknown){applySuperadminPlatformConfigurationReleaseNotesFormApiErrors(error,form.setError,['version','title','content']);toast.error(t('ui.action_failed_retry'),{id:'release-note-create-failed'});}
 };
 const deleteNote=async(note:ReleaseNote)=>{
  const allowed=await confirm({title:t('ui.confirm_delete_release_note_title'),message:t('ui.confirm_delete_release_note_message',{title:note.title}),type:'danger',confirmText:t('ui.delete_action'),cancelText:t('ui.cancel_action')});
  if(!allowed)return;
  const idempotencyKey=deleteKeys.current.get(note.id)??crypto.randomUUID();deleteKeys.current.set(note.id,idempotencyKey);
  setDeletingNoteId(note.id);
  try{const response=await deleteMutation.mutateAsync({id:note.id,idempotencyKey});
   deleteKeys.current.delete(note.id);toast.success(response.message,{id:`release-note-deleted-${note.id}`});
  }catch{toast.error(t('ui.action_failed_retry'),{id:`release-note-delete-failed-${note.id}`});}
  finally{setDeletingNoteId(null);}
 };
 return {t,form,query,isPublishing:createMutation.isPending,deletingNoteId,publishNote,deleteNote};
}
