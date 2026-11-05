// RESPONSIBILITY: Fixtures for the Sales all-memberships endpoint only.
import { ADMIN_SALES_MEMBERSHIP_STATUS } from '@/app/frontend_admin/admin_sales/sales_memberships/constants/AdminSalesMembershipsConstants';
import type { Member } from '@/app/frontend_admin/admin_sales/sales_memberships/types/AdminSalesMembershipsTypes';
export const MOCK_ADMIN_ALL_MEMBERSHIPS: Member[] = [
  {
    id: 'm2', name: 'Neha Gupta', email: 'neha@example.com', phone: '9876543211', gender: 'Female',
    branch: 'Bandra West', planId: 'p2', plan: { id: 'p2', name: 'Quarterly Classic', tier: 'Silver' },
    billingCycle: 'quarterly', status: ADMIN_SALES_MEMBERSHIP_STATUS.ACTIVE, joinDate: '2026-08-01', expiryDate: '2026-11-15',
    paidAmount: 4000, pendingAmount: 0, createdAt: '2026-08-01T10:00:00Z',
  },
  {
    id: 'm3', name: 'Aman Singh', email: 'aman@example.com', phone: '9876543212', gender: 'Male',
    branch: 'Andheri East', planId: 'p1', plan: { id: 'p1', name: 'Annual Pro', tier: 'Gold' },
    billingCycle: 'annual', status: ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED, joinDate: '2026-01-10', expiryDate: '2026-10-10',
    paidAmount: 12000, pendingAmount: 0, createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'm4', name: 'Priya Nair', email: 'priya@example.com', phone: '9876543213', gender: 'Female',
    branch: 'Powai', planId: 'p3', plan: { id: 'p3', name: 'Monthly Flex', tier: 'Bronze' },
    billingCycle: 'monthly', status: ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED, joinDate: '2026-09-01', expiryDate: '2026-10-12',
    paidAmount: 1500, pendingAmount: 0, createdAt: '2026-09-01T10:00:00Z',
  },
  {
    id: 'm5', name: 'Rohit Das', email: 'rohit@example.com', phone: '9876543214', gender: 'Male',
    branch: 'Thane', planId: 'p2', plan: { id: 'p2', name: 'Quarterly Classic', tier: 'Silver' },
    billingCycle: 'quarterly', status: ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED, joinDate: '2026-05-01', expiryDate: '2026-08-01',
    paidAmount: 4000, pendingAmount: 0, createdAt: '2026-05-01T10:00:00Z',
  },
  {
    id: 'm6', name: 'Sneha Patel', email: 'sneha@example.com', phone: '9876543215', gender: 'Female',
    branch: 'Andheri East', planId: 'p1', plan: { id: 'p1', name: 'Annual Pro', tier: 'Gold' },
    billingCycle: 'annual', status: ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED, joinDate: '2026-02-01', expiryDate: '2026-10-05',
    paidAmount: 12000, pendingAmount: 0, createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'm7', name: 'Karan Mehta', email: 'karan@example.com', phone: '9876543216', gender: 'Male',
    branch: 'Bandra West', planId: 'p2', plan: { id: 'p2', name: 'Quarterly Classic', tier: 'Silver' },
    billingCycle: 'quarterly', status: ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED, joinDate: '2026-07-01', expiryDate: '2026-09-25',
    paidAmount: 4000, pendingAmount: 500, createdAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'm8', name: 'Meera Joshi', email: 'meera@example.com', phone: '9876543217', gender: 'Female',
    branch: 'Powai', planId: 'p3', plan: { id: 'p3', name: 'Monthly Flex', tier: 'Bronze' },
    billingCycle: 'monthly', status: ADMIN_SALES_MEMBERSHIP_STATUS.ACTIVE, joinDate: '2026-09-15', expiryDate: '2026-12-01',
    paidAmount: 1500, pendingAmount: 0, createdAt: '2026-09-15T10:00:00Z',
  },
  {
    id: 'm9', name: 'Vikas Jain', email: 'vikas@example.com', phone: '9876543218', gender: 'Male',
    branch: 'Thane', planId: 'p1', plan: { id: 'p1', name: 'Annual Pro', tier: 'Gold' },
    billingCycle: 'annual', status: ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED, joinDate: '2025-12-01', expiryDate: '2026-09-20',
    paidAmount: 12000, pendingAmount: 1000, createdAt: '2025-12-01T10:00:00Z',
  },
  {
    id: 'm10', name: 'Anita Roy', email: 'anita@example.com', phone: '9876543219', gender: 'Female',
    branch: 'Andheri East', planId: 'p2', plan: { id: 'p2', name: 'Quarterly Classic', tier: 'Silver' },
    billingCycle: 'quarterly', status: ADMIN_SALES_MEMBERSHIP_STATUS.ACTIVE, joinDate: '2026-08-15', expiryDate: '2026-10-25',
    paidAmount: 4000, pendingAmount: 0, createdAt: '2026-08-15T10:00:00Z',
  },
  {
    id: 'm11', name: 'Dev Malhotra', email: 'dev@example.com', phone: '9876543220', gender: 'Male',
    branch: 'Bandra West', planId: 'p3', plan: { id: 'p3', name: 'Monthly Flex', tier: 'Bronze' },
    billingCycle: 'monthly', status: ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED, joinDate: '2026-09-01', expiryDate: '2026-10-01',
    paidAmount: 1500, pendingAmount: 0, createdAt: '2026-09-01T10:00:00Z',
  },
  {
    id: 'm12', name: 'Isha Kapoor', email: 'isha@example.com', phone: '9876543221', gender: 'Female',
    branch: 'Andheri East', planId: 'p1', plan: { id: 'p1', name: 'Annual Pro', tier: 'Gold' },
    billingCycle: 'annual', status: ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED, joinDate: '2025-09-01', expiryDate: '2026-08-31',
    paidAmount: 12000, pendingAmount: 0, createdAt: '2025-09-01T10:00:00Z',
  },
];


// --- From AdminSettingsMockData.ts ---
