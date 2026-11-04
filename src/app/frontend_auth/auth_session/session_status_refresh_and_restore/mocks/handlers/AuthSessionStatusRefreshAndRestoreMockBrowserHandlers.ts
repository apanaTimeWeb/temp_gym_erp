// RESPONSIBILITY: Declares the browser-proxy MSW boundary for Auth.
// DATA FLOW: Same-origin Auth proxy requests are handled by Next.js route handlers so cookie policy remains authoritative.
// Browser MSW intentionally has no handlers for PROXY_API paths; backend-only MSW handlers are composed by AuthMockHandlers for route integration tests.

export const AuthMockBrowserHandlers = [] as const;
