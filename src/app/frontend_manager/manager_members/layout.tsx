// RESPONSIBILITY: Preserves the Tier3 Members domain boundary; business behavior stays in `members_directory/`.
import type { ReactNode } from 'react';

export default function ManagerMembersDomainLayout({ children }: { children: ReactNode }) {
  return <section aria-label="Manager Members domain" className="min-h-full">{children}</section>;
}
