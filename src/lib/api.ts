/**
 * Canonical Global API Transport Layer
 * Adheres to the Universal API Envelope Contract (Rule 14 & Rule 31)
 */

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  requestId: string;
}

export interface ApiFailure {
  success: false;
  message: string;
  data: null;
  error?: string;
  errorCode: string;
  statusCode: number;
  requestId: string;
  validationErrors?: Array<{ field: string; message: string }>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const requestId =
    (typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `req_${Date.now()}`);

  try {
    const response = await fetch(endpoint, config);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      if (!response.ok) {
        return {
          success: false,
          message: `HTTP error ${response.status}: ${response.statusText}`,
          data: null,
          errorCode: `HTTP_${response.status}`,
          statusCode: response.status,
          requestId,
        };
      }
      return {
        success: true,
        message: "OK",
        data: (await response.text()) as unknown as T,
        requestId,
      };
    }

    const json = await response.json();

    if (!response.ok || json.success === false) {
      return {
        success: false,
        message: json.message || "An error occurred during the request.",
        data: null,
        error: json.error,
        errorCode: json.errorCode || `ERR_${response.status}`,
        statusCode: response.status,
        requestId: json.requestId || requestId,
        validationErrors: json.validationErrors,
      };
    }

    return {
      success: true,
      message: json.message || "Success",
      data: json.data !== undefined ? json.data : json,
      meta: json.meta,
      requestId: json.requestId || requestId,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Network failure occurred",
      data: null,
      errorCode: "NETWORK_ERROR",
      statusCode: 0,
      requestId,
    };
  }
}

