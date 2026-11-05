// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin branches feature.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_branches/branches_directory/mocks/fixtures/AdminGymsBranchesDirectoryMockFixtures.ts)

import { ADMIN_BRANCH_STAFF_STATUS, ADMIN_BRANCH_STUDENT_STATUS, BRANCH_STATUS } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/constants/AdminGymsBranchesDirectoryConstants';
import type { Branch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes';

export const MOCK_BRANCHES: Branch[] = [
  {
    id: 'b1', name: 'Andheri East', location: 'Mumbai', status: BRANCH_STATUS.ACTIVE, revenue: 185000, expenses: 72000, studentsCount: 420, staffCount: 18,
    branchCode: 'AE01', gstNumber: '27ABCDE1234F1Z1', address: 'Andheri East, Mumbai', contactPhone: '+91 98765 43210', contactEmail: 'andheri@example.com', openingTime: '06:00', closingTime: '22:00', maxCapacity: 600, currentOccupancy: 320, equipmentCount: 96,
    revenueItems: [
      { id: 'b1-r1', label: 'Membership collections', amount: 132000, method: 'UPI', date: '2026-09-18' },
      { id: 'b1-r2', label: 'Personal training', amount: 32000, method: 'Card', date: '2026-09-17' },
      { id: 'b1-r3', label: 'Store sales', amount: 21000, method: 'Cash', date: '2026-09-16' },
    ],
    expenseItems: [
      { id: 'b1-e1', label: 'Payroll', amount: 42000, category: 'Payroll', date: '2026-09-15' },
      { id: 'b1-e2', label: 'Utilities', amount: 18000, category: 'Utilities', date: '2026-09-12' },
      { id: 'b1-e3', label: 'Supplies', amount: 12000, category: 'Supplies', date: '2026-09-10' },
    ],
    staffList: [
      { id: 'b1-s1', name: 'Rohit Mehta', role: 'Manager', shift: 'Morning', status: ADMIN_BRANCH_STAFF_STATUS.ACTIVE },
      { id: 'b1-s2', name: 'Priya Shah', role: 'Trainer', shift: 'Evening', status: ADMIN_BRANCH_STAFF_STATUS.ACTIVE },
      { id: 'b1-s3', name: 'Aman Khan', role: 'Front Desk', shift: 'Morning', status: 'on-leave' },
    ],
    studentList: [
      { id: 'b1-m1', name: 'Neha Verma', plan: 'Gold Annual', status: ADMIN_BRANCH_STUDENT_STATUS.ACTIVE, joinDate: '2026-02-04' },
      { id: 'b1-m2', name: 'Arjun Rao', plan: 'Premium Monthly', status: ADMIN_BRANCH_STUDENT_STATUS.ACTIVE, joinDate: '2026-07-11' },
      { id: 'b1-m3', name: 'Karan Patel', plan: 'Silver Monthly', status: ADMIN_BRANCH_STUDENT_STATUS.EXPIRED, joinDate: '2025-09-01' },
    ],
  },
  {
    id: 'b2', name: 'Bandra West', location: 'Mumbai', status: BRANCH_STATUS.ACTIVE, revenue: 142000, expenses: 61000, studentsCount: 340, staffCount: 15,
    branchCode: 'BW02', gstNumber: '27ABCDE1234F1Z2', address: 'Bandra West, Mumbai', contactPhone: '+91 98765 54321', contactEmail: 'bandra@example.com', openingTime: '06:30', closingTime: '22:30', maxCapacity: 480, currentOccupancy: 265, equipmentCount: 81,
    revenueItems: [{ id: 'b2-r1', label: 'Membership collections', amount: 101000, method: 'UPI', date: '2026-09-18' }, { id: 'b2-r2', label: 'Personal training', amount: 25000, method: 'Bank', date: '2026-09-17' }],
    expenseItems: [{ id: 'b2-e1', label: 'Payroll', amount: 36000, category: 'Payroll', date: '2026-09-15' }, { id: 'b2-e2', label: 'Rent', amount: 25000, category: 'Rent', date: '2026-09-01' }],
    staffList: [{ id: 'b2-s1', name: 'Sahil Joshi', role: 'Manager', shift: 'Morning', status: ADMIN_BRANCH_STAFF_STATUS.ACTIVE }, { id: 'b2-s2', name: 'Maya Singh', role: 'Trainer', shift: 'Evening', status: ADMIN_BRANCH_STAFF_STATUS.ACTIVE }],
    studentList: [{ id: 'b2-m1', name: 'Isha Desai', plan: 'Gold Annual', status: ADMIN_BRANCH_STUDENT_STATUS.ACTIVE, joinDate: '2026-03-12' }, { id: 'b2-m2', name: 'Vikram Sen', plan: 'Silver Monthly', status: ADMIN_BRANCH_STUDENT_STATUS.EXPIRED, joinDate: '2025-08-09' }],
  },
  {
    id: 'b3', name: 'Powai', location: 'Mumbai', status: BRANCH_STATUS.ACTIVE, revenue: 98000, expenses: 50000, studentsCount: 220, staffCount: 11,
    branchCode: 'PW03', gstNumber: '27ABCDE1234F1Z3', address: 'Powai, Mumbai', contactPhone: '+91 98765 65432', contactEmail: 'powai@example.com', maxCapacity: 320, currentOccupancy: 190, equipmentCount: 62,
    revenueItems: [{ id: 'b3-r1', label: 'Membership collections', amount: 70000, method: 'Card', date: '2026-09-18' }, { id: 'b3-r2', label: 'Store sales', amount: 14000, method: 'Cash', date: '2026-09-16' }],
    expenseItems: [{ id: 'b3-e1', label: 'Payroll', amount: 29000, category: 'Payroll', date: '2026-09-15' }, { id: 'b3-e2', label: 'Utilities', amount: 21000, category: 'Utilities', date: '2026-09-12' }],
    staffList: [{ id: 'b3-s1', name: 'Dev Malhotra', role: 'Manager', shift: 'Morning', status: ADMIN_BRANCH_STAFF_STATUS.ACTIVE }],
    studentList: [{ id: 'b3-m1', name: 'Rhea Kapoor', plan: 'Premium Monthly', status: ADMIN_BRANCH_STUDENT_STATUS.ACTIVE, joinDate: '2026-05-21' }],
  },
  {
    id: 'b4', name: 'Thane', location: 'Thane', status: BRANCH_STATUS.INACTIVE, revenue: 60000, expenses: 41000, studentsCount: 180, staffCount: 9,
    branchCode: 'TH04', gstNumber: '27ABCDE1234F1Z4', address: 'Thane West, Thane', contactPhone: '+91 98765 76543', contactEmail: 'thane@example.com', maxCapacity: 260, currentOccupancy: 0, equipmentCount: 48,
    revenueItems: [{ id: 'b4-r1', label: 'Membership collections', amount: 43000, method: 'UPI', date: '2026-09-15' }],
    expenseItems: [{ id: 'b4-e1', label: 'Payroll', amount: 24000, category: 'Payroll', date: '2026-09-15' }, { id: 'b4-e2', label: 'Rent', amount: 17000, category: 'Rent', date: '2026-09-01' }],
    staffList: [{ id: 'b4-s1', name: 'Nitin Shah', role: 'Caretaker', shift: 'Morning', status: ADMIN_BRANCH_STAFF_STATUS.ACTIVE }],
    studentList: [{ id: 'b4-m1', name: 'Aditi Kulkarni', plan: 'Legacy Monthly', status: ADMIN_BRANCH_STUDENT_STATUS.EXPIRED, joinDate: '2025-07-01' }],
  },
];
