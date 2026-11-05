"use client";
// RESPONSIBILITY: Structural loading skeleton matching the notifications page geometry.
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsTrainerInfrastructureSkeletonBlock';
/**
 * @description Structural loading skeleton matching the notifications page geometry.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the notifications feature's structural loading skeleton without introducing fake business data.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Does not expose fake business records while data is unavailable.
 */
export default function TrainerNotificationsLoadingSkeleton() { return <div data-testid="trainer_notifications-loading-skeleton" className="contents"> <div className="p-6 space-y-4"><TrainerInfrastructureSkeletonBlock className="h-14 rounded-xl" />{Array.from({ length: 5 }).map((_, i) => <TrainerInfrastructureSkeletonBlock key={`skeleton-row-${i}`} className="h-20 rounded-xl" />)}</div> </div>; }
