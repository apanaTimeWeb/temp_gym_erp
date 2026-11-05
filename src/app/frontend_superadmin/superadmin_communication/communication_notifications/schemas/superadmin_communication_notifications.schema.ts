import { z } from 'zod';
/** Exact notification field/schema contract from supplied Messaging Center. */
export const SuperadminCommunicationNotificationSchema = z.object({
 id: z.string(), title: z.string(), body: z.string(),
 type: z.enum(['INFO','WARNING','CRITICAL']), read: z.boolean(), createdAt: z.string(),
});
export const SuperadminCommunicationNotificationApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.discriminatedUnion('success', [
 z.object({ success:z.literal(true), message:z.string(), data:dataSchema, requestId:z.string() }).passthrough(),
 z.object({ success:z.literal(false), message:z.string(), data:z.null(), errorCode:z.string(), statusCode:z.number(), requestId:z.string() }).passthrough(),
]);
export const SuperadminCommunicationNotificationsListResponseSchema = SuperadminCommunicationNotificationApiResponseSchema(z.array(SuperadminCommunicationNotificationSchema));
export const SuperadminCommunicationNotificationDetailResponseSchema = SuperadminCommunicationNotificationApiResponseSchema(SuperadminCommunicationNotificationSchema);
