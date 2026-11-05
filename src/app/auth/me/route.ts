import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('gymsmart_token')?.value;
  const userJson = cookieStore.get('gymsmart_user')?.value;

  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      return NextResponse.json({
        success: true,
        message: 'Current user retrieved',
        data: user,
        requestId: crypto.randomUUID(),
      });
    } catch {
      // Fallback
    }
  }

  // Fallback demo user
  const fallbackUser = {
    id: 'usr_trainer_01',
    name: 'Michael Trainer',
    email: 'trainer@smartgym360.com',
    role: 'trainer',
    tenantId: 'gym_demo_01',
  };

  return NextResponse.json({
    success: true,
    message: 'Current user retrieved',
    data: fallbackUser,
    requestId: crypto.randomUUID(),
  });
}

