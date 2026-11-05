import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = body.email || 'trainer@smartgym360.com';
    let role = 'trainer';

    if (email.includes('superadmin')) role = 'superadmin';
    else if (email.includes('admin')) role = 'admin';
    else if (email.includes('manager')) role = 'manager';
    else if (email.includes('member')) role = 'member';

    const user = {
      id: `usr_${role}_01`,
      name: role === 'trainer' ? 'Michael Trainer' : 'Authorized User',
      email: email,
      role: role,
      tenantId: 'gym_demo_01',
    };

    const cookieStore = await cookies();
    const token = `token_${role}_${Date.now()}`;
    cookieStore.set('gymsmart_token', token, { path: '/', httpOnly: false });
    cookieStore.set('gymsmart_user', JSON.stringify(user), { path: '/', httpOnly: false });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: user,
      requestId: crypto.randomUUID(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
        data: null,
        errorCode: 'AUTH_FAILED',
        statusCode: 500,
        requestId: crypto.randomUUID(),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('gymsmart_token')?.value;
  const userJson = cookieStore.get('gymsmart_user')?.value;

  if (!token || !userJson) {
    return NextResponse.json(
      {
        success: false,
        message: 'No active session',
        data: null,
        errorCode: 'UNAUTHORIZED',
        statusCode: 401,
        requestId: crypto.randomUUID(),
      },
      { status: 401 }
    );
  }

  try {
    const user = JSON.parse(userJson);
    return NextResponse.json({
      success: true,
      message: 'Session valid',
      data: user,
      requestId: crypto.randomUUID(),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid session data',
        data: null,
        errorCode: 'SESSION_INVALID',
        statusCode: 401,
        requestId: crypto.randomUUID(),
      },
      { status: 401 }
    );
  }
}

