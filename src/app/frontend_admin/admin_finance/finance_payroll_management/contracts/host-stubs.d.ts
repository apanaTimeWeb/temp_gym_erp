// RESPONSIBILITY: Defines the host-stubs.d route, lifecycle boundary, or module support artifact for hr_management; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_payroll_management/contracts/host-stubs.d.ts)

/**
 * Isolated-host declarations for this feature ZIP only.
 * Do not include this file in a full host application's TypeScript program; host infrastructure owns
 * the real contracts. See Section 21 of this feature's _features.md.
 */
declare module '@/lib/api' {
  export interface ApiSuccess<T> {
    success: true;
    message: string;
    data: T;
    requestId: string;
    meta?: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };
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
  export function apiFetch<T>(endpoint: string, options?: RequestInit & { dataSchema?: unknown }): Promise<ApiResponse<T>>;
  export function getUser(): { id: string; name?: string; email?: string; role?: string } | null;
  export function logout(): Promise<void>;
}

declare module '@/lib/logger' {
  export interface Logger {
    info(message: string, ...args: unknown[]): void;
    error(message: string, ...args: unknown[]): void;
    warn(message: string, ...args: unknown[]): void;
    debug(message: string, ...args: unknown[]): void;
  }
  export const logger: Logger;
}

declare module '@/lib/socket' {
  export interface SocketService {
    subscribe<T>(event: string, callback: (data: T) => void): () => void;
    emit(event: string, payload: unknown): void;
  }
  export const socketService: SocketService;
}

declare module '@/lib/display_value' {
  export function displayValue(value: unknown, fallback?: string): string;
}

declare module '@/components/ui/*' {
  import type * as React from 'react';
  export type StubComponentProps = React.PropsWithChildren<Record<string, unknown>>;
  export const Button: React.FC<StubComponentProps>;
  export const Dialog: React.FC<StubComponentProps>;
  export const Input: React.FC<StubComponentProps>;
  export const Card: React.FC<StubComponentProps>;
  export const Select: React.FC<StubComponentProps>;
  export const Checkbox: React.FC<StubComponentProps>;
  export const Badge: React.FC<StubComponentProps>;
  const Component: React.FC<StubComponentProps>;
  export default Component;
}
