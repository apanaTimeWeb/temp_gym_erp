import { TRAINER_SESSIONS_SESSION_TYPE, TRAINER_SESSIONS_SESSION_STATUS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';

import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';




const currentDate = new Date();
const today = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

export const TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS = [
  { id: 'm1', name: 'Rahul Sharma', phone: '9876543210' },
  { id: 'm2', name: 'Neha Gupta', phone: '9876543211' },
  { id: 'm3', name: 'Amit Kumar', phone: '9876543212' },
];

export const TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS: TrainerSessionsTrainerSession[] = [
  {
    id: 's1',
    title: 'Morning HIIT',
    type: TRAINER_SESSIONS_SESSION_TYPE.GROUP,
    time: '07:00 AM',
    sessionDate: today,
    duration: '60 min',
    status: TRAINER_SESSIONS_SESSION_STATUS.UPCOMING,
    attendees: 12,
    maxAttendees: 15,
    enrolledMembers: [...TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS],
    isOnline: false,
    location: 'Studio A'
  },
  {
    id: 's2',
    title: 'PT - Rahul Sharma',
    type: TRAINER_SESSIONS_SESSION_TYPE.PT,
    time: '09:00 AM',
    sessionDate: today,
    duration: '60 min',
    status: TRAINER_SESSIONS_SESSION_STATUS.COMPLETED,
    attendees: 1,
    isOnline: false,
    member: 'Rahul Sharma',
    enrolledMembers: TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS.filter((member) => member.id === 'm1'),
    trainerNotes: 'Focus on upper body strength'
  },
  {
    id: 's3',
    title: 'Yoga Flow',
    type: TRAINER_SESSIONS_SESSION_TYPE.GROUP,
    time: '06:00 PM',
    sessionDate: today,
    duration: '60 min',
    status: TRAINER_SESSIONS_SESSION_STATUS.UPCOMING,
    attendees: 8,
    maxAttendees: 20,
    enrolledMembers: [...TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS],
    isOnline: false,
    location: 'Studio B'
  }
];
