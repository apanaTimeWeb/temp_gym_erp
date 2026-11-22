// RESPONSIBILITY: Pure utility function to normalize member edit form data into standard form values.
import { ManagerMembersDirectoryCreateDefaultForm } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCreateDefaultForm';
import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalFromMinorUnits';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';

const CYCLE_MAP: Record<string, MemberFormValues['billingCycle']> = {
  Monthly: 'ONE_MONTH',
  ONE_MONTH: 'ONE_MONTH',
  Quarterly: 'THREE_MONTHS',
  THREE_MONTHS: 'THREE_MONTHS',
  Semiannual: 'SIX_MONTHS',
  SIX_MONTHS: 'SIX_MONTHS',
  Annual: 'TWELVE_MONTHS',
  TWELVE_MONTHS: 'TWELVE_MONTHS',
  CUSTOM: 'CUSTOM',
};

/**
 * Normalizes raw or incoming editData to ensure valid enum keys, clean phone strings, ISO dates, and major currency units.
 */
export function ManagerMembersDirectoryNormalizeEditData(
  editData: MemberFormValues | null
): MemberFormValues {
  const defaultForm = ManagerMembersDirectoryCreateDefaultForm();
  if (!editData) return defaultForm;

  const normalizedPhone = editData.phone ? editData.phone.replace(/[\s-+]/g, '').slice(-10) : '';
  const rawGender = String(editData.gender || '').toUpperCase();
  const normalizedGender = (['MALE', 'FEMALE', 'OTHER'].includes(rawGender) ? rawGender : 'MALE') as MemberFormValues['gender'];
  const normalizedCycle = editData.billingCycle ? (CYCLE_MAP[editData.billingCycle] || 'ONE_MONTH') : 'ONE_MONTH';
  const normalizedJoinDate = editData.joinDate ? (editData.joinDate.includes('T') ? editData.joinDate.split('T')[0] : editData.joinDate.slice(0, 10)) : '';
  const normalizedExpiryDate = editData.expiryDate ? (editData.expiryDate.includes('T') ? editData.expiryDate.split('T')[0] : editData.expiryDate.slice(0, 10)) : '';

  return {
    ...defaultForm,
    ...editData,
    ...(normalizedPhone ? { phone: normalizedPhone } : {}),
    gender: normalizedGender,
    billingCycle: normalizedCycle,
    joinDate: normalizedJoinDate || defaultForm.joinDate,
    expiryDate: normalizedExpiryDate || defaultForm.expiryDate,
    totalAmount: editData.totalAmount ? ManagerInfrastructureFromManagerMinorUnits(editData.totalAmount) : 0,
    paidAmount: editData.paidAmount ? ManagerInfrastructureFromManagerMinorUnits(editData.paidAmount) : 0,
    pendingAmount: editData.pendingAmount ? ManagerInfrastructureFromManagerMinorUnits(editData.pendingAmount) : 0,
    advanceAmount: editData.advanceAmount ? ManagerInfrastructureFromManagerMinorUnits(editData.advanceAmount) : 0,
    paymentMethod: editData.paymentMethod || 'UPI',
  };
}
