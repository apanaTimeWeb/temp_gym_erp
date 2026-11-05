// RESPONSIBILITY: Mock fixture data for the Trainer Schedule module.
// DATA FLOW: useTrainerScheduleQuery → this fixture (NOW) → future: real API

import { TRAINER_SCHEDULE_STATUS } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/utils/TrainerOperationsLeaveRequestsScheduleConstants';

import type { TrainerScheduleWeeklyAvailability, TrainerScheduleLeaveRequest } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/types/TrainerOperationsLeaveRequestsScheduleTypes';




export const TRAINER_SCHEDULE_MOCK_AVAILABILITY: TrainerScheduleWeeklyAvailability[] = [
  { day: 'Monday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Tuesday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Wednesday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Thursday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Friday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Saturday', isAvailable: false, startTime: '06:00', endTime: '12:00' },
  { day: 'Sunday', isAvailable: false, startTime: '00:00', endTime: '00:00' }
];

export const TRAINER_SCHEDULE_MOCK_LEAVES: TrainerScheduleLeaveRequest[] = [
  {
    id: 'LR-001',
    trainerId: 'TR-101',
    startDate: '2024-11-15',
    endDate: '2024-11-16',
    reason: 'Family function',
    leaveType: 'Personal',
    status: TRAINER_SCHEDULE_STATUS.APPROVED,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'LR-002',
    trainerId: 'TR-101',
    startDate: '2024-12-25',
    endDate: '2024-12-26',
    reason: 'Holiday travel',
    leaveType: 'Casual Leave',
    status: TRAINER_SCHEDULE_STATUS.PENDING,
    createdAt: '2024-12-01T10:00:00Z'
  }
];
