import { MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import type { Member, MemberStats } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

/**
 * @description Provides the ManagerMembersDirectoryMockData implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_members/manager_members_types/ManagerMembersDirectoryTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_MEMBER_STATS: MemberStats = {
  total: 14,
  active: 6,
  expired: 2,
  pending: 3 };

export const MOCK_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Aarav Patel',
    email: 'aarav.p@example.com',
    phone: '+919876543210',
    status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.ACTIVE,
    joinDate: '2023-01-15T10:00:00Z',
    planId: 'p1',
    branch: 'Main Branch',
    billingCycle: 'Annual',
    createdAt: '2023-01-15T10:00:00Z',
    plan: { id: 'p1', name: 'Annual Pro', price1Month: 150000, price3Month: 400000, price6Month: 750000, price12Month: 1500000 },
    expiryDate: '2026-11-20T10:00:00Z',
    paidAmount: 1500000,
    pendingAmount: 0,
    gender: 'Male' },
  {
    id: 'm2',
    name: 'Priya Sharma',
    email: 'priya.s@example.com',
    phone: '+919876543211',
    status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.PENDING,
    joinDate: '2023-05-10T10:00:00Z',
    planId: 'p2',
    branch: 'Main Branch',
    billingCycle: 'Quarterly',
    createdAt: '2023-05-10T10:00:00Z',
    plan: { id: 'p2', name: 'Quarterly Starter', price1Month: 200000, price3Month: 500000, price6Month: 900000, price12Month: 1600000 },
    expiryDate: '2026-11-16T10:00:00Z',
    paidAmount: 200000,
    pendingAmount: 300000,
    gender: 'Female' },
  {
    id: 'm3',
    name: 'Vikram Singh',
    email: 'vikram.s@example.com',
    phone: '+919876543212',
    status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.EXPIRED,
    joinDate: '2022-11-01T10:00:00Z',
    planId: 'p3',
    branch: 'Main Branch',
    billingCycle: 'Monthly',
    createdAt: '2022-11-01T10:00:00Z',
    plan: { id: 'p3', name: 'Monthly Basic', price1Month: 200000, price3Month: 550000, price6Month: 1000000, price12Month: 1800000 },
    expiryDate: '2026-11-10T10:00:00Z',
    paidAmount: 200000,
    pendingAmount: 0,
    gender: 'Male' }
,
  {
    id: 'm4', name: 'Neha Gupta', email: 'neha.g@example.com', phone: '+919876543213', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.ACTIVE, joinDate: '2023-06-18T10:00:00Z', planId: 'p1', branch: 'Main Branch', billingCycle: 'Annual', createdAt: '2023-06-18T10:00:00Z',
    plan: { id: 'p1', name: 'Annual Pro', price1Month: 150000, price3Month: 400000, price6Month: 750000, price12Month: 1500000 }, expiryDate: '2026-12-18T10:00:00Z', paidAmount: 1500000, pendingAmount: 0, gender: 'Female'
  },
  {
    id: 'm5', name: 'Rohit Mehta', email: 'rohit.m@example.com', phone: '+919876543214', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.ACTIVE, joinDate: '2023-07-22T10:00:00Z', planId: 'p2', branch: 'Main Branch', billingCycle: 'Quarterly', createdAt: '2023-07-22T10:00:00Z',
    plan: { id: 'p2', name: 'Quarterly Starter', price1Month: 200000, price3Month: 500000, price6Month: 900000, price12Month: 1600000 }, expiryDate: '2026-12-25T10:00:00Z', paidAmount: 500000, pendingAmount: 0, gender: 'Male'
  },
  {
    id: 'm6', name: 'Kavya Singh', email: 'kavya.s@example.com', phone: '+919876543215', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.PENDING, joinDate: '2023-08-14T10:00:00Z', planId: 'p3', branch: 'Main Branch', billingCycle: 'Monthly', createdAt: '2023-08-14T10:00:00Z',
    plan: { id: 'p3', name: 'Monthly Basic', price1Month: 200000, price3Month: 550000, price6Month: 1000000, price12Month: 1800000 }, expiryDate: '2023-09-14T10:00:00Z', paidAmount: 100000, pendingAmount: 100000, gender: 'Female'
  },
  {
    id: 'm7', name: 'Arjun Rao', email: 'arjun.r@example.com', phone: '+919876543216', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.ACTIVE, joinDate: '2023-09-04T10:00:00Z', planId: 'p1', branch: 'Main Branch', billingCycle: 'Annual', createdAt: '2023-09-04T10:00:00Z',
    plan: { id: 'p1', name: 'Annual Pro', price1Month: 150000, price3Month: 400000, price6Month: 750000, price12Month: 1500000 }, expiryDate: '2024-09-04T10:00:00Z', paidAmount: 1200000, pendingAmount: 300000, gender: 'Male'
  },
  {
    id: 'm8', name: 'Simran Kaur', email: 'simran.k@example.com', phone: '+919876543217', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.SUSPENDED, joinDate: '2022-12-12T10:00:00Z', planId: 'p2', branch: 'Main Branch', billingCycle: 'Quarterly', createdAt: '2022-12-12T10:00:00Z',
    plan: { id: 'p2', name: 'Quarterly Starter', price1Month: 200000, price3Month: 500000, price6Month: 900000, price12Month: 1600000 }, expiryDate: '2024-02-12T10:00:00Z', paidAmount: 500000, pendingAmount: 0, gender: 'Female'
  },
  {
    id: 'm9', name: 'Manish Kumar', email: 'manish.k@example.com', phone: '+919876543218', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.ACTIVE, joinDate: '2024-01-08T10:00:00Z', planId: 'p3', branch: 'Main Branch', billingCycle: 'Monthly', createdAt: '2024-01-08T10:00:00Z',
    plan: { id: 'p3', name: 'Monthly Basic', price1Month: 200000, price3Month: 550000, price6Month: 1000000, price12Month: 1800000 }, expiryDate: '2024-06-08T10:00:00Z', paidAmount: 200000, pendingAmount: 0, gender: 'Male'
  },
  {
    id: 'm10', name: 'Pooja Verma', email: 'pooja.v@example.com', phone: '+919876543219', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.PENDING, joinDate: '2024-02-19T10:00:00Z', planId: 'p2', branch: 'Main Branch', billingCycle: 'Quarterly', createdAt: '2024-02-19T10:00:00Z',
    plan: { id: 'p2', name: 'Quarterly Starter', price1Month: 200000, price3Month: 500000, price6Month: 900000, price12Month: 1600000 }, expiryDate: '2024-05-19T10:00:00Z', paidAmount: 250000, pendingAmount: 250000, gender: 'Female'
  },
  {
    id: 'm11', name: 'Yash Tiwari', email: 'yash.t@example.com', phone: '+919876543220', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.EXPIRED, joinDate: '2022-10-21T10:00:00Z', planId: 'p1', branch: 'Main Branch', billingCycle: 'Annual', createdAt: '2022-10-21T10:00:00Z',
    plan: { id: 'p1', name: 'Annual Pro', price1Month: 150000, price3Month: 400000, price6Month: 750000, price12Month: 1500000 }, expiryDate: '2023-10-21T10:00:00Z', paidAmount: 1500000, pendingAmount: 0, gender: 'Male'
  },
  {
    id: 'm12', name: 'Isha Malhotra', email: 'isha.m@example.com', phone: '+919876543221', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.ACTIVE, joinDate: '2024-03-11T10:00:00Z', planId: 'p3', branch: 'Main Branch', billingCycle: 'Monthly', createdAt: '2024-03-11T10:00:00Z',
    plan: { id: 'p3', name: 'Monthly Basic', price1Month: 200000, price3Month: 550000, price6Month: 1000000, price12Month: 1800000 }, expiryDate: '2024-06-11T10:00:00Z', paidAmount: 200000, pendingAmount: 0, gender: 'Female'
  },
  {
    id: 'm13', name: 'Kabir Mehra', email: 'kabir.m@example.com', phone: '+919876543222', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.BANNED, joinDate: '2023-04-10T10:00:00Z', planId: 'p2', branch: 'Main Branch', billingCycle: 'Quarterly', createdAt: '2023-04-10T10:00:00Z',
    plan: { id: 'p2', name: 'Quarterly Starter', price1Month: 200000, price3Month: 500000, price6Month: 900000, price12Month: 1600000 }, expiryDate: '2023-07-10T10:00:00Z', paidAmount: 500000, pendingAmount: 0, gender: 'Male'
  },
  {
    id: 'm14', name: 'Sameer Sheikh', email: 'sameer.s@example.com', phone: '+919876543223', status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.SUSPENDED, joinDate: '2023-11-05T10:00:00Z', planId: 'p1', branch: 'Main Branch', billingCycle: 'Annual', createdAt: '2023-11-05T10:00:00Z',
    plan: { id: 'p1', name: 'Annual Pro', price1Month: 150000, price3Month: 400000, price6Month: 750000, price12Month: 1500000 }, expiryDate: '2024-11-05T10:00:00Z', paidAmount: 1500000, pendingAmount: 0, gender: 'Male'
  }
];
