import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/config/manager_finance_payments_and_summary.url_config';
import { http, HttpResponse } from 'msw';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_STATUS_VALUES } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary.constants';
import { MOCK_PAYMENTS, MOCK_FINANCE_SUMMARY } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/mocks/fixtures/ManagerFinancePaymentsAndSummaryMockData';
import { MANAGERFINANCEPAYMENTSANDSUMMARY_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/mocks/scenarios/ManagerFinancePaymentsAndSummaryMockScenarios';
import type { Payment, FinanceSummary } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary.types';

let mockPayments = [...MOCK_PAYMENTS];
let mockFinanceSummary: FinanceSummary = { ...MOCK_FINANCE_SUMMARY, revenueByMethod: { ...MOCK_FINANCE_SUMMARY.revenueByMethod }, monthlyData: [...MOCK_FINANCE_SUMMARY.monthlyData] };
export let mockPaymentIdCounter = 1000;
let retryScenarioAttempts = 0;
const idempotencyRecords = new Map<string, { fingerprint: string; response: unknown }>();

function scenarioResponse(request: Request) {
  const scenario = request.headers.get('x-manager-mock-scenario') as keyof typeof MANAGERFINANCEPAYMENTSANDSUMMARY_MOCK_SCENARIOS | null;
  if (!scenario || scenario === 'ACTIVE') return null;
  if (!MANAGERFINANCEPAYMENTSANDSUMMARY_MOCK_SCENARIOS[scenario]) return null;
  if (scenario === 'RETRY' && retryScenarioAttempts++ > 0) return null;
  if (scenario === 'EMPTY') return HttpResponse.json({ success: true, message: 'Empty result', data: { payments: [], total: 0 } });
  if (scenario === 'INVALID') return HttpResponse.json({ success: true, message: 'Invalid scenario payload', data: { payments: null, total: 'invalid' } });
  const status = scenario === 'RETRY' ? 503 : scenario === 'TIMEOUT' ? 504 : MANAGERFINANCEPAYMENTSANDSUMMARY_MOCK_SCENARIOS[scenario].status;
  return HttpResponse.json({ success: false, message: `Mock scenario: ${scenario}`, data: null }, { status: status || 499 });
}

function paymentSummaryWith(payment: Payment): void {
  mockFinanceSummary = {
    ...mockFinanceSummary,
    totalRevenue: mockFinanceSummary.totalRevenue + payment.amount,
    netRevenue: mockFinanceSummary.netRevenue + payment.amount,
    totalPayments: mockFinanceSummary.totalPayments + 1,
    revenueByMethod: { ...mockFinanceSummary.revenueByMethod, [payment.method]: (mockFinanceSummary.revenueByMethod[payment.method] ?? 0) + payment.amount },
  };
}

function buildPdfDataUrl(): string {
  const safeText = 'Finance payments report';
  const stream = `BT /F1 16 Tf 50 760 Td (${safeText}) Tj ET`;
  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    `5 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (const object of objects) { offsets.push(pdf.length); pdf += object; }
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1)) pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return `data:application/pdf;base64,${btoa(pdf)}`;
}

export function resetManagerFinancePaymentsAndSummaryMockState(): void {
  mockPayments = [...MOCK_PAYMENTS];
  mockFinanceSummary = { ...MOCK_FINANCE_SUMMARY, revenueByMethod: { ...MOCK_FINANCE_SUMMARY.revenueByMethod }, monthlyData: [...MOCK_FINANCE_SUMMARY.monthlyData] };
  mockPaymentIdCounter = 1000;
  retryScenarioAttempts = 0;
  idempotencyRecords.clear();
}

export const managerFinanceHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.EXPORT), ({ request }) => {
    const format = new URL(request.url).searchParams.get('format') || 'csv';
    const csv = 'date,member,amount\n2026-09-19,Demo Member,1000';
    const url = format === 'pdf' ? buildPdfDataUrl() : `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    return HttpResponse.json({ success: true, message: 'Export prepared', data: { url } });
  }),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const scenario = scenarioResponse(request);
    if (scenario) return scenario;
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const status = (url.searchParams.get('status') || '').trim().toUpperCase();
    const method = (url.searchParams.get('method') || '').trim().toLowerCase();
    const pageValue = Number(url.searchParams.get('page') || '1');
    const limitValue = Number(url.searchParams.get('limit') || '10');
    const page = Number.isSafeInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const limit = Number.isSafeInteger(limitValue) && limitValue > 0 ? Math.min(limitValue, 1000) : 10;
    const filtered = mockPayments.filter((payment) => {
      const text = [payment.invoiceNumber, payment.member?.name, payment.method].filter(Boolean).join(' ').toLowerCase();
      return (!search || text.includes(search)) && (!status || status === MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_STATUS_VALUES.ALL || payment.status === status) && (!method || method === 'all' || payment.method.toLowerCase() === method);
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Success', data: { payments: filtered.slice(start, start + limit), total: filtered.length } });
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Payment>;
    const key = request.headers.get('Idempotency-Key');
    const fingerprint = JSON.stringify(body);
    if (key) {
      const existing = idempotencyRecords.get(key);
      if (existing && existing.fingerprint !== fingerprint) return HttpResponse.json({ success: false, message: 'Idempotency key reused with a different request' }, { status: 409 });
      if (existing) return HttpResponse.json(existing.response as any);
    }
    const newPayment = { ...mockPayments[0], ...body, id: `pay-${mockPaymentIdCounter++}` } as Payment;
    mockPayments = [newPayment, ...mockPayments];
    paymentSummaryWith(newPayment);
    const response = { success: true, message: 'Success', data: newPayment };
    if (key) idempotencyRecords.set(key, { fingerprint, response });
    return HttpResponse.json(response);
  }),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.SUMMARY), () => HttpResponse.json({ success: true, message: 'Success', data: mockFinanceSummary })),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BY_MEMBER(':memberId')), ({ params }) => {
    const filtered = mockPayments.filter((payment) => payment.memberId === params.memberId);
    return HttpResponse.json({ success: true, message: 'Success', data: filtered });
  }),
];
