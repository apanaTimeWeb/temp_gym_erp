import { MANAGER_TRAINER_SCHEDULE_API } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/config/manager_trainer_schedule.url_config';
import { http, HttpResponse } from 'msw';

import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';



import { buildMockScheduleKpis, MOCK_TRAINERS } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/mocks/fixtures/ManagerTrainerScheduleMockData';
import { MANAGERSCHEDULEMANAGEMENT_MOCK_SCENARIOS, type ManagerTrainerScheduleMockScenario } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/mocks/scenarios/ManagerTrainerScheduleMockScenarios';
import type { CreateShiftDto, TrainerScheduleSummary, TrainerShift } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule.types';


let mockTrainers = structuredClone(MOCK_TRAINERS);
let mockShiftIdCounter = 1000;
let requestIdCounter = 1;
const idempotencyResponses = new Map<string, { signature: string; body: unknown }>();
const scenarioAttempts = new Map<string, number>();

function nextRequestId(): string { return `manager-schedule-mock-${requestIdCounter++}`; }
function success<T>(message: string, data: T) { return { success: true as const, message, data, requestId: nextRequestId() }; }
function failure(message: string, errorCode: string, statusCode: number) { return { success: false as const, message, data: null, errorCode, statusCode, requestId: nextRequestId() }; }

function replayOrConflict(request: Request, signature: string) {
  const key = request.headers.get('Idempotency-Key');
  if (!key) return HttpResponse.json(failure('Idempotency-Key is required', 'IDEMPOTENCY_KEY_REQUIRED', 400), { status: 400 });
  const existing = idempotencyResponses.get(key);
  if (!existing) return null;
  if (existing.signature !== signature) return HttpResponse.json(failure('Idempotency-Key was already used for a different request', 'IDEMPOTENCY_KEY_REUSED', 409), { status: 409 });
  return HttpResponse.json(existing.body);
}

function storeIdempotentResponse(request: Request, signature: string, body: unknown): void {
  const key = request.headers.get('Idempotency-Key');
  if (key) idempotencyResponses.set(key, { signature, body });
}

function applyScenario(request: Request, emptyData?: unknown) {
  const scenario = request.headers.get('x-manager-mock-scenario') as ManagerTrainerScheduleMockScenario | null;
  if (!scenario || !(scenario in MANAGERSCHEDULEMANAGEMENT_MOCK_SCENARIOS)) return null;
  if (scenario === 'ACTIVE') return null;
  if (scenario === 'EMPTY') return HttpResponse.json(success('Schedule fetched', emptyData ?? { trainers: [], kpis: buildMockScheduleKpis([]) }));
  if (scenario === 'SERVER_500') return HttpResponse.json(failure('Mock server failure', 'INTERNAL_ERROR', 500), { status: 500 });
  if (scenario === 'UNAUTHORIZED') return HttpResponse.json(failure('Authentication required', 'UNAUTHORIZED', 401), { status: 401 });
  if (scenario === 'TIMEOUT' || scenario === 'CANCELLED') return HttpResponse.error();
  if (scenario === 'INVALID') return HttpResponse.json(success('Invalid schedule fixture', { trainers: [{ id: 1 }], kpis: { invalid: true } }));
  if (scenario === 'RETRY') {
    const attempt = (scenarioAttempts.get(scenario) ?? 0) + 1;
    scenarioAttempts.set(scenario, attempt);
    if (attempt === 1) return HttpResponse.json(failure('Temporary schedule outage', 'TEMPORARY_UNAVAILABLE', 503), { status: 503 });
  }
  return null;
}

function recomputeTrainerSummary(trainer: TrainerScheduleSummary): void {
  trainer.totalShiftsPerWeek = trainer.shifts.length;
  trainer.totalHoursPerWeek = trainer.shifts.reduce((total, shift) => {
    const [startHour, startMinute] = shift.startTime.split(':').map(Number);
    const [endHour, endMinute] = shift.endTime.split(':').map(Number);
    const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    return total + (Number.isFinite(duration) && duration > 0 ? duration / 60 : 0);
  }, 0);
}

