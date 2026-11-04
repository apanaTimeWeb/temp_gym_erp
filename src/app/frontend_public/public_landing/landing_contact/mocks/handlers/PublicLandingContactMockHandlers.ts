// RESPONSIBILITY: MSW v2 handlers for the verified Contact POST endpoint and isolated mutable fixtures.
// These are simulated responses, NOT claims about fields emitted by the production backend.
import { delay, http, HttpResponse } from 'msw';
import { PUBLIC_LANDING_MOCK_HTTP_STATUS } from '@/app/frontend_public/public_landing/landing_contact/constants/PublicLandingContactMockHttpStatusConstants';
import { PublicLandingContactApiPayloadSchema } from '@/app/frontend_public/public_landing/landing_contact/schemas/PublicLandingContactSchema';
import { hasPublicLandingMutationKey, isPublicLandingMutationConflict, landingMockState, nextPublicLandingMockId, rememberPublicLandingMutationKey } from '@/app/frontend_public/public_landing/landing_contact/mocks/fixtures/PublicLandingContactMockFixtures';
import { getPublicLandingContactMockScenario, PUBLIC_LANDING_CONTACT_MOCK_SCENARIOS } from '@/app/frontend_public/public_landing/landing_contact/mocks/scenarios/public_landing_contact.scenarios';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_contact/config/public_landing_contact.url_config';

const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Explicit local mock trace: never attribute this ID to an unverified upstream server. */
function mockRequestId(): string { return `mock:${crypto.randomUUID()}`; }

function mockFailure(statusCode: number, errorCode: string, message: string): Response {
  return HttpResponse.json({
    success: false, message, data: null, errorCode, statusCode, requestId: mockRequestId(),
  }, { status: statusCode });
}

/** Existing optional wire fields remain unchanged in production schema; mocks emit a stricter local envelope. */
export const landingHandlers = [
  http.post(`*${PublicLandingUrlConfig.BACKEND_API.CONTACT}`, async ({ request }) => {
    const key = request.headers.get('Idempotency-Key');
    if (!key) return mockFailure(PUBLIC_LANDING_MOCK_HTTP_STATUS.BAD_REQUEST,
      'IDEMPOTENCY_KEY_REQUIRED', 'A request idempotency key is required.');
    if (!uuidV4Pattern.test(key)) return mockFailure(PUBLIC_LANDING_MOCK_HTTP_STATUS.BAD_REQUEST,
      'IDEMPOTENCY_KEY_INVALID', 'Idempotency-Key must be a UUIDv4.');

    let body: unknown;
    try { body = await request.json(); }
    catch { return mockFailure(PUBLIC_LANDING_MOCK_HTTP_STATUS.UNPROCESSABLE_ENTITY,
      'VALIDATION_ERROR', 'Please check the submitted form fields.'); }
    const parsed = PublicLandingContactApiPayloadSchema.safeParse(body);
    if (!parsed.success) return mockFailure(PUBLIC_LANDING_MOCK_HTTP_STATUS.UNPROCESSABLE_ENTITY,
      'VALIDATION_ERROR', 'Please check the submitted form fields.');

    const scenario = getPublicLandingContactMockScenario();
    if (scenario === PUBLIC_LANDING_CONTACT_MOCK_SCENARIOS.UNAUTHORIZED) {
      return mockFailure(PUBLIC_LANDING_MOCK_HTTP_STATUS.UNAUTHORIZED,
        'UNAUTHORIZED', 'This mock scenario denies access.');
    }
    if (scenario === PUBLIC_LANDING_CONTACT_MOCK_SCENARIOS.SERVER_500) {
      return mockFailure(PUBLIC_LANDING_MOCK_HTTP_STATUS.INTERNAL_SERVER_ERROR,
        'INTERNAL_SERVER_ERROR', 'This mock scenario simulates a server failure.');
    }
    if (scenario === PUBLIC_LANDING_CONTACT_MOCK_SCENARIOS.TIMEOUT) {
      await delay(15_000);
      return mockFailure(PUBLIC_LANDING_MOCK_HTTP_STATUS.SERVICE_UNAVAILABLE,
        'CONTACT_TIMEOUT', 'The simulated timeout was interrupted.');
    }

    // Mock-only safeguard: an idempotency key may replay exactly the same intent,
    // but must not silently accept a DIFFERENT normalized payload.
    const payloadFingerprint = JSON.stringify(parsed.data);
    if (isPublicLandingMutationConflict(key, payloadFingerprint)) {
      return mockFailure(PUBLIC_LANDING_MOCK_HTTP_STATUS.CONFLICT,
        'IDEMPOTENCY_KEY_CONFLICT', 'This mock idempotency key was used for a different request.');
    }

    // ACTIVE and EMPTY accept the same contract. EMPTY begins with zero fixtures;
    // a successful mutation must still be visible in its owning mutable collection.
    if (!hasPublicLandingMutationKey(key)) {
      landingMockState.contacts.push({ ...parsed.data, id: nextPublicLandingMockId('contact') });
      rememberPublicLandingMutationKey(key, payloadFingerprint);
    }
    return HttpResponse.json({
      success: true, message: 'Message sent successfully. We will get back to you shortly.', data: null, requestId: mockRequestId(),
    });
  }),
];

// Preserve the historical opt-in error-scenario export for existing consumers.
// New scenarios operate on the verified POST route above, without suffix endpoints.
export const landingErrorScenarioHandlers = [
  http.post('*/landing/contact-error', () => mockFailure(
    PUBLIC_LANDING_MOCK_HTTP_STATUS.SERVICE_UNAVAILABLE,
    'CONTACT_SERVICE_UNAVAILABLE', 'Messaging service is temporarily unavailable. Please try again.',
  )),
];
