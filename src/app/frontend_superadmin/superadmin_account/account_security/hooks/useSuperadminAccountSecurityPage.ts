'use client';
import { useRef } from 'react';

import { useQuery } from '@tanstack/react-query';

import { superadminProfileApi } from '@/app/frontend_superadmin/superadmin_account/account_security/api/superadmin_account_security.api';
import { SUPERADMIN_ACCOUNT_SECURITY_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_account/account_security/api/superadmin_account_security.query_keys';
import { useSuperadminAccountSecurityToggleTwoFactorMutation } from '@/app/frontend_superadmin/superadmin_account/account_security/hooks/useSuperadminAccountSecurityToggleTwoFactorMutation';
import { useSuperadminAccountSecurityUpdatePasswordMutation } from '@/app/frontend_superadmin/superadmin_account/account_security/hooks/useSuperadminAccountSecurityUpdatePasswordMutation';
import { createSuperadminAccountSecurityFormApiError } from '@/app/frontend_superadmin/superadmin_account/account_security/utils/SuperadminAccountSecurityFormApiErrors';

import type { UpdateSuperadminPasswordPayload, Toggle2FAPayload } from '@/app/frontend_superadmin/superadmin_account/account_security/types/superadmin_account_security.types';


/** Independent account-security query/mutations. Passwords are never retained in UI state. */
export function useSuperadminAccountSecurityPage() {
 const keys=useRef(new Map<string,{fingerprint:string,key:string}> ());
 const salt=useRef<string|null>(null);
 const intentKey=async(scope:string,payload:unknown)=>{
  salt.current??=crypto.randomUUID();
  const input=new TextEncoder().encode(`${salt.current}:${JSON.stringify(payload)}`);
  const digest=crypto.subtle?await crypto.subtle.digest('SHA-256',input):null;
  const fingerprint=digest?Array.from(new Uint8Array(digest),v=>v.toString(16).padStart(2,'0')).join(''):crypto.randomUUID();
  const previous=keys.current.get(scope);
  if(previous?.fingerprint===fingerprint)return previous.key;
  const key=crypto.randomUUID();keys.current.set(scope,{fingerprint,key});return key;
 };
 const profileQuery=useQuery({queryKey:SUPERADMIN_ACCOUNT_SECURITY_QUERY_KEYS.all,queryFn:async()=>{
  const response=await superadminProfileApi.fetchProfile();
  if(!response.success)throw new Error(response.message);
  return response.data;
 }});
 const passwordMutation=useSuperadminAccountSecurityUpdatePasswordMutation();
 const factorMutation=useSuperadminAccountSecurityToggleTwoFactorMutation();
 const mutatePassword=async(payload:UpdateSuperadminPasswordPayload)=>{
  const key=await intentKey('password',payload);
  const response=await passwordMutation.mutateAsync({payload,idempotencyKey:key});
  if(!response.success)throw createSuperadminAccountSecurityFormApiError(response);
  keys.current.delete('password');
 };
 const mutateFactor=async(payload:Toggle2FAPayload)=>{
  const key=await intentKey('factor',payload);
  const response=await factorMutation.mutateAsync({payload,idempotencyKey:key});
  if(!response.success)throw createSuperadminAccountSecurityFormApiError(response);
  keys.current.delete('factor');
 };
 return {profileQuery,passwordMutation,factorMutation,mutatePassword,mutateFactor};
}
