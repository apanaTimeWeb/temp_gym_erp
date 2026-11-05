// RESPONSIBILITY: Defines feature-local TypeScript contracts for profile_overview; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_profile/profile_overview/types/AdminProfileOverviewErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminProfileErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
