import type { PublicLandingApiResponse, PublicLandingContactApiPayload, PublicLandingContactFormValues } from '@/app/frontend_public/public_landing/landing_contact/types/PublicLandingContactTypes';
// RESPONSIBILITY: Owns PublicLanding HTTP request construction, runtime response validation, and safe transport-error normalization.
import { apiFetch } from '@/lib/api';
import { LANDING_API_ERROR_CODES } from '@/app/frontend_public/public_landing/landing_contact/constants/PublicLandingContactApiErrorConstants';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_contact/config/public_landing_contact.url_config';
import { PublicLandingContactApiPayloadSchema, PublicLandingContactSchema, PublicLandingContactIdempotencyKeySchema } from '@/app/frontend_public/public_landing/landing_contact/schemas/PublicLandingContactSchema';
import { PublicLandingNullApiResponseSchema } from '@/app/frontend_public/public_landing/landing_contact/schemas/PublicLandingContactApiResponseSchema';
import { PublicLandingApiRequestError } from '@/app/frontend_public/public_landing/landing_contact/types/PublicLandingContactTypes';

/** Preserve the backend's verified wire response; synthesize only a local correlation identifier. */
function parsePublicLandingApiResponse(value: unknown): PublicLandingApiResponse<null> {
  const parsed = PublicLandingNullApiResponseSchema.safeParse(value);
  if (!parsed.success) {
    throw new PublicLandingApiRequestError('', {
      errorCode: LANDING_API_ERROR_CODES.INVALID_RESPONSE, isBackendMessage: false,
    });
  }
  const response = parsed.data;
  // A locally generated ID is for client diagnostics only, never represented as a backend request trace.
  const requestId = response.requestId ?? `client:${crypto.randomUUID()}`;
  if (response.success) return { ...response, requestId };
  return { ...response, requestId, errorCode: response.errorCode ?? 'UNKNOWN_ERROR',
    statusCode: response.statusCode ?? 500 };
}

function resolvePublicLandingFailure(response: PublicLandingApiResponse<null>): PublicLandingApiResponse<null> {
  if (!response.success) {
    throw new PublicLandingApiRequestError(response.message, {
      errorCode: response.errorCode,
      validationErrors: response.validationErrors,
      statusCode: response.statusCode,
      isBackendMessage: true,
    });
  }
  return response;
}

/** Sends a contact message with Zod validation, canonical API-envelope validation, and the supplied idempotency key. */
export async function createPublicLandingContactMessage(values: PublicLandingContactFormValues, idempotencyKey: string): Promise<PublicLandingApiResponse<null>> {
  let payload: PublicLandingContactApiPayload;
  try {
    payload = PublicLandingContactApiPayloadSchema.parse(PublicLandingContactSchema.parse(values));
  } catch {
    throw new PublicLandingApiRequestError('', {
      errorCode: LANDING_API_ERROR_CODES.CONTACT_REQUEST_FAILED,
      isBackendMessage: false,
    });
  }

  // Never forward caller-supplied malformed mutation keys to the backend.
  if (!PublicLandingContactIdempotencyKeySchema.safeParse(idempotencyKey).success) {
    throw new PublicLandingApiRequestError('', {
      errorCode: LANDING_API_ERROR_CODES.CONTACT_REQUEST_FAILED, isBackendMessage: false,
    });
  }

  try {
    const response = await apiFetch<unknown>(PublicLandingUrlConfig.BACKEND_API.CONTACT, {
      method: 'POST',
      auth: false,
      body: JSON.stringify(payload),
      headers: { 'Idempotency-Key': idempotencyKey },
    });
    return resolvePublicLandingFailure(parsePublicLandingApiResponse(response));
  } catch (error: unknown) {
    if (error instanceof PublicLandingApiRequestError) throw error;
    throw new PublicLandingApiRequestError('', { errorCode: LANDING_API_ERROR_CODES.CONTACT_REQUEST_FAILED });
  }
}
