import { TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS, TRAINER_MEMBERS_WORKOUT_HISTORY_STATUS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { TRAINER_MEMBERS_MEMBER_STATUS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import type { TrainerMembersMember, TrainerMembersMemberStats } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileTypes';


﻿


export const TRAINER_MEMBERS_MOCK_MEMBER_STATS: TrainerMembersMemberStats = {
  total: 10,
  active: 7,
  pending: 2,
  expired: 1
};

export const TRAINER_MEMBERS_MOCK_MEMBERS: TrainerMembersMember[] = [
  {
    id: 'MEM-001', name: 'Rahul Sharma', email: 'rahul.s@example.com', phone: '9876543210', gender: 'MALE', branch: 'BR-01', planId: 'PL-01',
    plan: { id: 'PL-01', name: 'Annual Pro', tier: 'Gold' }, billingCycle: 'Yearly', status: TRAINER_MEMBERS_MEMBER_STATUS.ACTIVE,
    joinDate: '2023-01-15T00:00:00Z', expiryDate: '2024-01-15T00:00:00Z', createdAt: '2023-01-15T00:00:00Z',
    age: 28, heightCm: 175, weightKg: 70, progressStatus: TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD, fitnessGoal: 'Weight Loss', fitnessLevel: 'Intermediate',
    targetWeightKg: 65, bmi: 22.9, isPT: true, medicalRestrictions: 'None reported', daysSinceLastCheckIn: 2, membershipNumber: 'M-2023-001',
    ptPackage: { packageName: 'Transform 24 - 1 on 1 Coaching', totalSessions: 24, completedSessions: 18, remainingSessions: 6, startDate: '2023-08-01', expiryDate: '2024-02-01' },
    assessment: { medicalHistory: 'None', pastInjuries: 'None', vo2Max: 48, flexibility: 22, coreStrength: '3:00 plank', fitnessGoals: 'Weight loss & lean tone', parqHeartCondition: false, parqChestPainActivity: false, parqChestPainRest: false, parqDizzinessOrBalance: false, parqBoneOrJointIssue: false, parqMedicationPrescribed: false, parqOtherReason: false, parqCleared: true, medicalClearanceRequired: false },
    assignedDietId: 'DIET-01',
    assignedDiet: { id: 'DIET-01', name: 'Fat Burner (High Protein)', goal: 'Weight Loss', calories: 2200, protein: 160, carbs: 200, fats: 60,
      description: 'High-protein, low-carb diet to accelerate fat loss while preserving muscle.', complianceScore: 76,
      meals: [{ name: 'Breakfast', time: '07:00 AM', items: '4 egg whites, 1 cup oats, green tea' }, { name: 'Lunch', time: '01:00 PM', items: '150g grilled chicken, 1 cup brown rice, salad' }, { name: 'Dinner', time: '07:30 PM', items: '100g paneer, steamed vegetables, 1 roti' }] },
    workoutHistory: [{ id: 'WH-001', name: 'Full Body Fundamentals', date: '2023-08-01 - 2023-09-01', level: 'Beginner', status: TRAINER_MEMBERS_WORKOUT_HISTORY_STATUS.COMPLETED }, { id: 'WH-002', name: 'Conditioning Basics', date: '2023-07-01 - 2023-08-01', level: 'Beginner', status: TRAINER_MEMBERS_WORKOUT_HISTORY_STATUS.COMPLETED }]
  },
  {
    id: 'MEM-002', name: 'Priya Patel', email: 'priya.p@example.com', phone: '9876543211', gender: 'FEMALE', branch: 'BR-01', planId: 'PL-02',
    plan: { id: 'PL-02', name: 'Monthly Starter', tier: 'Silver' }, billingCycle: 'Monthly', status: TRAINER_MEMBERS_MEMBER_STATUS.ACTIVE,
    joinDate: '2023-08-01T00:00:00Z', expiryDate: '2024-08-01T00:00:00Z', createdAt: '2023-08-01T00:00:00Z',
    age: 24, heightCm: 162, weightKg: 58, progressStatus: TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.NEEDS_ATTENTION, fitnessGoal: 'Muscle Gain', fitnessLevel: 'Beginner',
    targetWeightKg: 62, bmi: 22.1, isPT: true, medicalRestrictions: 'None reported', daysSinceLastCheckIn: 5, membershipNumber: 'M-2023-002',
    ptPackage: { packageName: 'Kickstart Personal Training (12 Sessions)', totalSessions: 12, completedSessions: 11, remainingSessions: 1, startDate: '2023-09-01', expiryDate: '2023-12-01' },
    assessment: { medicalHistory: 'None', pastInjuries: 'Mild sprain (2022)', vo2Max: 38, flexibility: 14, coreStrength: '1:45 plank', fitnessGoals: 'Gain lean mass and endurance', parqHeartCondition: false, parqChestPainActivity: false, parqChestPainRest: false, parqDizzinessOrBalance: false, parqBoneOrJointIssue: false, parqMedicationPrescribed: false, parqOtherReason: false, parqCleared: true, medicalClearanceRequired: false },
    assignedDietId: 'DIET-02',
    assignedDiet: { id: 'DIET-02', name: 'Lean Muscle Gain', goal: 'Muscle Gain', calories: 2800, protein: 180, carbs: 350, fats: 70,
      description: 'High-protein diet to support lean muscle mass building.', complianceScore: 88,
      meals: [{ name: 'Breakfast', time: '07:30 AM', items: '5 whole eggs, 1 cup oats, 1 banana' }, { name: 'Lunch', time: '01:00 PM', items: '200g chicken breast, 1.5 cup brown rice, veggies' }, { name: 'Evening Snack', time: '04:30 PM', items: 'Protein shake, 1 apple' }, { name: 'Dinner', time: '08:00 PM', items: '150g fish, boiled vegetables' }] },
    workoutHistory: [{ id: 'WH-003', name: 'Strength Foundation', date: '2023-09-01 - 2023-10-01', level: 'Beginner', status: TRAINER_MEMBERS_WORKOUT_HISTORY_STATUS.COMPLETED }]
  },
  {
    id: 'MEM-003', name: 'Arjun Mehta', email: 'arjun.m@example.com', phone: '9845612340', gender: 'MALE', branch: 'BR-01', planId: 'PL-01',
    plan: { id: 'PL-01', name: 'Annual Pro', tier: 'Gold' }, billingCycle: 'Yearly', status: TRAINER_MEMBERS_MEMBER_STATUS.ACTIVE,
    joinDate: '2023-03-10T00:00:00Z', expiryDate: '2024-03-10T00:00:00Z', createdAt: '2023-03-10T00:00:00Z',
    age: 32, heightCm: 180, weightKg: 90, progressStatus: TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.AVERAGE, fitnessGoal: 'Strength Training', fitnessLevel: 'Advanced',
    targetWeightKg: 82, bmi: 27.8, isPT: true, medicalRestrictions: 'Lower back - avoid heavy deadlifts', daysSinceLastCheckIn: 1, membershipNumber: 'M-2023-003',
    ptPackage: { packageName: 'Hypertrophy Mastery (36 Sessions)', totalSessions: 36, completedSessions: 14, remainingSessions: 22, startDate: '2023-07-01', expiryDate: '2024-07-01' },
    assessment: { medicalHistory: 'Lower back pain (L4-L5 disc issue, 2021)', pastInjuries: 'Muscle strain - right hamstring (2022)', vo2Max: 42, flexibility: 18, coreStrength: '2:10 plank', fitnessGoals: 'Build upper body strength, improve posture', parqHeartCondition: false, parqChestPainActivity: false, parqChestPainRest: false, parqDizzinessOrBalance: false, parqBoneOrJointIssue: true, parqMedicationPrescribed: false, parqOtherReason: false, parqCleared: false, medicalClearanceRequired: true },
    workoutHistory: [{ id: 'WH-004', name: 'Power Building Phase 1', date: '2023-10-01 - 2023-11-01', level: 'Advanced', status: TRAINER_MEMBERS_WORKOUT_HISTORY_STATUS.COMPLETED }]
  },
  {
    id: 'MEM-004', name: 'Sneha Joshi', email: 'sneha.j@example.com', phone: '9712345678', gender: 'FEMALE', branch: 'BR-01', planId: 'PL-03',
    plan: { id: 'PL-03', name: 'Quarterly Flex', tier: 'Silver' }, billingCycle: 'Quarterly', status: TRAINER_MEMBERS_MEMBER_STATUS.ACTIVE,
    joinDate: '2023-05-20T00:00:00Z', expiryDate: '2024-05-20T00:00:00Z', createdAt: '2023-05-20T00:00:00Z',
    age: 27, heightCm: 158, weightKg: 52, progressStatus: TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD, fitnessGoal: 'Flexibility & Yoga', fitnessLevel: 'Beginner',
    targetWeightKg: 50, bmi: 20.8, medicalRestrictions: 'None', daysSinceLastCheckIn: 0, membershipNumber: 'M-2023-004', workoutHistory: []
  },
  {
    id: 'MEM-005', name: 'Vivek Nair', email: 'vivek.n@example.com', phone: '9654321098', gender: 'MALE', branch: 'BR-01', planId: 'PL-02',
    plan: { id: 'PL-02', name: 'Monthly Starter', tier: 'Bronze' }, billingCycle: 'Monthly', status: TRAINER_MEMBERS_MEMBER_STATUS.PENDING,
    joinDate: '2026-09-01T00:00:00Z', expiryDate: '2026-10-01T00:00:00Z', createdAt: '2026-09-01T00:00:00Z',
    age: 21, heightCm: 172, weightKg: 65, progressStatus: TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD, fitnessGoal: 'General Fitness', fitnessLevel: 'Beginner',
    targetWeightKg: 68, bmi: 22.0, medicalRestrictions: 'None', daysSinceLastCheckIn: 3, membershipNumber: 'M-2026-005', workoutHistory: []
  },
  {
    id: 'MEM-006', name: 'Kavita Reddy', email: 'kavita.r@example.com', phone: '9512347890', gender: 'FEMALE', branch: 'BR-01', planId: 'PL-01',
    plan: { id: 'PL-01', name: 'Annual Pro', tier: 'Gold' }, billingCycle: 'Yearly', status: TRAINER_MEMBERS_MEMBER_STATUS.ACTIVE,
    joinDate: '2022-11-15T00:00:00Z', expiryDate: '2023-11-15T00:00:00Z', createdAt: '2022-11-15T00:00:00Z',
    age: 35, heightCm: 165, weightKg: 68, progressStatus: TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.NEEDS_ATTENTION, fitnessGoal: 'Post-Pregnancy Recovery', fitnessLevel: 'Beginner',
    targetWeightKg: 60, bmi: 25.0, isPT: true, medicalRestrictions: 'Post-C section - no heavy core exercises', daysSinceLastCheckIn: 8, membershipNumber: 'M-2022-006',
    assessment: { medicalHistory: 'C-section delivery (March 2022)', pastInjuries: 'None', vo2Max: 28, flexibility: 12, coreStrength: '0:40 plank', fitnessGoals: 'Lose 8kg post-pregnancy weight, strengthen pelvic floor' },
    workoutHistory: [{ id: 'WH-005', name: 'Postnatal Recovery Program', date: '2023-01-01 - 2023-03-01', level: 'Beginner', status: TRAINER_MEMBERS_WORKOUT_HISTORY_STATUS.COMPLETED }]
  },
  {
    id: 'MEM-007', name: 'Rohit Gupta', email: 'rohit.g@example.com', phone: '9345678012', gender: 'MALE', branch: 'BR-01', planId: 'PL-02',
    plan: { id: 'PL-02', name: 'Monthly Starter', tier: 'Silver' }, billingCycle: 'Monthly', status: TRAINER_MEMBERS_MEMBER_STATUS.ACTIVE,
    joinDate: '2026-07-01T00:00:00Z', expiryDate: '2026-10-01T00:00:00Z', createdAt: '2026-07-01T00:00:00Z',
    age: 25, heightCm: 178, weightKg: 75, progressStatus: TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.AVERAGE, fitnessGoal: 'Weight Loss', fitnessLevel: 'Intermediate',
    targetWeightKg: 70, bmi: 23.7, medicalRestrictions: 'None', daysSinceLastCheckIn: 4, membershipNumber: 'M-2026-007', workoutHistory: []
  },
  {
    id: 'MEM-008', name: 'Ananya Singh', email: 'ananya.s@example.com', phone: '9234567891', gender: 'FEMALE', branch: 'BR-01', planId: 'PL-03',
    plan: { id: 'PL-03', name: 'Quarterly Flex', tier: 'Silver' }, billingCycle: 'Quarterly', status: TRAINER_MEMBERS_MEMBER_STATUS.ACTIVE,
    joinDate: '2023-06-10T00:00:00Z', expiryDate: '2024-06-10T00:00:00Z', createdAt: '2023-06-10T00:00:00Z',
    age: 22, heightCm: 163, weightKg: 55, progressStatus: TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD, fitnessGoal: 'Muscle Gain', fitnessLevel: 'Intermediate',
    targetWeightKg: 58, bmi: 20.7, isPT: true, medicalRestrictions: 'None', daysSinceLastCheckIn: 1, membershipNumber: 'M-2023-008',
    workoutHistory: [{ id: 'WH-006', name: 'Hypertrophy Block A', date: '2023-11-01 - 2023-12-01', level: 'Intermediate', status: TRAINER_MEMBERS_WORKOUT_HISTORY_STATUS.COMPLETED }]
  },
  {
    id: 'MEM-009', name: 'Suresh Kumar', email: 'suresh.k@example.com', phone: '9123456789', gender: 'MALE', branch: 'BR-01', planId: 'PL-04',
    plan: { id: 'PL-04', name: 'Basic Monthly', tier: 'Bronze' }, billingCycle: 'Monthly', status: TRAINER_MEMBERS_MEMBER_STATUS.EXPIRED,
    joinDate: '2022-08-01T00:00:00Z', expiryDate: '2023-08-01T00:00:00Z', createdAt: '2022-08-01T00:00:00Z',
    age: 45, heightCm: 170, weightKg: 82, progressStatus: TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.NEEDS_ATTENTION, fitnessGoal: 'General Fitness', fitnessLevel: 'Beginner',
    targetWeightKg: 75, bmi: 28.4, medicalRestrictions: 'Type 2 Diabetes - monitor blood sugar before workouts', daysSinceLastCheckIn: 30, membershipNumber: 'M-2022-009', workoutHistory: []
  },
  {
    id: 'MEM-010', name: 'Pooja Agarwal', email: 'pooja.a@example.com', phone: '9011234567', gender: 'FEMALE', branch: 'BR-01', planId: 'PL-01',
    plan: { id: 'PL-01', name: 'Annual Pro', tier: 'Gold' }, billingCycle: 'Yearly', status: TRAINER_MEMBERS_MEMBER_STATUS.PENDING,
    joinDate: '2026-09-18T00:00:00Z', expiryDate: '2027-09-18T00:00:00Z', createdAt: '2026-09-18T00:00:00Z',
    age: 30, heightCm: 160, weightKg: 62, progressStatus: TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD, fitnessGoal: 'Marathon Training', fitnessLevel: 'Advanced',
    targetWeightKg: 57, bmi: 24.2, isPT: true, medicalRestrictions: 'None', daysSinceLastCheckIn: 2, membershipNumber: 'M-2026-010', workoutHistory: []
  }
];
