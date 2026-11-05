// RESPONSIBILITY: Next.js loading.tsx — skeleton fallback for the Inquiries module. Mimics KPI cards + toolbar + table layout.
/** @description Route-level InquiriesLoading for the Manager frontend module. */
export default function InquiriesLoading() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-card border border-border rounded-lg motion-safe:animate-pulse" />
          <div className="h-4 w-64 bg-card border border-border rounded-md motion-safe:animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-card border border-border rounded-lg motion-safe:animate-pulse" />
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={`skeleton-${i}`} className="p-6 rounded-xl border border-border bg-card motion-safe:animate-pulse h-28" />
        ))}
      </div>

      {/* Toolbar skeleton */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="h-9 flex-1 bg-card border border-border rounded-lg motion-safe:animate-pulse" />
        <div className="h-9 w-36 bg-card border border-border rounded-lg motion-safe:animate-pulse" />
        <div className="h-9 w-36 bg-card border border-border rounded-lg motion-safe:animate-pulse" />
      </div>

      {/* Table skeleton */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="h-11 bg-input border-b border-border motion-safe:animate-pulse" />
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={`skeleton-${i}`} className="h-14 border-b border-border px-5 flex items-center gap-4 motion-safe:animate-pulse">
            <div className="h-4 w-24 bg-skeleton-base rounded" />
            <div className="h-4 w-32 bg-skeleton-highlight rounded" />
            <div className="h-4 w-20 bg-skeleton-base rounded" />
            <div className="h-5 w-16 bg-skeleton-highlight rounded-full" />
            <div className="h-4 w-24 bg-skeleton-base rounded ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
