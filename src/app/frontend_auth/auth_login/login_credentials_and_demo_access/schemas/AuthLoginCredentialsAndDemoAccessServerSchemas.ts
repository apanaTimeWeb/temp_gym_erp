// RESPONSIBILITY: Login-only request and backend-envelope schemas cloned from source-verified AuthSchema.ts.
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { AuthLoginRoleConstants, AuthLoginSessionConstants } from '../constants/AuthLoginCredentialsAndDemoAccessServerConstants';
export const AuthLoginRoleSchema = z.enum([AuthLoginRoleConstants.SUPERADMIN, AuthLoginRoleConstants.ADMIN, AuthLoginRoleConstants.MANAGER, AuthLoginRoleConstants.TRAINER]);
export const AuthLoginUserSchema = z.object({ id:z.string().min(1), name:z.string().min(1), email:z.string().email(), role:AuthLoginRoleSchema, tenantId:z.string().min(1).optional() });
export const AuthLoginCredentialsSchema = z.object({ email:z.string().email(), password:z.string().min(AuthLoginSessionConstants.PASSWORD_MIN_LENGTH) });
export const AuthDemoLoginRequestSchema = z.object({ role:AuthLoginRoleSchema });
const authPaginationMeta = z.object({ total:z.number().int().nonnegative(), page:z.number().int().positive(), limit:z.number().int().positive(), totalPages:z.number().int().nonnegative(), hasNextPage:z.boolean(), hasPrevPage:z.boolean() });
const authShape = { success:z.boolean(), message:z.string(), data:z.unknown().nullable(), meta:authPaginationMeta.optional(), error:z.string().optional(), errorCode:z.string().optional(), statusCode:z.number().int().optional(), validationErrors:z.array(z.object({field:z.string(),message:z.string()})).optional() };
export const AuthBackendLoginResponseSchema = z.object({ ...authShape, data:z.object({ accessToken:z.string().min(1), refreshToken:z.string().min(1), user:AuthLoginUserSchema }).nullable() })
  .superRefine((value, ctx)=>{
    if (value.success && value.statusCode!==undefined) ctx.addIssue({code:z.ZodIssueCode.custom,path:['statusCode'],message:'Success responses must omit statusCode.'});
    if (!value.success && value.statusCode===undefined) ctx.addIssue({code:z.ZodIssueCode.custom,path:['statusCode'],message:'Error responses must include statusCode.'});
    if (value.validationErrors && value.statusCode!==StatusCodes.BAD_REQUEST) ctx.addIssue({code:z.ZodIssueCode.custom,path:['validationErrors'],message:`validationErrors are only valid on ${StatusCodes.BAD_REQUEST} responses.`});
    if (value.meta!==undefined) ctx.addIssue({code:z.ZodIssueCode.custom,path:['meta'],message:'meta is reserved for paginated list responses.'});
  });
