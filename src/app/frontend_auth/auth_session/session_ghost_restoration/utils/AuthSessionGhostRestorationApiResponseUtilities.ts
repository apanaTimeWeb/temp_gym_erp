import { StatusCodes } from 'http-status-codes';

import { NextResponse } from 'next/server';

import type { ApiResponse, ValidationErrorItem } from '@/lib/api';

// RESPONSIBILITY: Owns construction of the canonical Auth `ApiResponse<T>` success/error envelope for server route responses.

const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-store',
};

export const AuthApiResponseUtilities = {
  /**
   * Creates a successful canonical response with private no-store caching.
   */
  success<T>(message: string, data: T) {
    const body: ApiResponse<T> = { success: true, message, data, requestId: crypto.randomUUID() };
    return NextResponse.json(body, { status: StatusCodes.OK, headers: NO_STORE_HEADERS });
  },

  /**
   * Creates a canonical error response and limits the payload to the documented fields.
   */
  failure(
    message: string,
    statusCode: number,
    error: string,
    errorCode: string,
    validationErrors?: ValidationErrorItem[],
  ) {
    const body: ApiResponse<null> = {
      success: false,
      message,
      data: null,
      error,
      errorCode,
      statusCode,
      requestId: crypto.randomUUID(),
      ...(validationErrors ? { validationErrors } : {}),
    };
    return NextResponse.json(body, { status: statusCode, headers: NO_STORE_HEADERS });
  },
};
