// Portability contract stubs guaranteeing isolated compilation.
declare module '@/lib/api' {
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errorCode?: string;
    statusCode?: number;
    requestId?: string;
  }
}

