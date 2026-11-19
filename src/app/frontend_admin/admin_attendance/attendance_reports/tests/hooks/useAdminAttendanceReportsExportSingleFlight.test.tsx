import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminAttendanceReportsMutations } from '@/app/frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsMutations';

const mock = vi.hoisted(() => ({ mutate: vi.fn(), errors: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key:string) => key }));
vi.mock('@/app/frontend_admin/admin_attendance/attendance_reports/components/feedback/AdminAttendanceReportsToastService',()=>({ adminToast:{error:mock.errors} }));
vi.mock('@tanstack/react-query',()=>({ useMutation:()=>({ mutateAsync:mock.mutate }) }));
const params = {type:'attendance' as const,format:'csv' as const,from:'2026-01-01',to:'2026-01-31'};

describe('RBG138 report export in-flight lifecycle',()=>{
  it('suppresses overlapping exports then unlocks after a rejected request',async()=>{
    let reject!: (error:Error)=>void;
    mock.mutate.mockReset().mockImplementationOnce(()=>new Promise((_resolve,rejectFn)=>{reject=rejectFn;})).mockRejectedValueOnce(new Error('offline'));
    const {result}=renderHook(()=>useAdminAttendanceReportsMutations());
    let first!: Promise<void>;let duplicate!:Promise<void>;
    act(()=>{first=result.current.exportReport(params);duplicate=result.current.exportReport(params);});
    expect(mock.mutate).toHaveBeenCalledTimes(1);
    await act(async()=>{reject(new Error('offline')); await Promise.all([first,duplicate]);});
    await act(async()=>{await result.current.exportReport(params);});
    expect(mock.mutate).toHaveBeenCalledTimes(2);
  });
});
