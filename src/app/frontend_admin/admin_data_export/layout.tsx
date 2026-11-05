// Domain shell. Feature workflows remain in their owning autonomous submodules.
export default function AdminDomainLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-full bg-page text-primary">{children}</div>;
}
