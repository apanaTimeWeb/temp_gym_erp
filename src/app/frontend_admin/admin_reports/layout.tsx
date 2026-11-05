// Reports domain shell. Individual report workflows remain in their owning business domains.
export default function AdminReportsDomainLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-full bg-page text-primary">{children}</div>;
}
