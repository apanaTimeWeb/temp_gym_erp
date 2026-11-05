// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Defines the transport-neutral socket subscription contracts used by Trainer infrastructure.
export interface TrainerInfrastructureSocketSubscription {
  path: string;
  eventName: string;
  listener: (payload: unknown) => void;
}
export interface TrainerInfrastructureSocketContextValue {
  subscribe: (subscription: TrainerInfrastructureSocketSubscription) => () => void;
}
