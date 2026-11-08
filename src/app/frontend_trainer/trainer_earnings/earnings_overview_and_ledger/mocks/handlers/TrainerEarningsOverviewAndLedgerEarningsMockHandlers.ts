// RESPONSIBILITY: Provides feature-owned mutable/read mock behavior for earnings queries and server-side ledger filters.
import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_EARNINGS_MOCK_EARNINGS_DATA } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/mocks/fixtures/TrainerEarningsOverviewAndLedgerEarningsMockData';

import { TRAINER_EARNINGS_URLS } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/config/trainer_earnings_overview_and_ledger.url_config';

/** Canonical mock transport envelope; keep feature DTO shape and verified status codes. */
const trainerMockJson = (body: unknown, init?: Parameters<typeof HttpResponse.json>[1]) => {
  if (!body || typeof body !== 'object' || !('success' in body)) return HttpResponse.json(body as Parameters<typeof HttpResponse.json>[0], init);
  const response = body as Record<string, unknown>;
  const success = response.success === true;
  const statusCode = init?.status ?? 400;
  return HttpResponse.json({
    ...response,
    requestId: typeof response.requestId === 'string' ? response.requestId : crypto.randomUUID(),
    ...(!success ? {
      data: null,
      errorCode: typeof response.errorCode === 'string' ? response.errorCode : `MOCK_HTTP_${statusCode}`,
      statusCode,
    } : {}),
  }, { ...init, status: success ? init?.status : statusCode });
};

const BASE = env.NEXT_PUBLIC_API_URL;

export const TrainerEarningsMockHandlers = [
  http.get(`${BASE}${TRAINER_EARNINGS_URLS.API.DATA}`, async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';
    const startDate = url.searchParams.get('startDate') ?? '';
    const endDate = url.searchParams.get('endDate') ?? '';
    const page = Number(url.searchParams.get('page') ?? '1');
    const limit = Number(url.searchParams.get('limit') ?? '10');
    if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) return trainerMockJson({success:false,message:'Invalid pagination values.',data:null},{status:400});
    const sortBy = url.searchParams.get('sortBy') ?? 'date';
    if (!['date', 'description', 'amount', 'type'].includes(sortBy)) return trainerMockJson({success:false,message:'Invalid earnings sort field.',data:null},{status:400});
    const sortDirection = url.searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

    const filteredHistory = TRAINER_EARNINGS_MOCK_EARNINGS_DATA.history.filter((row) => {
      const matchesSearch = !search || row.description.toLowerCase().includes(search);
      const matchesStart = !startDate || row.date >= startDate;
      const matchesEnd = !endDate || row.date <= endDate;
      return matchesSearch && matchesStart && matchesEnd;
    });

    const sortedHistory = [...filteredHistory].sort((left, right) => {
      const leftValue = left[sortBy as keyof typeof left];
      const rightValue = right[sortBy as keyof typeof right];
      const leftKey = typeof leftValue === 'string' ? leftValue.toLowerCase() : Number(leftValue ?? 0);
      const rightKey = typeof rightValue === 'string' ? rightValue.toLowerCase() : Number(rightValue ?? 0);
      const comparison = leftKey < rightKey ? -1 : leftKey > rightKey ? 1 : 0;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    const offset = (page - 1) * limit;
    const history = sortedHistory.slice(offset, offset + limit);
    return trainerMockJson({
      success: true,
      message: 'Earnings data fetched successfully',
      data: {
        ...TRAINER_EARNINGS_MOCK_EARNINGS_DATA,
        history,
        historyTotal: filteredHistory.length,
        historyPage: page,
        historyLimit: limit,
        totalPages: Math.max(1, Math.ceil(filteredHistory.length / limit)),
      },
    });
  }),
];