/**
 * @description Provides the ManagerTrainerScheduleMockHandlers implementation for the schedule module.
 * @dependencies MSW, ManagerInfrastructureMockApiUrl, leaf schedule URL/constants/fixtures/scenario catalogue/types
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerTrainerScheduleMockState(): void {
  mockShiftIdCounter = 1000;
  requestIdCounter = 1;
  mockTrainers = structuredClone(MOCK_TRAINERS);
  idempotencyResponses.clear();
  scenarioAttempts.clear();
}

export const managerScheduleHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_TRAINER_SCHEDULE_API.BASE), ({ request }) => {
    const scenario = applyScenario(request);
    if (scenario) return scenario;
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const day = url.searchParams.get('day');
    const trainers = mockTrainers.map((trainer) => ({
      ...trainer,
      shifts: day ? trainer.shifts.filter((shift) => shift.day === day) : trainer.shifts,
    })).filter((trainer) => !search || trainer.trainerName.toLowerCase().includes(search) || trainer.trainerRole.toLowerCase().includes(search));
    return HttpResponse.json(success('Schedule fetched', { trainers, kpis: buildMockScheduleKpis(mockTrainers) }));
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_TRAINER_SCHEDULE_API.SHIFTS), async ({ request }) => {
    const body = await request.json() as CreateShiftDto;
    const signature = `POST:${new URL(request.url).pathname}:${JSON.stringify(body)}`;
    const replay = replayOrConflict(request, signature);
    if (replay) return replay;
    const trainer = mockTrainers.find((item) => item.trainerId === body.trainerId);
    if (!trainer) return HttpResponse.json(failure('Trainer not found', 'NOT_FOUND', 404), { status: 404 });
    const shift: TrainerShift = { ...body, trainerName: trainer.trainerName, trainerRole: trainer.trainerRole, id: `shift-${mockShiftIdCounter++}` };
    trainer.shifts.push(shift);
    recomputeTrainerSummary(trainer);
    const response = success('Shift created', shift);
    storeIdempotentResponse(request, signature, response);
    return HttpResponse.json(response);
  }),
  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_TRAINER_SCHEDULE_API.SHIFT(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<TrainerShift>;
    const signature = `PATCH:${new URL(request.url).pathname}:${JSON.stringify(body)}`;
    const replay = replayOrConflict(request, signature);
    if (replay) return replay;
    for (const trainer of mockTrainers) {
      const index = trainer.shifts.findIndex((shift) => shift.id === params.id);
      if (index < 0) continue;
      const existing = trainer.shifts[index];
      if (!existing) continue;
      const updated: TrainerShift = { ...existing, ...body, id: existing.id, trainerId: trainer.trainerId, trainerName: trainer.trainerName, trainerRole: trainer.trainerRole };
      trainer.shifts[index] = updated;
      recomputeTrainerSummary(trainer);
      const response = success('Shift updated', updated);
      storeIdempotentResponse(request, signature, response);
      return HttpResponse.json(response);
    }
    return HttpResponse.json(failure('Shift not found', 'NOT_FOUND', 404), { status: 404 });
  }),
  http.delete(ManagerInfrastructureMockApiUrl(MANAGER_TRAINER_SCHEDULE_API.SHIFT(':id')), ({ request, params }) => {
    const signature = `DELETE:${new URL(request.url).pathname}`;
    const replay = replayOrConflict(request, signature);
    if (replay) return replay;
    for (const trainer of mockTrainers) {
      const before = trainer.shifts.length;
      trainer.shifts = trainer.shifts.filter((shift) => shift.id !== params.id);
      if (trainer.shifts.length === before) continue;
      recomputeTrainerSummary(trainer);
      const response = success('Shift deleted', { id: String(params.id) });
      storeIdempotentResponse(request, signature, response);
      return HttpResponse.json(response);
    }
    return HttpResponse.json(failure('Shift not found', 'NOT_FOUND', 404), { status: 404 });
  }),
];
