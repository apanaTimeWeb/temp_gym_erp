import { NextResponse } from 'next/server';
import { TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/mocks/TrainerDashboardOverviewMockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Dashboard statistics retrieved successfully',
    data: TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS,
    requestId: crypto.randomUUID(),
  });
}

