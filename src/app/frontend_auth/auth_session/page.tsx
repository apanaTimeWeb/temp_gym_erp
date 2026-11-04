import { redirect } from 'next/navigation';

/** GET is navigation-only; no token revocation, logout, or session mutation. */
export default function AuthDomainIndex() {
  redirect('/frontend_auth/auth/login');
}
