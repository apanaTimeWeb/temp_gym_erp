import {describe, expect, it, beforeEach} from 'vitest';
import { z } from 'zod';

import { resetSuperadminCommunicationMessagingMockState } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/mocks/handlers/SuperadminCommunicationMessagingCenterMockHandlers';
import { SuperadminCommunicationMessagingCenterApiResponseSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_api_response.schema';
import { SuperadminCommunicationMessagingComposeSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_compose.schemas';

beforeEach(() => {
  resetSuperadminCommunicationMessagingMockState();
});

describe('SuperadminCommunicationMessagingComposeSchema', () => {
  it('rejects incomplete tenant-level messages before the API is called', () => {
    const result = SuperadminCommunicationMessagingComposeSchema.safeParse({
      tenantId: '',
      channel: 'EMAIL',
      subject: '   ',
      body: '',
    });
    expect(result.success).toBe(false);
  });

  it('accepts a valid tenant-level message payload', () => {
    const result = SuperadminCommunicationMessagingComposeSchema.safeParse({
      tenantId: 't1',
      channel: 'SMS',
      subject: 'Maintenance notice',
      body: 'Please review the maintenance window for your tenant.',
    });
    expect(result.success).toBe(true);
  });

  it('enforces the documented field length limits', () => {
    expect(SuperadminCommunicationMessagingComposeSchema.safeParse({
      tenantId: 't1', channel: 'EMAIL', subject: 'x'.repeat(201), body: 'Body',
    }).success).toBe(false);
    expect(SuperadminCommunicationMessagingComposeSchema.safeParse({
      tenantId: 't1', channel: 'EMAIL', subject: 'Subject', body: 'x'.repeat(5001),
    }).success).toBe(false);
  });
});
describe('Messaging Center API response envelope', () => {
  const schema = SuperadminCommunicationMessagingCenterApiResponseSchema(z.object({ id: z.string() }));
  it('accepts success data and failure without success data', () => {
    expect(schema.safeParse({ success: true, message: 'ok', data: { id: 'message-1' }, requestId: 'req-1' }).success).toBe(true);
    expect(schema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'UNAVAILABLE', statusCode: 503, requestId: 'req-2' }).success).toBe(true);
  });
  it('rejects invalid discriminant/data combinations', () => {
    expect(schema.safeParse({ success: true, message: 'missing data', requestId: 'req-4' }).success).toBe(false);
    expect(schema.safeParse({ success: true, message: 'missing request id', data: { id: 'message-1' } }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'failure', data: { id: 'message-1' }, errorCode: 'DOWN', statusCode: 500, requestId: 'req-3' }).success).toBe(false);
  });
});
