import TrainerEarningsNotFoundView from "@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsNotFoundView";

/**
 * @description Provides the earnings route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerEarningsNotFound() {
  return <div data-testid="trainer_earnings-route-not_found"><TrainerEarningsNotFoundView /></div>;
}
