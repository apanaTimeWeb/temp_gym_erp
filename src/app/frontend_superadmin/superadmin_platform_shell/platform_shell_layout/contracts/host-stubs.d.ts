/**
 * Ambient host contracts for isolated Superadmin leaf compilation.
 * These declarations mirror the documented web host contract surface and use no raw `any`.
 */
declare module '@/lib/api' {
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
export interface ApiFetchSchemaLike {
    parse(value: unknown): unknown;
  }
export interface ApiFetchOptions extends RequestInit {
    dataSchema?: ApiFetchSchemaLike;
    responseSchema?: ApiFetchSchemaLike;
  }
export function apiFetch<T>(endpoint: string, options?: ApiFetchOptions): Promise<ApiResponse<T>>;
export function getUser(): { name?: string; email?: string; role?: string; avatar?: string; id?: string } | null;
export function logout(): Promise<void>;
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
export const socketService: {
    subscribe: <T>(event: string, callback: (data: T) => void) => () => void;
    emit: (event: string, payload: unknown) => void;
  };
export const socket: unknown
}

declare module '@/lib/display_value' {
export function displayValue(value: unknown, fallback?: string): string
}

declare module '@/components/ui/*' {
import type React from 'react';
export type StubComponentProps = React.PropsWithChildren<Record<string, unknown>>;
const Component: import('react').ComponentType<Record<string, unknown>>;
export default Component;
export const Button: React.FC<StubComponentProps>;
export const Dialog: React.FC<StubComponentProps>;
export const Input: React.FC<StubComponentProps>;
export const Card: React.FC<StubComponentProps>;
}

// Additional isolated-host declarations required by this feature's actual imports.
// These types describe host boundaries; implementations remain in the host app.

declare module '@/components/ui/Feedback/ConfirmProvider' {
export const ConfirmProvider: import('react').ComponentType<import('react').PropsWithChildren>;
export interface ConfirmOptions {
    title: string;
    message: string;
    type?: 'warning' | 'danger' | 'info' | 'success';
    confirmText?: string;
    cancelText?: string;
  }
export function useConfirm(): { confirm: (options: ConfirmOptions) => Promise<boolean> };
}

declare module '@/lib/api' {
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
export interface ApiFetchSchemaLike {
    parse(value: unknown): unknown;
  }
export interface ApiFetchOptions extends RequestInit {
    dataSchema?: ApiFetchSchemaLike;
    responseSchema?: ApiFetchSchemaLike;
  }
export function apiFetch<T>(endpoint: string, options?: ApiFetchOptions): Promise<ApiResponse<T>>;
export function getUser(): { name?: string; email?: string; role?: string; avatar?: string; id?: string } | null;
export function logout(): Promise<void>;
}
declare module '@/components/ThemeToggle' {
export const ThemeToggle: import('react').ComponentType;
}
