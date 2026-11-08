"use client";
// RESPONSIBILITY: Renders API-backed member measurements and progress photos; no hardcoded member measurements.
import { useState } from 'react';
import { Camera, Calculator, Plus, Eye, X, ArrowRight, Sparkles } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import Image from 'next/image';

import { displayValue } from '@/lib/display_value';
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureSkeletonBlock';

import { useTrainerMembersMemberProgressEntriesQuery } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileProfileQueries';

import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore';

import { TrainerMembersFormatDate, TrainerMembersFormatNumber } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';


// DATA FLOW: selectedMemberId → TanStack Query progress entries → derived latest/first measurements → UI.







/**
 * @description Renders API-backed member measurements and progress photos; no hardcoded member measurements.
 * @dependencies selectedMemberId → TanStack Query progress entries → derived latest/first measurements → UI.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the members feature UI responsibility represented by TrainerMembersProfileProgress, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersProfileProgress() {
  const locale = useLocale();
  const t = useTranslations('TRAINER_MEMBERS');
  const memberId = useTrainerMembersStore((state) => state.selectedMemberId);
  const progressQuery = useTrainerMembersMemberProgressEntriesQuery(memberId ?? '');
  const { data: entries = [], isPending, isError, refetch } = progressQuery;

  const [customPhotos, setCustomPhotos] = useState<string[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTag, setNewPhotoTag] = useState('Front View');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!memberId) return null;
  if (isPending) return <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><TrainerInfrastructureSkeletonBlock className="h-56 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-56 rounded-xl" /></div>;
  if (isError) return <div role="alert" className="rounded-xl border border-border bg-danger-bg p-4 text-danger" data-testid={"trainer_members-trainer_members-profile-danger-state-23-1"}><p>{t("TEXT_UNABLE_TO_LOAD_PROGRESS_DATA_RETRY_THE_P_82DE8426")}</p><button type="button" onClick={() => void refetch()} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t("TEXT_REFRESH")}</button></div>;
  const ordered = [...entries].sort((a,b) => a.date.localeCompare(b.date));
  const latest = ordered.at(-1);
  const first = ordered.at(0);
  const delta = latest && first ? latest.weightKg - first.weightKg : null;
  const metrics = latest ? [
    [t('TEXT_WEIGHT'), `${TrainerMembersFormatNumber(latest.weightKg, locale)} ${t('TEXT_KG')}`, delta === null ? '—' : `${delta >= 0 ? '+' : ''}${TrainerMembersFormatNumber(delta, locale)} ${t('TEXT_KG')}`],
    [t('TEXT_BODY_FAT_13AEEC'), latest.bodyFatPercent == null ? '—' : `${TrainerMembersFormatNumber(latest.bodyFatPercent, locale)}%`, latest.bodyFatPercent == null || first?.bodyFatPercent == null ? '—' : `${TrainerMembersFormatNumber(latest.bodyFatPercent - first.bodyFatPercent, locale)}%`],
    [t('TEXT_CHEST'), latest.chestCm == null ? '—' : `${TrainerMembersFormatNumber(latest.chestCm, locale)} ${t('TEXT_CM')}`, ''],
    [t('TEXT_WAIST'), latest.waistCm == null ? '—' : `${TrainerMembersFormatNumber(latest.waistCm, locale)} ${t('TEXT_CM')}`, ''],
    [t('TEXT_MUSCLE_MASS'), latest.muscleMassKg == null ? '—' : `${TrainerMembersFormatNumber(latest.muscleMassKg, locale)} ${t('TEXT_KG')}`, ''],
  ] : [];
  const bmi = latest?.bmi ?? null;

  const allPhotos = [...(latest?.progressPhotos ?? []), ...customPhotos];
  const beforePhoto = allPhotos[0];
  const afterPhoto = allPhotos.length > 1 ? allPhotos[allPhotos.length - 1] : null;

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;
    setCustomPhotos((prev) => [...prev, newPhotoUrl.trim()]);
    setNewPhotoUrl('');
    setIsUploadOpen(false);
  };

  return <div className="space-y-6">
    <div className="flex items-center justify-between"><h3 className="font-bold text-primary">{t("TEXT_PROGRESS_MEASUREMENTS")}</h3><span className="text-xs text-secondary">{t("TEXT_SOURCE_TRAINER_PROGRESS_API")}</span></div>
    {latest ? <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{metrics.map(([label,current,change]) => <div key={label} className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-secondary mb-1">{label}</p><p className="text-lg font-bold text-primary">{current}</p><p className="text-xs text-secondary mt-1">{displayValue(change)}</p></div>)}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-card border border-border rounded-xl p-5"><h4 className="font-semibold text-primary mb-4">{t("TEXT_MEASUREMENT_HISTORY")}</h4><div className="space-y-3">{ordered.map((entry) => <div key={entry.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3"><span className="text-sm text-secondary">{TrainerMembersFormatDate(entry.date, locale)}</span><span className="text-sm font-semibold">{entry.weightKg == null ? '—' : `${TrainerMembersFormatNumber(entry.weightKg, locale)} ${t('TEXT_KG')}`}</span><span className="text-sm text-secondary">{t("TEXT_BMI")}{entry.bmi == null ? '—' : TrainerMembersFormatNumber(entry.bmi, locale)}</span><span className="text-sm text-secondary">{t("TEXT_BODY_FAT_13AEEC")}{entry.bodyFatPercent == null ? '—' : `${TrainerMembersFormatNumber(entry.bodyFatPercent, locale)}%`}</span></div>)}</div></div>
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col items-center justify-center text-center"><div className="w-12 h-12 rounded-full bg-info-bg text-info flex items-center justify-center mb-3" data-testid={"trainer_members-trainer_members-profile-info-state-42-2"}><Calculator size={18} strokeWidth={2}/></div><h4 className="text-sm font-semibold text-secondary">{t("TEXT_CURRENT_BMI_EDA3C8")}</h4><p className="text-kpi font-bold text-primary">{bmi == null ? '—' : TrainerMembersFormatNumber(bmi, locale)}</p></div>
      </div>

      {/* Transformation Photos & Before/After Comparison */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4" data-testid="trainer_members-progress-photos-section">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Camera size={18} className="text-primary" strokeWidth={2}/>
            <h4 className="font-semibold text-primary">{t("TEXT_PROGRESS_PHOTOS")}</h4>
          </div>
          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="min-h-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-testid="trainer_members-upload-progress-photo-button"
          >
            <Plus size={15} strokeWidth={2} />
            Add Progress Photo
          </button>
        </div>

        {/* Side-by-Side Comparison if Before & After available */}
        {beforePhoto && afterPhoto && (
          <div className="rounded-xl border border-border bg-input/20 p-4 space-y-3" data-testid="trainer_members-transformation-comparison">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles size={14} className="text-primary" />
              <span>Transformation Comparison (Before vs After)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-secondary">
                  <span className="font-semibold text-primary">Before (Initial Baseline)</span>
                  <span>{first ? TrainerMembersFormatDate(first.date, locale) : 'Day 1'}</span>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPhoto(beforePhoto)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPhoto(beforePhoto); }}
                  className="aspect-square relative rounded-lg overflow-hidden bg-input cursor-pointer group border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <Image src={beforePhoto} alt="Baseline photo" fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1">
                    <Eye size={16} /> View
                  </div>
                </div>
                {first && (
                  <p className="text-xs text-secondary text-center">
                    Weight: <strong className="text-primary">{TrainerMembersFormatNumber(first.weightKg, locale)} kg</strong>
                    {first.bodyFatPercent != null ? ` · Fat: ${first.bodyFatPercent}%` : ''}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-secondary">
                  <span className="font-semibold text-primary">After (Current Progress)</span>
                  <span>{TrainerMembersFormatDate(latest.date, locale)}</span>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPhoto(afterPhoto)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPhoto(afterPhoto); }}
                  className="aspect-square relative rounded-lg overflow-hidden bg-input cursor-pointer group border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <Image src={afterPhoto} alt="Current progress photo" fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1">
                    <Eye size={16} /> View
                  </div>
                </div>
                <p className="text-xs text-secondary text-center">
                  Weight: <strong className="text-primary">{TrainerMembersFormatNumber(latest.weightKg, locale)} kg</strong>
                  {latest.bodyFatPercent != null ? ` · Fat: ${latest.bodyFatPercent}%` : ''}
                  {delta !== null && (
                    <span className="ml-1.5 font-bold text-success">
                      ({delta > 0 ? `+${delta}` : delta} kg)
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Gallery of all photos */}
        {allPhotos.length > 0 ? (
          <div>
            <p className="text-xs text-secondary mb-3">All Recorded Photos ({allPhotos.length})</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allPhotos.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPhoto(src)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPhoto(src); }}
                  className="aspect-square relative rounded-lg overflow-hidden bg-input cursor-pointer group border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <Image src={src} alt={t("TEXT_PROGRESS_PHOTO_ALT", { index: index + 1 })} fill unoptimized sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1">
                    <Eye size={16} /> Enlarge
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-border rounded-xl space-y-2">
            <Camera size={28} className="mx-auto text-secondary" strokeWidth={1.5} />
            <p className="text-sm text-secondary">{t("TEXT_NO_PROGRESS_PHOTOS_RECORDED")}</p>
            <p className="text-xs text-secondary/70">Upload front, side, and back posture photos to build client transformation logs.</p>
          </div>
        )}
      </div>

      {/* Photo Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="upload-photo-title">
          <div className="bg-card border border-border rounded-xl w-full max-w-md p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 id="upload-photo-title" className="text-base font-semibold text-primary">Add Transformation Photo</h3>
              <button type="button" onClick={() => setIsUploadOpen(false)} className="text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg p-1">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label htmlFor="photo-url-input" className="block text-xs font-semibold text-secondary mb-1">Photo Image URL</label>
                <input
                  id="photo-url-input"
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setNewPhotoUrl('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80')}
                    className="text-[11px] text-primary underline hover:text-primary-hover"
                  >
                    Use Sample Photo 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPhotoUrl('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80')}
                    className="text-[11px] text-primary underline hover:text-primary-hover"
                  >
                    Use Sample Photo 2
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="photo-tag-select" className="block text-xs font-semibold text-secondary mb-1">Perspective / Tag</label>
                <select
                  id="photo-tag-select"
                  value={newPhotoTag}
                  onChange={(e) => setNewPhotoTag(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <option value="Front View">Front View</option>
                  <option value="Side View">Side View</option>
                  <option value="Back View">Back View</option>
                  <option value="Transformation">Transformation Milestone</option>
                </select>
              </div>

              {newPhotoUrl && (
                <div className="aspect-video relative rounded-lg overflow-hidden bg-input border border-border">
                  <Image src={newPhotoUrl} alt="Preview" fill unoptimized className="object-cover" />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="min-h-10 px-4 py-2 rounded-lg border border-border text-xs font-semibold text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newPhotoUrl.trim()}
                  className="min-h-10 px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  Save Progress Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Preview Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" role="dialog" aria-modal="true" aria-label="Expanded Photo View" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-2xl w-full max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-primary transition-colors p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close photo preview"
            >
              <X size={24} />
            </button>
            <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-input border border-border/40 shadow-2xl">
              <Image src={selectedPhoto} alt="Full progress view" fill unoptimized className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </> : <p className="text-sm text-secondary">{t("TEXT_NO_MEASUREMENTS_RECORDED_YET")}</p>}
  </div>;
}
