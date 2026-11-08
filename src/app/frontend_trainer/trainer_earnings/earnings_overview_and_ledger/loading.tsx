// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerEarningsLoadingSkeleton from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsLoadingSkeleton';
/**
 * @description Provides the earnings route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerEarningsLoading() { return <div data-testid="trainer_earnings-route-loading" className="p-6"><TrainerEarningsLoadingSkeleton /></div>; }
