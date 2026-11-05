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

export type ApiResponse<T> = (ApiSuccess<T> | ApiFailure) & {
  status?: number;
  ok?: boolean;
  json?: () => Promise<unknown>;
  text?: () => Promise<string>;
};

export async function apiFetch<T = unknown>(
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
        const failure: ApiFailure & { status: number; ok: boolean; json: () => Promise<unknown>; text: () => Promise<string> } = {
          success: false,
          message: `HTTP error ${response.status}: ${response.statusText}`,
          data: null,
          errorCode: `HTTP_${response.status}`,
          statusCode: response.status,
          requestId,
          status: response.status,
          ok: response.ok,
          json: async () => failure,
          text: async () => JSON.stringify(failure),
        };
        return failure;
      }
      const rawText = await response.text();
      let parsedJson: unknown = null;
      try {
        parsedJson = JSON.parse(rawText);
      } catch {
        parsedJson = rawText;
      }
      const success: ApiSuccess<T> & { status: number; ok: boolean; json: () => Promise<unknown>; text: () => Promise<string> } = {
        success: true,
        message: "OK",
        data: (parsedJson !== null ? parsedJson : rawText) as unknown as T,
        requestId,
        status: response.status,
        ok: response.ok,
        json: async () => parsedJson,
        text: async () => rawText,
      };
      return success;
    }

    const json = await response.json();

    if (!response.ok || json.success === false) {
      const failure: ApiFailure & { status: number; ok: boolean; json: () => Promise<unknown>; text: () => Promise<string> } = {
        success: false,
        message: json.message || "An error occurred during the request.",
        data: null,
        error: json.error,
        errorCode: json.errorCode || `ERR_${response.status}`,
        statusCode: response.status,
        requestId: json.requestId || requestId,
        validationErrors: json.validationErrors,
        status: response.status,
        ok: false,
        json: async () => json,
        text: async () => JSON.stringify(json),
      };
      return failure;
    }

    const success: ApiSuccess<T> & { status: number; ok: boolean; json: () => Promise<unknown>; text: () => Promise<string> } = {
      success: true,
      message: json.message || "Success",
      data: json.data !== undefined ? json.data : json,
      meta: json.meta,
      requestId: json.requestId || requestId,
      status: response.status,
      ok: true,
      json: async () => json,
      text: async () => JSON.stringify(json),
    };
    return success;
  } catch (error) {
    const networkFailure: ApiFailure & { status: number; ok: boolean; json: () => Promise<unknown>; text: () => Promise<string> } = {
      success: false,
      message: error instanceof Error ? error.message : "Network failure occurred",
      data: null,
      errorCode: "NETWORK_ERROR",
      statusCode: 0,
      requestId,
      status: 0,
      ok: false,
      json: async () => networkFailure,
      text: async () => JSON.stringify(networkFailure),
    };
    return networkFailure;
  }
}

export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  tenantId?: string;
  permissions?: string[];
}

export function getUser(): UserProfile | null {
  if (typeof window === "undefined") {
    return {
      id: "trainer_demo_user",
      name: "Michael Trainer",
      email: "trainer@smartgym360.com",
      role: "trainer",
    };
  }

  try {
    const match = document.cookie.match(/gymsmart_user=([^;]+)/);
    if (match) {
      return JSON.parse(decodeURIComponent(match[1]));
    }
    const local = localStorage.getItem("gymsmart_user");
    if (local) {
      return JSON.parse(local);
    }
  } catch {
    // Ignore parse error
  }

  return {
    id: "trainer_demo_user",
    name: "Michael Trainer",
    email: "trainer@smartgym360.com",
    role: "trainer",
  };
}

export function logout(): void {
  if (typeof document !== "undefined") {
    document.cookie = "gymsmart_token=; path=/; max-age=0";
    document.cookie = "gymsmart_user=; path=/; max-age=0";
    document.cookie = "gymsmart_refresh_token=; path=/; max-age=0";
    try {
      localStorage.removeItem("gymsmart_user");
      localStorage.removeItem("gymsmart_token");
    } catch {
      // Ignore storage error
    }
    window.location.href = "/frontend_auth/auth_login/login_credentials_and_demo_access";
  }
}
