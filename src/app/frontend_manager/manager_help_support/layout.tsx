// RESPONSIBILITY: Preserves the Tier3 Help & Support domain boundary; business behavior stays in `support_tickets/`.
import type { ReactNode } from 'react';

export default function ManagerHelpSupportDomainLayout({ children }: { children: ReactNode }) {
  return <section aria-label="Manager Help & Support domain" className="min-h-full">{children}</section>;
}

