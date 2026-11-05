import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const rawRole = (body && typeof body.role === 'string' ? body.role : 'TRAINER').toUpperCase();
    const validRoles = ['SUPERADMIN', 'ADMIN', 'MANAGER', 'TRAINER'] as const;
    const role: (typeof validRoles)[number] = validRoles.includes(rawRole as any) ? (rawRole as any) : 'TRAINER';

    const roleNameMap: Record<string, string> = {
      TRAINER: 'Michael Trainer',
      SUPERADMIN: 'Super Admin',
      ADMIN: 'Branch Admin',
      MANAGER: 'Operations Manager',
    };

    const user = {
      id: `usr_${role.toLowerCase()}_01`,
      name: roleNameMap[role] || `${role} User`,
      email: `${role.toLowerCase()}@smartgym360.com`,
      role: role,
      tenantId: 'gym_demo_01',
    };

    const cookieStore = await cookies();
    const token = `token_demo_${role.toLowerCase()}_${Date.now()}`;
    cookieStore.set('gymsmart_token', token, { path: '/', httpOnly: false });
    cookieStore.set('gymsmart_user', JSON.stringify(user), { path: '/', httpOnly: false });

    return NextResponse.json({
      success: true,
      message: 'Demo authentication successful',
      data: user,
      requestId: crypto.randomUUID(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Demo authentication failed',
        data: null,
        errorCode: 'DEMO_AUTH_FAILED',
        statusCode: 500,
        requestId: crypto.randomUUID(),
      },
      { status: 500 }
    );
  }
}
