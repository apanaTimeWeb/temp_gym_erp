// Standalone-only ambient host contracts for this autonomous leaf.
// These declarations are for isolated leaf tests only; integrate real host modules in production.
// Keep requestId mandatory on both branches; MSW handlers must construct the full envelope rather than weakening this contract.
declare module '@/lib/api' {
  export interface ApiSuccess<T> { success: true; message: string; data: T; requestId: string; meta?: Record<string, unknown>; }
  export interface ApiFailure { success: false; message: string; data: null; errorCode: string; statusCode: number; requestId: string; validationErrors?: Array<{ field: string; message: string }>; }
  export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
  export function apiFetch<T>(endpoint: string, options?: RequestInit & { dataSchema?: { parse(input: unknown): T } }): Promise<ApiResponse<T>>;
}
declare module '@/lib/logger' { export const logger: { info: (message: string, ...args: unknown[]) => void; error: (message: string, ...args: unknown[]) => void; warn: (message: string, ...args: unknown[]) => void; debug: (message: string, ...args: unknown[]) => void; }; }
declare module '@/lib/socket' { export const socketService: { subscribe: <T>(event: string, callback: (data: T) => void) => () => void; emit: (event: string, payload: unknown) => void; }; }
declare module '@/lib/display_value' { export function displayValue(value: unknown): string; }
declare module '@/components/ui/*' { import type React from 'react'; export type StubComponentProps = React.PropsWithChildren<Record<string, unknown>>; const Component: React.FC<StubComponentProps>; export default Component; export const Button: React.FC<StubComponentProps>; export const Dialog: React.FC<StubComponentProps>; export const Input: React.FC<StubComponentProps>; export const Card: React.FC<StubComponentProps>; }
