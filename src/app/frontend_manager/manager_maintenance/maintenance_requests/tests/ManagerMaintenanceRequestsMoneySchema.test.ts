import { describe, expect, it } from 'vitest';

import { MaintenanceTicketSchema } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/schemas/manager_maintenance_requests.schemas';

describe('Maintenance API money schema', () => { it('rejects fractional minor-unit estimated cost', () => { const ticket = { id: 't1', title: 'Treadmill belt', equipment: 'Treadmill 1', status: 'OPEN', priority: 'MEDIUM', reportedAt: '2026-10-01T10:00:00Z', estimatedCost: 250000 }; expect(MaintenanceTicketSchema.safeParse(ticket).success).toBe(true); expect(MaintenanceTicketSchema.safeParse({ ...ticket, estimatedCost: 250000.5 }).success).toBe(false); }); });
