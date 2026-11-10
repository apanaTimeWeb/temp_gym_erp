// RESPONSIBILITY: Loading skeleton for Manager Support Tickets route.
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';

export default function ManagerSupportTicketsLoading() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-pulse">
      <div className="h-8 w-64 bg-input rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-input rounded-xl" />
        ))}
      </div>
      <ManagerTableSkeleton rows={5} />
    </div>
  );
}

