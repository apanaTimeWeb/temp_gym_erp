import { MANAGER_GRIEVANCE_RESOLUTION_STATUS_VALUES } from '@/app/frontend_manager/manager_grievances/grievance_resolution/constants/manager_grievance_resolution.constants';
import type { GrievanceTicket } from '@/app/frontend_manager/manager_grievances/grievance_resolution/types/manager_grievance_resolution.types';

/**
 * @description Provides the ManagerGrievanceResolutionMockFixtures implementation for the grievance module.
 * @dependencies @/app/frontend_manager/manager_grievances/manager_grievance_types/ManagerGrievanceResolutionTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_GRIEVANCE_TICKETS: GrievanceTicket[] = [
  {
    id: 'gt1',
    memberName: 'Rahul Sharma',
    category: 'HYGIENE',
    issue: 'Washroom smells bad and no handwash',
    status: MANAGER_GRIEVANCE_RESOLUTION_STATUS_VALUES.OPEN,
    loggedAt: '2026-09-19T08:30:00Z',
  },
  {
    id: 'gt2',
    memberName: 'Sneha Patel',
    category: 'STAFF_BEHAVIOUR',
    issue: 'Trainer John is not paying attention during general training',
    status: MANAGER_GRIEVANCE_RESOLUTION_STATUS_VALUES.RESOLVING,
    loggedAt: '2026-09-17T18:15:00Z',
  },
  {
    id: 'gt3',
    memberName: 'Vikas Singh',
    category: 'EQUIPMENT',
    issue: 'Leg press machine is making a weird noise',
    status: MANAGER_GRIEVANCE_RESOLUTION_STATUS_VALUES.CLOSED,
    loggedAt: '2026-09-10T07:45:00Z',
    resolvedAt: '2026-09-11T12:00:00Z',
    resolutionNote: 'Machine oiled and tightened. Working fine now.',
  }
];
