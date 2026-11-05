export interface SuperadminSystemOpsInfrastructureHeaderProps {
  statusFilter: string;
  options: Array<{ value: string; label: string }>;
  isRefreshing: boolean;
  onStatusFilterChange: (value: string) => void;
  onRefresh: () => void;
}
