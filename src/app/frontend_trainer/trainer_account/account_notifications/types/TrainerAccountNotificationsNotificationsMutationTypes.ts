// RESPONSIBILITY: Defines mutation variable contracts for Trainer Notifications server-state writes.
export interface TrainerNotificationsMarkReadMutationVariables {
  id: string;
  idempotencyKey: string;
}
