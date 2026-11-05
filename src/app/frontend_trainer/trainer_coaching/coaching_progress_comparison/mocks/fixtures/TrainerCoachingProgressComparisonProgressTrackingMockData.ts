import type { TrainerProgressTrackingProgressEntry, TrainerProgressTrackingProgressMemberBasic } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingTypes';

export const TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS: TrainerProgressTrackingProgressMemberBasic[] = [
  { id: '1', name: 'Rahul Sharma' },
  { id: '2', name: 'Priya Patel' },
  { id: '3', name: 'Amit Singh' },
  { id: '4', name: 'Neha Gupta' },
];

export const TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES: TrainerProgressTrackingProgressEntry[] = [
  {
    id: 'prog_1',
    memberId: '1',
    date: '2026-08-01',
    weightKg: 85.0,
    heightCm: 175,
    bmi: 27.8,
    bodyFatPercent: 24.5,
    muscleMassKg: 35.2,
    chestCm: 105,
    waistCm: 95,
    recordedBy: 'Trainer John',
  },
  {
    id: 'prog_2',
    memberId: '1',
    date: '2026-09-01',
    weightKg: 83.5,
    heightCm: 175,
    bmi: 27.3,
    bodyFatPercent: 23.0,
    muscleMassKg: 35.8,
    chestCm: 103,
    waistCm: 92,
    recordedBy: 'Trainer John',
  },
  {
    id: 'prog_3',
    memberId: '2',
    date: '2026-07-15',
    weightKg: 65.0,
    heightCm: 160,
    bmi: 25.4,
    bodyFatPercent: 28.0,
    muscleMassKg: 22.5,
    chestCm: 90,
    waistCm: 75,
    recordedBy: 'Trainer John',
  },
  {
    id: 'prog_4',
    memberId: '2',
    date: '2026-08-15',
    weightKg: 63.5,
    heightCm: 160,
    bmi: 24.8,
    bodyFatPercent: 26.5,
    muscleMassKg: 23.0,
    chestCm: 88,
    waistCm: 72,
    recordedBy: 'Trainer John',
  }
];
