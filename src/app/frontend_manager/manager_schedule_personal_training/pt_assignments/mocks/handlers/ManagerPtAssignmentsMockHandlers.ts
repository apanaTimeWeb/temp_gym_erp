import { MANAGER_PT_ASSIGNMENTS_API } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/config/manager_pt_assignments.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';



import { PT_PAYMENT_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/constants/manager_pt_assignments.constants';
import { MOCK_PT_PACKAGES, MOCK_PT_ASSIGNMENTS, MOCK_PT_WORKLOAD, MOCK_PT_KPIS } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/mocks/fixtures/ManagerPtAssignmentsMockData';
import type { CreatePtAssignmentPayload, PtAssignment } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';


let mockAssignments = [...MOCK_PT_ASSIGNMENTS];

export let mockAssignmentIdCounter = 1000;
/**
 * @description Provides the ManagerPtAssignmentsMockHandlers implementation for the pt module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl; @/app/frontend_manager/manager_schedule_personal_training/manager_pt_url_config; @/app/frontend_manager/manager_schedule_personal_training/manager_pt_types/ManagerPtAssignmentsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerPtAssignmentsMockState(): void {
  mockAssignments = [...MOCK_PT_ASSIGNMENTS];
  mockAssignmentIdCounter = 1000;
}

export const managerPtHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_PT_ASSIGNMENTS_API.KPIS), () => {
    return HttpResponse.json({ success: true, message: 'KPIs fetched', data: MOCK_PT_KPIS });
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_PT_ASSIGNMENTS_API.WORKLOAD), () => {
    return HttpResponse.json({ success: true, message: 'Workload fetched', data: MOCK_PT_WORKLOAD });
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_PT_ASSIGNMENTS_API.PACKAGES), () => {
    return HttpResponse.json({ success: true, message: 'Packages fetched', data: MOCK_PT_PACKAGES });
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_PT_ASSIGNMENTS_API.ASSIGNMENTS), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || '10'), 1);
    const filtered = mockAssignments.filter((assignment) => !search || `${assignment.memberName} ${assignment.trainerName} ${assignment.packageName}`.toLowerCase().includes(search));
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Assignments fetched', data: { assignments: filtered.slice(start, start + limit), total: filtered.length, page, limit } });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_PT_ASSIGNMENTS_API.ASSIGNMENTS), async ({ request }) => {
    const body = await request.json() as CreatePtAssignmentPayload;
    const newAssignment: PtAssignment = {
      id: `asg-new-${mockAssignmentIdCounter++}`,
      memberId: body.memberId,
      memberName: 'New Member', 
      trainerId: body.trainerId,
      trainerName: 'Assigned Trainer',
      packageId: body.packageId,
      packageName: 'Assigned Package',
      totalSessions: 12,
      completedSessions: 0,
      sessionsRemaining: 12,
      startDate: body.startDate,
      endDate: '2024-01-01',
      paymentStatus: PT_PAYMENT_STATUS_VALUES[0],
      amountPaid: 0,
      totalAmount: 0 };
    mockAssignments = [newAssignment, ...mockAssignments];
    return HttpResponse.json({ success: true, message: 'Trainer assigned successfully!', data: newAssignment });
  }),

  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_PT_ASSIGNMENTS_API.COMPLETE_SESSION(':id')), ({ params }) => {
    const idx = mockAssignments.findIndex(a => a.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const assignment = mockAssignments[idx];
    if (assignment) {
      mockAssignments[idx] = { 
        ...assignment, 
        completedSessions: Math.min(assignment.completedSessions + 1, assignment.totalSessions) 
      } as PtAssignment;
    }
    return HttpResponse.json({ success: true, message: 'Session marked as complete.', data: mockAssignments[idx] });
  }),
];
