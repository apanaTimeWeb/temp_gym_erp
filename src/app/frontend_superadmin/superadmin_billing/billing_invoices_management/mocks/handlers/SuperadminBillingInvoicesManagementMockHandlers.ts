import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/config/superadmin_billing_invoices_management.url_config';
import { SUPERADMIN_INVOICE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';
import { MOCK_INVOICE_TENANTS, MOCK_SUPERADMIN_BILLING_INVOICES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/fixtures/SuperadminBillingInvoicesManagementMockFixtures';
import { CreateManualPaymentDtoSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_contract.schemas';
import { toMinorCurrencyUnits } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormatCurrency';

import type { CreateManualPaymentDto, SaaSInvoice } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingInvoicesMockHandlers owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/fixtures/SuperadminBillingInvoicesManagementMockFixtures, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_contract.schemas, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/config/superadmin_billing_invoices_management.url_config, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


const BASE_URL = SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.BASE;
let mockInvoices: SaaSInvoice[] = [...MOCK_SUPERADMIN_BILLING_INVOICES];
const manualPaymentReplay = new Map<string, { fingerprint: string; invoice: SaaSInvoice }>();

export function resetSuperadminBillingInvoicesMockState(): void {
  mockInvoices = [...MOCK_SUPERADMIN_BILLING_INVOICES];
  manualPaymentReplay.clear();
}
export const superadminInvoicesHandlers = [
    http.get(`*${SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.TENANTS}`, async () => HttpResponse.json({ success: true, message: 'Success', data: MOCK_INVOICE_TENANTS, requestId: crypto.randomUUID()})),
    http.get('*' + BASE_URL, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const limit = Number(url.searchParams.get('limit')) || 10;
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const status = url.searchParams.get('status');
        let filtered = [...mockInvoices];
        if (search) {
            filtered = filtered.filter(i => i.tenantName?.toLowerCase().includes(search) ||
                i.id?.toLowerCase().includes(search));
        }
        if (status && status !== SUPERADMIN_INVOICE_STATUS_CODES.ALL) {
            filtered = filtered.filter(i => i.status === status);
        }
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        if (startDate) filtered = filtered.filter((invoice) => invoice.issuedAt.slice(0, 10) >= startDate);
        if (endDate) filtered = filtered.filter((invoice) => invoice.issuedAt.slice(0, 10) <= endDate);
        const total = filtered.length;
        const paginated = filtered.slice((page - 1) * limit, page * limit);
        return HttpResponse.json<ApiResponse<SaaSInvoice[]>>({
            success: true,
            message: 'Success',
            data: paginated,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page < (Math.ceil(total / limit)), hasPrevPage: page > 1},
            requestId: crypto.randomUUID(),
        });
    }),
    http.post('*' + `${BASE_URL}/manual-payment`, async ({ request }) => {
        await delay(500);
        const parsed = CreateManualPaymentDtoSchema.safeParse(await request.json());
        if (!parsed.success) return HttpResponse.json<ApiResponse<SaaSInvoice>>({ success: false, message: 'Invalid manual payment request', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const dto: CreateManualPaymentDto = parsed.data;
        const idempotencyKey = request.headers.get('Idempotency-Key');
        if (!idempotencyKey) return HttpResponse.json<ApiResponse<SaaSInvoice>>({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const fingerprint = JSON.stringify({ gymId: dto.gymId, amount: dto.amount, planName: dto.planName, currency: dto.currency ?? null });
        const replay = manualPaymentReplay.get(idempotencyKey);
        if (replay) {
            if (replay.fingerprint !== fingerprint) {
                return HttpResponse.json<ApiResponse<SaaSInvoice>>({ success: false, message: 'Idempotency-Key was already used for a different payment intent', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT });
            }
            return HttpResponse.json<ApiResponse<SaaSInvoice>>({ success: true, message: 'Created', data: replay.invoice, requestId: crypto.randomUUID()});
        }
        const tenant = MOCK_INVOICE_TENANTS.find((item) => item.id === dto.gymId);
        if (!tenant) return HttpResponse.json<ApiResponse<SaaSInvoice>>({ success: false, message: 'Tenant not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        const newInvoice: SaaSInvoice = {
            id: `inv${Date.now()}`,
            tenantId: dto.gymId,
            tenantName: tenant.name,
            amount: toMinorCurrencyUnits(dto.amount, dto.currency || 'INR'),
            currency: dto.currency || 'INR',
            status: SUPERADMIN_INVOICE_STATUS_CODES.PAID,
            issuedAt: new Date().toISOString(),
            dueDate: new Date().toISOString(),
            paidAt: new Date().toISOString(),
            paymentMethod: 'Manual',
            invoiceType: 'ONE_TIME',
            planName: dto.planName
        };
        mockInvoices = [newInvoice, ...mockInvoices];
        manualPaymentReplay.set(idempotencyKey, { fingerprint, invoice: newInvoice });
        return HttpResponse.json<ApiResponse<SaaSInvoice>>({
            success: true,
            message: 'Created',
            data: newInvoice,
            requestId: crypto.randomUUID(),
        });
    }),
    http.get('*' + `${BASE_URL}/:id/download`, async () => {
        await delay(300);
        return HttpResponse.json<ApiResponse<{
            downloadUrl: string;
        }>>({
            success: true,
            message: 'Success',
            data: { downloadUrl: '/mock-invoice.pdf' },
            requestId: crypto.randomUUID(),
        });
    }),
    http.get('*' + `${BASE_URL}/export`, async () => {
        await delay(600);
        return HttpResponse.json<ApiResponse<{
            downloadUrl: string;
        }>>({
            success: true,
            message: 'Success',
            data: { downloadUrl: '/mock-invoices.csv' },
            requestId: crypto.randomUUID(),
        });
    }),
    http.post('*' + `${BASE_URL}/:id/resend`, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<null>>({
            success: true,
            message: 'Email resent',
            data: null,
            requestId: crypto.randomUUID(),
        });
    }),
];
