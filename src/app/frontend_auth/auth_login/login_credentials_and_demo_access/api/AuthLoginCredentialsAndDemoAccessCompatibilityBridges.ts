// Login consumes the server-owned development fixture contract, never a sibling feature.
// Real backend support replaces this host-only service; see INTEGRATION_GUIDE.md.
import { AuthDemoSessionService } from '@/server/auth-demo/AuthDemoSessionService';
import { AuthBackendTransport } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessBackendTransport';
export const AuthLoginDemoSessionCompatibility = AuthDemoSessionService;
export const AuthLoginRawResponseTransportCompatibility = {post: AuthBackendTransport.post} as const;
