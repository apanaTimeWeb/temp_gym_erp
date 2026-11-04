// RESPONSIBILITY: Orchestrates the public Auth feature surface and delegates each auth sub-feature to its own presentation boundary.
'use client';

import AuthLoginMain from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/main/AuthLoginCredentialsAndDemoAccessLoginMain';



/**
 * Provides the canonical Auth module orchestration entry point for public authentication surfaces.
 * @description Keeps the parent Auth module discoverable while preserving Login-specific rendering and state ownership inside the Login sub-feature.
 * @dependencies AuthLoginMain and the Auth module's child-feature boundaries.
 * @edge-case New authentication sub-features must be registered here without moving their business logic into the parent orchestrator.
 */
export default function AuthMain() {
  return <AuthLoginMain />;
}
