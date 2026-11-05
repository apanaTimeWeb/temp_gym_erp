/**
 * Ambient, type-only host contracts for isolated autonomous-submodule compilation.
 * These declarations describe host-owned interfaces; they provide no runtime implementation.
 * Canonical source: WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md.
 */
declare module '@/lib/api' {
  export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }

  export interface ValidationErrorItem {
    field: string;
    message: string;
  }

  export interface ApiSuccess<T> {
    success: true;
    message: string;
    data: T;
    meta?: PaginationMeta;
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
    validationErrors?: ValidationErrorItem[];
  }

  export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
  export function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>>;
  export function getUser(): any;
  export function logout(): void;
}

declare module '@/lib/logger' {
  export const logger: {
    info: (message: string, ...args: unknown[]) => void;
    error: (message: string, ...args: unknown[]) => void;
    warn: (message: string, ...args: unknown[]) => void;
    debug: (message: string, ...args: unknown[]) => void;
  };
}

declare module '@/lib/socket' {
  /** Canonical host socket service contract; implementation remains host-owned. */
  export const socketService: {
    subscribe: <T>(event: string, callback: (data: T) => void) => () => void;
    emit: (event: string, payload: unknown) => void;
  };

  /** Legacy host adapter retained for existing leaf socket clients. */
  export function getSocket(): unknown;
}

declare module '@/lib/display_value' {
  export function displayValue(value: unknown): string;
}

declare module '@/components/ui/*' {
  import type React from 'react';
  export type StubComponentProps = React.PropsWithChildren<Record<string, unknown>>;
  const Component: React.FC<StubComponentProps>;
  export default Component;
  export const Button: React.FC<StubComponentProps>;
  export const Dialog: React.FC<StubComponentProps>;
  export const Input: React.FC<StubComponentProps>;
  export const Card: React.FC<StubComponentProps>;
}
