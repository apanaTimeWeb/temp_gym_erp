// RESPONSIBILITY: Creates a fresh member form state with current-date defaults for each modal opening.
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';

export function ManagerMembersDirectoryCreateDefaultForm(): MemberFormValues {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return {
    name: '', email: '', phone: '', address: '', aadhaar: '', gender: 'MALE', billingCycle: 'ONE_MONTH', planId: '',
    joinDate: today.toISOString().split('T')[0] || '', expiryDate: nextMonth.toISOString().split('T')[0] || '', medicalHistory: '',
  };
}
