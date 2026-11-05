// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Renders a semantic table-shaped loading skeleton with the requested row/column geometry.
import React from 'react';

import { useTranslations } from 'next-intl';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructureSkeletonBlock';

import type { TrainerInfrastructureTableSkeletonProps } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementTrainerInfrastructureTableSkeletonProps';






/**
 * @description Renders a semantic table-shaped loading skeleton with the requested row/column geometry.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the infrastructure feature UI responsibility represented by TrainerInfrastructureTableSkeleton, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerInfrastructureTableSkeleton({ rows = 6, columns = 5 }: TrainerInfrastructureTableSkeletonProps) {
  const t = useTranslations('TRAINER_SHELL');
  return (
    <div className="w-full bg-card border border-border rounded-xl overflow-hidden mt-4" aria-busy="true" aria-label={t("TEXT_LOADING_TABLE")} data-testid="trainer_infrastructure-infrastructure-table_skeleton_loading_table">
      <div className="h-12 bg-surface-highlight border-b border-border" aria-hidden="true" />
      <div className="flex flex-col">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`skeleton-row-${rowIndex}`} className="flex items-center gap-4 px-6 min-h-12 border-b border-border">
            {Array.from({ length: columns }).map((__, columnIndex) => (
              <TrainerInfrastructureSkeletonBlock
                key={`skeleton-cell-${rowIndex}-${columnIndex}`}
                className={`h-4 rounded ${columnIndex === columns - 1 ? 'w-16 ms-auto' : 'flex-1 max-w-56'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
