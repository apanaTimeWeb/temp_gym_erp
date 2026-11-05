// RESPONSIBILITY: TypeScript types for the Manager Profile module.

export interface ManagerProfileAndSecurityData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  branchName: string;
  joinedAt: string;
  avatarInitial: string;
}

export interface UpdateManagerProfileAndSecurityPayload {
  name: string;
  phone: string;
}

export interface UpdateManagerPasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ManagerProfileAndSecurityTab = 'personal' | 'security';
