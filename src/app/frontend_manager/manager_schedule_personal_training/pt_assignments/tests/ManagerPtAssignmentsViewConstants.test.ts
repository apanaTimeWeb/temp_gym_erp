import { describe, expect, it } from 'vitest';

import { resolveManagerPtAssignmentsView } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/utils/ManagerPtAssignmentsResolveView';
describe('Manager PT view URL contract', () => { it.each(['dashboard','assignments','workload','packages'])('accepts %s', (view) => expect(resolveManagerPtAssignmentsView(view)).toBe(view)); it('defaults invalid values safely', () => expect(resolveManagerPtAssignmentsView('invalid')).toBe('dashboard')); });
