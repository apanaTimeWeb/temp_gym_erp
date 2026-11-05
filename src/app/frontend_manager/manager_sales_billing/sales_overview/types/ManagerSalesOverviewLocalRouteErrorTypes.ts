// RESPONSIBILITY: Defines the standard Next.js route error-boundary props shared by Manager feature segments.
export interface ManagerInfrastructureRouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
