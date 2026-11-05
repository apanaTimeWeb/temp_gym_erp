// RESPONSIBILITY: Mutable seed data for the HR staff-directory test harness only.
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';

export const MOCK_ADMIN_STAFF: Staff[] = [
  { id: 's1', employeeId: 'EMP-001', name: 'Rahul Sharma', email: 'rahul.s@gym.com', phone: '9876543210', role: 'Manager', salary: 50000, branch: 'Downtown Main', gender: 'MALE', joinDate: '2026-01-15T10:00:00Z', isActive: true },
  { id: 's2', employeeId: 'EMP-002', name: 'Priya Singh', email: 'priya.s@gym.com', phone: '9876543211', role: 'Trainer', salary: 30000, branch: 'Westside Gym', gender: 'FEMALE', joinDate: '2026-05-20T10:00:00Z', isActive: true },
];

export const MOCK_ADMIN_STAFF_EXPANDED: Staff[] = [
  ...MOCK_ADMIN_STAFF,
  ...Array.from({ length: 12 }, (_, index) => {
    const number = index + 3;
    return {
      id: `s${number}`, employeeId: `EMP-${String(number).padStart(3, '0')}`,
      name: `${['Neha Kapoor', 'Vikram Patel', 'Sana Khan', 'Arjun Nair'][index % 4]} ${number}`,
      email: `staff${number}@gym.com`, phone: `998877${(1000 + number).toString().slice(-4)}`,
      role: ['Trainer', 'Receptionist', 'Accountant', 'Manager'][index % 4]!,
      salary: 28000 + (index % 5) * 6500,
      branch: ['Downtown Main', 'Westside Gym', 'Northside Arena', 'Eastside Fitness'][index % 4]!,
      gender: ['MALE', 'FEMALE'][index % 2]!,
      joinDate: `2026-0${(index % 8) + 1}-${String((index % 25) + 1).padStart(2, '0')}T10:00:00Z`,
      isActive: index % 5 !== 0,
    };
  }),
];
