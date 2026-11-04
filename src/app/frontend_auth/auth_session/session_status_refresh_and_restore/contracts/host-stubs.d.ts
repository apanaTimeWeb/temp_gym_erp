// SUBMODULE OWNERSHIP: Ambient fallback declarations for isolated module checks only.
// Real project types must come from the host. This file is not a runtime implementation.
declare module '@/lib/api' {
  export interface ValidationErrorItem { field: string; message: string }
  export interface ApiSuccess<T> { success: true; message: string; data: T; requestId: string; meta?: { total:number; page:number; limit:number; totalPages:number; hasNextPage:boolean; hasPrevPage:boolean } }
  export interface ApiFailure { success: false; message: string; data: null; errorCode: string; statusCode: number; requestId: string; error?: string; validationErrors?: ValidationErrorItem[] }
  export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
  export function apiFetch(endpoint: string, options?: RequestInit): Promise<Response>;
  export function apiFetch<T>(endpoint: string, options?: RequestInit & {auth?:boolean}): Promise<T>;
}
declare module '@/lib/logger' {
  export const logger: {info(message:string,...args:unknown[]):void; warn(message:string,...args:unknown[]):void; error(message:string,...args:unknown[]):void;debug(message:string,...args:unknown[]):void};
}
declare module '@/lib/socket' {
  export const socketService: {subscribe<T>(event:string,cb:(data:T)=>void):()=>void;emit(event:string,payload:unknown):void};
}
declare module '@/lib/display_value' { export function displayValue(value:unknown):string }
declare module '@/components/ui/*' {
  import type React from 'react';
  export type StubComponentProps = React.PropsWithChildren<Record<string,unknown>>;
  const Component: React.FC<StubComponentProps>;
  export default Component;
  export const Button: React.FC<StubComponentProps>;
  export const Dialog: React.FC<StubComponentProps>;
  export const Input: React.FC<StubComponentProps>;
  export const Card: React.FC<StubComponentProps>;
}

// Host-owned, server-only demo authentication fixture contract.
declare module '@/server/auth-demo/AuthDemoSessionService' {
  export interface AuthDemoUser { id:string;name:string;email:string;role:'SUPERADMIN'|'ADMIN'|'MANAGER'|'TRAINER';tenantId:string }
  export interface AuthDemoCredentials { accessToken:string;refreshToken:string;user:AuthDemoUser }
  export const AuthDemoSessionService: {
    findByCredentials(email:string,password:string): AuthDemoUser|null;
    findByRole(role:AuthDemoUser['role']): {readonly user:AuthDemoUser;readonly password:string};
    issueSession(user:AuthDemoUser):AuthDemoCredentials;
    issueSessionForIntent(user:AuthDemoUser,key:string,fingerprint:string):AuthDemoCredentials|null;
    resolveUserByAccessToken(token:string):AuthDemoUser|null;
    isRefreshIdempotencyConflict(key:string,token:string):boolean;
    refreshSession(token:string,key?:string):{accessToken:string;refreshToken:string}|null;
    revokeSession(accessToken:string|undefined,refreshToken:string|undefined):void;
    resetMockSessions():void;
  };
}

declare module '@/lib/api-raw' { export function apiFetchRaw(url:string,options:RequestInit):Promise<Response>; }
