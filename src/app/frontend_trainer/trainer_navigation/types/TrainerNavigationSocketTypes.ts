// RESPONSIBILITY: Defines the transport-neutral socket subscription contracts used by Trainer infrastructure.
export interface TrainerNavigationSocketSubscription {
  path: string;
  eventName: string;
  listener: (payload: unknown) => void;
}
export interface TrainerNavigationSocketContextValue {
  subscribe: (subscription: TrainerNavigationSocketSubscription) => () => void;
}
