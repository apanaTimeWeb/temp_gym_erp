// RESPONSIBILITY: Preserves the Tier3 Inquiries domain boundary; business behavior stays in `inquiries_pipeline/`.
import type { ReactNode } from 'react';

export default function ManagerInquiriesDomainLayout({ children }: { children: ReactNode }) {
  return <section aria-label="Manager Inquiries domain" className="min-h-full">{children}</section>;
}
