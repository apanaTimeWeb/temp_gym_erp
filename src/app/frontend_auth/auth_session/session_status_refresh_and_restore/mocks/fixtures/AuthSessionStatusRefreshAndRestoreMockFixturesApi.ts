// Session's local fixture adapter consumes the backend development-only contract.
// It deliberately contains no independent mutable session state.
export { AuthDemoSessionService as AuthMockFixturesApi } from '@/server/auth-demo/AuthDemoSessionService';
