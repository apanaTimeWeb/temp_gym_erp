import { describe, expect, it } from 'vitest';

import { commRecipientSchema } from '@/app/frontend_manager/manager_communications/communications_compose/schemas/manager_communications_communications_compose.schemas';

describe('Communications money schema', () => { it('rejects fractional minor-unit pending balances', () => { const recipient = { memberId: 'm1', name: 'Member', phone: '9999999999', email: 'member@example.test', status: 'PENDING', expiryDate: '2026-11-01', pendingAmount: 25000 }; expect(commRecipientSchema.safeParse(recipient).success).toBe(true); expect(commRecipientSchema.safeParse({ ...recipient, pendingAmount: 25000.5 }).success).toBe(false); }); });
