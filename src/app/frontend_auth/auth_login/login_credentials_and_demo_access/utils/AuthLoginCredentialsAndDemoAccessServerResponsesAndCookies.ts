// RESPONSIBILITY: Login-only HttpOnly cookie issuance and canonical response-envelope construction.
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import type { ValidationErrorItem, ApiResponse } from '@/lib/api';
import { AuthLoginServerRuntimeConfig, AuthLoginSessionConstants } from '../constants/AuthLoginCredentialsAndDemoAccessServerConstants';
import type { AuthLoginServerUser } from '../types/AuthLoginCredentialsAndDemoAccessServerTypes';
const NO_STORE_HEADERS = {'Cache-Control':'private, no-store'};
export const AuthLoginResponseUtilities = {
  success<T>(message:string,data:T) {
    const body:ApiResponse<T>={success:true,message,data,requestId:crypto.randomUUID()};
    return NextResponse.json(body,{status:StatusCodes.OK,headers:NO_STORE_HEADERS});
  },
  failure(message:string,statusCode:number,error:string,errorCode:string,validationErrors?:ValidationErrorItem[]) {
    const body:ApiResponse<null>={success:false,message,data:null,error,errorCode,statusCode,requestId:crypto.randomUUID(),...(validationErrors?{validationErrors}:{})};
    return NextResponse.json(body,{status:statusCode,headers:NO_STORE_HEADERS});
  },
} as const;
export const AuthLoginCookieUtilities = {
  setSession(response:NextResponse, accessToken:string, refreshToken:string, user:AuthLoginServerUser) {
    const base={httpOnly:true,secure:AuthLoginServerRuntimeConfig.isProduction(),sameSite:'strict' as const,path:'/'};
    response.cookies.set(AuthLoginSessionConstants.COOKIES.ACCESS_TOKEN,accessToken,{...base,maxAge:AuthLoginSessionConstants.MAX_AGE_SECONDS.ACCESS_TOKEN});
    response.cookies.set(AuthLoginSessionConstants.COOKIES.REFRESH_TOKEN,refreshToken,{...base,maxAge:AuthLoginSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN});
    response.cookies.set(AuthLoginSessionConstants.COOKIES.USER,JSON.stringify(user),{...base,maxAge:AuthLoginSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN});
  },
} as const;
