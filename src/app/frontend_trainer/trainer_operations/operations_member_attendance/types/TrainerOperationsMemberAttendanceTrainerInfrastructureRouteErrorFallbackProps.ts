// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Typed props contract for the Trainer route-level error fallback.
export interface TrainerInfrastructureRouteErrorFallbackProps {
  errorDigest?: string;
  moduleName: string;
  route: string;
  reset: () => void;
}
