// RESPONSIBILITY: Renders the Store Products Catalog empty/search-no-results state; it does not own product filtering.
export default function ManagerStoreProductsCatalogEmptyState({ message }: { message: string }) {
  return <div data-testid="manager_store-store-managerstoreproductgrid-empty-state" role="status" aria-live="polite" className="text-center py-10 text-text-secondary">{message}</div>;
}
