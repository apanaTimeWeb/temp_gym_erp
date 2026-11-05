// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_blacklist/blacklist_management/mocks/fixtures/AdminMembersBlacklistManagementMockFixtures.ts)
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin blacklist feature.
import type { BlacklistKPIData } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin blacklist feature.
import type { BlacklistedMember } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';

export const MOCK_BLACKLIST: BlacklistedMember[] = [
  { id: 'bl1', memberId: 'M1042', memberName: 'Rajan Mehta', memberPhone: '+91 98765 43210', memberEmail: 'rajan.m@email.com', reason: 'Physical altercation with staff member at Andheri branch', blacklistedBy: 'Admin', blacklistedAt: '2026-05-12', scope: 'global', assignedGyms: ['all'], assignedGymNames: ['All Gyms'], isActive: true },
  { id: 'bl2', memberId: 'M2087', memberName: 'Priya Sharma', memberPhone: '+91 87654 32109', memberEmail: 'priya.s@email.com', reason: 'Repeated non-payment and fraudulent membership transfer', blacklistedBy: 'Admin', blacklistedAt: '2026-04-28', scope: 'global', assignedGyms: ['all'], assignedGymNames: ['All Gyms'], isActive: true },
  { id: 'bl3', memberId: 'M3156', memberName: 'Karan Joshi', memberPhone: '+91 76543 21098', memberEmail: 'karan.j@email.com', reason: 'Theft of equipment at Powai branch', blacklistedBy: 'Manager - Powai', blacklistedAt: '2026-06-01', scope: 'specific', assignedGyms: ['g3'], assignedGymNames: ['Powai'], isActive: true },
  { id: 'bl4', memberId: 'M4201', memberName: 'Sneha Patil', memberPhone: '+91 65432 10987', memberEmail: 'sneha.p@email.com', reason: 'Harassment of other members', blacklistedBy: 'Admin', blacklistedAt: '2026-03-15', scope: 'specific', assignedGyms: ['g1', 'g2'], assignedGymNames: ['Andheri East', 'Bandra West'], isActive: true },
  { id: 'bl5', memberId: 'M5312', memberName: 'Amit Verma', memberPhone: '+91 54321 09876', memberEmail: 'amit.v@email.com', reason: 'Chargebacks and payment disputes', blacklistedBy: 'Admin', blacklistedAt: '2026-02-20', scope: 'global', assignedGyms: ['all'], assignedGymNames: ['All Gyms'], isActive: false },
];

export const MOCK_BLACKLIST_KPI: BlacklistKPIData = {
  totalBlacklisted: 5,
  globalBans: 3,
  gymSpecificBans: 2,
  addedThisMonth: 1,
};

export const MOCK_BLACKLIST_EXPANDED: BlacklistedMember[] = [
  ...MOCK_BLACKLIST,
  ...Array.from({ length: 7 }, (_, index) => {
    const n = index + 6;
    return {
      id: `bl${n}`,
      memberId: `M${6000 + n}`,
      memberName: ['Rohit Mehra', 'Tanya Shah', 'Dev Malhotra', 'Isha Rao'][index % 4]! + ` ${n}`,
      memberPhone: `+91 90000 ${(10000 + n).toString().slice(-5)}`,
      memberEmail: `blocked${n}@email.com`,
      reason: ['Repeated payment disputes', 'Unsafe conduct', 'Fraudulent account activity', 'Property damage'][index % 4]!,
      blacklistedBy: ['Admin', 'Manager - Powai'][index % 2]!,
      blacklistedAt: `2026-0${(index % 8) + 1}-${String((index % 24) + 1).padStart(2, '0')}`,
      scope: (index % 2 === 0 ? 'global' : 'specific') as BlacklistedMember['scope'],
      assignedGyms: index % 2 === 0 ? ['all'] : [['g1'], ['g2'], ['g3'], ['g4']][index % 4]!,
      assignedGymNames: index % 2 === 0 ? ['All Gyms'] : [['Andheri East'], ['Bandra West'], ['Powai'], ['Thane']][index % 4]!,
      isActive: index % 3 !== 0,
    };
  }),
];
