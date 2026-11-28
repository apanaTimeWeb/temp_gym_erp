// RESPONSIBILITY: Composes account security settings and password controls; validation and persistence stay in hooks.
"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTrainerAccountSecurityProfileLogic } from '../hooks/useTrainerAccountSecurityProfileLogic';
import TrainerAccountSecuritySecurityView, {type TrainerAccountSecurityPasswordVisibility} from './TrainerAccountSecurityProfileSecurityView';
export default function TrainerAccountSecurityMain() {
 const t=useTranslations('TRAINER_ACCOUNT_SECURITY');
 const model=useTrainerAccountSecurityProfileLogic();
 const [visibility,setVisibility]=useState<TrainerAccountSecurityPasswordVisibility>({current:false,next:false,confirm:false});
 if(model.isPending) return <div role="status" className="min-h-48 motion-safe:animate-pulse bg-skeleton-base rounded-lg"/>;
 if(model.isError||!model.user) return <div role="alert" className="p-6 text-danger">{t('TEXT_UNABLE_TO_LOAD_YOUR_PROFILE')} <button type="button" className="underline" onClick={()=>void model.refetchProfile()}>{t('TEXT_RETRY')}</button></div>;
 return <main className="mx-auto max-w-3xl space-y-5 p-4 sm:p-6"><div className="relative overflow-hidden rounded-2xl border border-emerald-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#141B2D] dark:to-[#0C1220] p-5 shadow-card"><span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#4ADE80] via-[#10B981] to-transparent" /><h1 className="text-section-title font-extrabold text-text-primary">{t('TEXT_SECURITY')}</h1></div><TrainerAccountSecuritySecurityView passwordForm={model.passwordForm} changePassword={model.changePassword} changePasswordPending={model.changePasswordPending} passwordVisibility={visibility} setPasswordVisibility={setVisibility}/></main>;
}
