import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const role = (body && typeof body.role === 'string' ? body.role : 'trainer').toLowerCase();

    const roleNameMap: Record<string, string> = {
      trainer: 'Michael Trainer',
      superadmin: 'Super Admin',
      admin: 'Branch Admin',
      manager: 'Operations Manager',
      member: 'Alex Member',
    };

    const user = {
      id: `usr_${role}_01`,
      name: roleNameMap[role] || `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      email: `${role}@smartgym360.com`,
      role: role,
      tenantId: 'gym_demo_01',
    };

    const cookieStore = await cookies();
    const token = `token_demo_${role}_${Date.now()}`;
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

