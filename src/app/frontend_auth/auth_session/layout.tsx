import type { ReactNode } from 'react';

/** Domain boundary: child routes own all Auth business behavior. */
export default function AuthDomainLayout({ children }: { children: ReactNode }) {
  return children;
}
