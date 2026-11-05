import { z } from 'zod';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_account/account_notifications/schemas/TrainerAccountNotificationsTrainerInfrastructureApiResponseSchema';

import { TrainerNotificationsTrainerNotificationItemSchema } from '@/app/frontend_trainer/trainer_account/account_notifications/schemas/TrainerAccountNotificationsNotificationsSchemas';




export const TrainerNotificationsResponseSchema = TrainerInfrastructureApiResponseSchema(z.object({ notifications: z.array(TrainerNotificationsTrainerNotificationItemSchema), total: z.number().optional() }));
export const TrainerNotificationsTrainerNotificationMutationResponseSchema = TrainerInfrastructureApiResponseSchema(z.unknown());
