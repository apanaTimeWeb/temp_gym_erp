// RESPONSIBILITY: Renders the Store Orders no-records state; it does not own order fetching or pagination.
export default function ManagerStoreOrderManagementEmptyState({ message }: { message: string }) {
  return <div data-testid="manager_store-store-managerstoreordertable-empty-state" role="status" aria-live="polite" className="text-center py-10 text-text-secondary">{message}</div>;
}
