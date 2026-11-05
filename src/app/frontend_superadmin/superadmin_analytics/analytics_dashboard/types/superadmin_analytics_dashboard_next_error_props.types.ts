// RESPONSIBILITY: Local Next.js route error contract for analytics_dashboard; no sibling imports.
export interface SuperadminAnalyticsDashboardNextErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
