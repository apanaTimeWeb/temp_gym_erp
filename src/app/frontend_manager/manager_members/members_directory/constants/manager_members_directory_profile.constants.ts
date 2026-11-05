// RESPONSIBILITY: Defines the member-profile sub-tab IDs and locale keys.
import type { MemberProfileTab } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

export const PROFILE_TABS = [
  { id: 'overview', label: 'COPY_OVERVIEW_TAB' },
  { id: 'attendance', label: 'COPY_ATTENDANCE_TAB' },
  { id: 'payments', label: 'COPY_PAYMENTS_TAB' },
  { id: 'workout', label: 'COPY_WORKOUT_TAB' },
  { id: 'diet', label: 'COPY_DIET_TAB' },
] as const satisfies readonly { id: MemberProfileTab; label: string }[];
