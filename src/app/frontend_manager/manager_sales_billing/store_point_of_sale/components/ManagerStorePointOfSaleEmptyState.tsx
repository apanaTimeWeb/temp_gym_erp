// RESPONSIBILITY: Renders the Point of Sale empty-cart state; it does not own cart mutation or checkout rules.
export default function ManagerStorePointOfSaleEmptyState({ message }: { message: string }) {
  return <p data-testid="manager_store-managerstoreposmodal-empty-cart-state" role="status" aria-live="polite" className="text-sm text-text-secondary text-center py-4">{message}</p>;
}
