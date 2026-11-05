// RESPONSIBILITY: Renders the loading component and its associated UI logic.
/**
 * @description Renders the loading component and its associated UI logic.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function MessagingLoading() {
    return (<div data-testid="superadmin_communication_messaging-loading-superadmin_communication_messaging-loading-state" className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded w-64"/>
      <div className="h-10 bg-card rounded w-48"/>
      {['row-1', 'row-2', 'row-3', 'row-4', 'row-5'].map((key) => (<div key={key} className="h-12 bg-card rounded-lg border border-border"/>))}
    </div>);
}
